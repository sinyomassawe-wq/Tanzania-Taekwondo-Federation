import { getDb } from '@/lib/db';
import FlagStripe from '@/components/layout/FlagStripe';
import ContactForm from './ContactForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const db = getDb();

  const getSetting = (key: string) => {
    const row = db.prepare('SELECT value_en FROM settings WHERE key = ?').get(key) as any;
    return row ? row.value_en : '';
  };

  const phone = getSetting('phone') || '[+255 22 211 XXXX - TTF Official Secretariat Phone]';
  const email = getSetting('email') || '[info@ttf.or.tz - Official TTF Email]';
  const address = getSetting('address') || '[Benjamin Mkapa National Stadium Complex, Taifa Road, Dar es Salaam, Tanzania]';
  const postal = getSetting('postal_address') || '[P.O. Box XXXXX, Dar es Salaam, United Republic of Tanzania]';
  const officeHours = getSetting('office_hours') || '[Monday – Friday: 08:30 – 16:30 EAT]';

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Get in Touch / Wasiliana Nasi
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Contact TTF Secretariat
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Reach out to our executive secretariat, technical commissions, regional coordinators, and media desk.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Info Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                Federation Headquarters
              </h3>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Physical Address:</span>
                    <span>{address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Postal Address:</span>
                    <span>{postal}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">Telephone / Office:</span>
                    <span>{phone}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">General Inquiries:</span>
                    <span>{email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">Working Hours:</span>
                    <span>{officeHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Contacts Card */}
            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                Key Department Desks
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-800 block">Technical & Selections</span>
                    <span className="text-gray-500">[technical@ttf.or.tz]</span>
                  </div>
                  <span className="font-mono text-gray-400">[+255 7XX XXX XXX]</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-800 block">Referee Board</span>
                    <span className="text-gray-500">[referees@ttf.or.tz]</span>
                  </div>
                  <span className="font-mono text-gray-400">[+255 7XX XXX XXX]</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-800 block">Registrar & Membership</span>
                    <span className="text-gray-500">[registrar@ttf.or.tz]</span>
                  </div>
                  <span className="font-mono text-gray-400">[+255 7XX XXX XXX]</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-800 block">Media & Public Relations</span>
                    <span className="text-gray-500">[media@ttf.or.tz]</span>
                  </div>
                  <span className="font-mono text-gray-400">[+255 7XX XXX XXX]</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#0B2A4A] text-white p-6 rounded-3xl shadow-sm space-y-3">
              <h4 className="font-display font-bold text-sm text-brand-gold">
                Connect on Social Channels
              </h4>
              <p className="text-xs text-gray-300">
                Follow live tournament match streams, photo galleries, and national squad announcements.
              </p>
              <div className="flex space-x-3 pt-1">
                <a
                  href="https://facebook.com/tanzaniataekwondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#143B63] flex items-center justify-center hover:bg-brand-green transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/tztaekwondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#143B63] flex items-center justify-center hover:bg-brand-blue transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/tanzaniataekwondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#143B63] flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@tanzaniataekwondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#143B63] flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
