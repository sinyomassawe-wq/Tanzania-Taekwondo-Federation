export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ttf.or.tz';

  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
