import type { Metadata } from "next";
import "./globals.css";
import { SEO_KEYWORDS_EXTENDED, FAQ_ITEMS, REAL_VROSINA_VIDEOS } from "@/data/vrosinaData";

export const metadata: Metadata = {
  metadataBase: new URL("https://vrosina2031.vercel.app"),
  title: {
    default:
      "Βροσίνα 2031 | Πρότυπο Αναγέννησης Ορεινής Κοινότητας Ηπείρου — Επενδυτικό & Αναπτυξιακό Σχέδιο 10,45 εκ. €",
    template: "%s | Βροσίνα 2031 (Vrosina 2031)",
  },
  description:
    "Ολοκληρωμένο Επιχειρησιακό & Επενδυτικό Σχέδιο Αναγέννησης της Βροσίνας Δήμου Ζίτσας Ιωαννίνων (2026–2031). Μετατροπή του πρώην Στρατοπέδου Παπακωνσταντίνου (13.695 τ.μ.) σε Αγροδιατροφικό Κέντρο, έως 80% επιδοτήσεις (Αναπτυξιακός Ν. 4887/2022, LEADER ΗΠΕΙΡΟΣ Α.Ε.), Καταστατική Ασπίδα ΚΟΙΝΣΕΠ & Ταμείο Ευεργετών Βροσίνας (ΑΜΚΕ).",
  keywords: SEO_KEYWORDS_EXTENDED,
  authors: [{ name: "Πρωτοβουλία Βροσίνα 2031 — ΚΟΙΝΣΕΠ Βροσίνας" }],
  creator: "Πρωτοβουλία Βροσίνα 2031",
  publisher: "ΚΟΙΝΣΕΠ Βροσίνα 2031 & Ταμείο Ευεργετών Βροσίνας",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/",
    languages: {
      "el-GR": "https://vrosina2031.vercel.app/",
      "en-US": "https://vrosina2031.vercel.app/",
    },
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: "https://vrosina2031.vercel.app/",
    siteName: "ΒΡΟΣΙΝΑ 2031 | Vrosina 2031 Masterplan",
    title:
      "ΒΡΟΣΙΝΑ 2031 | Ολοκληρωμένο Σχέδιο Αναγέννησης — Επένδυση 10,45 εκ. € & Επιδότηση έως 80%",
    description:
      "Αυτοψία πεδίου στο πρώην Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.), τηλεοπτικές παρουσιάσεις, 8 drone & πεδίου βίντεο, Data Room 13 εγγράφων και επενδυτικός οδηγός (LEADER & Αναπτυξιακός Νόμος).",
    images: [
      {
        url: "https://vrosina2031.vercel.app/images/og-vrosina2031.jpg",
        secureUrl: "https://vrosina2031.vercel.app/images/og-vrosina2031.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ΒΡΟΣΙΝΑ 2031 — Ολοκληρωμένο Σχέδιο Παραγωγικής & Οικιστικής Αναγέννησης (10,45 εκ. €)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ΒΡΟΣΙΝΑ 2031 | Ολοκληρωμένο Σχέδιο Αναγέννησης Ηπείρου (10,45 εκ. €)",
    description:
      "Στρατόπεδο Παπακωνσταντίνου 13.695 τ.μ., LEADER & Αναπτυξιακός Νόμος έως 80%, Ταμείο Ευεργετών ΑΜΚΕ, Γεφύρι Βροσίνας & Μονή Ραϊδιώτισσας.",
    images: ["https://vrosina2031.vercel.app/images/og-vrosina2031.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": "https://vrosina2031.vercel.app/#place-vrosina",
        name: "Βροσίνα Ιωαννίνων (Vrosina, Municipality of Zitsa, Epirus, Greece)",
        alternateName: ["Vrosina", "Βροσίνα Ζίτσας", "Βροσίνα Μολοσσών", "Vrosina Ioannina"],
        description:
          "Ημιορεινός καταπράσινος οικισμός του Δήμου Ζίτσας (έδρα Δ.Ε. Μολοσσών) στην Περιφέρεια Ηπείρου, σε υψόμετρο 117 μ. στην κοιλάδα του Ζαλογγίτικου ποταμού (παραπόταμου του Καλαμά), 43 χλμ. (35–40 λεπτά) από τα Ιωάννινα επί της Ε.Ο. Ιωαννίνων–Ηγουμενίτσας.",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.6361,
          longitude: 20.5258,
          elevation: "117m",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Βροσίνα, Δήμος Ζίτσας",
          addressRegion: "Ήπειρος (Π.Ε. Ιωαννίνων)",
          postalCode: "44003",
          addressCountry: "GR",
        },
        containsPlace: [
          {
            "@type": "LandmarksOrHistoricalBuildings",
            name: "Πέτρινο Γεφύρι της Βροσίνας",
            description:
              "Μονότοξο πέτρινο γεφύρι με δύο βοηθητικά ανακουφιστικά τόξα εντός του οικισμού της Βροσίνας (μήκος 25 μ., άνοιγμα 10,30 μ., ύψος 5,30 μ.), χρηματοδοτημένο από τη Μονή Μακραλέξη.",
          },
          {
            "@type": "LandmarksOrHistoricalBuildings",
            name: "Ζαλογγογέφυρο (1605)",
            description:
              "Ιστορικό μονότοξο πέτρινο γεφύρι του 1605 στα όρια Βροσίνας και Κάτω Ζαλόγγου πάνω στον Ζαλογγίτικο ποταμό (άνοιγμα 11,30 μ., ύψος 8,00 μ.).",
          },
          {
            "@type": "LandmarksOrHistoricalBuildings",
            name: "Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628)",
            description:
              "Ιστορική Μονή Κοιμήσεως της Θεοτόκου (1628) φωλιασμένη στους απόκρημνους βράχους («ραϊδιά») 450 μ. νότια της Βροσίνας.",
          },
          {
            "@type": "CivicStructure",
            name: "Πρώην Στρατόπεδο «Παπακωνσταντίνου» Βροσίνας",
            description:
              "Έκταση 13.695 τ.μ. ιδιοκτησίας ΤΑΕΘΑ στη Βροσίνα Ιωαννίνων, υπό παραχώρηση για τη δημιουργία του Αγροδιατροφικού Κέντρου Βροσίνας.",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://vrosina2031.vercel.app/#organization-koinsep",
        name: "ΚΟΙΝΣΕΠ «Βροσίνα 2031» & Ταμείο Ευεργετών Βροσίνας (ΑΜΚΕ)",
        url: "https://vrosina2031.vercel.app",
        description:
          "Κοινωνική Συνεταιριστική Επιχείρηση Συλλογικής και Κοινωνικής Ωφέλειας (Ν. 4430/2016) με Θυγατρική Εταιρεία Εκμετάλλευσης (65% ΚΟΙΝΣΕΠ / 35% Στρατηγικός Εταίρος) και ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας».",
        areaServed: {
          "@id": "https://vrosina2031.vercel.app/#place-vrosina",
        },
      },
      {
        "@type": "Project",
        "@id": "https://vrosina2031.vercel.app/#project-vrosina-2031",
        name: "Βροσίνα 2031 — Ολοκληρωμένο Σχέδιο Αναγέννησης Ορεινής Κοινότητας",
        description:
          "Πενταετές ολοκληρωμένο επενδυτικό και αναπτυξιακό πρόγραμμα ύψους 10.450.000 € σε 4 Πυλώνες: Αγροδιατροφικό Κέντρο στο πρώην Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.), Πρωτογενής Παραγωγή, Κατοικία & Υποδομές Ζωής (50 σπίτια), και Ήπιος Αγροτουρισμός 4 Εποχών.",
        funding: {
          "@type": "MonetaryGrant",
          name: "Συνδυασμός LEADER/ΚΣΠ, Αναπτυξιακού Νόμου 4887/2022, ΠΑΑ, ΕΣΠΑ Ηπείρου, Green Fund & Ιδιωτικών Κεφαλαίων",
          amount: {
            "@type": "MonetaryAmount",
            currency: "EUR",
            value: "10450000",
          },
        },
        organizer: {
          "@id": "https://vrosina2031.vercel.app/#organization-koinsep",
        },
        location: {
          "@id": "https://vrosina2031.vercel.app/#place-vrosina",
        },
      },
      {
        "@type": "Dataset",
        "@id": "https://vrosina2031.vercel.app/#dataset-financials",
        name: "Οικονομικά Στοιχεία, Προϋπολογισμός CAPEX 10,45 εκ. € και 3 Σενάρια Ισολογισμού «Βροσίνα 2031»",
        description:
          "Πλήρης ανάλυση CAPEX ανά πυλώνα, πηγές χρηματοδότησης, 5ετής κλιμάκωση παραγωγής (Έτος 1–5) και τρία σενάρια ισολογισμού (Συντηρητικό 687k €, Βασικό 1.076k €, Αισιόδοξο 1.495k €).",
        url: "https://vrosina2031.vercel.app/documents/Vrosina_2031_Business_Plan_v2.pdf",
        license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        creator: {
          "@id": "https://vrosina2031.vercel.app/#organization-koinsep",
        },
      },
      ...REAL_VROSINA_VIDEOS.map((vid) => ({
        "@type": "VideoObject",
        name: vid.title,
        description: vid.description,
        thumbnailUrl: [
          vid.thumbnail.startsWith("http")
            ? vid.thumbnail
            : `https://vrosina2031.vercel.app${vid.thumbnail}`,
          `https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`,
        ],
        uploadDate: "2026-01-01T08:00:00+02:00",
        embedUrl: `https://www.youtube.com/embed/${vid.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${vid.id}`,
      })),
      {
        "@type": "WebSite",
        "@id": "https://vrosina2031.vercel.app/#website",
        name: "ΒΡΟΣΙΝΑ 2031 — Ολοκληρωμένο Σχέδιο Αναγέννησης Ορεινής Κοινότητας",
        url: "https://vrosina2031.vercel.app",
        inLanguage: "el-GR",
        creator: {
          "@type": "Organization",
          name: "DIGIADS",
          url: "https://digiads.gr",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://vrosina2031.vercel.app/#faq",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="el">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="antialiased selection:bg-[#1f5c43] selection:text-white">
        {children}
      </body>
    </html>
  );
}
