import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  CAPEX_BREAKDOWN,
  THREE_SCENARIOS,
  GOVERNANCE_SHIELD,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title:
    "Επενδύσεις στην Ήπειρο (Επιδότηση έως 75–80%) & Ταμείο Ευεργετών Βροσίνας (ΑΜΚΕ)",
  description:
    "Οδηγός επενδύσεων, επιδοτήσεων (Αναπτυξιακός Νόμος 4887/2022 έως 75%, LEADER ΗΠΕΙΡΟΣ Α.Ε. έως 80%), φοροαπαλλασσόμενων χορηγιών, Ονοματοδοσίας (Naming Rights) και ESG Impact στο πρότυπο έργο «Βροσίνα 2031» (10,45 εκ. €).",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/ependyseis-epidotiseis",
  },
};

export default function EpendyseisEpidotiseisPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΕΠΕΝΔΥΤΙΚΟΣ & ΧΟΡΗΓΙΚΟΣ ΦΑΚΕΛΟΣ"
      categoryLabel="CAPEX 10,45 ΕΚ. € · ΕΠΙΔΟΤΗΣΕΙΣ ΕΩΣ 80% · ΑΜΚΕ ΤΑΜΕΙΟ ΕΥΕΡΓΕΤΩΝ"
      title="Επενδύσεις, Επιδοτήσεις έως 75%–80% & Φοροαπαλλασσόμενη Ονοματοδοσία Έργων στη Βροσίνα Ιωαννίνων"
      subtitle="Πλήρης οδηγός για Στρατηγικούς Επενδυτές Αγροδιατροφής (35%–40% Εμπορικής Θυγατρικής), Επενδυτές Αγροτουρισμού (LEADER), Family Offices Διασποράς και Μεγάλους Ευεργέτες / Χορηγούς ESG μέσω της ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας»."
      canonicalPath="/ependyseis-epidotiseis"
    >
      {/* 4 Investment & Sponsorship Channels */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Τα 4 Θεσμικά Κανάλια Τοποθέτησης Κεφαλαίου & Χορηγίας
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded border border-stone-300 space-y-2">
            <div className="text-xs font-mono font-bold text-[#b85d3b]">
              ΚΑΝΑΛΙ 01 · ΜΕΤΑΠΟΙΗΣΗ ΠΟΠ/ΠΓΕ
            </div>
            <h3 className="font-serif font-bold text-lg">
              Στρατηγικός Εταίρος Αγροδιατροφής (έως 35%–40%)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Συμμετοχή στην Εμπορική Θυγατρική του Τυροκομείου ΠΟΠ (1,65 εκ. €)
              και του Οινοποιείου Ντεμπίνας (1,00 εκ. €) με επιδότηση έως 75%
              μέσω του Αναπτυξιακού Νόμου 4887/2022, εγγυοδοσία 80% από την
              Ελληνική Αναπτυξιακή Τράπεζα (HDB) και συμβόλαιο αποκλειστικής
              απορρόφησης (Off-Take Agreement).
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-stone-300 space-y-2">
            <div className="text-xs font-mono font-bold text-[#1f5c43]">
              ΚΑΝΑΛΙ 02 · ΑΓΡΟΤΟΥΡΙΣΜΟΣ 4 ΕΠΟΧΩΝ (LEADER)
            </div>
            <h3 className="font-serif font-bold text-lg">
              10 Παραδοσιακοί Ξενώνες (40 Κλίνες) & Εμπορικός Πυρήνας
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Ανάπτυξη ξενώνων 3–5 δωματίων (συνολικό CAPEX 1,00 εκ. €) με
              επιδότηση 65%–80% μέσω LEADER ΗΠΕΙΡΟΣ Α.Ε. (1η Πρόσκληση
              545/07-10-2026, προθεσμία 4 Φεβρουαρίου 2027) και μηδενικό κόστος
              αγοράς ακινήτου μέσω Master Lease 9–12 ετών.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-stone-300 space-y-2">
            <div className="text-xs font-mono font-bold text-[#14191f]">
              ΚΑΝΑΛΙ 03 · ΑΜΚΕ «ΤΑΜΕΙΟ ΕΥΕΡΓΕΤΩΝ ΒΡΟΣΙΝΑΣ»
            </div>
            <h3 className="font-serif font-bold text-lg">
              Φοροαπαλλασσόμενη Χορηγία, Ονοματοδοσία (Naming Rights) & ESG
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              100% νόμιμη, διαφανής δωρεά/χορηγία (ΚΦΕ Ν. 4172/2013 Άρθρα 19 &
              22Α) που ξεκλειδώνει πολλαπλάσιους δημόσιους πόρους (μόχλευση 3,2x)
              και παρέχει ισόβια Ονοματοδοσία σε έργα-σύμβολα (Σχολείο, Κελάρι,
              Γεφύρι 1605, Σχολή Πετράδων) και θεσμική δικτύωση κορυφής.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-stone-300 space-y-2">
            <div className="text-xs font-mono font-bold text-[#b85d3b]">
              ΚΑΝΑΛΙ 04 · ΔΙΑΣΠΟΡΑ & FAMILY OFFICES
            </div>
            <h3 className="font-serif font-bold text-lg">
              Μετοχική Συμμετοχή (15%) & Χρηματοδότηση-Γέφυρα (Bridge Finance)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Συν-επένδυση στο μετοχικό κεφάλαιο δίπλα στον Δήμο Ζίτσας (20%)
              και τον Συνεταιρισμό Παραγωγών (30%), με ετήσια απόδοση μερίσματος
              και πλήρη καταστατική προστασία.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Scenarios Table */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Τα 3 Σενάρια Ισολογισμού Έτους 5 (Συντηρητικό, Βασικό, Αισιόδοξο)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THREE_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-white p-5 rounded border border-stone-300 space-y-2 text-xs"
            >
              <div className="font-serif font-bold text-lg text-[#14191f]">
                {sc.name}
              </div>
              <div className="font-mono text-xl font-bold text-[#1f5c43]">
                Κύκλος Εργασιών: {sc.revenueFormatted}
              </div>
              <div className="font-mono text-sm font-bold text-[#b85d3b]">
                EBITDA: {sc.ebitdaRange}
              </div>
              <ul className="space-y-1 text-stone-700 pt-2 border-t border-stone-200 font-mono">
                <li>Γάλα: {sc.milkTons} τόνοι/έτος</li>
                <li>Οίνος: {sc.wineBottles.toLocaleString("el-GR")} φιάλες</li>
                <li>
                  Διανυκτερεύσεις: {sc.overnights.toLocaleString("el-GR")} (
                  {sc.occupancyRate})
                </li>
                <li>Θέσεις Εργασίας: {sc.jobsYear5}</li>
                <li>Κοινωνικό Μέρισμα 15%: {sc.communityDividend15Pct}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Full CAPEX Breakdown */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Αναλυτικός Πίνακας CAPEX 10.450.000 €
        </h2>
        <div className="space-y-4">
          {CAPEX_BREAKDOWN.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded border border-stone-300 overflow-hidden"
            >
              <div className="bg-[#14191f] text-white px-4 py-3 flex justify-between font-serif font-bold text-sm">
                <span>{cat.categoryTitle}</span>
                <span className="font-mono text-[#c89d54]">
                  {cat.subtotalFormatted}
                </span>
              </div>
              <div className="divide-y divide-stone-200 text-xs">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 flex flex-wrap items-center justify-between gap-2"
                  >
                    <span className="font-semibold text-[#14191f]">
                      {item.title}
                    </span>
                    <span className="font-mono text-stone-600">
                      {item.fundingSource} (Ενίσχυση: {item.publicShare}) —{" "}
                      <strong className="text-[#14191f]">
                        {item.amountFormatted}
                      </strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Governance Shield */}
      <section className="bg-[#14191f] text-white rounded p-6 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold">
          Καταστατική «Ασπίδα Προστασίας» Επενδυτών & Κοινότητας (Κεφ. 8)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {GOVERNANCE_SHIELD.clauses.map((cl, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded bg-stone-900 border border-stone-800 space-y-1"
            >
              <div className="font-bold text-[#c89d54]">{cl.title}</div>
              <p className="text-stone-300 leading-relaxed">{cl.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
