import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  INVESTOR_RISK_AND_USE_OF_FUNDS,
  THREE_SCENARIOS,
  GOVERNANCE_SHIELD,
  UNIFIED_GRANT_RATE_TEXT,
  UNIFIED_STRATEGIC_PARTNER_TEXT,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Επενδυτές και Δωρητές",
  description:
    "Για επενδυτές στη Βροσίνα 2031: κίνδυνοι και πώς τους διαχειριζόμαστε, 3 σενάρια ισολογισμού, χρήση κεφαλαίων (10,45 εκ. €, 63% δημόσια / 37% ιδιωτική συμμετοχή), διακυβέρνηση (πλαφόν 40%, υπερπλειοψηφία 75%) και λήψη οικονομικού μοντέλου.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-ependytes",
  },
};

export default function GiaEpendytesPage() {
  return (
    <SeoSubpageShell
      sectionCode="Για επενδυτές"
      categoryLabel="3 Σενάρια · Κίνδυνοι και διαχείριση · Διακυβέρνηση (40% / 75%) · Οικονομικό μοντέλο"
      title="Για Επενδυτές, Στρατηγικούς Εταίρους & Δωρητές"
      subtitle="Επενδυτική παρουσίαση με τρία σενάρια λειτουργίας, ξεκάθαρη αποτύπωση κινδύνων, κανόνες διακυβέρνησης (πλαφόν 40% ανά επενδυτή και υπερπλειοψηφία 75%) και ανοιχτό οικονομικό μοντέλο προς λήψη."
      canonicalPath="/gia-ependytes"
    >
      {/* Γ4: Κίνδυνοι και πώς τους διαχειριζόμαστε (Πρώτη και Κεντρική Ενότητα) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#C89D54] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
            Κίνδυνοι και πώς τους διαχειριζόμαστε
          </h2>
          <div className="flex flex-wrap gap-2">
            <a
              href="/documents/Vrosina_2031_Financial_Model.csv"
              download
              className="px-4 py-2 rounded bg-[#1F5C43] text-white font-semibold text-sm hover:bg-[#174935] transition"
            >
              Λήψη Οικονομικού Μοντέλου (.csv / Excel) ↓
            </a>
            <a
              href="/documents/Vrosina_2031_Partner_LOI_LEADER_Template.docx"
              download
              className="px-4 py-2 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] font-semibold text-sm hover:bg-stone-200 transition"
            >
              Πρότυπο Επιστολής Πρόθεσης (LOI .docx) ↓
            </a>
          </div>
        </div>

        <ul className="space-y-3 text-base text-[#14191F] leading-relaxed">
          <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
            • <strong>Παραχώρηση στρατοπέδου:</strong> δεν έχει ληφθεί ακόμη απόφαση και χωρίς αυτήν το έργο δεν ξεκινά. Γι’ αυτό ζητούμε έγγραφη δέσμευση πριν από κάθε κατάθεση κεφαλαίου.
          </li>
          <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
            • <strong>Χρηματοδότηση LEADER:</strong> η διαδικασία είναι ανταγωνιστική και η ενίσχυση δεν είναι εγγυημένη. Το σχέδιο παρουσιάζεται με τρία σενάρια, ώστε να φαίνεται τι ισχύει και στο συντηρητικό.
          </li>
          <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
            • <strong>Χρονοδιάγραμμα και αδειοδοτήσεις:</strong> εξαρτώνται από αρμόδιες υπηρεσίες και θα αποτυπωθούν στο επόμενο στάδιο.
          </li>
          <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
            • <strong>Ζήτηση και πληρότητα:</strong> οι εκτιμήσεις βασίζονται σε υποθέσεις που δηλώνονται ανοιχτά στο σχέδιο.
          </li>
          <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
            • <strong>Διακυβέρνηση & Ιδιότητα ΜΜΕ:</strong> πλαφόν 40% σε έναν επενδυτή και υπερπλειοψηφία 75% για τις βασικές αποφάσεις, ώστε κανείς να μην ελέγχει μόνος του την κοινότητα. {UNIFIED_STRATEGIC_PARTNER_TEXT}
          </li>
        </ul>

        {/* Α4 & Κ3: Υποχρεωτική Επιφύλαξη & Ενιαίο Κείμενο Ποσοστών Ενίσχυσης */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#A34A2B] text-sm text-[#14191F] leading-relaxed space-y-1.5">
          <p>{UNIFIED_GRANT_RATE_TEXT}</p>
          <p>
            Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
          </p>
        </div>
      </section>

      {/* 2. Χρήση Κεφαλαίων (10,45 εκ. € · 63% Δημόσια / 37% Ιδιωτική Συμμετοχή) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#85611C]">
            Κατανομή Προϋπολογισμού (Εκτιμήσεις του Σχεδίου: 10,45 εκ. €)
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            Πίνακας Χρήσης Κεφαλαίων (63% Δημόσια / 37% Ιδιωτική Συμμετοχή)
          </h2>
        </div>

        <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg overflow-hidden text-sm">
          {INVESTOR_RISK_AND_USE_OF_FUNDS.useOfFundsTimeline.map((row, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#F7F5F0] grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-4 font-serif font-bold text-base text-[#14191F]">
                {row.period}
              </div>
              <div className="md:col-span-4 font-bold text-[#1F5C43]">
                {row.allocation}
              </div>
              <div className="md:col-span-4 text-[#14191F]">{row.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Τα 3 Σενάρια Ισολογισμού Έτους 5 */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#1F5C43]">
            Εκτιμήσεις 5ετίας σε 3 Σενάρια
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            Συντηρητικό, Βασικό & Αισιόδοξο Σενάριο Λειτουργίας (Έτος 5)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THREE_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className={`rounded-lg p-5 border space-y-3 ${
                sc.id === "baseline"
                  ? "bg-[#F7F5F0] border-2 border-[#1F5C43]"
                  : "bg-[#F7F5F0] border-stone-300"
              }`}
            >
              <div className="text-sm font-bold text-[#A34A2B]">{sc.badge}</div>
              <h3 className="font-serif font-bold text-xl text-[#14191F]">
                {sc.name}
              </h3>
              <div className="space-y-1.5 text-sm text-[#14191F] pt-2 border-t border-stone-300">
                <div className="flex justify-between">
                  <span>Ετήσιος Κύκλος Εργασιών:</span>
                  <strong>{sc.revenueFormatted}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ετήσιο EBITDA:</span>
                  <strong className="text-[#1F5C43]">{sc.ebitdaRange}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Επεξεργασία Γάλακτος:</span>
                  <strong>{sc.milkTons} τόνοι/έτος</strong>
                </div>
                <div className="flex justify-between">
                  <span>Παραγωγή Οίνου:</span>
                  <strong>
                    {sc.wineBottles.toLocaleString("el-GR")} φιάλες
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Εκτίμηση Θέσεων Εργασίας:</span>
                  <strong>{sc.jobsYear5} θέσεις</strong>
                </div>
                <div className="flex justify-between">
                  <span>Κοινωνικό Μέρισμα (15%):</span>
                  <strong>{sc.communityDividend15Pct}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Κανόνες Διακυβέρνησης (Πλαφόν 40%, Υπερπλειοψηφία 75%) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          Κανόνες Διακυβέρνησης (Πλαφόν 40% & Υπερπλειοψηφία 75%)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNANCE_SHIELD.clauses.map((cl, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-[#F7F5F0] border border-stone-300 space-y-1"
            >
              <div className="font-serif font-bold text-base text-[#14191F]">
                {idx + 1}. {cl.title}
              </div>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {cl.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Αναλυτικός Πίνακας Τεχνικών & Χρηματοδοτικών Κινδύνων */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1">
          <div className="text-sm font-bold text-[#85611C]">
            Τεχνική & Χρηματοδοτική Διαχείριση Κινδύνων
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            Εξειδίκευση Εναλλακτικών Λύσεων ανά Κίνδυνο
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INVESTOR_RISK_AND_USE_OF_FUNDS.riskMitigationMatrix.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#A34A2B]">
                  Βαθμός: {b.severity}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#14191F]">
                {b.risk}
              </h3>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {b.mitigation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
