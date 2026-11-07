import React from "react";
import { SITE_CONFIG } from "@/data/vrosinaData";
import SubpageContactWidget from "@/components/SubpageContactWidget";

interface SeoSubpageShellProps {
  sectionCode: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
  children: React.ReactNode;
}

export default function SeoSubpageShell({
  sectionCode,
  categoryLabel,
  title,
  subtitle,
  canonicalPath,
  jsonLd,
  children,
}: SeoSubpageShellProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Βροσίνα 2031 — Αρχική",
        item: "https://vrosina2031.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://vrosina2031.vercel.app${canonicalPath}`,
      },
    ],
  };

  const audienceLinks = [
    {
      href: "/gia-ktinotrofous",
      badge: "ΚΟΙΝΟ 01 · ΚΤΗΝΟΤΡΟΦΟΙ & ΚΑΤΟΙΚΟΙ",
      label: "Για κτηνοτρόφους, αμπελουργούς & ιδιοκτήτες κατοικιών (μερίδα 100 €, τιμή γάλακτος, ανακαίνιση 0 €)",
    },
    {
      href: "/gia-epicheiriseis",
      badge: "ΚΟΙΝΟ 02 · ΕΠΙΧΕΙΡΗΣΕΙΣ & ΕΡΓΟΛΑΒΟΙ",
      label: "Για μικρές και μεγάλες επιχειρήσεις (10 ξενώνες, 5 καταστήματα, τεχνικά έργα & προμήθειες)",
    },
    {
      href: "/gia-ependytes",
      badge: "ΚΟΙΝΟ 03 · ΕΠΕΝΔΥΤΕΣ & ΕΥΕΡΓΕΤΕΣ",
      label: "Για επενδυτές και χορηγούς (θέση, 3 σενάρια, κίνδυνοι, χρήση κεφαλαίων, λήψη μοντέλου)",
    },
    {
      href: "/gia-foreis",
      badge: "ΚΟΙΝΟ 04 · ΦΟΡΕΙΣ & ΠΟΛΙΤΕΙΑ",
      label: "Για φορείς και Πολιτεία (όφελος Δημοσίου 463.700 €/έτος, πράξη ανά φορέα, τι δεν ζητάμε)",
    },
  ];

  const commonLinks = [
    {
      href: "/to-schedio",
      label: "Το σχέδιο (Οι 4 Πυλώνες & Προϋπολογισμός 10,45 εκ. €)",
    },
    {
      href: "/poioi-eimaste",
      label: "Ποιοι είμαστε, Μαρτυρίες Κατοίκων & Πού βρισκόμαστε σήμερα",
    },
    {
      href: "/stratopedo-vrosinas",
      label: "Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.) & Αυτοψία 8 Κτιρίων",
    },
    {
      href: "/gefyri-vrosinas-raidiotissa",
      label: "Γεφύρι Βροσίνας, Ζαλογγογέφυρο 1605 & Μονή Παναγίας Ραϊδιώτισσας",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#14191f] font-sans pb-16 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Single Clean Navigation Bar: 5 Menu Items + 1 Contact Button (Μέρος Β #1, #2, #7, #8) */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#14191f]"
            >
              ΒΡΟΣΙΝΑ<span className="text-[#9e4727]">2031</span>
            </a>
            <a
              href="/poioi-eimaste"
              className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#f7f5f0] border border-stone-300 text-stone-800 text-sm font-medium hover:bg-stone-200 transition"
            >
              Ποιοι είμαστε
            </a>
          </div>

          <nav
            aria-label="Κύρια Πλοήγηση"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-[#14191f]"
          >
            <a
              href="/to-schedio"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/to-schedio"
                  ? "bg-[#14191f] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Το σχέδιο
            </a>
            <a
              href="/gia-ktinotrofous"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-ktinotrofous" ||
                canonicalPath === "/katoikia-neoi-paragogoi"
                  ? "bg-[#14191f] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για κτηνοτρόφους
            </a>
            <a
              href="/gia-epicheiriseis"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-epicheiriseis"
                  ? "bg-[#14191f] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για επιχειρήσεις
            </a>
            <a
              href="/gia-ependytes"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-ependytes" ||
                canonicalPath === "/ependyseis-epidotiseis"
                  ? "bg-[#14191f] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για επενδυτές
            </a>
            <a
              href="/gia-foreis"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-foreis"
                  ? "bg-[#14191f] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για φορείς
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="px-3 py-2 rounded border border-stone-400 text-[#14191f] text-sm font-semibold hover:bg-stone-200 transition whitespace-nowrap"
            >
              Αρχική
            </a>
            <a
              href="#subpage-contact"
              className="px-4 py-2 rounded bg-[#174935] text-white text-sm font-semibold hover:bg-[#123828] transition whitespace-nowrap"
            >
              Επικοινωνία
            </a>
          </div>
        </div>
      </header>

      {/* Light Warm Theme Hero Header (Μέρος Β #9, #10) */}
      <section className="bg-white py-10 sm:py-12 border-b border-stone-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold text-[#9e4727]">
              {sectionCode} · {categoryLabel}
            </div>
            <div className="text-sm text-stone-700">
              Συντονισμός: <strong>Αθανάσιος Βούρδας</strong> ·{" "}
              <a
                href="#subpage-contact"
                className="text-[#174935] font-semibold underline"
              >
                Τηλεφωνική Επικοινωνία / Φόρμα ↓
              </a>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f] leading-tight">
            {title}
          </h1>
          <p className="text-stone-800 text-base sm:text-lg leading-relaxed max-w-4xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 text-base">
        {children}

        {/* Embedded Interactive Contact Form & Phone/Callback Box (Μέρος Β #3) */}
        <SubpageContactWidget canonicalPath={canonicalPath} pageTitle={title} />

        {/* Audience & Common Pages Directory */}
        <aside className="bg-white rounded-lg p-6 border border-stone-300 space-y-5">
          <div className="space-y-1">
            <div className="text-sm font-bold text-[#174935]">
              ΠΛΟΗΓΗΣΗ ΑΝΑ ΚΟΙΝΟ & ΘΕΜΑΤΙΚΕΣ ΣΕΛΙΔΕΣ «ΒΡΟΣΙΝΑ 2031»
            </div>
            <p className="text-sm text-stone-700">
              Επιλέξτε τη σελίδα που αντιστοιχεί στη δική σας ιδιότητα ή δείτε τις κοινές σελίδες τεκμηρίωσης:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audienceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`p-4 rounded border transition block space-y-1 ${
                  link.href === canonicalPath
                    ? "bg-[#f7f5f0] border-2 border-[#9e4727] text-[#14191f]"
                    : "bg-[#f7f5f0] border-stone-300 text-[#14191f] hover:border-stone-500"
                }`}
              >
                <div className="text-sm font-bold text-[#9e4727]">
                  {link.badge}
                </div>
                <div className="text-base font-semibold leading-snug">
                  {link.label} →
                </div>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href="/"
              className="p-3 rounded bg-[#14191f] text-white font-semibold text-sm hover:bg-[#174935] transition"
            >
              Αρχική Σελίδα «Βροσίνα 2031» →
            </a>
            {commonLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`p-3 rounded border transition text-sm font-semibold ${
                  link.href === canonicalPath
                    ? "bg-stone-200 border-[#14191f] text-[#14191f]"
                    : "bg-white border-stone-300 text-[#14191f] hover:bg-stone-100"
                }`}
              >
                {link.label} →
              </a>
            ))}
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (5 Clean Items, No Emoji) */}
      <nav
        aria-label="Κινητή Πλοήγηση"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-300 shadow-lg"
      >
        <div className="grid grid-cols-5 text-center">
          <a
            href="/to-schedio"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191f] hover:bg-stone-100 truncate"
          >
            Σχέδιο
          </a>
          <a
            href="/gia-ktinotrofous"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191f] hover:bg-stone-100 truncate"
          >
            Κτηνοτρόφοι
          </a>
          <a
            href="/gia-epicheiriseis"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191f] hover:bg-stone-100 truncate"
          >
            Επιχειρήσεις
          </a>
          <a
            href="/gia-ependytes"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191f] hover:bg-stone-100 truncate"
          >
            Επενδυτές
          </a>
          <a
            href="#subpage-contact"
            className="py-2.5 px-1 text-sm font-bold bg-[#174935] text-white truncate"
          >
            Επικοινωνία
          </a>
        </div>
      </nav>

      <footer className="bg-[#14191f] text-stone-200 py-8 border-t border-stone-800 text-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <strong className="text-white font-serif">ΒΡΟΣΙΝΑ2031</strong> ·{" "}
            {SITE_CONFIG.location} · Συντονισμός: Αθανάσιος Βούρδας
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/" className="hover:text-white">
              Αρχική
            </a>
            <a href="/poioi-eimaste" className="hover:text-white">
              Ποιοι είμαστε
            </a>
            <a href="/documents/Vrosina_2031_Business_Plan_v2.pdf" className="text-[#c89d54] hover:underline">
              Business Plan PDF
            </a>
            <a href="/sitemap.xml" className="hover:text-white">
              sitemap.xml
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="https://digiads.gr"
              target="_blank"
              rel="noopener"
              className="text-stone-200 hover:text-[#c89d54] transition"
            >
              Designed by <strong className="text-white">DIGIADS</strong>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
