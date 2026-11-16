# Tanzania Taekwondo Federation (TTF) — Official Website

> **The National Governing Body of Taekwondo in Tanzania**  
> Affiliated with World Taekwondo (WT), African Taekwondo Union (AFTU), Tanzania Olympic Committee (TOC), and the National Sports Council (Baraza la Michezo la Taifa - BMT).

---

## 1. Overview & Vision

The Official Website of the **Tanzania Taekwondo Federation (TTF)** is designed to international federation standards modeled directly on the structural excellence and professionalism of **World Taekwondo** (`worldtaekwondo.org`).

The platform provides a modern, high-performance, mobile-first digital hub for:
- Publishing official federation news, tournament announcements, and circulars in **English and Swahili**.
- Managing national tournament calendars, event outlines, schedules, and medal standings.
- Maintaining the official **National Taekwondo Rankings** across Senior, Junior, Cadet, Poomsae, and Para Taekwondo divisions.
- Administering digital **athlete licenses**, club affiliations, and printable **membership cards with cryptographic QR verification**.
- Providing public lookup for **Kup/Dan grading certificates**.
- Upholding **Clean Sport, Fair Sport, and Safe Sport** through a confidential, anonymous whistleblower reporting system.
- Equipping TTF administrators with an intuitive, role-based **Admin Portal** (`/admin`) for full content management, CSV import/export, and one-click database backups.

---

## 2. Strict Compliance Guarantees

1. **Zero AI Features**: In strict accordance with the federation mandate, this platform contains **NO AI chatbots, NO AI search widgets, NO AI content generation, and NO third-party AI API calls**. Every feature is powered by deterministic, standard web code.
2. **Zero Fabricated Facts**: Unprovided real-world data (such as specific board member names, phone numbers, bank account numbers) are formatted as standardized, clearly visible placeholders (e.g. `[TTF President name]`, `[+255 22 211 XXXX]`). All placeholders are directly editable through the Admin Portal (`/admin/settings`, `/admin/officials`).
3. **Bilingual (English & Swahili)**: Full native dual-language architecture. The header includes an instant language toggle (`EN` / `SW`). Interface elements are translated via `src/lib/translations.ts`, while database models store dual `_en` and `_sw` fields.
4. **Authentic Brand Standards**: Uses the authentic, unmodified TTF circular crest (`/assets/images/ttf-logo.png`). The logo is always presented un-stretched, un-cropped, on clean light backgrounds or inside a crisp white badge on dark sections, paired with the national colors: Primary Green (`#1EB53A`), Deep Blue (`#00A3DD`), Navy (`#0B2A4A`), and Gold/Yellow (`#FCD116`).
5. **One-Command Demo Data Wipe**: All demo seed records can be permanently removed with `npm run seed:wipe`.

---

