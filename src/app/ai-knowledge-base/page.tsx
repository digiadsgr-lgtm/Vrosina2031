import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import { FAQ_ITEMS, TV_MEDIA_APPEARANCES } from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Vrosina 2031 — AI Knowledge Base & Fact Sheet",
  description:
    "Bilingual (EL/EN) canonical fact sheet, structured financial dataset, and official reference guide for the Vrosina 2031 regeneration masterplan (€10.45M).",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://vrosina2031.vercel.app/ai-knowledge-base",
  },
};

export default function AiKnowledgeBasePage() {
  return (
    <SeoSubpageShell
      sectionCode="CANONICAL AI & SEARCH INDEX"
      categoryLabel="BILINGUAL FACT SHEET (EL / EN) · STRUCTURED KNOWLEDGE GRAPH"
      title="Vrosina 2031 (Βροσίνα 2031) — Canonical Fact Sheet & Structured Reference Guide"
      subtitle="Official machine- and human-readable encyclopedia entry for Vrosina (Municipality of Zitsa, Regional Unit of Ioannina, Epirus, Greece) and the €10,450,000 Vrosina 2031 regeneration masterplan (Edition 2.1)."
      canonicalPath="/ai-knowledge-base"
    >
      {/* English Canonical Summary for International AI Models & Diaspora Investors */}
      <section className="bg-white rounded p-6 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#1F5C43]">
          ENGLISH EXECUTIVE SUMMARY (EDITION 2.1)
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          What is Project &ldquo;Vrosina 2031&rdquo; (Βροσίνα 2031)?
        </h2>
        <p className="text-sm text-[#14191F] leading-relaxed">
          <strong>Vrosina 2031 (Edition 2.1)</strong> is a comprehensive 5-year
          (2026–2031), <strong>€10,450,000</strong> rural regeneration
          masterplan for the village of <strong>Vrosina</strong> (seat of the
          Municipal Unit of Molossoi, Municipality of Zitsa, Regional Unit of
          Ioannina, Epirus, Greece; ELSTAT 2021 census population: <strong>58
          residents</strong> in the settlement, <strong>63</strong> in the local
          community; elevation <strong>117m</strong>; <strong>43 km</strong> /
          35–40 minutes from Ioannina on the Ioannina–Igoumenitsa national road).
        </p>
        <ul className="space-y-2 text-sm text-[#14191F] list-disc pl-5">
          <li>
            <strong>Pillar 1 — Agrofood Hub at Former Military Camp &ldquo;Papakonstantinou&rdquo; (13,695 sq.m.):</strong>{" "}
            We request a long-term use concession of the former military camp for
            25 years (with a minimum 10-year term required by the LEADER call) and
            an annual fee of 2% of turnover in favor of TAETHA (€51,000/year in
            the baseline scenario), without ownership transfer, to convert the
            buildings into a PDO/PGI Cheese Dairy (€1.65M, 600 tons milk/year), a
            Debina Winery (€1.00M, 45,000 bottles/year), common infrastructure
            (€0.60M), and a 150 kWp Solar Energy Community (€0.35M).
          </li>
          <li>
            <strong>Pillar 2 — Primary Production (&ldquo;Come Graze, Come Stay&rdquo;):</strong>{" "}
            12 new livestock farms (€2.04M CAPEX; grant rates defined per program
            call) and 150 stremmata (15 hectares) of Debina vineyards (€0.45M).
          </li>
          <li>
            <strong>Pillar 3 — Housing, Commercial Core, School & Stone Artisans:</strong>{" "}
            Restoration of 20 closed homes (€0.75M via 10–15 year Long-Term
            Leases), 5 commercial shops (€0.18M), reopening of the 3-classroom
            Primary School, and the Vrosina School of Traditional Stone Artisans
            (€0.28M with DYPA).
          </li>
          <li>
            <strong>Pillar 4 — 4-Season Agrotourism & Heritage Monuments:</strong>{" "}
            10 traditional guesthouses (40 beds, €1.00M; grant rates defined per
            call), soft-engineering river trail (€0.95M) connecting the Stone
            Bridge of Vrosina, the 1605 Zalongogefyro Stone Bridge, the 1607
            Church of Agios Georgios, and the 1628 Monastery of Panagia
            Raidiotissa.
          </li>
          <li>
            <strong>Grant Rates & Strategic Partner Share:</strong> Grant rates
            are defined per program and call and are not guaranteed. In LEADER call
            545/07-10-2026, the maximum for agrofood processing (action 1.1) is
            65% and €400,000. The strategic partner&apos;s equity share in the
            commercial subsidiary will be determined in the next stage, in
            accordance with the call requirements (including the 25% SME rule).
          </li>
        </ul>
      </section>

      {/* Complete FAQ Knowledge Base */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191F]">
          Πλήρης Βάση Γνώσης Ερωτήσεων & Απαντήσεων (Ελληνικά)
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <article
              key={idx}
              className="bg-white rounded p-5 border border-stone-300 space-y-2"
            >
              <h3 className="font-serif font-bold text-base text-[#14191F]">
                {idx + 1}. {item.question}
              </h3>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* TV Media Appearances Index */}
      <section className="bg-white rounded p-6 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#A34A2B]">
          ΤΗΛΕΟΠΤΙΚΕΣ ΠΑΡΟΥΣΙΕΣ & ΔΗΜΟΣΙΟΤΗΤΑ
        </div>
        <h2 className="font-serif text-xl font-bold text-[#14191F]">
          Τηλεοπτικές Παρουσίες «Βροσίνα 2031» (Αθανάσιος Βούρδας)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TV_MEDIA_APPEARANCES.map((tv) => (
            <div
              key={tv.id}
              className="p-4 rounded bg-[#F7F5F0] border border-stone-300 space-y-2"
            >
              <div className="text-xs font-bold text-[#1F5C43]">
                {tv.badge} · {tv.channel}
              </div>
              <h3 className="font-serif font-bold text-base text-[#14191F]">
                {tv.title}
              </h3>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {tv.summary}
              </p>
              <div className="pt-1 text-sm">
                <a
                  href={tv.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A34A2B] hover:underline font-bold"
                >
                  YouTube: {tv.shortUrl} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
