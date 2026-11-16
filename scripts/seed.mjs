import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'data', 'ttf.db');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);

const isWipe = process.argv.includes('--wipe');

if (isWipe) {
  console.log('--- WIPING ALL DEMO DATA ---');
  const tables = [
    'hero_slides',
    'news',
    'events',
    'results',
    'records',
    'athletes',
    'rankings',
    'clubs',
    'memberships',
    'certificates',
    'officials',
    'documents',
    'gallery',
    'partners',
    'contacts',
    'integrity_reports',
    'subscribers',
    'audit_logs',
  ];

  for (const table of tables) {
    try {
      db.exec(`DELETE FROM ${table};`);
      console.log(`Cleared ${table}`);
    } catch (e) {
      console.warn(`Could not clear table ${table}:`, e.message);
    }
  }

  console.log('All demo data wiped successfully.');
  process.exit(0);
}

console.log('--- SEEDING TTF DATABASE ---');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    full_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value_en TEXT,
    value_sw TEXT,
    type TEXT DEFAULT 'text',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS hero_slides (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_sw TEXT NOT NULL,
    subtitle_en TEXT,
    subtitle_sw TEXT,
    image_url TEXT NOT NULL,
    cta_text_en TEXT,
    cta_text_sw TEXT,
    cta_link TEXT,
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_sw TEXT NOT NULL,
    summary_en TEXT,
    summary_sw TEXT,
    content_en TEXT NOT NULL,
    content_sw TEXT NOT NULL,
    image_url TEXT,
    author TEXT DEFAULT 'TTF Media',
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_featured INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_sw TEXT NOT NULL,
    event_type TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    map_url TEXT,
    description_en TEXT,
    description_sw TEXT,
    schedule_details TEXT,
    categories_weights TEXT,
    reg_deadline DATE,
    contact_person TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    invitation_pdf_url TEXT,
    is_featured INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS results (
    id TEXT PRIMARY KEY,
    event_id TEXT,
    year INTEGER NOT NULL,
    category TEXT NOT NULL,
    division TEXT NOT NULL,
    weight_class TEXT NOT NULL,
    gender TEXT NOT NULL,
    gold_athlete TEXT NOT NULL,
    silver_athlete TEXT NOT NULL,
    bronze_athlete_1 TEXT,
    bronze_athlete_2 TEXT,
    notes_en TEXT,
    notes_sw TEXT,
    document_pdf_url TEXT
  );

  CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    year INTEGER NOT NULL,
    division TEXT NOT NULL,
    weight_class TEXT NOT NULL,
    gender TEXT NOT NULL,
    champion_name TEXT NOT NULL,
    club_name TEXT,
    region TEXT
  );

  CREATE TABLE IF NOT EXISTS athletes (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    gender TEXT NOT NULL,
    category TEXT NOT NULL,
    weight_class TEXT NOT NULL,
    discipline TEXT DEFAULT 'Kyorugi',
    belt_dan TEXT,
    club_name TEXT,
    region TEXT,
    national_rank INTEGER,
    ranking_points REAL DEFAULT 0,
    titles_en TEXT,
    titles_sw TEXT,
    bio_en TEXT,
    bio_sw TEXT,
    photo_url TEXT,
    is_national_team INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS rankings (
    id TEXT PRIMARY KEY,
    athlete_id TEXT,
    category TEXT NOT NULL,
    gender TEXT NOT NULL,
    weight_class TEXT NOT NULL,
    rank INTEGER NOT NULL,
    points REAL NOT NULL,
    year INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clubs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    district TEXT,
    head_instructor TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    training_days_en TEXT,
    training_days_sw TEXT,
    training_times TEXT,
    map_url TEXT,
    status TEXT DEFAULT 'active'
  );

  CREATE TABLE IF NOT EXISTS memberships (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT NOT NULL,
    date_of_birth DATE,
    national_id TEXT,
    region TEXT,
    club_name TEXT,
    belt_dan TEXT,
    kukkiwon_number TEXT,
    photo_url TEXT,
    id_document_url TEXT,
    certificate_url TEXT,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'unpaid',
    notes TEXT,
    qr_code_data TEXT,
    approved_at DATETIME,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    cert_number TEXT UNIQUE NOT NULL,
    holder_name TEXT NOT NULL,
    cert_type TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    issue_date DATE NOT NULL,
    instructor_name TEXT,
    verification_status TEXT DEFAULT 'valid'
  );

  CREATE TABLE IF NOT EXISTS officials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position_en TEXT NOT NULL,
    position_sw TEXT NOT NULL,
    category TEXT NOT NULL,
    commission_name TEXT,
    photo_url TEXT,
    display_order INTEGER DEFAULT 0,
    bio_en TEXT,
    bio_sw TEXT
  );

  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_sw TEXT NOT NULL,
    category TEXT NOT NULL,
    year INTEGER,
    file_url TEXT NOT NULL,
    file_size TEXT,
    download_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_sw TEXT NOT NULL,
    album_name TEXT NOT NULL,
    media_type TEXT NOT NULL DEFAULT 'photo',
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    event_date DATE,
    is_featured INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tier TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    display_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    department TEXT DEFAULT 'General',
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS integrity_reports (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    incident_date DATE,
    incident_location TEXT,
    parties_involved TEXT,
    evidence_files TEXT,
    reporter_name TEXT,
    reporter_contact TEXT,
    is_anonymous INTEGER DEFAULT 1,
    status TEXT DEFAULT 'new',
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active',
    confirmed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    username TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function seedData() {
    // 1. Seed Users (with hashed passwords)
    const adminPassHash = await bcrypt.hash('Admin@TTF2026!', 10);
    const editorPassHash = await bcrypt.hash('Editor@TTF2026!', 10);
    const registrarPassHash = await bcrypt.hash('Registrar@TTF2026!', 10);
    const technicalPassHash = await bcrypt.hash('Technical@TTF2026!', 10);

    const insertUser = db.prepare(`
      INSERT OR REPLACE INTO users (id, username, email, password_hash, role, full_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertUser.run('usr_super_admin', 'admin', 'admin@ttf.or.tz', adminPassHash, 'super_admin', 'TTF Super Administrator');
    insertUser.run('usr_editor', 'editor', 'editor@ttf.or.tz', editorPassHash, 'editor', 'TTF Communications Officer');
    insertUser.run('usr_registrar', 'registrar', 'registrar@ttf.or.tz', registrarPassHash, 'registrar', 'TTF Membership Registrar');
    insertUser.run('usr_tech_officer', 'technical', 'technical@ttf.or.tz', technicalPassHash, 'technical_officer', 'TTF Technical Director');

    // 2. Settings (with editable placeholders)
    const insertSetting = db.prepare(`
      INSERT OR REPLACE INTO settings (key, value_en, value_sw, type)
      VALUES (?, ?, ?, ?)
    `);

    const settingsData = [
      ['phone', '[+255 22 211 XXXX - TTF Official Secretariat Phone]', '[+255 22 211 XXXX - Simu Rasmi ya Sekretarieti ya TTF]', 'text'],
      ['email', '[info@ttf.or.tz - Official TTF Email]', '[info@ttf.or.tz - Barua Pepe Rasmi ya TTF]', 'text'],
      ['address', '[Benjamin Mkapa National Stadium Complex, Taifa Road, Dar es Salaam, Tanzania]', '[Uwanja wa Taifa wa Benjamin Mkapa, Barabara ya Taifa, Dar es Salaam, Tanzania]', 'text'],
      ['postal_address', '[P.O. Box XXXXX, Dar es Salaam, United Republic of Tanzania]', '[S.L.P XXXXX, Dar es Salaam, Jamhuri ya Muungano wa Tanzania]', 'text'],
      ['office_hours', '[Monday – Friday: 08:30 – 16:30 EAT]', '[Jumatatu – Ijumaa: Saa 02:30 Asubuhi – Saa 10:30 Jioni]', 'text'],
      ['bank_name', '[CRDB Bank Plc / NMB Bank - Account Name: Tanzania Taekwondo Federation]', '[CRDB Bank Plc / NMB Bank - Jina la Akaunti: Tanzania Taekwondo Federation]', 'text'],
      ['bank_account_number', '[A/C No: 015XXXXXXXXXXX - Swift: CORUTZTZ]', '[Nambari ya Akaunti: 015XXXXXXXXXXX - Swift: CORUTZTZ]', 'text'],
      ['mobile_money', '[M-Pesa / Tigo Pesa Lipa Namba: 5XXXXXX (TTF Secretariat)]', '[M-Pesa / Tigo Pesa Lipa Namba: 5XXXXXX (Sekretarieti ya TTF)]', 'text'],
      ['facebook_url', 'https://facebook.com/tanzaniataekwondo', 'https://facebook.com/tanzaniataekwondo', 'url'],
      ['twitter_url', 'https://twitter.com/tztaekwondo', 'https://twitter.com/tztaekwondo', 'url'],
      ['instagram_url', 'https://instagram.com/tanzaniataekwondo', 'https://instagram.com/tanzaniataekwondo', 'url'],
      ['youtube_url', 'https://youtube.com/@tanzaniataekwondo', 'https://youtube.com/@tanzaniataekwondo', 'url'],
    ];

    for (const [key, ven, vsw, type] of settingsData) {
      insertSetting.run(key, ven, vsw, type);
    }

    // 3. Hero Slides
    const insertSlide = db.prepare(`
      INSERT OR REPLACE INTO hero_slides (id, title_en, title_sw, subtitle_en, subtitle_sw, image_url, cta_text_en, cta_text_sw, cta_link, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertSlide.run(
      'slide_1',
      'Welcome to Tanzania Taekwondo Federation',
      'Karibu kwenye Shirikisho la Taekwondo Tanzania',
      'Official National Governing Body dedicated to developing martial arts excellence, youth empowerment, and Olympic values across Tanzania.',
      'Mamlaka Kuu ya Taekwondo nchini inayojitolea kukuza umahiri wa sanaa ya mapigano, kuwezesha vijana, na kukuza maadili ya Olimpiki Tanzania.',
      'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1600&auto=format&fit=crop',
      'Explore National Calendar',
      'Tazama Kalenda ya Taifa',
      '/competitions/calendar',
      1,
      1
    );

    insertSlide.run(
      'slide_2',
      'National Taekwondo Championships 2026',
      'Mashindano ya Taifa ya Taekwondo 2026',
      'The premier championship uniting top Kyorugi, Poomsae, and Para Taekwondo athletes from all 31 regions of Tanzania.',
      'Mashindano makuu yanayowakutanisha wachezaji bora wa Kyorugi, Poomsae, na Para Taekwondo kutoka mikoa yote 31 ya Tanzania.',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      'View Event & Register',
      'Tazama Tukio na Jisajili',
      '/competitions/national-championships-2026',
      2,
      1
    );

    insertSlide.run(
      'slide_3',
      'Official Member & Club Affiliation Open',
      'Usajili wa Wanachama na Vilabu Umefunguliwa',
      'Get certified with TTF, acquire your official membership ID card with digital QR verification, and participate in sanctioned national championships.',
      'Pata uthibitisho wa TTF, pata kitambulisho chako rasmi chenye msimbo wa QR, na shiriki mashindano yaliyoidhinishwa kitaifa.',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop',
      'Join TTF Today',
      'Jiunge na TTF Leo',
      '/membership',
      3,
      1
    );

    // 4. News Articles
    const insertNews = db.prepare(`
      INSERT OR REPLACE INTO news (id, slug, category, title_en, title_sw, summary_en, summary_sw, content_en, content_sw, image_url, author, published_at, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const newsData = [
      [
        'news_1',
        'ttf-unveils-national-strategic-plan-2026-2030',
        'Federation News',
        'TTF Unveils 5-Year National Taekwondo Strategic Plan (2026–2030)',
        'TTF Yazindua Mpango Mkakati wa Miaka Mitano wa Taekwondo (2026–2030)',
        'The Executive Committee has approved an ambitious blueprint focusing on grassroots talent scouting, regional dojang expansion, and coach certification.',
        'Kamati Kuu ya Utendaji imeidhinisha mpango kabambe unaolenga kuibua vipaji ngazi ya chini, upanuzi wa vilabu vya mikoa, na kutoa vyeti kwa makocha.',
        '<p>The Tanzania Taekwondo Federation (TTF) is proud to announce the formal launch of its 2026–2030 Strategic Development Plan. Formulated in consultation with the National Sports Council of Tanzania (BMT), Tanzania Olympic Committee (TOC), and World Taekwondo (WT), the plan focuses on four core pillars:</p><ul><li>Grassroots expansion across all 31 mainland and Zanzibar regions</li><li>Upgrading coach and referee certifications to international standards</li><li>Athlete welfare and high-performance training camps</li><li>Good governance, financial transparency, and Clean Sport compliance</li></ul>',
        '<p>Shirikisho la Taekwondo Tanzania (TTF) linajivunia kutangaza uzinduzi rasmi wa Mpango Mkakati wa Maendeleo 2026–2030. Ukiwa umeandaliwa kwa mashauriano na Baraza la Michezo la Taifa (BMT), Kamati ya Olimpiki Tanzania (TOC), na Shirikisho la Taekwondo Duniani (WT), mpango huu unazingatia nguzo nne kuu:</p><ul><li>Upanuzi wa mchezo ngazi ya chini katika mikoa yote 31 ya Bara na Zanzibar</li><li>Kupandisha hadhi ya makocha na waamuzi kwa viwango vya kimataifa</li><li>Ustawi wa wachezaji na kambi za mafunzo ya kiwango cha juu</li><li>Utawala bora, uwazi wa kifedha, na kufuata kanuni za Michezo Safi</li></ul>',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        'TTF Secretariat',
        '2026-11-01',
        1,
      ],
      [
        'news_2',
        'national-championship-registration-open',
        'Competitions',
        'Registration Officially Opens for 2026 National Taekwondo Championship in Dar es Salaam',
        'Usajili Wafunguliwa Rasmi kwa Mashindano ya Taifa ya Taekwondo 2026 Jijini Dar es Salaam',
        'Athletes from all recognized clubs and schools are invited to register online before the deadline. Over 250 competitors expected.',
        'Wachezaji kutoka vilabu na shule zote zinazotambuliwa wanakaribishwa kujisajili mtandaoni kabla ya tarehe ya mwisho. Zaidi ya wachezaji 250 wanatarajiwa.',
        '<p>The Technical Committee of TTF has published the official competition package and entry guidelines for the 2026 Tanzania National Taekwondo Championship. The tournament features Cadet, Junior, and Senior divisions in both Kyorugi (sparring) and Poomsae (patterns), alongside the Para Taekwondo open division.</p>',
        '<p>Kamati ya Kiufundi ya TTF imetoa muongozo rasmi na fomu za ushiriki kwa Mashindano ya Taifa ya Taekwondo Tanzania 2026. Mashindano hayo yatahusisha vitengo vya Cadet, Junior, na Senior katika Kyorugi (mapigano) na Poomsae, pamoja na kitengo cha Para Taekwondo.</p>',
        'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
        'Technical Committee',
        '2026-10-25',
        1,
      ],
      [
        'news_3',
        'national-referee-and-coach-seminar-announced',
        'Referees and Coaches',
        'National Level 1 & 2 Referee & Coach Certification Course Announced for Arusha',
        'Kozi ya Kitaifa ya Waamuzi na Makocha Ngazi ya 1 & 2 Yatangazwa Jijini Arusha',
        'TTF Referee Committee will host a comprehensive 4-day seminar covering the latest World Taekwondo competition rules and video review guidelines.',
        'Kamati ya Waamuzi ya TTF itaendesha semina ya kina ya siku 4 itakayofundisha sheria mpya za mashindano ya World Taekwondo na mfumo wa video review.',
        '<p>Ensuring fair and precise adjudication is vital for our athletes success at international level. The Arusha seminar will certify 40 new national referees and provide continuing education units for practicing coaches.</p>',
        '<p>Kuhakikisha uamuzi wa haki na sahihi ni muhimu sana kwa mafanikio ya wachezaji wetu katika medani ya kimataifa. Semina ya Arusha itatoa vyeti kwa waamuzi wapya 40 na kutoa mafunzo rejea kwa makocha.</p>',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        'Referee Board',
        '2026-10-18',
        0,
      ],
      [
        'news_4',
        'para-taekwondo-development-initiative-launched',
        'Para Taekwondo',
        'TTF Launches Inclusive Para Taekwondo Talent Scouting Tour in Mwanza & Dodoma',
        'TTF Yazindua Kampeni ya Kuibua Vipaji vya Para Taekwondo Jijini Mwanza na Dodoma',
        'In collaboration with Paralympic sports bodies, TTF is creating accessible pathways for athletes with limb impairments and neurological conditions.',
        'Kwa kushirikiana na wadau wa michezo ya walemavu, TTF inaweka njia rahisi za ushiriki kwa wachezaji wenye ulemavu wa viungo.',
        '<p>Para Taekwondo is an official Paralympic sport. TTF is dedicated to ensuring equal opportunities for every Tanzanian with physical impairments to train, compete, and represent the nation on the world stage.</p>',
        '<p>Para Taekwondo ni mchezo rasmi wa Paralimpiki. TTF imejitolea kuhakikisha fursa sawa kwa kila Mtanzania mwenye ulemavu wa mwili kufanya mazoezi, kushindana, na kuwakilisha taifa kimataifa.</p>',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        'Para Taekwondo Commission',
        '2026-10-10',
        0,
      ],
      [
        'news_5',
        'clean-sport-anti-doping-workshop-conducted',
        'Anti-doping and Integrity',
        'TTF Conducts Mandatory Anti-Doping and Clean Sport Education for National Squad Athletes',
        'TTF Yafanya Mafunzo ya Lazima ya Kupinga Dawa za Kusisimua Misuli kwa Wachezaji wa Timu ya Taifa',
        'Athletes and team medical staff reviewed the 2026 WADA Prohibited List, Therapeutic Use Exemptions (TUE), and the TTF Whistleblower Policy.',
        'Wachezaji na madaktari wa timu walipitia orodha ya WADA ya 2026 ya vitu vilivyopigwa marufuku, TUE, na Sera ya Kutoa Taarifa za Siri ya TTF.',
        '<p>Integrity is the bedrock of Taekwondo. TTF has a zero-tolerance policy towards doping and competition manipulation. Athletes learned the importance of testing protocols and nutritional supplement safety.</p>',
        '<p>Uadilifu ndio msingi wa Taekwondo. TTF ina msimamo thabiti usio na mzaha dhidi ya dawa za kusisimua misuli na kupanga matokeo. Wachezaji walijifunza umuhimu wa vipimo na usalama wa virutubisho.</p>',
        'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
        'Medical & Integrity Commission',
        '2026-09-30',
        0,
      ],
    ];

    for (const item of newsData) {
      insertNews.run(...item);
    }

    // 5. Events
    const insertEvent = db.prepare(`
      INSERT OR REPLACE INTO events (
        id, slug, title_en, title_sw, event_type, start_date, end_date,
        venue_name, venue_address, map_url, description_en, description_sw,
        schedule_details, categories_weights, reg_deadline, contact_person,
        contact_phone, contact_email, invitation_pdf_url, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const eventsData = [
      [
        'event_1',
        'national-championships-2026',
        'Tanzania National Taekwondo Championship 2026',
        'Mashindano ya Taifa ya Taekwondo Tanzania 2026',
        'National Championship',
        '2026-12-12',
        '2026-12-14',
        'Benjamin Mkapa Indoor Arena',
        'Taifa Road, Dar es Salaam',
        'https://maps.google.com/?q=Benjamin+Mkapa+National+Stadium+Dar+es+Salaam',
        'The premier national championship of the year organized by TTF. Features full Daedo electronic scoring, livestreaming, and national ranking points.',
        'Mashindano makuu ya taifa ya mwaka yanayoandaliwa na TTF. Yatajumuisha mifumo ya kielektroniki ya Daedo, matangazo ya moja kwa moja na pointi za viwango vya taifa.',
        'Day 1: Weigh-ins & General Technical Meeting | Day 2: Cadet & Junior Kyorugi, Poomsae | Day 3: Senior Kyorugi Finals & Medal Ceremonies',
        'Cadet (-33kg to +65kg), Junior (-45kg to +78kg), Senior (-58kg, -68kg, -80kg, +80kg M; -49kg, -57kg, -67kg, +67kg F)',
        '2026-12-01',
        '[TTF Tournament Director name]',
        '[+255 7XX XXX XXX]',
        'competitions@ttf.or.tz',
        '/uploads/documents/ttf-national-championships-2026-circular.pdf',
        1,
      ],
      [
        'event_2',
        'northern-zone-taekwondo-open-2027',
        'Northern Zone Taekwondo Open Championships 2027',
        'Mashindano ya Wazi ya Kanda ya Kaskazini 2027',
        'Regional',
        '2027-01-23',
        '2027-01-24',
        'Sheikh Amri Abeid Stadium Hall',
        'Arusha CBD, Arusha',
        'https://maps.google.com/?q=Sheikh+Amri+Abeid+Stadium+Arusha',
        'Regional championship featuring clubs from Arusha, Kilimanjaro, Tanga, and Manyara.',
        'Mashindano ya kanda yanayojumuisha vilabu kutoka Arusha, Kilimanjaro, Tanga, na Manyara.',
        'Day 1: Poomsae & Junior Sparring | Day 2: Senior Divisions',
        'Junior and Senior Olympic Weight Divisions',
        '2027-01-10',
        '[Arusha Regional Coordinator name]',
        '[+255 7XX XXX XXX]',
        'northern@ttf.or.tz',
        '/uploads/documents/northern-open-2027-outline.pdf',
        1,
      ],
      [
        'event_3',
        'national-poomsae-and-grading-clinic-2027',
        'National Poomsae Masterclinic & Dan Grading 2027',
        'Kliniki ya Kitaifa ya Poomsae na Upimaji wa Dan 2027',
        'Poomsae',
        '2027-02-14',
        '2027-02-15',
        'Dodoma Jamhuri Sports Hall',
        'Dodoma City',
        'https://maps.google.com/?q=Dodoma+Tanzania',
        'Specialized technical seminar led by TTF Grandmasters covering Taegeuk 1 to 8 and black belt Dan forms, followed by official Kukkiwon Dan testing.',
        'Semina maalum ya kiufundi inayoongozwa na wakufunzi wakuu wa TTF ikifundisha Taegeuk 1 hadi 8 na fomu za mikanda meusi ya Dan.',
        'Saturday: Technical Breakdown | Sunday: Dan Testing & Certification',
        'Open to green belt and above; Dan testing for eligible 1st Kup and Dan holders',
        '2027-02-05',
        '[Technical Director name]',
        '[+255 7XX XXX XXX]',
        'education@ttf.or.tz',
        '/uploads/documents/poomsae-clinic-2027.pdf',
        0,
      ],
    ];

    for (const item of eventsData) {
      insertEvent.run(...item);
    }

    // 6. Officials / Executive Committee & Commissions
    const insertOfficial = db.prepare(`
      INSERT OR REPLACE INTO officials (id, name, position_en, position_sw, category, commission_name, photo_url, display_order, bio_en, bio_sw)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const officialsData = [
      ['off_1', '[TTF President name]', 'President', 'Rais wa Shirikisho', 'executive_committee', null, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', 1, 'Head of TTF and representative to World Taekwondo and the Tanzania Olympic Committee.', 'Kiongozi mkuu wa TTF na mwakilishi katika Shirikisho la Dunia na Kamati ya Olimpiki Tanzania.'],
      ['off_2', '[TTF Vice President name]', 'Vice President', 'Makamu wa Rais', 'executive_committee', null, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', 2, 'Overseeing sports development, regional coordination, and institutional partnerships.', 'Anasimamia maendeleo ya michezo, uratibu wa mikoa na ushirikiano wa kitaasisi.'],
      ['off_3', '[TTF Secretary General name]', 'Secretary General', 'Katibu Mkuu', 'executive_committee', null, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', 3, 'Chief Executive of federation administration, correspondence, and compliance.', 'Mtendaji mkuu wa utawala wa shirikisho, mawasiliano na utekelezaji wa sera.'],
      ['off_4', '[TTF Treasurer name]', 'Honorary Treasurer', 'Mweka Hazina wa Heshima', 'executive_committee', null, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop', 4, 'Managing financial governance, audits, sponsorships, and annual budget reports.', 'Anasimamia utawala wa fedha, ukaguzi wa mahesabu, ufadhili na ripoti za bajeti.'],
      ['off_5', '[TTF Technical Director name]', 'Technical Director', 'Mkurugenzi wa Kiufundi', 'commission', 'Technical Commission', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop', 5, 'Responsible for national team selections, grading standards, and tournament rules.', 'Anawajibika kwa uteuzi wa timu ya taifa, viwango vya upimaji na sheria za mashindano.'],
      ['off_6', '[Referee Committee Chair name]', 'Chairperson, Referee Board', 'Mwenyekiti wa Bodi ya Waamuzi', 'commission', 'Referee Commission', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop', 6, 'Leading education, licensing, and national assignment of Kyorugi and Poomsae referees.', 'Anaongoza mafunzo, utoaji leseni na upangaji wa waamuzi wa Kyorugi na Poomsae.'],
      ['off_7', '[Athletes Commission Chair name]', 'Chairperson, Athletes Commission', 'Mwenyekiti wa Tume ya Wachezaji', 'commission', 'Athletes Commission', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', 7, 'Representing athlete rights, safeguarding, welfare, and representation in board meetings.', 'Anawakilisha haki za wachezaji, ustawi, ulinzi na uwakilishi kwenye vikao vya bodi.'],
      ['off_8', '[Women in Taekwondo Lead name]', 'Head of Women in Taekwondo Commission', 'Mkuu wa Tume ya Wanawake katika Taekwondo', 'commission', 'Women in Taekwondo Commission', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop', 8, 'Driving female participation, coach mentorship, and safety initiatives nationwide.', 'Anasimamia ushiriki wa wanawake, ushauri kwa makocha wa kike na usalama kote nchini.'],
    ];

    for (const item of officialsData) {
      insertOfficial.run(...item);
    }

    // 7. Athletes & Rankings
    const insertAthlete = db.prepare(`
      INSERT OR REPLACE INTO athletes (
        id, slug, full_name, gender, category, weight_class, discipline, belt_dan,
        club_name, region, national_rank, ranking_points, titles_en, titles_sw,
        bio_en, bio_sw, photo_url, is_national_team
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const athletesData = [
      ['ath_1', 'juma-mussa-kilimo', 'Juma Mussa Kilimo', 'Male', 'Senior', '-58kg', 'Kyorugi', '2nd Dan Black Belt', 'Kilimanjaro Taekwondo Club', 'Kilimanjaro', 1, 140.0, '2025 National Gold Medalist (-58kg)', 'Bingwa wa Taifa wa Dhahabu 2025 (-58kg)', 'Tanzanian national squad flyweight competitor representing the country in East Africa championships.', 'Mchezaji wa timu ya taifa kitengo cha flyweight anayewakilisha nchi katika mashindano ya Afrika Mashariki.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_2', 'amina-salum-bakari', 'Amina Salum Bakari', 'Female', 'Senior', '-49kg', 'Kyorugi', '2nd Dan Black Belt', 'Dar Stars Martial Arts', 'Dar es Salaam', 1, 155.0, '2025 National Champion, 2024 East African Silver', 'Bingwa wa Taifa 2025, Medali ya Fedha Afrika Mashariki 2024', 'Leading female competitor with extensive international tournament experience.', 'Mchezaji kiongozi wa kike mwenye uzoefu mkubwa wa mashindano ya kimataifa.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_3', 'baraka-joseph-mwita', 'Baraka Joseph Mwita', 'Male', 'Senior', '-68kg', 'Kyorugi', '3rd Dan Black Belt', 'Arusha Warriors Dojang', 'Arusha', 1, 160.0, '2-Time National Featherweight Champion', 'Bingwa wa Taifa Mara 2 Kitengo cha Featherweight', 'Dynamic kicker and seasoned team captain on the international circuit.', 'Mchezaji mwenye upigaji wa mateke ya kisasa na nahodha wa timu ya taifa.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_4', 'neema-daudi-massawe', 'Neema Daudi Massawe', 'Female', 'Senior', '-57kg', 'Kyorugi', '1st Dan Black Belt', 'Mwanza Tigers Taekwondo', 'Mwanza', 1, 130.0, '2025 National Gold Medalist (-57kg)', 'Mshindi wa Dhahabu Taifa 2025 (-57kg)', 'Talented featherweight specialist with notable agility and defensive counter-attacks.', 'Mtaalamu wa featherweight mwenye wepesi mkubwa na mashambulizi ya kushtukiza.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_5', 'hassan-ali-khalfan', 'Hassan Ali Khalfan', 'Male', 'Senior', '-80kg', 'Kyorugi', '2nd Dan Black Belt', 'Zanzibar Heroes Dojang', 'Zanzibar Urban/West', 1, 120.0, '2025 National Welterweight Champion', 'Bingwa wa Taifa wa Welterweight 2025', 'Zanzibar regional champion and prominent competitor in national team trials.', 'Bingwa wa kanda ya Zanzibar na mshindani mahiri katika majaribio ya timu ya taifa.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_6', 'grace-peter-nyamhanga', 'Grace Peter Nyamhanga', 'Female', 'Senior', 'Individual Poomsae', 'Poomsae', '3rd Dan Black Belt', 'Dodoma Eagles Martial Arts', 'Dodoma', 1, 145.0, 'National Poomsae Gold Medalist (Senior 1)', 'Mshindi wa Dhahabu Poomsae Taifa (Senior 1)', 'National champion in recognized poomsae with technical precision and power execution.', 'Bingwa wa taifa katika mifumo ya poomsae mwenye usahihi mkubwa wa kiufundi.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop', 1],
      ['ath_7', 'kelvin-godfrey-tenga', 'Kelvin Godfrey Tenga', 'Male', 'Senior', 'K44 -70kg', 'Para', '1st Dan Black Belt', 'Temeke Para Sports Club', 'Dar es Salaam', 1, 110.0, 'Tanzania Para Taekwondo Pioneer', 'Kinara wa Para Taekwondo Tanzania', 'Inspiring athlete competing in World Taekwondo K44 classification.', 'Mchezaji wa mfano anayeshindana katika kundi la K44 la World Taekwondo.', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop', 1],
    ];

    for (const item of athletesData) {
      insertAthlete.run(...item);
    }

    // 8. Rankings Table
    const insertRanking = db.prepare(`
      INSERT OR REPLACE INTO rankings (id, athlete_id, category, gender, weight_class, rank, points, year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const rankingsData = [
      ['rnk_1', 'ath_1', 'Senior', 'Male', '-58kg', 1, 140.0, 2026],
      ['rnk_2', 'ath_2', 'Senior', 'Female', '-49kg', 1, 155.0, 2026],
      ['rnk_3', 'ath_3', 'Senior', 'Male', '-68kg', 1, 160.0, 2026],
      ['rnk_4', 'ath_4', 'Senior', 'Female', '-57kg', 1, 130.0, 2026],
      ['rnk_5', 'ath_5', 'Senior', 'Male', '-80kg', 1, 120.0, 2026],
      ['rnk_6', 'ath_6', 'Senior', 'Female', 'Poomsae', 1, 145.0, 2026],
      ['rnk_7', 'ath_7', 'Senior', 'Male', 'Para K44', 1, 110.0, 2026],
    ];

    for (const item of rankingsData) {
      insertRanking.run(...item);
    }

    // 9. Clubs
    const insertClub = db.prepare(`
      INSERT OR REPLACE INTO clubs (
        id, slug, name, region, district, head_instructor, phone, email,
        address, training_days_en, training_days_sw, training_times, map_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const clubsData = [
      [
        'club_1',
        'dar-stars-martial-arts',
        'Dar Stars Martial Arts Club',
        'Dar es Salaam',
        'Ilala',
        '[Master Instructor name, 4th Dan]',
        '[+255 7XX XXX XXX]',
        'darstars@ttf.or.tz',
        'Shabaan Robert Street, Posta, Dar es Salaam',
        'Monday, Wednesday, Friday',
        'Jumatatu, Jumatano, Ijumaa',
        '17:00 – 19:30',
        'https://maps.google.com/?q=Dar+es+Salaam',
        'active',
      ],
      [
        'club_2',
        'arusha-warriors-dojang',
        'Arusha Warriors Taekwondo Club',
        'Arusha',
        'Arusha City',
        '[Coach Instructor name, 3rd Dan]',
        '[+255 7XX XXX XXX]',
        'arushawarriors@ttf.or.tz',
        'Near Clock Tower, Arusha',
        'Tuesday, Thursday, Saturday',
        'Jumanne, Alhamisi, Jumamosi',
        '16:30 – 18:30',
        'https://maps.google.com/?q=Arusha',
        'active',
      ],
      [
        'club_3',
        'kilimanjaro-taekwondo-academy',
        'Kilimanjaro Taekwondo Academy',
        'Kilimanjaro',
        'Moshi Municipal',
        '[Moshi Instructor name, 3rd Dan]',
        '[+255 7XX XXX XXX]',
        'moshi@ttf.or.tz',
        'Mawenzi Road, Moshi',
        'Monday, Wednesday, Saturday',
        'Jumatatu, Jumatano, Jumamosi',
        '08:00 – 10:30 (Sat), 17:00 – 19:00',
        'https://maps.google.com/?q=Moshi',
        'active',
      ],
      [
        'club_4',
        'mwanza-tigers-dojang',
        'Mwanza Tigers Taekwondo Club',
        'Mwanza',
        'Nyamagana',
        '[Mwanza Master name, 4th Dan]',
        '[+255 7XX XXX XXX]',
        'mwanza@ttf.or.tz',
        'Posta Area, Nyamagana, Mwanza',
        'Monday to Friday',
        'Jumatatu hadi Ijumaa',
        '17:00 – 19:00',
        'https://maps.google.com/?q=Mwanza',
        'active',
      ],
      [
        'club_5',
        'zanzibar-heroes-martial-arts',
        'Zanzibar Heroes Taekwondo Academy',
        'Zanzibar Urban/West',
        'Mjini',
        '[Zanzibar Master name, 3rd Dan]',
        '[+255 7XX XXX XXX]',
        'zanzibar@ttf.or.tz',
        'Amani Stadium Compound, Zanzibar',
        'Monday, Wednesday, Friday, Sunday',
        'Jumatatu, Jumatano, Ijumaa, Jumapili',
        '16:00 – 18:30',
        'https://maps.google.com/?q=Zanzibar',
        'active',
      ],
      [
        'club_6',
        'dodoma-eagles-taekwondo',
        'Dodoma Eagles Taekwondo Club',
        'Dodoma',
        'Dodoma Urban',
        '[Dodoma Coach name, 2nd Dan]',
        '[+255 7XX XXX XXX]',
        'dodoma@ttf.or.tz',
        'Jamhuri Stadium, Dodoma',
        'Tuesday, Thursday, Saturday',
        'Jumanne, Alhamisi, Jumamosi',
        '16:30 – 18:30',
        'https://maps.google.com/?q=Dodoma',
        'active',
      ],
    ];

    for (const item of clubsData) {
      insertClub.run(...item);
    }

    // 10. Documents
    const insertDocument = db.prepare(`
      INSERT OR REPLACE INTO documents (id, title_en, title_sw, category, year, file_url, file_size, download_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const docsData = [
      ['doc_1', 'TTF Constitution & General Statutes (Official)', 'Katiba ya TTF na Sheria Ndogo (Rasmi)', 'Statutes', 2024, '/uploads/documents/ttf-constitution-statutes.pdf', '2.4 MB', 142],
      ['doc_2', 'World Taekwondo Competition Rules & Interpretation (2026 Edition)', 'Sheria za Mashindano za World Taekwondo (Toleo la 2026)', 'Competition Rules', 2026, '/uploads/documents/wt-competition-rules-2026.pdf', '3.1 MB', 320],
      ['doc_3', 'TTF Clean Sport Anti-Doping Regulations & Whistleblower Charter', 'Kanuni za Michezo Safi za TTF na Hati ya Utoaji Taarifa za Siri', 'Policies', 2025, '/uploads/documents/ttf-anti-doping-policy.pdf', '1.8 MB', 98],
      ['doc_4', 'National Dan / Kup Grading Syllabus & Promotion Requirements', 'Mtaala wa Upimaji wa Mikanda ya Dan/Kup na Vigezo vya Kupanda', 'Refereeing', 2025, '/uploads/documents/ttf-grading-syllabus.pdf', '1.5 MB', 215],
      ['doc_5', 'TTF Club Affiliation & Annual Renewal Form', 'Fomu ya Usajili wa Klabu na Upyaji wa Mwaka', 'Forms', 2026, '/uploads/documents/ttf-club-affiliation-form.pdf', '480 KB', 180],
      ['doc_6', 'TTF Annual Report & Audited Financial Statements (2024-2025)', 'Ripoti ya Mwaka ya TTF na Hesabu Zilizokaguliwa (2024-2025)', 'Reports', 2025, '/uploads/documents/ttf-annual-report-2025.pdf', '4.2 MB', 76],
      ['doc_7', 'Official Circular No. 04/2026: Mandatory Athlete Digital Registration', 'Waraka Rasmi Na. 04/2026: Usajili wa Lazima wa Kidijitali wa Wachezaji', 'Circulars and Notices', 2026, '/uploads/documents/ttf-circular-04-2026.pdf', '620 KB', 430],
    ];

    for (const item of docsData) {
      insertDocument.run(...item);
    }

    // 11. Results
    const insertResult = db.prepare(`
      INSERT OR REPLACE INTO results (
        id, event_id, year, category, division, weight_class, gender,
        gold_athlete, silver_athlete, bronze_athlete_1, bronze_athlete_2, notes_en, notes_sw, document_pdf_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const resultsData = [
      ['res_1', 'event_1', 2025, 'Kyorugi', 'Senior', '-58kg', 'Male', 'Juma Mussa Kilimo (Kilimanjaro)', 'Hamisi Athumani (Dar es Salaam)', 'Kelvin John (Arusha)', 'Rashid Seif (Zanzibar)', 'Exciting final decided in the 3rd round with 12-10 scoreline.', 'Fainali ya kusisimua iliyoamuliwa raundi ya 3 kwa alama 12-10.', '/uploads/documents/national-results-2025.pdf'],
      ['res_2', 'event_1', 2025, 'Kyorugi', 'Senior', '-49kg', 'Female', 'Amina Salum Bakari (Dar es Salaam)', 'Zainab Kassim (Arusha)', 'Hawa Mohamed (Tanga)', 'Flora Lucas (Mwanza)', 'Clean victory via superior point gap in round 2.', 'Ushindi wa wazi kupitia tofauti ya pointi katika raundi ya 2.', '/uploads/documents/national-results-2025.pdf'],
      ['res_3', 'event_1', 2025, 'Kyorugi', 'Senior', '-68kg', 'Male', 'Baraka Joseph Mwita (Arusha)', 'Emmanuel Peter (Dar es Salaam)', 'David Mwenda (Dodoma)', 'Samwel Kiwanga (Mbeya)', 'Gold medal decided by golden point in extra time.', 'Medali ya dhahabu iliamuliwa kwa pointi ya dhahabu muda wa nyongeza.', '/uploads/documents/national-results-2025.pdf'],
      ['res_4', 'event_1', 2025, 'Poomsae', 'Senior 1', 'Individual Recognized', 'Female', 'Grace Peter Nyamhanga (Dodoma)', 'Sarah Joseph (Dar es Salaam)', 'Rehema Ali (Kilimanjaro)', 'Beatrice Mkude (Morogoro)', 'Highest technical accuracy score (7.84).', 'Alama za juu zaidi za usahihi wa kiufundi (7.84).', '/uploads/documents/national-results-2025.pdf'],
    ];

    for (const item of resultsData) {
      insertResult.run(...item);
    }

    // 12. Records / Champions list
    const insertRecord = db.prepare(`
      INSERT OR REPLACE INTO records (id, year, division, weight_class, gender, champion_name, club_name, region)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const recordsData = [
      ['rec_1', 2025, 'Senior Kyorugi', '-58kg', 'Male', 'Juma Mussa Kilimo', 'Kilimanjaro Taekwondo Club', 'Kilimanjaro'],
      ['rec_2', 2025, 'Senior Kyorugi', '-68kg', 'Male', 'Baraka Joseph Mwita', 'Arusha Warriors Dojang', 'Arusha'],
      ['rec_3', 2025, 'Senior Kyorugi', '-80kg', 'Male', 'Hassan Ali Khalfan', 'Zanzibar Heroes Dojang', 'Zanzibar'],
      ['rec_4', 2025, 'Senior Kyorugi', '-49kg', 'Female', 'Amina Salum Bakari', 'Dar Stars Martial Arts', 'Dar es Salaam'],
      ['rec_5', 2025, 'Senior Kyorugi', '-57kg', 'Female', 'Neema Daudi Massawe', 'Mwanza Tigers Taekwondo', 'Mwanza'],
      ['rec_6', 2024, 'Senior Kyorugi', '-58kg', 'Male', 'Juma Mussa Kilimo', 'Kilimanjaro Taekwondo Club', 'Kilimanjaro'],
      ['rec_7', 2024, 'Senior Kyorugi', '-68kg', 'Male', 'Baraka Joseph Mwita', 'Arusha Warriors Dojang', 'Arusha'],
      ['rec_8', 2024, 'Senior Kyorugi', '-49kg', 'Female', 'Amina Salum Bakari', 'Dar Stars Martial Arts', 'Dar es Salaam'],
    ];

    for (const item of recordsData) {
      insertRecord.run(...item);
    }

    // 13. Certificates (for public verification)
    const insertCert = db.prepare(`
      INSERT OR REPLACE INTO certificates (id, cert_number, holder_name, cert_type, grade_level, issue_date, instructor_name, verification_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const certData = [
      ['cert_1', 'TTF-DAN-2024-001', 'Baraka Joseph Mwita', 'dan', '3rd Dan Black Belt', '2024-03-15', '[TTF Grandmaster Examiner]', 'valid'],
      ['cert_2', 'TTF-DAN-2024-042', 'Amina Salum Bakari', 'dan', '2nd Dan Black Belt', '2024-06-20', '[TTF Grandmaster Examiner]', 'valid'],
      ['cert_3', 'TTF-DAN-2025-018', 'Juma Mussa Kilimo', 'dan', '2nd Dan Black Belt', '2025-02-10', '[TTF Grandmaster Examiner]', 'valid'],
      ['cert_4', 'TTF-COACH-2025-007', '[Master Instructor name]', 'coach', 'National Level 2 Coach', '2025-05-18', '[TTF Technical Director]', 'valid'],
      ['cert_5', 'TTF-REF-2025-012', '[Referee Member name]', 'referee', 'National Class 1 Referee', '2025-08-22', '[TTF Referee Chair]', 'valid'],
    ];

    for (const item of certData) {
      insertCert.run(...item);
    }

    // 14. Demo Memberships (with QR codes & status)
    const insertMember = db.prepare(`
      INSERT OR REPLACE INTO memberships (
        id, type, full_name, email, phone, gender, date_of_birth, national_id,
        region, club_name, belt_dan, kukkiwon_number, photo_url, status, payment_status,
        notes, qr_code_data, approved_at, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const membersData = [
      [
        'TTF-2026-ATH-0012',
        'athlete',
        'Juma Mussa Kilimo',
        'juma.kilimo@example.com',
        '+255 712 345 678',
        'Male',
        '2000-05-14',
        '20000514-XXXXX-00001',
        'Kilimanjaro',
        'Kilimanjaro Taekwondo Club',
        '2nd Dan Black Belt',
        '05XXXXXX',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
        'approved',
        'verified',
        'National team competitor - verified via regional association',
        'https://ttf.or.tz/verify/TTF-2026-ATH-0012',
        '2026-01-15',
        '2026-12-31',
      ],
      [
        'TTF-2026-ATH-0015',
        'athlete',
        'Amina Salum Bakari',
        'amina.bakari@example.com',
        '+255 784 567 890',
        'Female',
        '2002-09-21',
        '20020921-XXXXX-00002',
        'Dar es Salaam',
        'Dar Stars Martial Arts',
        '2nd Dan Black Belt',
        '05XXXXXX',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        'approved',
        'verified',
        'Senior female national medalist',
        'https://ttf.or.tz/verify/TTF-2026-ATH-0015',
        '2026-01-20',
        '2026-12-31',
      ],
      [
        'TTF-2026-COA-0004',
        'coach',
        '[Sample Coach Name]',
        'coach.sample@example.com',
        '+255 754 112 233',
        'Male',
        '1985-04-10',
        '19850410-XXXXX-00003',
        'Arusha',
        'Arusha Warriors Dojang',
        '4th Dan Black Belt',
        '05XXXXXX',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        'approved',
        'verified',
        'Certified National Level 2 Coach',
        'https://ttf.or.tz/verify/TTF-2026-COA-0004',
        '2026-01-10',
        '2026-12-31',
      ],
      [
        'TTF-2026-REF-0008',
        'referee',
        '[Sample Referee Name]',
        'referee.sample@example.com',
        '+255 768 998 877',
        'Female',
        '1990-11-03',
        '19901103-XXXXX-00004',
        'Dodoma',
        'Dodoma Eagles Martial Arts',
        '3rd Dan Black Belt',
        '05XXXXXX',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        'approved',
        'verified',
        'National Class 1 Referee',
        'https://ttf.or.tz/verify/TTF-2026-REF-0008',
        '2026-02-01',
        '2026-12-31',
      ],
      [
        'TTF-2026-ATH-0030',
        'athlete',
        '[Pending Applicant Name]',
        'applicant@example.com',
        '+255 655 443 322',
        'Male',
        '2005-08-12',
        '20050812-XXXXX-00005',
        'Mwanza',
        'Mwanza Tigers Taekwondo',
        '1st Kup Red Belt',
        null,
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
        'pending',
        'unpaid',
        'Submitted online registration, awaiting payment review',
        'https://ttf.or.tz/verify/TTF-2026-ATH-0030',
        null,
        null,
      ],
    ];

    for (const item of membersData) {
      insertMember.run(...item);
    }

    // 15. Partners & Sponsors
    const insertPartner = db.prepare(`
      INSERT OR REPLACE INTO partners (id, name, tier, logo_url, website_url, display_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const partnersData = [
      ['part_1', 'National Sports Council of Tanzania (BMT)', 'national', null, 'https://www.bmt.go.tz', 1],
      ['part_2', 'Tanzania Olympic Committee (TOC)', 'national', null, 'https://olympic.org', 2],
      ['part_3', 'World Taekwondo (WT)', 'headline', null, 'http://www.worldtaekwondo.org', 3],
      ['part_4', 'African Taekwondo Union (AFTU)', 'headline', null, 'https://aftu.org', 4],
      ['part_5', 'Ministry of Culture, Arts and Sports', 'national', null, 'https://www.michezo.go.tz', 5],
      ['part_6', 'Kukkiwon (World Taekwondo Headquarters)', 'headline', null, 'http://www.kukkiwon.or.kr', 6],
    ];

    for (const item of partnersData) {
      insertPartner.run(...item);
    }

    // 16. Gallery
    const insertGallery = db.prepare(`
      INSERT OR REPLACE INTO gallery (id, title_en, title_sw, album_name, media_type, media_url, thumbnail_url, event_date, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const galleryData = [
      ['gal_1', 'National Championships 2025 - Senior Sparring Final', 'Fainali ya Mapigano ya Wakubwa - Mashindano ya Taifa 2025', 'National Championship 2025', 'photo', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop', '2025-11-20', 1],
      ['gal_2', 'Youth Talent Development Camp in Arusha', 'Kambi ya Kuendeleza Vipaji vya Vijana Jijini Arusha', 'Development Tours', 'photo', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop', '2025-10-15', 1],
      ['gal_3', 'Poomsae Technical Excellence Demonstration', 'Onyesho la Umahiri wa Kiufundi wa Poomsae', 'Technical Seminars', 'photo', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop', '2025-08-10', 1],
      ['gal_4', 'TTF Referee Certification Workshop', 'Warsha ya Kutoa Vyeti kwa Waamuzi wa TTF', 'Referee Education', 'photo', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', '2025-09-05', 0],
      ['gal_5', 'Tanzania National Team Highlights', 'Vivutio vya Timu ya Taifa ya Tanzania', 'National Squad', 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop', '2025-12-01', 1],
    ];

    for (const item of galleryData) {
      insertGallery.run(...item);
    }

    // 17. Sample Contact Messages & Confidential Integrity Report
    const insertContact = db.prepare(`
      INSERT OR REPLACE INTO contacts (id, name, email, phone, subject, message, department, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertContact.run(
      'msg_1',
      '[John Mushi - Inquiry]',
      'john.mushi@example.com',
      '+255 713 000 111',
      'Affiliation inquiry for new Moshi club',
      'Greetings TTF Secretariat, we have established a youth martial arts center in Moshi and would like guidance on completing the official club affiliation process.',
      'General',
      'new'
    );

    const insertReport = db.prepare(`
      INSERT OR REPLACE INTO integrity_reports (
        id, reference_number, category, description, incident_date,
        incident_location, parties_involved, evidence_files, reporter_name,
        reporter_contact, is_anonymous, status, admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertReport.run(
      'rep_1',
      'REP-2026-0001',
      'fair_sport',
      'Report regarding suspected improper officiating communication prior to regional bouts.',
      '2026-09-12',
      'Regional Sports Hall',
      '[Names recorded for integrity officer review]',
      null,
      '[Confidential Reporter]',
      '[confidential@reporter.org]',
      1,
      'under_review',
      'Assigned to Ethics Committee for preliminary verification.'
    );

    console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
    console.log('Created accounts:');
    console.log(' - Super Admin: admin / Admin@TTF2026!');
    console.log(' - Registrar:   registrar / Registrar@TTF2026!');
    console.log(' - Editor:      editor / Editor@TTF2026!');
    console.log(' - Technical:   technical / Technical@TTF2026!');
}

seedData().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