## 3. Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18, App Router) with Server Components and Client Components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with responsive typography, custom TTF color palette, and national diagonal stripe motifs.
- **Database**: Native zero-dependency SQLite powered by Node.js native `node:sqlite` (`DatabaseSync`) in WAL mode. No native C++ node-gyp compilation required.
- **Authentication**: Role-based access control (RBAC), salted password hashing with `bcryptjs`, signed HTTP-only JWT sessions, login rate-limiting, and immutable security audit logs.
- **Icons**: [Lucide React](https://lucide.dev/).
- **Verification & QR**: High-resolution QR code generation via `qrcode` pointing directly to public licensure verification URLs (`/verify/[id]`).
- **Email Dispatch**: Native SMTP emailer with fallback to database logging when SMTP credentials are not configured.

---

## 4. Key Modules & Site Architecture

### Public Federation Portal
- **Homepage (`/`)**: Hero banner slider, quick links, latest news grid, upcoming events strip, medal highlights, national rankings preview, dojang club finder, partner logos, and newsletter opt-in.
- **About TTF (`/about`)**: History, mission, vision, core values, Executive Committee roster, technical commissions, national sports affiliations, and constitution downloads.
- **News Center (`/news`, `/news/[slug]`)**: Categorized news (Competitions, Integrity, Referees, Para Taekwondo), search, pagination, and social sharing.
- **Competitions (`/competitions`, `/competitions/calendar`, `/competitions/results`, `/competitions/host`)**: Interactive event calendar, downloadable invitations, category weight charts, podium results, historical champions archive, and bidding guidelines.
- **Athletes & Rankings (`/athletes`, `/athletes/[id]`, `/athletes/national-team`)**: Filterable national rankings, detailed athlete profiles, national squad showcase, and Athletes' Commission.
- **Membership & Licensing (`/membership`, `/membership/register`, `/membership/fees`, `/membership/club-affiliation`)**: Digital applications for Athletes, Coaches, Referees, and Clubs with ID/photo/certificate uploads and fee payment instructions.
- **Public Credential Verification (`/verify/[id]`, `/verify/check`)**: Public QR scanning endpoint displaying member credentials, active licensure status, and printable official license cards.
- **Clubs Directory (`/clubs`)**: Searchable directory covering all 31 regions of Tanzania and Zanzibar with interactive filters and dojang registration forms.
- **Education & Grading (`/education`, `/education/verify`)**: Referee/coach courses, official Dan grading syllabus, and Dan certificate authenticity verification.
- **Integrity & Safe Sport (`/integrity`, `/integrity/report`)**: Clean Sport anti-doping policies, competition manipulation prevention, safeguarding rules, and confidential anonymous whistleblower reporting.
- **Development & Para (`/development`, `/para`)**: Grassroots school initiatives, Women in Taekwondo, and World Para Taekwondo (K44) programs.
- **Document Library (`/documents`, `/notices`)**: Downloadable PDFs for statutes, rules, annual reports, and official notices board.
- **Media Gallery (`/media`)**: Action photo albums, lightbox viewer, video gallery, and official TTF brand logo pack.
- **Partners (`/partners`)**: Institutional partners, sponsorship tiers, and partnership inquiry form.
- **Contact (`/contact`)**: Headquarters contact information, department inquiries, and honeypot spam protection.

### Secure Admin Management Portal (`/admin`)
- **Dashboard (`/admin`)**: Key metrics, pending membership applications counter, recent circulars, and live audit feed.
- **Memberships (`/admin/memberships`)**: Review, approve, reject applications, toggle payment status, and export approved rosters to CSV.
- **News Articles (`/admin/news`)**: Full bilingual rich editing, publishing status, and featured article controls.
- **Competitions Calendar (`/admin/events`)**: Create and update national tournaments, venues, and registration deadlines.
- **Results & Records (`/admin/results`)**: Record podium medalists and historical national champions.
- **Rankings & CSV (`/admin/rankings`)**: Manage national points table with one-click CSV batch import and export.
- **Athletes Directory (`/admin/athletes`)**: Manage competitor profiles, Dan grades, and national team squad flags.
- **Clubs Directory (`/admin/clubs`)**: Register and approve affiliated regional dojangs and dojos.
- **Executive & Officials (`/admin/officials`)**: Manage Executive Board, commission chairs, and photos.
- **Document Library (`/admin/documents`)**: Upload official PDF circulars and statutes.
- **Gallery Management (`/admin/gallery`)**: Organize tournament photo albums and video embeds.
- **Hero Slider (`/admin/slides`)**: Control homepage banners, headlines, and call-to-action buttons.
- **Inbox & Whistleblower (`/admin/inbox`)**: Access general inquiries and confidential whistleblower reports.
- **Subscribers (`/admin/subscribers`)**: Newsletter subscriber database and bulk announcement broadcaster.
- **Site Settings (`/admin/settings`)**: Direct editing of headquarters phones, emails, stadium address, bank account numbers, Lipa Namba, and social links.
- **Audit Logs (`/admin/audit-logs`)**: Immutable security trail of all administrator actions.
- **Database Backup (`/admin/backup`)**: Direct one-click download of the active SQLite database file.

---

## 5. Getting Started & Installation

### Prerequisites
- Node.js version **18.17+** or **20+** (Recommended: **Node.js 24+** which includes native `node:sqlite`).
- npm (Node Package Manager).

### 1. Clone or Open Project
```bash
cd "C:\Users\OK\.gemini\antigravity\scratch\ttf-website"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key settings in `.env`:
```ini
NODE_ENV=development
PORT=3000
DATABASE_PATH=./data/ttf.db
JWT_SECRET=ttf-federation-secret-key-change-in-production-2026
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Optional SMTP configuration for automated email dispatches:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=Tanzania Taekwondo Federation <noreply@ttf.or.tz>
```

### 4. Seed the Database
Populate the database with initial settings, admin accounts, and demo data:
```bash
npm run seed
```

### 5. Run the Automated Test Suite
Verify that all 38 system tests (assets, schemas, bcrypt hashing, JWT auth, QR codes, honeypot protection) pass:
```bash
npm test
```

### 6. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 6. Default Admin Login Credentials

Access the secure admin portal at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

| Role | Username | Password | Key Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `Admin@TTF2026!` | Full system control, audit logs, database backups, settings |
| **Registrar** | `registrar` | `Registrar@TTF2026!` | Member approvals, license issuance, club registrations |
| **Communications Editor** | `editor` | `Editor@TTF2026!` | News articles, press releases, photo/video gallery |
| **Technical Officer** | `technical` | `Technical@TTF2026!` | Competitions calendar, results, national rankings CSV |

> *Tip: For production, administrators must change these default passwords upon first login.*

---

## 7. Wiping Demo Data for Live Deployment

To wipe all mock articles, demo athletes, and sample results with one command:
```bash
npm run seed:wipe
```
This leaves administrator accounts and site settings intact, providing a clean slate ready for official federation records. See [`CONTENT_CHECKLIST.md`](./CONTENT_CHECKLIST.md) for the complete list of placeholders to populate.

---

## 8. Production Deployment

### Building for Production
```bash
npm run build
npm start
```

### Deployment Targets
1. **Self-Hosted VPS (Ubuntu/Debian / Docker)**: Run behind an NGINX reverse proxy with systemd or PM2 managing the Node process. The single `data/ttf.db` file makes server backups straightforward.
2. **Containerized Deployment**: Mount `./data` and `./public/uploads` as persistent Docker volumes.

---

## 9. License & Governance

© Tanzania Taekwondo Federation (TTF). All rights reserved.  
Official website software engineered in strict alignment with national sports regulations and World Taekwondo governance principles.
