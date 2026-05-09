import type { VercelRequest, VercelResponse } from '@vercel/node';

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/work', priority: '0.9' },
  { path: '/services', priority: '0.9' },
  { path: '/skills', priority: '0.7' },
  { path: '/experience', priority: '0.7' },
  { path: '/contact', priority: '0.8' },
];

const projectRoutes = [
  { path: '/work/convertlab', priority: '0.8' },
  { path: '/work/dashboard-systems', priority: '0.8' },
  { path: '/work/api-integrations', priority: '0.8' },
];

export default function handler(request: VercelRequest, response: VercelResponse): void {
  const origin = siteOrigin(request);
  const urls = [...staticRoutes, ...projectRoutes]
    .map(
      (route) => `  <url>
    <loc>${escapeXml(new URL(route.path, origin).toString())}</loc>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  response.setHeader('Content-Type', 'application/xml; charset=utf-8');
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
  response.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
