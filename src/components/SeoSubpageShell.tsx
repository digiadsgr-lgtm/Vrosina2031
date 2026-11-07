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

  // Κανόνας Δ4: Ένα χρώμα ανά κοινό ως λεπτή γραμμή και ετικέτα στις 4 σελίδες:
  // κτηνοτρόφοι = πράσινο (#1F5C43), επιχειρήσεις = τερακότα (#A34A2B), επενδυτές = χρυσό (#C89D54 border / #85611C text), φορείς = σκούρο γκρι (#14191F)
  const audienceTheme = (() => {
    if (
      canonicalPath === "/gia-ktinotrofous" ||
      canonicalPath === "/katoikia-neoi-paragogoi"
    ) {
      return {
        topBarClass: "border-t-4 border-t-[#1F5C43]",
        badgeClass: "text-[#1F5C43]",
      };
    }
    if (canonicalPath === "/gia-epicheiriseis") {
      return {
        topBarClass: "border-t-4 border-t-[#B85D3B]",
        badgeClass: "text-[#A34A2B]",
      };
    }
    if (
      canonicalPath === "/gia-ependytes" ||
      canonicalPath === "/ependyseis-epidotiseis"
    ) {
      return {
        topBarClass: "border-t-4 border-t-[#C89D54]",
        badgeClass: "text-[#85611C]",
      };
    }
    return {
      topBarClass: "border-t-4 border-t-[#14191F]",
      badgeClass: "text-[#14191F]",
    };
  })();

  const audienceLinks = [
    {
      href: "/gia-ktinotrofous",
      badge: "Για κτηνοτρόφους και κατοίκους",
      label:
        "Σταθερός αγοραστής γάλακτος, συμμετοχή στην Κοιν.Σ.Επ. (μερίδα 100 €) & Μητρώο Κατοικιών",
      borderClass: "border-t-4 border-t-[#1F5C43]",
      badgeColor: "text-[#1F5C43]",
    },
    {
      href: "/gia-epicheiriseis",
      badge: "Για επιχειρήσεις",
      label:
        "10 ξενώνες, 5 καταστήματα, έργα αποκατάστασης κτιρίων & στρατηγικές συνεργασίες",
      borderClass: "border-t-4 border-t-[#B85D3B]",
      badgeColor: "text-[#A34A2B]",
    },
    {
      href: "/gia-ependytes",
      badge: "Για επενδυτές",
      label:
        "3 σενάρια, κίνδυνοι και πώς τους διαχειριζόμαστε, διακυβέρνηση & λήψη μοντέλου",
      borderClass: "border-t-4 border-t-[#C89D54]",
      badgeColor: "text-[#85611C]",
    },
    {
      href: "/gia-foreis",
      badge: "Για φορείς και Πολιτεία",
      label:
        "Τι ζητάμε και τι δεν ζητάμε, δημοσιονομικό όφελος 463.700 €/έτος & νόμοι/χρηματοδότηση",
      borderClass: "border-t-4 border-t-[#14191F]",
      badgeColor: "text-[#14191F]",
    },
  ];

  const commonLinks = [
    {
      href: "/to-schedio",
      label: "Το σχέδιο (Οι 4 Πυλώνες & Προϋπολογισμός 10,45 εκ. €)",
    },
    {
      href: "/poioi-eimaste",
      label: "Ποιοι είμαστε & Πού βρισκόμαστε τώρα",
    },
    {
      href: "/stratopedo-vrosinas",
      label: "Πρώην Στρατόπεδο Βροσίνας (13.695 τ.μ.) & Αυτοψία 8 Κτιρίων",
    },
    {
      href: "/gefyri-vrosinas-raidiotissa",
      label: "Γεφύρι Βροσίνας (1605) & Μονή Παναγίας Ραϊδιώτισσας (1628)",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#14191F] font-sans pb-16 lg:pb-0">
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

      {/* Single Clean Navigation Bar: Το σχέδιο · Για κτηνοτρόφους · Για επιχειρήσεις · Για επενδυτές · Για φορείς · Επικοινωνία */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#14191F]"
            >
              ΒΡΟΣΙΝΑ<span className="text-[#A34A2B]">2031</span>
            </a>
            <a
              href="/poioi-eimaste"
              className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#F7F5F0] border border-stone-300 text-[#14191F] text-sm font-medium hover:bg-stone-200 transition"
            >
              Ποιοι είμαστε
            </a>
          </div>

          <nav
            aria-label="Κύρια Πλοήγηση"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-[#14191F]"
          >
            <a
              href="/to-schedio"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/to-schedio"
                  ? "bg-[#14191F] text-white"
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
                  ? "bg-[#1F5C43] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για κτηνοτρόφους
            </a>
            <a
              href="/gia-epicheiriseis"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-epicheiriseis"
                  ? "bg-[#A34A2B] text-white"
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
                  ? "bg-[#85611C] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για επενδυτές
            </a>
            <a
              href="/gia-foreis"
              className={`px-3 py-2 rounded transition whitespace-nowrap ${
                canonicalPath === "/gia-foreis"
                  ? "bg-[#14191F] text-white"
                  : "hover:bg-stone-200"
              }`}
            >
              Για φορείς
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="px-3 py-2 rounded border border-stone-400 text-[#14191F] text-sm font-semibold hover:bg-stone-200 transition whitespace-nowrap"
            >
              Αρχική
            </a>
            <a
              href="#epikinonia"
              className="px-4 py-2 rounded bg-[#1F5C43] text-white text-sm font-semibold hover:bg-[#174935] transition whitespace-nowrap"
            >
              Επικοινωνία
            </a>
          </div>
        </div>
      </header>

      {/* Light Warm Theme Hero Header with Audience Accent Bar (Κανόνας Δ4) */}
      <section
        className={`bg-white py-10 sm:py-12 border-b border-stone-300 ${audienceTheme.topBarClass}`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`text-sm font-bold ${audienceTheme.badgeClass}`}>
              {sectionCode} · {categoryLabel}
            </div>
            <div className="text-sm text-[#14191F]">
              <a
                href="#epikinonia"
                className="text-[#1F5C43] font-semibold underline"
              >
                Φόρμα Επικοινωνίας ↓
              </a>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191F] leading-tight">
            {title}
          </h1>
          <p className="text-[#14191F] text-base sm:text-lg leading-relaxed max-w-4xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 text-base">
        {children}

        {/* Embedded Interactive Contact Form (Α1) */}
        <SubpageContactWidget contextTitle={title} />

        {/* Audience & Common Pages Directory */}
        <aside className="bg-white rounded-lg p-6 border border-stone-300 space-y-5">
          <div className="space-y-1">
            <div className="text-sm font-bold text-[#1F5C43]">
              Πλοήγηση ανά Κοινό & Θεματικές Σελίδες «Βροσίνα 2031»
            </div>
            <p className="text-sm text-[#14191F]">
              Επιλέξτε τη σελίδα που αντιστοιχεί στη δική σας ιδιότητα ή δείτε τις κοινές σελίδες τεκμηρίωσης:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audienceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`p-4 rounded border transition block space-y-1 ${link.borderClass} ${
                  link.href === canonicalPath
                    ? "bg-[#F7F5F0] border-stone-500 text-[#14191F]"
                    : "bg-[#F7F5F0] border-stone-300 text-[#14191F] hover:border-stone-500"
                }`}
              >
                <div className={`text-sm font-bold ${link.badgeColor}`}>
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
              className="p-3 rounded bg-[#14191F] text-white font-semibold text-sm hover:bg-[#1F5C43] transition"
            >
              Αρχική Σελίδα «Βροσίνα 2031» →
            </a>
            {commonLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`p-3 rounded border transition text-sm font-semibold ${
                  link.href === canonicalPath
                    ? "bg-stone-200 border-[#14191F] text-[#14191F]"
                    : "bg-white border-stone-300 text-[#14191F] hover:bg-stone-100"
                }`}
              >
                {link.label} →
              </a>
            ))}
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (Κεφ. Β: Σχέδιο · Στρατόπεδο · Σπίτια · Επιχειρήσεις · Επικοινωνία) */}
      <nav
        aria-label="Κινητή Πλοήγηση"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-300 shadow-lg"
      >
        <div className="grid grid-cols-5 text-center">
          <a
            href="/to-schedio"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Σχέδιο
          </a>
          <a
            href="/stratopedo-vrosinas"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Στρατόπεδο
          </a>
          <a
            href="/gia-ktinotrofous"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Σπίτια
          </a>
          <a
            href="/gia-epicheiriseis"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Επιχειρήσεις
          </a>
          <a
            href="#epikinonia"
            className="py-2.5 px-1 text-sm font-bold bg-[#1F5C43] text-white truncate"
          >
            Επικοινωνία
          </a>
        </div>
      </nav>

      <footer className="bg-[#14191F] text-stone-200 py-8 border-t border-stone-800 text-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <strong className="text-white font-serif">ΒΡΟΣΙΝΑ2031</strong> ·{" "}
            {SITE_CONFIG.location}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/" className="hover:text-white">
              Αρχική
            </a>
            <a href="/poioi-eimaste" className="hover:text-white">
              Ποιοι είμαστε
            </a>
            <a
              href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
              className="text-[#C89D54] hover:underline"
            >
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
              className="text-stone-200 hover:text-[#C89D54] transition"
            >
              Designed by <strong className="text-white">DIGIADS</strong>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
