import { getDb } from '@/lib/db';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ttf.or.tz';
  const db = getDb();

  const news = db.prepare('SELECT slug, published_at FROM news').all() as any[];
  const events = db.prepare('SELECT slug, start_date FROM events').all() as any[];

  const staticRoutes = [
    '',
    '/about',
    '/news',
    '/competitions',
    '/competitions/calendar',
    '/competitions/results',
    '/competitions/host',
    '/athletes',
    '/athletes/national-team',
    '/membership',
    '/membership/register',
    '/membership/fees',
    '/membership/club-affiliation',
    '/clubs',
    '/education',
    '/education/verify',
    '/integrity',
    '/integrity/report',
    '/development',
    '/para',
    '/documents',
    '/notices',
    '/media',
    '/partners',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/accessibility',
    '/sitemap',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <changefreq>daily</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${news
    .map(
      (item) => `
    <url>
      <loc>${baseUrl}/news/${item.slug}</loc>
      <lastmod>${item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : '2026-11-01'}</lastmod>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
  ${events
    .map(
      (item) => `
    <url>
      <loc>${baseUrl}/competitions/${item.slug}</loc>
      <lastmod>${item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '2026-11-01'}</lastmod>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
