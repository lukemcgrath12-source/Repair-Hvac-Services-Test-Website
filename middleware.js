// Server-side login for the internal quoting tool.
// Only a salted SHA-256 hash of the password is stored here, never the password itself.
export const config = { matcher: ['/repair-quotes', '/repair-quotes.html'] };

const USERNAME = 'repair';
const SALT = '0cee984a2ca6a17b';
const HASH = '64273794a4d95f1bf7bb2c3930b45e5093eea6c5ba5b1b636c3eb21631271347';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(request) {
  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const user = decoded.slice(0, decoded.indexOf(':')).trim().toLowerCase();
      const pwd = decoded.slice(decoded.indexOf(':') + 1);
      if (user === USERNAME && (await sha256(SALT + pwd)) === HASH) return; // allowed through
    } catch (e) {}
  }
  return new Response('Login required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="REPAIR Quoting System", charset="UTF-8"',
      'Cache-Control': 'no-store'
    }
  });
}
