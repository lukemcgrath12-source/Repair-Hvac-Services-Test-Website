// Shared storage for the REPAIR quoting tool.
// Protected by the same login as /repair-quotes (see middleware.js).
// One private JSON file holds every quote, client and product edit; each
// save merges by record so two people saving at once don't overwrite each other.
import { get, put, BlobPreconditionFailedError } from '@vercel/blob';

const PATH = 'rpr/data.json';
const EMPTY = { quotes: [], clients: [], customProducts: [], deleted: {}, settings: null, productOverrides: {}, overridesTs: 0 };

const ts = (x) => (x && +x._ts) || 0;
function mergeArr(a = [], b = [], deleted = {}) {
  const m = new Map();
  for (const it of [...a, ...b]) {
    if (!it || !it.id) continue;
    const cur = m.get(it.id);
    if (!cur || ts(it) > ts(cur)) m.set(it.id, it);
  }
  return [...m.values()].filter((it) => !(deleted[it.id] && deleted[it.id] >= ts(it)));
}
export function merge(a, b) {
  a = { ...EMPTY, ...(a || {}) }; b = { ...EMPTY, ...(b || {}) };
  const deleted = { ...a.deleted };
  for (const [k, v] of Object.entries(b.deleted || {})) deleted[k] = Math.max(deleted[k] || 0, +v || 0);
  const settings = !a.settings ? b.settings : !b.settings ? a.settings : ts(b.settings) > ts(a.settings) ? b.settings : a.settings;
  const useB = (+b.overridesTs || 0) > (+a.overridesTs || 0);
  return {
    quotes: mergeArr(a.quotes, b.quotes, deleted),
    clients: mergeArr(a.clients, b.clients, deleted),
    customProducts: mergeArr(a.customProducts, b.customProducts, deleted),
    deleted,
    settings,
    productOverrides: useB ? b.productOverrides || {} : a.productOverrides || {},
    overridesTs: Math.max(+a.overridesTs || 0, +b.overridesTs || 0),
  };
}

async function load() {
  const r = await get(PATH, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200) return { doc: null, etag: null };
  const text = await new Response(r.stream).text();
  return { doc: JSON.parse(text), etag: r.blob.etag };
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  const chunks = []; for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const { doc } = await load();
      return res.status(200).json(doc || EMPTY);
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const incoming = await readBody(req);
    for (let attempt = 0; attempt < 4; attempt++) {
      const { doc, etag } = await load();
      const merged = merge(doc, incoming);
      try {
        await put(PATH, JSON.stringify(merged), {
          access: 'private', contentType: 'application/json', addRandomSuffix: false,
          allowOverwrite: true, cacheControlMaxAge: 60, ...(etag ? { ifMatch: etag } : {}),
        });
        return res.status(200).json(merged);
      } catch (e) {
        if (e instanceof BlobPreconditionFailedError) continue; // someone saved at the same moment, merge again
        throw e;
      }
    }
    return res.status(409).json({ error: 'Busy, try again' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
