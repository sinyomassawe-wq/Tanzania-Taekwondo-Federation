import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { CheckCircle } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display font-black text-3xl text-[#0B2A4A]">
          Accessibility Statement
        </h1>
        <p className="text-xs text-gray-500">
          WCAG 2.1 Level AA Compliance Commitment • TTF
        </p>
        <FlagStripe size="sm" />

        <p>
          The Tanzania Taekwondo Federation is committed to ensuring digital accessibility for all users, including persons with visual, auditory, motor, or cognitive disabilities.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          Measures Taken
        </h2>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
            <span>High color contrast adhering to WCAG AA ratios (navy text on light backgrounds).</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
            <span>Full keyboard navigability for menus, forms, and interactive accordions.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
            <span>Descriptive alternative text (`alt`) on all images and official logos.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
            <span>Lightweight footprint optimized for fast loading on low-bandwidth mobile networks in East Africa.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
