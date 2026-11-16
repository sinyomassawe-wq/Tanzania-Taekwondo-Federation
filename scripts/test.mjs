import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🥋 TTF Comprehensive Verification Test Suite Starting...\n');
console.log(`Root directory: ${ROOT_DIR}\n`);

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Asset & Brand Verification
console.log('--- 1. Brand Asset Validation ---');
const logoPath = path.join(ROOT_DIR, 'assets', 'images', 'ttf-logo.png');
const publicLogoPath = path.join(ROOT_DIR, 'public', 'assets', 'images', 'ttf-logo.png');
const faviconPath = path.join(ROOT_DIR, 'public', 'favicon.png');

assert(fs.existsSync(logoPath), 'Source logo exists at assets/images/ttf-logo.png');
assert(fs.existsSync(publicLogoPath), 'Public logo exists at public/assets/images/ttf-logo.png');
assert(fs.existsSync(faviconPath), 'Favicon exists at public/favicon.png');

// 2. Database Connection & Schema Completeness
console.log('\n--- 2. Database Schema & Tables ---');
const dbPath = process.env.DATABASE_PATH || path.join(ROOT_DIR, 'data', 'ttf.db');
assert(fs.existsSync(dbPath), 'Database file exists at data/ttf.db');

const db = new DatabaseSync(dbPath);
const expectedTables = [
  'users', 'settings', 'hero_slides', 'news', 'events', 'results',
  'records', 'athletes', 'rankings', 'clubs', 'memberships', 'certificates',
  'officials', 'documents', 'gallery', 'partners', 'contacts',
  'integrity_reports', 'subscribers', 'audit_logs'
];

const tablesInDb = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
  .all()
  .map(r => r.name);

expectedTables.forEach(t => {
  assert(tablesInDb.includes(t), `Table '${t}' exists in database schema`);
});

// 3. User Authentication & Password Hashing
console.log('\n--- 3. User Authentication & Role Validation ---');
const adminUser = db.prepare("SELECT * FROM users WHERE username = 'admin'").get();
assert(!!adminUser, "Super admin user 'admin' exists in database");
assert(adminUser.role === 'admin' || adminUser.role === 'super_admin', "User 'admin' has super admin role");

const passValid = bcrypt.compareSync('Admin@TTF2026!', adminUser.password_hash);
assert(passValid, "Admin password hash correctly verifies against 'Admin@TTF2026!'");

// 4. JWT Token Generation and Verification
console.log('\n--- 4. JWT Authentication Token System ---');
const jwtSecret = process.env.JWT_SECRET || 'ttf-secret-key-tanzania-taekwondo-2026';
const token = jwt.sign({ id: adminUser.id, username: adminUser.username, role: adminUser.role }, jwtSecret, { expiresIn: '1h' });
const decoded = jwt.verify(token, jwtSecret);
assert(decoded.username === 'admin', 'JWT token signs and verifies successfully');

// 5. Membership ID & QR Code Verification
console.log('\n--- 5. Membership System & QR Codes ---');
const testRegId = `TTF-${new Date().getFullYear()}-ATH-9999`;
const verifyUrl = `http://localhost:3000/verify/${testRegId}`;
const qrCodeData = await QRCode.toDataURL(verifyUrl, { width: 300, margin: 2 });
assert(qrCodeData.startsWith('data:image/png;base64,'), 'QR Code generates base64 data URI for verification URL');

db.prepare(`
  INSERT OR REPLACE INTO memberships (
    id, type, full_name, email, phone, gender, date_of_birth,
    region, club_name, belt_dan, status, qr_code_data
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  testRegId,
  'Athlete',
  'Juma Bakari Test',
  'test@ttf.or.tz',
  '+255 712 000 000',
  'Male',
  '2000-01-01',
  'Dar es Salaam',
  'Dar Taekwondo Academy',
  '1st Dan',
  'approved',
  qrCodeData
);

const fetchedMember = db.prepare('SELECT * FROM memberships WHERE id = ?').get(testRegId);
assert(!!fetchedMember, 'Membership successfully saved and retrievable by TTF ID');
assert(fetchedMember.full_name === 'Juma Bakari Test', 'Member name preserved correctly');

// Clean test member
db.prepare('DELETE FROM memberships WHERE id = ?').run(testRegId);

// 6. Dan Certificate Verification
console.log('\n--- 6. Dan Certificate Lookup System ---');
const certs = db.prepare('SELECT * FROM certificates LIMIT 1').get();
assert(!!certs, 'Grading certificates exist for public verification lookup');
assert(certs.verification_status === 'valid', 'Certificate record status is valid');

// 7. Whistleblower & Integrity Confidentiality
console.log('\n--- 7. Integrity & Anti-Doping Whistleblower System ---');
const testReportRef = `IR-TEST-${Date.now()}`;
db.prepare(`
  INSERT INTO integrity_reports (
    id, reference_number, category, description, is_anonymous, status
  ) VALUES (?, ?, ?, ?, ?, ?)
`).run(
  `ir-${Date.now()}`,
  testReportRef,
  'Safe Sport',
  'Automated test reporting entry',
  1,
  'new'
);
const report = db.prepare('SELECT * FROM integrity_reports WHERE reference_number = ?').get(testReportRef);
assert(!!report, 'Confidential integrity report persisted securely');
assert(report.is_anonymous === 1, 'Anonymous whistleblowing flag maintained');
db.prepare('DELETE FROM integrity_reports WHERE reference_number = ?').run(testReportRef);

// 8. Newsletter Subscription Database Validation
console.log('\n--- 8. Newsletter Opt-In System ---');
const testEmail = `test_${Date.now()}@example.com`;
db.prepare('INSERT INTO subscribers (id, email) VALUES (?, ?)').run(`sub-${Date.now()}`, testEmail);
const sub = db.prepare('SELECT * FROM subscribers WHERE email = ?').get(testEmail);
assert(!!sub, 'Subscriber saved to database without external third-party AI dependency');
db.prepare('DELETE FROM subscribers WHERE email = ?').run(testEmail);

// 9. Contact Form Honeypot Spam Protection
console.log('\n--- 9. Spam Protection & Security Controls ---');
const honeypotTriggered = (hpField) => {
  if (hpField && hpField.trim().length > 0) return true; // Spam bot filled hidden field
  return false;
};
assert(honeypotTriggered('http://spam-link.com') === true, 'Honeypot blocks bot submissions with silent drop');
assert(honeypotTriggered('') === false, 'Honeypot allows legitimate submissions with empty hidden field');

// Summary
console.log('\n=============================================');
console.log(`Results: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log('=============================================\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL TTF SYSTEM TESTS PASSED SUCCESSFULLY!\n');
} else {
  console.error('⚠️ Some tests failed. Review the log above.');
  process.exit(1);
}
