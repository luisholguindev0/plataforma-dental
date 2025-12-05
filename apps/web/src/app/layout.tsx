import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./global.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Dr. Jhoiner Marquez | Odontología Futurista",
    template: "%s | Dr. Jhoiner Marquez",
  },
  description:
    "Odontología estética digital: citas, pacientes, documentos y finanzas con un dashboard premium y seguro.",
  keywords: [
    "dentista Barranquilla",
    "odontólogo Barranquilla",
    "diseño de sonrisa",
    "estética dental",
    "rehabilitación oral",
    "carillas dentales",
    "blanqueamiento dental",
    "ortodoncia",
    "implantes dentales",
    "odontología estética",
    "consultorio dental Barranquilla",
  ],
  authors: [{ name: "Dr. Jhoiner Marquez" }],
  creator: "Dr. Jhoiner Marquez",
  publisher: "Dr. Jhoiner Marquez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Dr. Jhoiner Marquez - Odontología Estética",
    title: "Dr. Jhoiner Marquez | Odontología Estética en Barranquilla",
    description:
      "Especialista en Estética Dental, Diseño de Sonrisa y Rehabilitación Oral. Transforma tu sonrisa con nosotros.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Jhoiner Marquez - Odontología Estética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jhoiner Marquez | Odontología Estética en Barranquilla",
    description:
      "Especialista en Estética Dental, Diseño de Sonrisa y Rehabilitación Oral.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  category: "Salud",
};

export const viewport: Viewport = {
  themeColor: "#030305",
};

// JSON-LD Schema for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dr. Jhoiner Marquez - Odontología Estética",
  image: "/og-image.jpg",
  "@id": process.env.NEXT_PUBLIC_APP_URL,
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: "+573014990844",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 58 #62-61",
    addressLocality: "Barranquilla",
    addressRegion: "Atlántico",
    postalCode: "080001",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.9685,
    longitude: -74.7813,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
  ],
  priceRange: "$$",
  servesCuisine: "Dental Services",
  areaServed: {
    "@type": "City",
    name: "Barranquilla",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Dentales",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estética Dental",
          description: "Blanqueamiento, carillas y tratamientos estéticos",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño de Sonrisa",
          description: "Transformación completa de tu sonrisa",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rehabilitación Oral",
          description: "Restauración funcional y estética",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#030305" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased relative min-h-screen`}
      >
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
