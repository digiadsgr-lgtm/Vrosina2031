import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  CAPEX_BREAKDOWN,
  THREE_SCENARIOS,
  GOVERNANCE_SHIELD,
  INVESTOR_RISK_AND_USE_OF_FUNDS,
  ABOUT_US_AND_STATUS,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Επενδυτές & Χορηγούς — Φάκελος Έργου",
  description:
    "Επενδυτική θέση, αίτημα συμμετοχής, 3 σενάρια ισολογισμού, πίνακας κινδύνων, χρήση κεφαλαίων, δομή εξόδου και λήψη οικονομικού μοντέλου για το «Βροσίνα 2031».",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-ependytes",
  },
};

export default function GiaEpendytesPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΚΟΙΝΟ 03 · ΕΠΕΝΔΥΤΕΣ, ΣΤΡΑΤΗΓΙΚΟΙ ΕΤΑΙΡΟΙ & ΧΟΡΗΓΟΙ"
      categoryLabel="CAPEX 10,45 ΕΚ. € · 3 ΣΕΝΑΡΙΑ · ΚΙΝΔΥΝΟΙ & ΕΞΟΔΟΣ"
      title="Για Επενδυτές, Στρατηγικούς Εταίρους Αγροδιατροφής & Δωρητές"
      subtitle="Συνοπτική επενδυτική θέση σε μία σελίδα, το αίτημα κεφαλαίου ανά ρόλο, τα 3 σενάρια ισολογισμού με τις παραδοχές τους, η χρήση κεφαλαίων, ο πίνακας κινδύνων και μετριασμού, η καταστατική δομή και τα αρχεία ελέγχου (Due Diligence)."
      canonicalPath="/gia-ependytes"
    >
      {/* 1. Investment Thesis & Downloads Bar */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191f] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="text-sm font-bold text-[#174935]">
              1. ΕΠΕΝΔΥΤΙΚΗ ΘΕΣΗ & ΑΡΧΕΙΑ ΕΛΕΓΧΟΥ (DUE DILIGENCE)
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
              Το Έργο σε Μία Σελίδα & Λήψη Οικονομικού Μοντέλου
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="/documents/Vrosina_2031_Financial_Model.csv"
              download
              className="px-4 py-2.5 rounded bg-[#174935] text-white font-semibold text-sm hover:bg-[#123828] transition"
            >
              Λήψη Οικονομικού Μοντέλου (.csv / Excel) ↓
            </a>
            <a
              href="/documents/Vrosina_2031_Plan_In_5_Steps.pdf"
              download
              className="px-4 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
            >
              Λήψη Teaser Σύνοψης (.pdf) ↓
            </a>
            <a
              href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
              download
              className="px-4 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
            >
              Πλήρες Business Plan (20 σελ. PDF) ↓
            </a>
          </div>
        </div>

        <p className="text-base text-stone-800 leading-relaxed">
          Το <strong>«Βροσίνα 2031»</strong> είναι ένα πενταετές πρόγραμμα παραγωγικής και οικιστικής ανασυγκρότησης συνολικού προϋπολογισμού <strong>10.450.000 €</strong> στη Βροσίνα του Δήμου Ζίτσας Ιωαννίνων (35–40 λεπτά από τα Ιωάννινα επί του άξονα Ιωαννίνων–Ηγουμενίτσας). Συνδυάζει <strong>63% δημόσιους και ευρωπαϊκούς πόρους (6,58 εκ. €)</strong> και <strong>37% ιδιωτικά και συνεταιριστικά κεφάλαια (3,87 εκ. €)</strong>. Οι παραγωγικές επενδύσεις αναπτύσσονται γύρω από το πρώην Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ., υπό αίτημα 25ετούς παραχώρησης από το Τ.Α.ΕΘ.Α.) με αντικείμενο την τυροκόμηση 600 τόνων αιγοπρόβειου γάλακτος/έτος, την οινοποίηση 45.000 φιαλών Ντεμπίνας/έτος και τη λειτουργία 10 ξενώνων (40 κλινών).
        </p>

        {/* The Ask: 3 Clear Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2">
            <div className="text-sm font-bold text-[#9e4727]">
              ΡΟΛΟΣ Α · ΣΤΡΑΤΗΓΙΚΟΣ ΕΤΑΙΡΟΣ ΜΕΤΑΠΟΙΗΣΗΣ
            </div>
            <h3 className="font-serif font-bold text-lg text-[#14191f]">
              Συμμετοχή έως 35%–40% στην Εμπορική Θυγατρική
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              • <strong>Αντικείμενο:</strong> Τυροκομείο (1,65 εκ. €) & Οινοποιείο (1,00 εκ. €) = 2,65 εκ. €.<br />
              • <strong>Επιδότηση CAPEX:</strong> 50%–75% (Π3-73-4.2 ΣΣ ΚΑΠ / Αναπτυξιακός Ν. 4887/2022).<br />
              • <strong>Απαιτούμενα Ίδια Κεφάλαια Εταίρου:</strong> ~300.000 € έως 450.000 €.<br />
              • <strong>Εκτιμώμενη Απόσβεση:</strong> 6,5 έως 8,5 έτη από την έναρξη της επένδυσης (συμπεριλαμβανομένης της 2ετούς κατασκευής).
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2">
            <div className="text-sm font-bold text-[#174935]">
              ΡΟΛΟΣ Β · ΕΠΕΝΔΥΤΗΣ ΦΙΛΟΞΕΝΙΑΣ (LEADER)
            </div>
            <h3 className="font-serif font-bold text-lg text-[#14191f]">
              Ανάπτυξη 1 έως 3 Παραδοσιακών Ξενώνων
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              • <strong>Αντικείμενο:</strong> Ξενώνες 4 κλινών (100.000 € CAPEX ανά ξενώνα) μέσω 10–15ετούς μίσθωσης ακινήτου.<br />
              • <strong>Επιδότηση CAPEX:</strong> Έως 65%–80% (LEADER ΗΠΕΙΡΟΣ Α.Ε.).<br />
              • <strong>Ίδια Κεφάλαια:</strong> 20.000 € έως 35.000 € ανά ξενώνα.<br />
              • <strong>Εκτιμώμενη Απόσβεση:</strong> 3,5 έως 5 έτη λειτουργίας (σε μέση πληρότητα 22%).
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2">
            <div className="text-sm font-bold text-[#14191f]">
              ΡΟΛΟΣ Γ · ΔΩΡΗΤΗΣ / ΕΥΕΡΓΕΤΗΣ (ΑΜΚΕ)
            </div>
            <h3 className="font-serif font-bold text-lg text-[#14191f]">
              Ταμείο Ευεργετών Βροσίνας (Χορηγία / ESG)
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              • <strong>Αντικείμενο:</strong> Δωρεές για τη Σχολή Πετράδων (280.000 €), το Δημοτικό Σχολείο, τις αποκαταστάσεις κατοικιών και τις εγγυήσεις-γέφυρες νέων κτηνοτρόφων.<br />
              • <strong>Νομικό Πλαίσιο:</strong> Φορολογική έκπτωση δωρεών (Ν. 4172/2013 άρθρα 19 & 22Α) και ονοματοδοσία επιμέρους υποδομών.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Three Financial Scenarios & Key Assumptions */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#174935]">
            2. ΤΑ 3 ΣΕΝΑΡΙΑ ΙΣΟΛΟΓΙΣΜΟΥ ΣΤΟ ΕΤΟΣ 5 & ΒΑΣΙΚΕΣ ΠΑΡΑΔΟΧΕΣ (ΚΕΦΑΛΑΙΟ 12)
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            Συντηρητικό, Βασικό και Αισιόδοξο Σενάριο Λειτουργίας
          </h2>
          <p className="text-base text-stone-700">
            Το σχέδιο παραμένει λειτουργικά κερδοφόρο ακόμα και στο συντηρητικό σενάριο (400 τόνοι γάλακτος/έτος και μόλις 14% μέση ετήσια πληρότητα ξενώνων).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THREE_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-[#f7f5f0] p-5 rounded-lg border border-stone-300 space-y-3 text-base"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-xl text-[#14191f]">
                  {sc.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-white border border-stone-300 text-sm font-semibold text-[#9e4727]">
                  {sc.badge}
                </span>
              </div>
              <div className="text-xl font-bold text-[#174935]">
                Κύκλος Εργασιών: {sc.revenueFormatted}
              </div>
              <div className="text-base font-bold text-[#9e4727]">
                EBITDA: {sc.ebitdaRange}
              </div>
              <ul className="space-y-1.5 text-stone-800 pt-3 border-t border-stone-300 text-sm">
                <li>• Επεξεργασία γάλακτος: <strong>{sc.milkTons} τόνοι/έτος</strong></li>
                <li>• Παραγωγή οίνου: <strong>{sc.wineBottles.toLocaleString("el-GR")} φιάλες/έτος</strong></li>
                <li>
                  • Διανυκτερεύσεις: <strong>{sc.overnights.toLocaleString("el-GR")} ({sc.occupancyRate})</strong>
                </li>
                <li>• Άμεσες Θέσεις Εργασίας: <strong>{sc.jobsYear5} ΙΠΑ</strong></li>
                <li>• Κοινωνικό Μέρισμα 15%: <strong>{sc.communityDividend15Pct}</strong></li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Counterparty, Use of Funds Timeline & 4-Row Risk Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white rounded-lg p-6 border border-stone-300 space-y-4">
          <div className="text-sm font-bold text-[#174935]">
            3. ΑΝΤΙΣΥΜΒΑΛΛΟΜΕΝΟΣ & ΧΡΗΣΗ ΚΕΦΑΛΑΙΩΝ
          </div>
          <h2 className="font-serif text-xl font-bold text-[#14191f]">
            Με Ποιον Συμβάλλεστε & Χρονοδιάγραμμα Εκταμιεύσεων
          </h2>
          <p className="text-base text-stone-800 leading-relaxed bg-[#f7f5f0] p-4 rounded border border-stone-300">
            {INVESTOR_RISK_AND_USE_OF_FUNDS.counterpartyNote}
          </p>

          <div className="space-y-3">
            {INVESTOR_RISK_AND_USE_OF_FUNDS.useOfFundsTimeline.map((uf, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1 text-sm"
              >
                <div className="font-bold text-[#14191f]">{uf.period}</div>
                <div className="font-bold text-[#174935]">{uf.allocation}</div>
                <div className="text-stone-700">Πηγές: {uf.source}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-lg p-6 border border-stone-300 space-y-4">
          <div className="text-sm font-bold text-[#9e4727]">
            4. ΠΙΝΑΚΑΣ ΚΙΝΔΥΝΩΝ, ΜΕΤΡΙΑΣΜΟΥ (PLAN B) & ΕΞΟΔΟΥ (EXIT STRATEGY)
          </div>
          <h2 className="font-serif text-xl font-bold text-[#14191f]">
            Ανάλυση Βασικών Κινδύνων και Συμβατικών Δικλείδων
          </h2>
          <div className="space-y-3">
            {INVESTOR_RISK_AND_USE_OF_FUNDS.riskMitigationMatrix.map((rk, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5 text-base"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-[#14191f]">{rk.risk}</strong>
                  <span className="px-2.5 py-0.5 rounded bg-white border border-stone-300 text-sm font-semibold text-[#9e4727]">
                    Βαρύτητα: {rk.severity}
                  </span>
                </div>
                <p className="text-stone-800 text-sm leading-relaxed">
                  <strong className="text-[#174935]">Αντιμετώπιση / Plan B:</strong>{" "}
                  {rk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Governance Structure & Team */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#14191f]">
            5. ΔΟΜΗ ΔΙΑΚΥΒΕΡΝΗΣΗΣ & ΟΜΑΔΑ ΣΥΝΤΟΝΙΣΜΟΥ
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            Οι 6 Καταστατικές Ρήτρες & Ταυτότητα Φορέα
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNANCE_SHIELD.clauses.map((cl, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1 text-base"
            >
              <div className="font-bold text-[#14191f]">{cl.title}</div>
              <p className="text-sm text-stone-800 leading-relaxed">{cl.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded bg-[#f7f5f0] border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-serif font-bold text-lg text-[#14191f]">
              Συντονιστής: {ABOUT_US_AND_STATUS.coordinatorCard.name} ({ABOUT_US_AND_STATUS.coordinatorCard.role})
            </div>
            <p className="text-sm text-stone-700">
              {ABOUT_US_AND_STATUS.coordinatorCard.bio}
            </p>
          </div>
          <a
            href="/poioi-eimaste"
            className="px-4 py-2.5 rounded bg-[#14191f] text-white text-sm font-semibold shrink-0 hover:bg-[#174935] transition"
          >
            Ποιοι είμαστε & Πορεία Έργου →
          </a>
        </div>
      </section>

      {/* 6. Full CAPEX Breakdown */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          6. Αναλυτικός Πίνακας Προϋπολογισμού CAPEX (10.450.000 €)
        </h2>
        <div className="space-y-4">
          {CAPEX_BREAKDOWN.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg border border-stone-300 overflow-hidden"
            >
              <div className="bg-[#14191f] text-white px-5 py-3 flex justify-between font-serif font-bold text-base">
                <span>{cat.categoryTitle}</span>
                <span className="text-[#c89d54]">{cat.subtotalFormatted}</span>
              </div>
              <div className="divide-y divide-stone-200 text-sm">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 flex flex-wrap items-center justify-between gap-2"
                  >
                    <span className="font-semibold text-[#14191f]">
                      {item.title}
                    </span>
                    <span className="text-stone-700">
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
    </SeoSubpageShell>
  );
}
