import React from "react";
import { SITE_CONFIG } from "@/data/vrosinaData";

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

  const clusterLinks = [
    {
      href: "/stratopedo-vrosinas",
      label: "Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.) & Αυτοψία 8 Κτιρίων",
    },
    {
      href: "/ependyseis-epidotiseis",
      label: "Επενδύσεις, Επιδοτήσεις έως 80%, LEADER & Ταμείο Ευεργετών (ΑΜΚΕ)",
    },
    {
      href: "/gefyri-vrosinas-raidiotissa",
      label: "Γεφύρι Βροσίνας, Ζαλογγογέφυρο 1605 & Μονή Παναγίας Ραϊδιώτισσας",
    },
    {
      href: "/katoikia-neoi-paragogoi",
      label: "Αποκατάσταση Κατοικιών (Master Lease), Νέοι Κτηνοτρόφοι & Σχολή Πετράδων",
    },
    {
      href: "/ai-knowledge-base",
      label: "AI Knowledge Base & Bilingual Fact Sheet (EL / EN)",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a2129] font-sans">
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

      {/* Top Institutional Bar */}
      <div className="bg-[#14191f] text-stone-300 border-b border-stone-800 px-4 py-1.5 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[#c89d54] font-semibold">
              ΒΡΟΣΙΝΑ 2031
            </span>{" "}
            — Δήμος Ζίτσας · Δ.Ε. Μολοσσών · Π.Ε. Ιωαννίνων · 1η Πρόσκληση LEADER (
            <strong className="font-mono text-white">545/07-10-2026</strong>,
            προθεσμία 4 Φεβρουαρίου 2027)
          </div>
          <a
            href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c89d54] hover:underline font-medium"
          >
            Πλήρες Business Plan v2.0 (.pdf)
          </a>
        </div>
      </div>

      {/* Minimalist Header */}
      <header className="sticky top-0 z-40 bg-[#f7f5f0]/95 backdrop-blur-md border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          <a
            href="/"
            className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#14191f]"
          >
            ΒΡΟΣΙΝΑ<span className="text-[#b85d3b]">2031</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-stone-700">
            <a href="/" className="hover:text-[#14191f] transition">
              ← Κεντρική Πύλη Masterplan
            </a>
            <a
              href="/stratopedo-vrosinas"
              className="hover:text-[#14191f] transition"
            >
              Στρατόπεδο
            </a>
            <a
              href="/ependyseis-epidotiseis"
              className="hover:text-[#14191f] transition"
            >
              Επενδύσεις & ΑΜΚΕ
            </a>
            <a
              href="/gefyri-vrosinas-raidiotissa"
              className="hover:text-[#14191f] transition"
            >
              Γεφύρια & Ραϊδιώτισσα
            </a>
            <a
              href="/katoikia-neoi-paragogoi"
              className="hover:text-[#14191f] transition"
            >
              Κατοικία & Παραγωγοί
            </a>
            <a
              href="/ai-knowledge-base"
              className="hover:text-[#14191f] transition font-mono text-xs text-[#1f5c43]"
            >
              AI Index
            </a>
          </nav>

          <a
            href={`/?source=${encodeURIComponent(canonicalPath)}#contact-form`}
            className="px-3.5 py-2 rounded bg-[#14191f] text-white text-xs font-semibold hover:bg-[#1f5c43] transition"
          >
            Συμμετοχή / Επικοινωνία
          </a>
        </div>
      </header>

      {/* Hero Header */}
      <section className="bg-[#14191f] text-white py-10 sm:py-14 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="text-xs font-mono text-[#c89d54] uppercase tracking-widest">
            {sectionCode} / {categoryLabel}
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
            {title}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Article Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {children}

        {/* Subpage Direct Lead & Contact CTA */}
        <section className="bg-[#14191f] text-white rounded p-6 sm:p-8 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#c89d54] uppercase font-bold">
              ΕΚΔΗΛΩΣΗ ΕΝΔΙΑΦΕΡΟΝΤΟΣ ({canonicalPath})
            </div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold">
              Ζητήστε τον Πλήρη Φάκελο ή Δηλώστε Συμμετοχή
            </h2>
            <p className="text-xs text-stone-300">
              Απευθείας αποστολή στο Συντονιστικό Desk (digiadsgr@gmail.com) με ένδειξη σελίδας προέλευσης.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={`/?source=${encodeURIComponent(canonicalPath)}#contact-form`}
              className="px-4 py-2.5 rounded bg-[#c89d54] text-stone-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Φόρμα Συμμετοχής →
            </a>
            <a
              href={`mailto:digiadsgr@gmail.com?subject=${encodeURIComponent(
                `[ΒΡΟΣΙΝΑ 2031] Αίτημα από σελίδα ${canonicalPath} (${title})`
              )}`}
              className="px-4 py-2.5 rounded border border-stone-600 text-stone-200 hover:text-white text-xs font-mono transition"
            >
              digiadsgr@gmail.com ↗
            </a>
          </div>
        </section>

        {/* Internal SEO Cluster Navigation Box */}
        <aside className="bg-white rounded p-6 border border-stone-300 space-y-4">
          <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
            ΘΕΜΑΤΙΚΟΣ ΚΟΜΒΟΣ ΤΕΚΜΗΡΙΩΣΗΣ «ΒΡΟΣΙΝΑ 2031» (ΕΣΩΤΕΡΙΚΗ ΔΙΑΣΥΝΔΕΣΗ):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            <a
              href="/"
              className="p-3 rounded bg-[#14191f] text-white font-semibold hover:bg-[#1f5c43] transition"
            >
              00. Κεντρική Πύλη & Διαδραστικοί Υπολογιστές «Βροσίνα 2031» →
            </a>
            {clusterLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className={`p-3 rounded border transition font-medium ${
                  link.href === canonicalPath
                    ? "bg-stone-100 border-[#b85d3b] text-[#14191f] font-bold"
                    : "bg-[#f7f5f0] border-stone-300 text-stone-800 hover:border-stone-500"
                }`}
              >
                0{idx + 1}. {link.label} →
              </a>
            ))}
          </div>
        </aside>
      </main>

      <footer className="bg-[#0d1115] text-stone-400 py-8 border-t border-stone-800 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <strong className="text-white font-serif">ΒΡΟΣΙΝΑ2031</strong> ·{" "}
            {SITE_CONFIG.location}
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <a href="/" className="hover:text-white">
              Αρχική
            </a>
            <a href="/llms-full.txt" className="text-[#c89d54] hover:underline">
              llms-full.txt
            </a>
            <a href="/sitemap.xml" className="hover:text-white">
              sitemap.xml
            </a>
            <span className="text-stone-700">|</span>
            <a
              href="https://digiads.gr"
              target="_blank"
              rel="noopener"
              className="text-stone-400 hover:text-[#c89d54] transition text-[11px]"
            >
              Designed by <strong className="text-white">DIGIADS</strong>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
