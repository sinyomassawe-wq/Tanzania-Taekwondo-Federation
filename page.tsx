import { getDb } from '@/lib/db';
import HeroSlider from '@/components/home/HeroSlider';
import QuickLinks from '@/components/home/QuickLinks';
import NewsGrid from '@/components/home/NewsGrid';
import EventsStrip from '@/components/home/EventsStrip';
import ResultsHighlights from '@/components/home/ResultsHighlights';
import RankingsPreview from '@/components/home/RankingsPreview';
import AboutBlock from '@/components/home/AboutBlock';
import GalleryHighlights from '@/components/home/GalleryHighlights';
import PartnersRow from '@/components/home/PartnersRow';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const db = getDb();

  // 1. Hero slides
  const slides = db
    .prepare('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY display_order ASC')
    .all() as any[];

  // 2. Latest news
  const news = db
    .prepare('SELECT * FROM news ORDER BY published_at DESC LIMIT 4')
    .all() as any[];

  // 3. Upcoming events
  const events = db
    .prepare('SELECT * FROM events ORDER BY start_date ASC LIMIT 3')
    .all() as any[];

  // 4. Latest results
  const results = db
    .prepare('SELECT * FROM results ORDER BY year DESC LIMIT 4')
    .all() as any[];

  // 5. Athletes for rankings preview
  const athletes = db
    .prepare('SELECT * FROM athletes ORDER BY ranking_points DESC LIMIT 10')
    .all() as any[];

  // 6. Gallery highlights
  const gallery = db
    .prepare('SELECT * FROM gallery ORDER BY event_date DESC LIMIT 4')
    .all() as any[];

  // 7. Partners
  const partners = db
    .prepare('SELECT * FROM partners ORDER BY display_order ASC')
    .all() as any[];

  return (
    <div>
      {/* 1. Hero Slider */}
      <HeroSlider slides={slides} />

      {/* 6. Quick Links Tiles */}
      <QuickLinks />

      {/* 2. Latest News Grid */}
      <NewsGrid news={news} />

      {/* 3. Upcoming Events Strip */}
      <EventsStrip events={events} />

      {/* 4. Latest Results Highlights */}
      <ResultsHighlights results={results} />

      {/* 5. National Rankings Preview */}
      <RankingsPreview athletes={athletes} />

      {/* 9. About TTF Block */}
      <AboutBlock />

      {/* 7. Gallery Highlights */}
      <GalleryHighlights items={gallery} />

      {/* 8. Partners & Sponsors */}
      <PartnersRow partners={partners} />
    </div>
  );
}
