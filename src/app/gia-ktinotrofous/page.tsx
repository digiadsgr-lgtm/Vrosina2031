import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  ZERO_CAPITAL_HERDER_GUIDE,
  HOUSING_CATEGORIES,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Κτηνοτρόφους και Κατοίκους της Βροσίνας και της Περιοχής",
  description:
    "Για κτηνοτρόφους και κατοίκους της Βροσίνας: σταθερός αγοραστής γάλακτος με γραπτό συμβόλαιο, συμμετοχή στην Κοιν.Σ.Επ. (ελάχιστη μερίδα 100 €, ένα μέλος = μία ψήφος), οδηγός για νέους παραγωγούς και Μητρώο Κλειστών Κατοικιών.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-ktinotrofous",
  },
};

export default function GiaKtinotrofousPage() {
  return (
    <SeoSubpageShell
      sectionCode="Για κτηνοτρόφους και κατοίκους"
      categoryLabel="Κοιν.Σ.Επ. (μερίδα 100 €) · Οδηγός για νέους παραγωγούς · Κατοικίες"
      title="Για κτηνοτρόφους και κατοίκους της Βροσίνας και της περιοχής"
      subtitle="Η Κοινωνική Συνεταιριστική Επιχείρηση βρίσκεται υπό σύσταση. Το κάλεσμα για ιδρυτικά μέλη είναι ανοιχτό. Η ελάχιστη μερίδα είναι 100 € (ν. 4430/2016)."
      canonicalPath="/gia-ktinotrofous"
    >
      {/* Γ2: Βασικό πλαίσιο σε απλά λόγια (16 px) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#1F5C43] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
            Για κτηνοτρόφους και κατοίκους της Βροσίνας και της περιοχής
          </h2>
          <div className="flex flex-wrap gap-2">
            <a
              href="/documents/Vrosina_2031_KOINSEP_QA_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#1F5C43] text-white font-semibold text-sm hover:bg-[#174935] transition"
            >
              Οδηγός Κοιν.Σ.Επ. (PDF) ↓
            </a>
            <a
              href="#epikinonia"
              className="px-4 py-2 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] font-semibold text-sm hover:bg-stone-200 transition"
            >
              Συμπληρώστε τη φόρμα ↓
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
          {/* Τι κερδίζεις */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#1F5C43]">
              Τι κερδίζεις
            </h3>
            <ul className="space-y-2.5 text-[#14191F] leading-relaxed">
              <li>
                • Στόχος μας είναι σταθερός αγοραστής για το γάλα σου, με γραπτό συμβόλαιο. Την τιμή και τους όρους θα τους μάθεις πρώτος, πριν από οποιαδήποτε δέσμευση.
              </li>
              <li>
                • Μέλος στην κοινότητα: ένα μέλος, μία ψήφος. Αποφασίζεις κι εσύ. Η ελάχιστη μερίδα είναι 100 €.
              </li>
              <li>
                • Δουλειά και ζωή στο χωριό: νέοι άνθρωποι, σπίτια, κίνηση στα μαγαζιά.
              </li>
            </ul>
          </div>

          {/* Τι ζητάμε από σένα */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#A34A2B]">
              Τι ζητάμε από σένα
            </h3>
            <ul className="space-y-2.5 text-[#14191F] leading-relaxed">
              <li>
                • Να μας πεις πόσο γάλα παράγεις και σε ποιον το πουλάς σήμερα.
              </li>
              <li>
                • Να έρθεις στις συναντήσεις που θα οργανώσουμε στο χωριό.
              </li>
            </ul>
            <p className="text-sm text-[#14191F] pt-2 border-t border-stone-300">
              Στόχος μας είναι σταθερή ελάχιστη τιμή με γραπτό συμβόλαιο. Η τιμή και οι όροι θα καθοριστούν πριν από κάθε δέσμευση.
            </p>
          </div>

          {/* Πώς γίνεσαι μέλος */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#14191F]">
              Πώς γίνεσαι μέλος
            </h3>
            <ol className="space-y-2 text-[#14191F] leading-relaxed">
              <li>
                <strong>1.</strong> Συμπληρώνεις τη σύντομη φόρμα.
              </li>
              <li>
                <strong>2.</strong> Σε καλούμε και σου εξηγούμε όλους τους όρους.
              </li>
              <li>
                <strong>3.</strong> Αν συμφωνείς, εγγράφεσαι.
              </li>
            </ol>
            <p className="text-base font-semibold text-[#1F5C43] pt-2 border-t border-stone-300">
              Ερωτήσεις; Συμπλήρωσε τη φόρμα και θα σε καλέσουμε εμείς.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Οδηγός για νέους παραγωγούς + Επιφύλαξη Α4 */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#A34A2B]">
            Οδηγός για νέους παραγωγούς
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            {ZERO_CAPITAL_HERDER_GUIDE.title}
          </h2>
          <p className="text-base text-[#14191F] leading-relaxed">
            {ZERO_CAPITAL_HERDER_GUIDE.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {ZERO_CAPITAL_HERDER_GUIDE.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-serif font-bold text-lg text-[#14191F]">
                  {st.stepNumber}: {st.title}
                </span>
                <span className="px-3 py-1 rounded bg-white border border-stone-300 text-sm font-bold text-[#1F5C43]">
                  {st.amountBadge}
                </span>
              </div>
              <p className="text-base text-[#14191F] leading-relaxed">
                <strong>Πρόγραμμα:</strong> {st.programBadge} — {st.summary}
              </p>
              <p className="text-base text-[#14191F] leading-relaxed">
                <strong>Τι κάνετε:</strong> {st.whatYouDo}
              </p>
              <p className="text-base text-[#14191F] leading-relaxed">
                <strong>Πώς βοηθά η Βροσίνα 2031:</strong> {st.vrosinaAdvantage}
              </p>
            </div>
          ))}
        </div>

        {/* Α4: Υποχρεωτική Επιφύλαξη κάτω από τον οδηγό με ποσά */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#A34A2B] text-sm text-[#14191F] leading-relaxed">
          Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
        </div>
      </section>

      {/* 3. Για κατοίκους και ιδιοκτήτες σπιτιού ή γης (25 κατοικίες) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#1F5C43]">
            Για κατοίκους ή ιδιοκτήτες σπιτιού ή γης
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            Μητρώο Κλειστών Κατοικιών & Μακροχρόνια Μίσθωση (25 Κατοικίες & Ακίνητα)
          </h2>
          <p className="text-base text-[#14191F] leading-relaxed">
            Το σχέδιο προβλέπει αποκατάσταση 20 κατοικιών και 5 καταστημάτων μέσω μακροχρόνιας μίσθωσης (τουλάχιστον 10–15 ετών), με εκτίμηση του σχεδίου 750.000 € για τις κατοικίες και 180.000 € για τα καταστήματα.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOUSING_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3"
            >
              <div className="text-sm font-bold text-[#A34A2B]">{cat.code}</div>
              <h3 className="font-serif font-bold text-lg text-[#14191F]">
                {cat.title}
              </h3>
              <p className="text-base font-bold text-[#1F5C43]">
                Εκτίμηση κόστους: {cat.cost}
              </p>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {cat.works}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#A34A2B] text-sm text-[#14191F] leading-relaxed">
          Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
        </div>
      </section>
    </SeoSubpageShell>
  );
}
