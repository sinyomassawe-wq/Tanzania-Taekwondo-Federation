import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';

export default function SitemapPage() {
  const sections = [
    {
      title: 'About TTF',
      links: [
        { label: 'Who We Are', href: '/about#who-we-are' },
        { label: 'Executive Committee', href: '/about#executive-committee' },
        { label: 'Commissions', href: '/about#commissions' },
        { label: 'Institutional Affiliations', href: '/about#affiliations' },
        { label: 'Statutes & Constitution', href: '/about#statutes' },
      ],
    },
    {
      title: 'News & Press',
      links: [
        { label: 'All Federation News', href: '/news' },
        { label: 'Competitions Coverage', href: '/news?cat=Competitions' },
        { label: 'Athletes Spotlights', href: '/news?cat=Athletes' },
        { label: 'Official Circulars', href: '/notices' },
      ],
    },
    {
      title: 'Competitions & Calendar',
      links: [
        { label: 'Events Calendar', href: '/competitions/calendar' },
        { label: 'Results & Brackets', href: '/competitions/results' },
        { label: 'National Champions Archive', href: '/competitions/results#records' },
        { label: 'Host an Event / Bidding', href: '/competitions/host' },
      ],
    },
    {
      title: 'Athletes & Rankings',
      links: [
        { label: 'National Rankings', href: '/athletes' },
        { label: 'National Squad', href: '/athletes/national-team' },
        { label: 'Athlete Directory', href: '/athletes' },
      ],
    },
    {
      title: 'Membership & Verification',
      links: [
        { label: 'Membership Types & Fees', href: '/membership' },
        { label: 'Online Registration Form', href: '/membership/register' },
        { label: 'Club Affiliation Process', href: '/membership/club-affiliation' },
        { label: 'Payment Instructions', href: '/membership/fees' },
        { label: 'Verify License / QR Code', href: '/verify/check' },
      ],
    },
    {
      title: 'Clubs & Regions',
      links: [
        { label: 'National Club Directory', href: '/clubs' },
        { label: 'Register Your Club', href: '/clubs#register' },
      ],
    },
    {
      title: 'Education & Courses',
      links: [
        { label: 'Coaches Courses', href: '/education' },
        { label: 'Referee Clinics', href: '/education' },
        { label: 'Dan / Kup Grading Syllabus', href: '/education' },
        { label: 'Verify Dan Certificate', href: '/education/verify' },
      ],
    },
    {
      title: 'Integrity & Clean Sport',
      links: [
        { label: 'Clean Sport (Anti-Doping)', href: '/integrity#clean-sport' },
        { label: 'Fair Sport (Match Ethics)', href: '/integrity#fair-sport' },
        { label: 'Safe Sport (Safeguarding)', href: '/integrity#safe-sport' },
        { label: 'Confidential Whistleblower Form', href: '/integrity/report' },
      ],
    },
    {
      title: 'Development & Para',
      links: [
        { label: 'Grassroots & School Programs', href: '/development' },
        { label: 'Para Taekwondo', href: '/para' },
      ],
    },
    {
      title: 'Media & Legal',
      links: [
        { label: 'Photo & Video Gallery', href: '/media' },
        { label: 'Official Documents Library', href: '/documents' },
        { label: 'Partners & Sponsors', href: '/partners' },
        { label: 'Contact Secretariat', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
        <div>
          <h1 className="font-display font-black text-3xl text-[#0B2A4A]">
            Site Map / Ramani ya Tovuti
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Complete index of pages and resources across the official TTF portal.
          </p>
        </div>
        <FlagStripe size="sm" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-display font-bold text-sm text-[#0B2A4A] border-b border-gray-100 pb-1">
                {sec.title}
              </h3>
              <ul className="space-y-1.5 text-gray-600">
                {sec.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-brand-green hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
