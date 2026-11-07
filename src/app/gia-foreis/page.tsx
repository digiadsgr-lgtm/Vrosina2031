import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  PUBLIC_FISCAL_BENEFIT_STUDY,
  WHAT_WE_DO_NOT_ASK_STATE,
  STAKEHOLDER_BRIEFS,
  FOURTEEN_FUNDING_TOOLS_DOC,
  INSTITUTIONAL_ROLES_MATRIX,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Φορείς, Αυτοδιοίκηση & Πολιτεία",
  description:
    "Θεσμικός φάκελος «Βροσίνα 2031»: Δημοσιονομικό όφελος 463.700 €/έτος (απόσβεση 17 έτη), πίνακας «Φορέας → Τι ζητάμε → Προθεσμία», τι ΔΕΝ ζητάμε από το Δημόσιο & 14 νόμοι.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-foreis",
  },
};

export default function GiaForeisPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΚΟΙΝΟ 04 · ΔΗΜΟΣΙΟΙ ΦΟΡΕΙΣ, ΟΤΑ & ΥΠΟΥΡΓΕΙΑ"
      categoryLabel="463.700 €/ΕΤΟΣ ΕΣΟΔΑ ΔΗΜΟΣΙΟΥ · ΠΡΑΞΗ ΑΝΑ ΦΟΡΕΑ · 14 ΝΟΜΟΙ"
      title="Για Δημόσιους Φορείς, τον Δήμο Ζίτσας, την Περιφέρεια Ηπείρου & τα Υπουργεία"
      subtitle="Τι ακριβώς ζητάμε από κάθε θεσμικό φορέα, με ποια διοικητική πράξη και προθεσμία, τι ΔΕΝ ζητάμε από το Δημόσιο, ποιο είναι το ετήσιο δημοσιονομικό όφελος (463.700 €/έτος) και σε ποιο στάδιο βρίσκεται η τοπική διαβούλευση."
      canonicalPath="/gia-foreis"
    >
      {/* 1. Table: Φορέας -> Τι ζητάμε -> Με ποια πράξη & προθεσμία */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191f] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="text-sm font-bold text-[#174935]">
              1. ΣΥΝΟΠΤΙΚΟΣ ΠΙΝΑΚΑΣ ΘΕΣΜΙΚΩΝ ΑΙΤΗΜΑΤΩΝ ΑΝΑ ΦΟΡΕΑ
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
              Φορέας → Τι Ακριβώς Ζητάμε → Διοικητική Πράξη & Ορίζοντας
            </h2>
          </div>
          <a
            href="/documents/Vrosina_2031_What_The_State_Gains.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded bg-[#174935] text-white font-semibold text-sm hover:bg-[#123828] transition"
          >
            Μελέτη Δημοσιονομικού Οφέλους (PDF) ↓
          </a>
        </div>

        <div className="space-y-4">
          {STAKEHOLDER_BRIEFS.map((st) => (
            <article
              key={st.id}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-lg text-[#14191f]">
                  {st.name}
                </h3>
                <span className="px-3 py-1 rounded bg-white border border-stone-300 text-sm font-semibold text-[#174935]">
                  {st.role}
                </span>
              </div>
              <p className="text-base text-stone-800 leading-relaxed">
                <strong>• Τι ζητάμε (Διοικητική Πράξη):</strong>{" "}
                {st.whatWeAsk.join(" ")}
              </p>
              <p className="text-base text-stone-800 leading-relaxed">
                <strong>• Θεσμικό & Κοινωνικό Όφελος:</strong>{" "}
                {st.whyItMatters.join(" ")}
              </p>
              <p className="text-sm text-stone-700 pt-2 border-t border-stone-300">
                <strong>• Σχετικό Έγγραφο Φακέλου:</strong> {st.deliverable}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Τι ΔΕΝ ζητάμε από το Δημόσιο */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#9e4727] space-y-4">
        <div className="text-sm font-bold text-[#9e4727]">
          2. ΞΕΚΑΘΑΡΗ ΘΕΣΜΙΚΗ ΟΡΙΟΘΕΤΗΣΗ
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Τι ΔΕΝ Ζητάμε από το Ελληνικό Δημόσιο και τους Φορείς
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHAT_WE_DO_NOT_ASK_STATE.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-[#f7f5f0] border border-stone-300 text-base text-stone-900 leading-relaxed"
            >
              • {item}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Fiscal Benefit Study: Τι κερδίζει το Δημόσιο (463.700 €/έτος) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#174935]">
            3. ΔΗΜΟΣΙΟΝΟΜΙΚΟ ΙΣΟΖΥΓΙΟ & ΑΠΟΣΒΕΣΗ ΔΗΜΟΣΙΑΣ ΔΑΠΑΝΗΣ
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            {PUBLIC_FISCAL_BENEFIT_STUDY.title}
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            {PUBLIC_FISCAL_BENEFIT_STUDY.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PUBLIC_FISCAL_BENEFIT_STUDY.headlineMetrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-1"
            >
              <div className="text-2xl font-bold text-[#174935]">{m.value}</div>
              <div className="font-serif font-bold text-base text-[#14191f]">
                {m.label}
              </div>
              <p className="text-sm text-stone-700">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#14191f]">
            Αναλυτικός Υπολογισμός Ετήσιων Άμεσων Εσόδων Δημοσίου (Βασικό Σενάριο: 463.700 €/έτος)
          </h3>
          <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg overflow-hidden">
            {PUBLIC_FISCAL_BENEFIT_STUDY.annualRevenueBreakdown.map((st, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#f7f5f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-serif font-bold text-base text-[#14191f]">
                    {idx + 1}. {st.source}
                  </div>
                  <div className="text-sm text-stone-700">
                    {st.calculationBasis}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-[#174935]">
                    {st.annualAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Local Support & Institutional Maturity Status */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#174935]">
          4. ΚΑΤΑΣΤΑΣΗ ΤΟΠΙΚΗΣ ΣΤΗΡΙΞΗΣ & ΔΙΑΒΟΥΛΕΥΣΗΣ (ΝΟΕΜΒΡΙΟΣ 2026)
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Πού Βρίσκεται η Τοπική Διαβούλευση και οι Υπογραφές Στήριξης
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5">
            <strong className="text-[#14191f] block">
              1. Κάτοικοι, Κτηνοτρόφοι & Απόδημοι Βροσίνας:
            </strong>
            <p className="text-sm text-stone-800 leading-relaxed">
              Σε εξέλιξη η συλλογή δηλώσεων συμμετοχής ιδρυτικών μελών της Κοιν.Σ.Επ. (μερίδα 100 €) και η προεγγραφή ακινήτων στο Μητρώο Κλειστών Κατοικιών μέσω του Ανοιχτού Καλέσματος Χωριού.
            </p>
          </div>
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5">
            <strong className="text-[#14191f] block">
              2. Δήμος Ζίτσας & Τοπική Κοινότητα:
            </strong>
            <p className="text-sm text-stone-800 leading-relaxed">
              Έχει συνταχθεί και κατατίθεται προς συζήτηση το σχέδιο Απόφασης Δημοτικού Συμβουλίου Ζίτσας για το αίτημα παραχώρησης του πρώην Στρατοπέδου «Παπακωνσταντίνου» από το Τ.Α.ΕΘ.Α.
            </p>
          </div>
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5">
            <strong className="text-[#14191f] block">
              3. Επιστημονικοί & Παραγωγικοί Φορείς:
            </strong>
            <p className="text-sm text-stone-800 leading-relaxed">
              Έτοιμο το σχέδιο Μνημονίου Συνεργασίας (MoU) με τη Γαλακτοκομική Σχολή Ιωαννίνων (ΕΛΓΟ-ΔΗΜΗΤΡΑ) και το Πρότυπο Επιστολής Πρόθεσης (LOI) για την 1η Πρόσκληση LEADER (προθεσμία 4 Φεβρουαρίου 2027).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Who Executes What + 14 Laws & Funding Programs */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          5. Κατανομή Αρμοδιοτήτων Υλοποίησης & Τα 14 Θεσμοθετημένα Εργαλεία
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INSTITUTIONAL_ROLES_MATRIX.map((inst, idx) => (
            <div
              key={idx}
              className="bg-[#f7f5f0] rounded-lg p-5 border border-stone-300 space-y-2.5 text-sm"
            >
              <div className="font-bold text-[#9e4727]">
                {inst.entityCode} · {inst.shareInSubsidiary}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#14191f]">
                {inst.entityName}
              </h3>
              <ul className="space-y-1.5 text-stone-800">
                {inst.whatItExecutes.map((w, i) => (
                  <li key={i} className="leading-relaxed">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg overflow-hidden text-sm">
          {FOURTEEN_FUNDING_TOOLS_DOC.map((f) => (
            <div
              key={f.num}
              className="p-4 bg-white grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-4 space-y-0.5">
                <div className="font-serif font-bold text-base text-[#14191f]">
                  #{f.num} · {f.toolName}
                </div>
                <div className="text-stone-700">{f.legalRef}</div>
              </div>
              <div className="md:col-span-3 text-stone-800">{f.targetProject}</div>
              <div className="md:col-span-2 font-bold text-[#174935]">
                {f.grantRate}
              </div>
              <div className="md:col-span-3 text-stone-700">{f.whoApplies}</div>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
