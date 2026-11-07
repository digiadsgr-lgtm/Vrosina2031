import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  PUBLIC_FISCAL_BENEFIT_STUDY,
  FOURTEEN_FUNDING_TOOLS_DOC,
  INSTITUTIONAL_ROLES_MATRIX,
  UNIFIED_CONCESSION_TEXT,
  UNIFIED_GRANT_RATE_TEXT,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Φορείς και Πολιτεία",
  description:
    "Για φορείς και Πολιτεία στη Βροσίνα 2031: τι ζητάμε και τι δεν ζητάμε, πώς λειτουργούμε, μελέτη δημοσιονομικού οφέλους (463.700 €/έτος), οι φορείς και οι ρόλοι, νόμοι και χρηματοδότηση.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-foreis",
  },
};

export default function GiaForeisPage() {
  return (
    <SeoSubpageShell
      sectionCode="Για φορείς και Πολιτεία"
      categoryLabel="Τι ζητάμε και τι δεν ζητάμε · Όφελος Δημοσίου · Οι φορείς και οι ρόλοι · Νόμοι και χρηματοδότηση"
      title="Για Φορείς, τον Δήμο Ζίτσας & την Πολιτεία"
      subtitle={UNIFIED_CONCESSION_TEXT}
      canonicalPath="/gia-foreis"
    >
      {/* Γ5: Τι ζητάμε και τι δεν ζητάμε */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191F] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
            Τι ζητάμε και τι δεν ζητάμε
          </h2>
          <a
            href="/documents/Vrosina_2031_What_The_State_Gains.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#1F5C43] text-white font-semibold text-sm hover:bg-[#174935] transition"
          >
            Μελέτη Δημοσιονομικού Οφέλους (PDF) ↓
          </a>
        </div>

        <div className="p-5 rounded-lg bg-[#F7F5F0] border-l-4 border-[#A34A2B] text-lg font-bold text-[#14191F]">
          Δεν ζητάμε από το Δημόσιο να χρηματοδοτήσει τη λειτουργία του έργου.
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-[#14191F]">
            Ζητάμε:
          </h3>
          <ul className="space-y-2.5 text-base text-[#14191F] leading-relaxed">
            <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
              • <strong>Από το Δήμο Ζίτσας:</strong> θεσμική στήριξη της πρωτοβουλίας.
            </li>
            <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
              • <strong>Από το φορέα που διαχειρίζεται το στρατόπεδο (Τ.Α.ΕΘ.Α. / ΥΠΕΘΑ / Δήμος Ζίτσας):</strong> {UNIFIED_CONCESSION_TEXT} Δεν έχει ληφθεί ακόμη απόφαση.
            </li>
            <li className="p-4 rounded bg-[#F7F5F0] border border-stone-300">
              • <strong>Από κάθε αρμόδιο φορέα:</strong> συμμετοχή στη διαβούλευση και ενημέρωση για τα αδειοδοτικά βήματα. Προτείνουμε επίσης συνεργασία με τη Γαλακτοκομική Σχολή Ιωαννίνων για εκπαίδευση και μεταφορά τεχνογνωσίας.
            </li>
          </ul>
        </div>

        <p className="text-base font-semibold text-[#1F5C43]">
          Ο χρονικός ορίζοντας της πρόσκλησης LEADER (545/07-10-2026, προθεσμία 4/2/2027) καθορίζει τη σειρά των ενεργειών.
        </p>
      </section>

      {/* Α3: Δημόσια σύνοψη «Πώς λειτουργούμε» */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-3">
        <div className="text-sm font-bold text-[#1F5C43]">
          Θεσμική Διαφάνεια & Υπερκομματικός Χαρακτήρας
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          Πώς λειτουργούμε
        </h2>
        <p className="text-base text-[#14191F] leading-relaxed">
          Η Βροσίνα 2031 είναι μια μη κομματική πρωτοβουλία για την αναγέννηση του χωριού. Απευθυνόμαστε σε όλους τους φορείς, ανεξάρτητα από παράταξη, με το ίδιο αίτημα και το ίδιο υλικό. Δεν ζητάμε από το Δημόσιο να αναλάβει το κόστος της λειτουργίας. Ζητάμε θεσμική και αδειοδοτική στήριξη για ένα έργο που, με βάση τις εκτιμήσεις μας, αποδίδει στο Δημόσιο έσοδα και θέσεις εργασίας. Οι αποφάσεις της κοινότητας λαμβάνονται με ένα μέλος, μία ψήφο. Όλα τα έγγραφα βρίσκονται στο Κέντρο Τεκμηρίωσης.
        </p>
      </section>

      {/* 3. Δημοσιονομικό Όφελος: Τι κερδίζει το Δημόσιο (463.700 €/έτος) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#1F5C43]">
            Δημοσιονομικό Ισοζύγιο & Εκτιμώμενα Έσοδα Δημοσίου
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            {PUBLIC_FISCAL_BENEFIT_STUDY.title}
          </h2>
          <p className="text-base text-[#14191F] leading-relaxed">
            {PUBLIC_FISCAL_BENEFIT_STUDY.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PUBLIC_FISCAL_BENEFIT_STUDY.headlineMetrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-1"
            >
              <div className="text-2xl font-bold text-[#1F5C43]">{m.value}</div>
              <div className="font-serif font-bold text-base text-[#14191F]">
                {m.label}
              </div>
              <p className="text-sm text-[#14191F]">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Σ5: Διευκρίνιση ονομαστικών ποσών χωρίς προεξόφληση & χρόνου απόσβεσης */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#C89D54] text-sm text-[#14191F] leading-relaxed">
          Ονομαστικά ποσά, χωρίς προεξόφληση. Ο χρόνος απόσβεσης 6–10 ετών αφορά το εθνικό σκέλος με υπόθεση συγχρηματοδότησης Ε.Ε. 50–75% και δεν είναι εγγυημένος.
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#14191F]">
            Αναλυτικός Υπολογισμός Ετήσιων Άμεσων Εσόδων Δημοσίου (Εκτίμηση Βασικού Σεναρίου: 463.700 €/έτος)
          </h3>
          <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg overflow-hidden">
            {PUBLIC_FISCAL_BENEFIT_STUDY.annualRevenueBreakdown.map((st, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F7F5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-serif font-bold text-base text-[#14191F]">
                    {idx + 1}. {st.source}
                  </div>
                  <div className="text-sm text-[#14191F]">
                    {st.calculationBasis}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-[#1F5C43]">
                    {st.annualAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Οι φορείς και οι ρόλοι + Νόμοι και χρηματοδότηση (Κεφ. Β) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          Οι φορείς και οι ρόλοι · Νόμοι και χρηματοδότηση
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INSTITUTIONAL_ROLES_MATRIX.map((inst, idx) => (
            <div
              key={idx}
              className="bg-[#F7F5F0] rounded-lg p-5 border border-stone-300 space-y-2.5 text-sm"
            >
              <div className="font-bold text-[#A34A2B]">{inst.entityCode}</div>
              <h3 className="font-serif font-bold text-lg text-[#14191F]">
                {inst.entityName}
              </h3>
              <ul className="space-y-1.5 text-[#14191F]">
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
                <div className="font-serif font-bold text-base text-[#14191F]">
                  #{f.num} · {f.toolName}
                </div>
                <div className="text-[#14191F]">{f.legalRef}</div>
              </div>
              <div className="md:col-span-3 text-[#14191F]">
                {f.targetProject}
              </div>
              <div className="md:col-span-2 font-bold text-[#1F5C43]">
                {f.grantRate}
              </div>
              <div className="md:col-span-3 text-[#14191F]">{f.whoApplies}</div>
            </div>
          ))}
        </div>

        {/* Α4 & Κ3: Υποχρεωτική Επιφύλαξη & Ενιαίο Κείμενο Ποσοστών Ενίσχυσης */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#A34A2B] text-sm text-[#14191F] leading-relaxed space-y-1.5">
          <p>{UNIFIED_GRANT_RATE_TEXT}</p>
          <p>
            Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
          </p>
        </div>
      </section>
    </SeoSubpageShell>
  );
}
