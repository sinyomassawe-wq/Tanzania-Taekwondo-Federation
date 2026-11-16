import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Sparkles,
  School,
  Users,
  Award,
  Heart,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function DevelopmentPage() {
  const programs = [
    {
      title: 'School Taekwondo & Grassroots Tour',
      subtitle: 'Taekwondo Mashuleni na Ngazi ya Chini',
      icon: School,
      color: 'bg-emerald-50 text-brand-green border-emerald-100',
      desc: 'Introducing foundational martial arts education into Tanzanian primary and secondary school physical education curriculums. Fostering discipline, confidence, and anti-bullying awareness from an early age.',
      highlights: [
        'Partnership with Ministry of Education & TAMISEMI',
        'Certified instructor placement in public and private schools',
        'National Inter-Schools Taekwondo Championship',
      ],
    },
    {
      title: 'Women & Girls in Taekwondo Initiative',
      subtitle: 'Wanawake na Wasichana Katika Taekwondo',
      icon: Heart,
      color: 'bg-pink-50 text-pink-600 border-pink-100',
      desc: 'Dedicated female empowerment initiative aimed at increasing girl participation in competitive sparring, coaching leadership, and referee representation across all 31 regions.',
      highlights: [
        'Free self-defense and martial fitness clinics for young women',
        'Female coaching mentorship and international grants',
        'Annual Tanzania All-Female Taekwondo Showcase',
      ],
    },
    {
      title: 'Regional Talent Scouting & High Performance',
      subtitle: 'Kuibua Vipaji na Kambi za Mafunzo ya Juu',
      icon: Sparkles,
      color: 'bg-blue-50 text-brand-blue border-blue-100',
      desc: 'Mobile technical scouting teams visiting rural and regional clubs outside major metropolitan areas to identify exceptional young kicking talent for the National Youth Squad.',
      highlights: [
        'Regional talent detection clinics in Dodoma, Mwanza, Arusha, and Mbeya',
        'Scholarships for national training camp attendance in Dar es Salaam',
        'Youth Olympic Games long-term athlete development pathway',
      ],
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Sports Expansion / Maendeleo ya Michezo
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Development & Grassroots Programs
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Expanding Olympic Taekwondo across schools, communities, and underserved regions in the United Republic of Tanzania.
            </p>
          </div>

          <Link
            href="/para"
            className="px-5 py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors self-start md:self-center"
          >
            <span>Explore Para Taekwondo</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${prog.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{prog.subtitle}</p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {prog.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Program Highlights:
                    </span>
                    {prog.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <Link
                    href="/contact?dept=Development"
                    className="inline-block text-xs font-bold text-brand-blue hover:underline"
                  >
                    Partner or Inquire about this program →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
