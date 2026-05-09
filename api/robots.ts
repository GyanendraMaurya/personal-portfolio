import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(request: VercelRequest, response: VercelResponse): void {
  const origin = siteOrigin(request);

  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
  response.status(200).send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`);
}

function siteOrigin(request: VercelRequest): string {
  if (process.env['SITE_URL']) {
    return process.env['SITE_URL'].replace(/\/+$/, '');
  }

  const forwardedHost = headerValue(request.headers['x-forwarded-host']);
  const host = forwardedHost ?? headerValue(request.headers.host) ?? 'gyanendramaurya.com';
  const forwardedProto = headerValue(request.headers['x-forwarded-proto']);
  const protocol = forwardedProto ?? (host.includes('localhost') ? 'http' : 'https');

  return `${protocol}://${host}`;
}

function headerValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
