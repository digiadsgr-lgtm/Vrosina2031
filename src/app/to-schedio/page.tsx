import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  FOUR_PILLARS,
  FIVE_YEAR_RAMPUP,
  PUBLIC_FISCAL_BENEFIT_STUDY,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Το Σχέδιο — Οι 4 Πυλώνες (10,45 εκ. €)",
  description:
    "Αναλυτική παρουσίαση των 4 Πυλώνων του «Βροσίνα 2031» (10,45 εκ. €): Αγροδιατροφικό Κέντρο στο Στρατόπεδο, Κτηνοτροφία & Αμπελώνες, Κατοικία & Σχολή Πετράδων, Αγροτουρισμός.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/to-schedio",
  },
};

export default function ToSchedioPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΤΟ ΣΧΕΔΙΟ «ΒΡΟΣΙΝΑ 2031»"
      categoryLabel="4 ΠΥΛΩΝΕΣ · ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ 10,45 ΕΚ. € · ΠΕΝΤΑΕΤΗΣ ΠΟΡΕΙΑ 2026–2031"
      title="Το Σχέδιο «Βροσίνα 2031»: Οι 4 Αλληλοτροφοδοτούμενοι Πυλώνες (10,45 εκ. €)"
      subtitle="Πώς συνδέονται η πρωτογενής παραγωγή (γάλα & σταφύλι), η μεταποίηση στο πρώην Στρατόπεδο «Παπακωνσταντίνου», η ανακαίνιση 20 κλειστών κατοικιών με μακροχρόνια μίσθωση και ο ήπιος αγροτουρισμός γύρω από το Γεφύρι του 1605 και τη Μονή Ραϊδιώτισσας."
      canonicalPath="/to-schedio"
    >
      {/* 4 Pillars Detailed Cards */}
      <section className="space-y-8">
        {FOUR_PILLARS.map((pillar) => (
          <article
            key={pillar.id}
            className="bg-white rounded-lg border border-stone-300 overflow-hidden shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative bg-stone-900">
                <img
                  src={pillar.heroImage}
                  alt={`${pillar.title} — Ενδεικτική Αρχιτεκτονική Απεικόνιση`}
                  width={800}
                  height={520}
                  loading="lazy"
                  className="w-full h-full object-cover min-h-[260px]"
                />
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-stone-950/85 text-white text-sm font-medium border border-stone-600">
                  Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render)
                </span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <span className="text-sm font-bold text-[#9e4727]">
                    ΠΥΛΩΝΑΣ {pillar.number}
                  </span>
                  <span className="px-3 py-1 rounded bg-[#f7f5f0] border border-stone-300 text-sm font-bold text-[#174935]">
                    {pillar.shortBudget}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#14191f]">
                  {pillar.title}
                </h2>
                <p className="text-base font-medium text-stone-700">
                  {pillar.subtitle}
                </p>
                <p className="text-base text-stone-800 leading-relaxed">
                  {pillar.summary}
                </p>

                <ul className="space-y-2 text-base text-stone-800 pt-2">
                  {pillar.highlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded bg-[#f7f5f0] border border-stone-300 leading-relaxed"
                    >
                      • {hl}
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {pillar.kpis.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-[#f7f5f0] border border-stone-300"
                    >
                      <div className="text-lg font-bold text-[#174935]">
                        {kpi.value}
                      </div>
                      <div className="text-sm text-stone-700">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded bg-stone-100 border border-stone-300 text-sm text-stone-800">
                  <strong>Θεσμικό & Χρηματοδοτικό Πλαίσιο:</strong>{" "}
                  {pillar.legalFramework}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Budget Reconciliation Table (10.45M €) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#174935]">
          ΑΡΙΘΜΗΤΙΚΗ ΣΥΜΦΩΝΙΑ ΠΡΟΫΠΟΛΟΓΙΣΜΟΥ (ΚΕΦΑΛΑΙΟ 10 BUSINESS PLAN)
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Πώς Συμφωνούν οι 4 Πυλώνες με το Σύνολο των 10.450.000 €
        </h2>
        <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg overflow-hidden text-sm">
          {PUBLIC_FISCAL_BENEFIT_STUDY.capexArithmeticReconciliation.map(
            (row, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#f7f5f0] grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
              >
                <div className="md:col-span-6 font-semibold text-[#14191f]">
                  {row.item}
                </div>
                <div className="md:col-span-4 text-stone-700">
                  {row.sharedInfraAdded}
                </div>
                <div className="md:col-span-2 md:text-right font-bold text-base text-[#174935]">
                  {row.totalWithInfra}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* 5-Year Ramp-Up */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#9e4727]">
          ΠΕΝΤΑΕΤΗΣ ΚΛΙΜΑΚΩΣΗ ΥΛΟΠΟΙΗΣΗΣ (2026–2031)
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Πορεία Οικονομικών Μεγεθών, Απασχόλησης και Οροσήμων ανά Έτος
        </h2>
        <div className="space-y-3">
          {FIVE_YEAR_RAMPUP.map((yr, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#f7f5f0] border border-stone-300 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-3 space-y-0.5">
                <div className="font-serif font-bold text-lg text-[#14191f]">
                  {yr.year}
                </div>
                <div className="text-sm font-semibold text-[#174935]">
                  Τζίρος: {yr.revenue} · {yr.jobs} Θέσεις
                </div>
              </div>
              <div className="md:col-span-9 text-base text-stone-800 leading-relaxed">
                {yr.milestones}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
