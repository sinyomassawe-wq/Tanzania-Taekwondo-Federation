import { NextResponse } from 'next/server';
import { getCurrentUser, logAudit } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const athletes = db.prepare('SELECT * FROM athletes ORDER BY full_name ASC').all();
    return NextResponse.json({ athletes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const {
      id,
      full_name,
      gender,
      category,
      weight_class,
      discipline,
      belt_dan,
      club_name,
      region,
      national_rank,
      ranking_points,
      titles_en,
      titles_sw,
      bio_en,
      bio_sw,
      photo_url,
      is_national_team,
    } = body;

    if (!full_name || !gender || !category || !weight_class) {
      return NextResponse.json(
        { error: 'Full name, gender, category, and weight class are required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const athleteId = id || `ath-${Date.now()}`;
    const slug = slugify(full_name);

    if (id) {
      const stmt = db.prepare(`
        UPDATE athletes SET
          full_name = ?,
          gender = ?,
          category = ?,
          weight_class = ?,
          discipline = ?,
          belt_dan = ?,
          club_name = ?,
          region = ?,
          national_rank = ?,
          ranking_points = ?,
          titles_en = ?,
          titles_sw = ?,
          bio_en = ?,
          bio_sw = ?,
          photo_url = ?,
          is_national_team = ?
        WHERE id = ?
      `);
      stmt.run(
        full_name,
        gender,
        category,
        weight_class,
        discipline || 'Kyorugi',
        belt_dan || '1st Dan',
        club_name || '',
        region || 'Dar es Salaam',
        national_rank ? parseInt(national_rank, 10) : null,
        ranking_points ? parseFloat(ranking_points) : 0,
        titles_en || '',
        titles_sw || '',
        bio_en || '',
        bio_sw || '',
        photo_url || '',
        is_national_team ? 1 : 0,
        id
      );
      logAudit(user.id, 'UPDATE_ATHLETE', 'athlete', id, { full_name });
    } else {
      const stmt = db.prepare(`
        INSERT INTO athletes (
          id, slug, full_name, gender, category, weight_class, discipline, belt_dan,
          club_name, region, national_rank, ranking_points, titles_en, titles_sw,
          bio_en, bio_sw, photo_url, is_national_team
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        athleteId,
        slug,
        full_name,
        gender,
        category,
        weight_class,
        discipline || 'Kyorugi',
        belt_dan || '1st Dan',
        club_name || '',
        region || 'Dar es Salaam',
        national_rank ? parseInt(national_rank, 10) : null,
        ranking_points ? parseFloat(ranking_points) : 0,
        titles_en || '',
        titles_sw || '',
        bio_en || '',
        bio_sw || '',
        photo_url || '',
        is_national_team ? 1 : 0
      );
      logAudit(user.id, 'CREATE_ATHLETE', 'athlete', athleteId, { full_name });
    }

    return NextResponse.json({ success: true, id: athleteId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing athlete id' }, { status: 400 });

    const db = getDb();
    db.prepare('DELETE FROM athletes WHERE id = ?').run(id);
    db.prepare('DELETE FROM rankings WHERE athlete_id = ?').run(id);
    logAudit(user.id, 'DELETE_ATHLETE', 'athlete', id, {});

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
