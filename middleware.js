// Server-side login for the internal quoting tool.
// The password lives in the QUOTES_PASSWORD environment variable in Vercel, never in the page.
export const config = { matcher: ['/repair-quotes', '/repair-quotes.html'] };

export default function middleware(request) {
  const expected = process.env.QUOTES_PASSWORD;
  const header = request.headers.get('authorization') || '';
  if (expected && header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const pwd = decoded.slice(decoded.indexOf(':') + 1);
      if (pwd === expected) return; // allowed through
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
