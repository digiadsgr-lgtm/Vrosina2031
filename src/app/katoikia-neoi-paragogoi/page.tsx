import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  HOUSING_CATEGORIES,
  ZERO_CAPITAL_HERDER_GUIDE,
  MORPHOLOGICAL_REGULATION_GUIDE,
  UNIFIED_GRANT_RATE_TEXT,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Κατοικίες & Νέοι Κτηνοτρόφοι στη Βροσίνα",
  description:
    "Οδηγός 5 βημάτων για νέους κτηνοτρόφους (ενδεικτικά ποσά ενισχύσεων βάσει πρόσκλησης), αποκατάσταση κατοικιών με μακροχρόνια μίσθωση 10–15 ετών & Μορφολογικός Κανονισμός.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/katoikia-neoi-paragogoi",
  },
};

export default function KatoikiaNeoiParagogoiPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: ZERO_CAPITAL_HERDER_GUIDE.title,
    description: ZERO_CAPITAL_HERDER_GUIDE.subtitle,
    totalTime: "P6M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "0",
    },
    step: ZERO_CAPITAL_HERDER_GUIDE.steps.map((st, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `${st.stepNumber}: ${st.title}`,
      text: `${st.summary} Τι κάνεις: ${st.whatYouDo} Το κέρδος: ${st.yourGain}`,
    })),
  };

  return (
    <SeoSubpageShell
      sectionCode="ΠΥΛΩΝΕΣ 02 & 03 · ΚΑΤΟΙΚΙΑ, ΕΡΓΑΣΙΑ, ΠΟΛΕΟΔΟΜΙΑ & ΔΗΜΟΓΡΑΦΙΚΟ"
      categoryLabel="ΟΔΗΓΟΣ ΝΕΩΝ ΠΑΡΑΓΩΓΩΝ (ΕΝΔΕΙΚΤΙΚΑ ΠΟΣΑ) · ΜΟΡΦΟΛΟΓΙΚΟΣ ΚΑΝΟΝΙΣΜΟΣ · ΜΙΣΘΩΣΕΙΣ 10–15 ΕΤΩΝ"
      title="Σπίτια υπάρχουν. Μαγαζιά υπάρχουν. Λείπουν οι άνθρωποι. Έλα."
      subtitle="Αποκατάσταση κλειστών κατοικιών (μακροχρόνια μίσθωση 10–15 ετών), πρακτικός οδηγός 5 βημάτων για νέους κτηνοτρόφους (με ενδεικτικά ποσά βάσει των αντίστοιχων προσκλήσεων) και Μορφολογικός Κανονισμός της Βροσίνας."
      canonicalPath="/katoikia-neoi-paragogoi"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* MEGA-GUIDE 1: ZERO-CAPITAL HERDER 5-STEP ROADMAP */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#1f5c43] space-y-6">
        <div className="space-y-2 border-b border-stone-200 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
            {ZERO_CAPITAL_HERDER_GUIDE.badge}
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#14191f]">
            {ZERO_CAPITAL_HERDER_GUIDE.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {ZERO_CAPITAL_HERDER_GUIDE.subtitle}
          </p>
        </div>

        {/* Eligibility Disclaimer Box */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#b85d3b] text-xs text-stone-800 leading-relaxed">
          {ZERO_CAPITAL_HERDER_GUIDE.eligibilityDisclaimer}
        </div>

        <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
          {ZERO_CAPITAL_HERDER_GUIDE.roadmapTitle}
        </h3>

        <div className="space-y-4">
          {ZERO_CAPITAL_HERDER_GUIDE.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded bg-[#f7f5f0] border border-stone-300 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#14191f] text-[#c89d54] font-mono text-xs font-bold">
                    {st.stepNumber}
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#14191f]">
                    {st.title}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#1f5c43] font-mono text-xs font-bold">
                  {st.amountBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {st.summary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded bg-white border border-stone-200">
                  <strong className="text-[#b85d3b] block font-mono mb-1">
                    • ΤΙ ΚΑΝΕΙΣ:
                  </strong>
                  {st.whatYouDo}
                </div>
                <div className="p-3 rounded bg-white border border-stone-200">
                  <strong className="text-[#1f5c43] block font-mono mb-1">
                    • ΤΟ ΚΕΡΔΟΣ ΣΟΥ:
                  </strong>
                  {st.yourGain}
                </div>
                <div className="p-3 rounded bg-[#14191f] text-stone-200">
                  <strong className="text-[#c89d54] block font-mono mb-1">
                    • ΠΩΣ ΣΕ ΚΑΛΥΠΤΕΙ ΤΟ «ΒΡΟΣΙΝΑ 2031»:
                  </strong>
                  {st.vrosinaAdvantage}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Summary Table & 3 Golden Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="bg-[#14191f] text-white rounded p-5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#c89d54]">
              {ZERO_CAPITAL_HERDER_GUIDE.financialSummaryTitle}
            </h3>
            <div className="divide-y divide-stone-800 border border-stone-800 rounded overflow-hidden text-xs">
              {ZERO_CAPITAL_HERDER_GUIDE.financialTable.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 px-3 py-2.5 items-center ${
                    row.isTotal
                      ? "bg-[#1f5c43] text-white font-bold"
                      : "bg-stone-900 text-stone-200"
                  }`}
                >
                  <div className="col-span-6 pr-2">{row.program}</div>
                  <div className="col-span-3 font-mono text-xs text-stone-300">
                    {row.type}
                  </div>
                  <div className="col-span-3 text-right font-mono font-bold text-sm text-[#c89d54]">
                    {row.amount}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {ZERO_CAPITAL_HERDER_GUIDE.secondYearBonus}
            </p>
          </div>

          <div className="bg-[#f7f5f0] rounded p-5 border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#14191f]">
              {ZERO_CAPITAL_HERDER_GUIDE.goldenRulesTitle}
            </h3>
            {ZERO_CAPITAL_HERDER_GUIDE.goldenRules.map((rule, i) => (
              <div
                key={i}
                className="p-3 rounded bg-white border border-stone-200 space-y-1 text-xs"
              >
                <div className="font-serif font-bold text-sm text-[#14191f]">
                  {rule.number}. {rule.title}
                </div>
                <p className="text-stone-700 leading-relaxed">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEGA-GUIDE 2: MORPHOLOGICAL REGULATION & VROSINA URBAN PLANNING */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191f] space-y-6">
        <div className="space-y-2 border-b border-stone-200 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
            {MORPHOLOGICAL_REGULATION_GUIDE.badge}
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#14191f]">
            {MORPHOLOGICAL_REGULATION_GUIDE.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {MORPHOLOGICAL_REGULATION_GUIDE.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#14191f]">
            {MORPHOLOGICAL_REGULATION_GUIDE.whatItRegulatesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-700">
            {MORPHOLOGICAL_REGULATION_GUIDE.whatItRegulatesIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MORPHOLOGICAL_REGULATION_GUIDE.regulatedElements.map((el, i) => (
              <div
                key={i}
                className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1 text-xs"
              >
                <div className="font-mono font-bold text-[#b85d3b]">
                  ΚΑΝΟΝΑΣ {el.code} · {el.title}
                </div>
                <p className="text-stone-700 leading-relaxed">{el.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#14191f] text-white rounded p-5 sm:p-6 space-y-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#c89d54]">
            {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaSpecificsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaSpecificsIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaAxes.map((ax, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-stone-900 border border-stone-700 space-y-1.5 text-xs"
              >
                <div className="font-mono font-bold text-[#c89d54]">
                  {ax.axisNumber}
                </div>
                <h4 className="font-serif font-bold text-sm text-white">
                  {ax.title}
                </h4>
                <p className="text-stone-300 leading-relaxed whitespace-pre-line">
                  {ax.description}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded bg-stone-950 border-l-4 border-emerald-400 text-xs sm:text-sm text-stone-200 leading-relaxed">
            {MORPHOLOGICAL_REGULATION_GUIDE.howVrosina2031SolvesIt}
          </div>
        </div>
      </section>

      {/* 3 Housing Categories */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Οι 3 Κατηγορίες Μορφολογικής & Ενεργειακής Αποκατάστασης Κατοικιών (Master Lease 0 €)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOUSING_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded p-5 border border-stone-300 space-y-2.5 text-xs"
            >
              <div className="font-mono font-bold text-[#b85d3b]">
                {cat.code}
              </div>
              <h3 className="font-serif font-bold text-base text-[#14191f]">
                {cat.title}
              </h3>
              <div className="font-mono text-xl font-bold text-[#1f5c43]">
                {cat.cost} / κατοικία
              </div>
              <p className="text-stone-700 leading-relaxed">{cat.works}</p>
              <div className="pt-2 border-t border-stone-200 font-mono space-y-1">
                <div>Επιδότηση: {cat.subsidy}</div>
                <div className="text-[#b85d3b] font-bold">
                  Επιβάρυνση Ιδιοκτήτη: {cat.ownerOutOfPocket}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Production & Stone School */}
      <section className="bg-[#14191f] text-white rounded p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold">
          Το Ολοκληρωμένο Πακέτο Εγκατάστασης 12 Νέων Κτηνοτρόφων & 8 Αμπελουργών
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-200">
          <div className="p-4 rounded bg-stone-900 border border-stone-800 space-y-1">
            <strong className="text-[#c89d54] block font-mono">
              01. ΠΑΚΕΤΟ ΠΡΩΤΟΥ ΚΟΠΑΔΙΟΥ (2.040.000 € ΣΥΝΟΛΙΚΑ)
            </strong>
            <p>
              Ενίσχυση ανάλογα με την πρόσκληση (ΣΣ ΚΑΠ Παρέμβαση Π3-73-2.1) για αγορά 50–80 θηλυκών ζώων αναπαραγωγής και
              σταβλικών εγκαταστάσεων, με προκαταβολή-γέφυρα μέσω HDB και
              Ταμείου Ευεργετών ώστε ο νέος κτηνοτρόφος να ξεκινά από την πρώτη
              ημέρα. {UNIFIED_GRANT_RATE_TEXT}
            </p>
          </div>
          <div className="p-4 rounded bg-stone-900 border border-stone-800 space-y-1">
            <strong className="text-[#c89d54] block font-mono">
              02. ΑΜΠΕΛΩΝΕΣ ΝΤΕΜΠΙΝΑΣ 150 ΣΤΡΕΜΜΑΤΩΝ (450.000 €)
            </strong>
            <p>
              Αναμπέλωση και νέες φυτεύσεις της γηγενούς ποικιλίας Ντεμπίνα με
              συμβολαιακή απορρόφηση από το Οινοποιείο Βροσίνας.
            </p>
          </div>
          <div className="p-4 rounded bg-stone-900 border border-stone-800 space-y-1">
            <strong className="text-[#c89d54] block font-mono">
              03. ΕΠΑΝΑΛΕΙΤΟΥΡΓΙΑ ΔΗΜΟΤΙΚΟΥ ΣΧΟΛΕΙΟΥ & ΤΗΛΕΪΑΤΡΙΚΗ
            </strong>
            <p>
              Ανακαίνιση του 3θέσιου Δημοτικού Σχολείου Βροσίνας με ολοήμερο
              πρόγραμμα, ψηφιακή τάξη, παιδική χαρά και σταθμό τηλεϊατρικής.
            </p>
          </div>
          <div className="p-4 rounded bg-stone-900 border border-stone-800 space-y-1">
            <strong className="text-[#c89d54] block font-mono">
              04. ΣΧΟΛΗ ΠΕΤΡΑΔΩΝ ΒΡΟΣΙΝΑΣ (280.000 € — ΔΥΠΑ / ΕΚΤ+)
            </strong>
            <p>
              Αμειβόμενη μαθητεία 12 νέων τεχνιτών στην παραδοσιακή ηπειρώτικη
              λιθοδομή, οι οποίοι αναλαμβάνουν τις αποκαταστάσεις των 20
              κατοικιών και των 10 ξενώνων.
            </p>
          </div>
        </div>
      </section>
    </SeoSubpageShell>
  );
}
