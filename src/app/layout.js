import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "TEDx Lead City University | Ideas Worth Spreading",
    template: "%s | TEDx Lead City University"
  },
  description: "Join TEDx Lead City University for an inspiring event featuring innovative speakers, thought-provoking talks, and ideas worth spreading. Get your tickets now!",
  keywords: [
    "TEDx",
    "tedx",
    "TEDx 2025",
    "tedx 2025",
    "Lead City University 2025",
    "TEDx LCU",
    "ideas worth spreading",
    "innovation",
    "speakers",
    "Lead City University",
    "leadcity",
    "LCU",
    "Tech events in Ibadan",
    "the collective",
    "conference",
    "event",
    "Ibadan",
    "Nigeria",
    "technology",
    "education",
    "leadership"
  ],
  authors: [{ name: "TEDx Lead City University" }],
  creator: "TEDx Lead City University",
  publisher: "TEDx Lead City University",
  formatDetection: {
    email: false,
    address: 'International Conference Center, Lead City University, Ibadan.',
    telephone: false,
  },
  metadataBase: new URL('https://www.tedxleadcityuniversity.ng'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TEDx Lead City University | Ideas Worth Spreading",
    description: "Join TEDx Lead City University for an inspiring event featuring innovative speakers, thought-provoking talks, and ideas worth spreading. Get your tickets now!",
    url: 'https://www.tedxleadcityuniversity.ng/',
    siteName: 'TEDx Lead City University',
    images: [
      {
        url: 'https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'TEDx Lead City University Event',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}`, // Add your Google Search Console verification code

  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "TEDx Lead City University",
    "description": "Join TEDx Lead City University for an inspiring event featuring innovative speakers, thought-provoking talks, and ideas worth spreading.",
    "startDate": "2024-12-15T09:00:00+01:00", // Update with actual event date
    "endDate": "2024-12-15T17:00:00+01:00", // Update with actual event date
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Lead City University",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "International Conference Center, Lead City University",
        "addressLocality": "Ibadan",
        "addressRegion": "Oyo State",
        "addressCountry": "Nigeria"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "TEDx Lead City University",
      "url": "https://www.tedxleadcityuniversity.ng/" // Replace with your actual domain
    },
    "offers": {
      "@type": "Tickets",
      "url": "https://www.tedxleadcityuniversity.ng/tickets", // Replace with your actual domain
      "price": "0",
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01T00:00:00+01:00"
    },
    "performer": {
      "@type": "Organization",
      "name": "TEDx Lead City University Speakers"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          {children}
        </Suspense>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
