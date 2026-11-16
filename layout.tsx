import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Tanzania Taekwondo Federation (TTF) | Official Governing Body',
  description:
    'Official website of the Tanzania Taekwondo Federation (TTF), the national governing body of Taekwondo in the United Republic of Tanzania. Affiliated with World Taekwondo, AFTU, TOC, and BMT.',
  keywords: [
    'Tanzania Taekwondo Federation',
    'TTF',
    'Taekwondo Tanzania',
    'World Taekwondo Tanzania',
    'Dar es Salaam Martial Arts',
    'Kyorugi',
    'Poomsae',
    'Para Taekwondo',
  ],
  authors: [{ name: 'Tanzania Taekwondo Federation' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Tanzania Taekwondo Federation (TTF)',
    description:
      'National governing body for Olympic Taekwondo in Tanzania. News, rankings, competitions, club directory, and digital membership verification.',
    url: 'https://ttf.or.tz',
    siteName: 'Tanzania Taekwondo Federation',
    images: [
      {
        url: '/assets/images/ttf-logo.png',
        width: 512,
        height: 512,
        alt: 'Tanzania Taekwondo Federation Official Crest',
      },
    ],
    locale: 'en_TZ',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#0B2A4A] antialiased selection:bg-brand-gold selection:text-[#0B2A4A]">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
