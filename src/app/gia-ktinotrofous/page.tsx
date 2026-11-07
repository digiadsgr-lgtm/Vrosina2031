import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  HOUSING_CATEGORIES,
  ZERO_CAPITAL_HERDER_GUIDE,
  MORPHOLOGICAL_REGULATION_GUIDE,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Κτηνοτρόφους, Αμπελουργούς & Κατοίκους",
  description:
    "Απλός οδηγός για τους κτηνοτρόφους, τους αμπελουργούς και τους ιδιοκτήτες κατοικιών της Βροσίνας: μερίδα 100 €, τιμή γάλακτος, ζωοτροφές χονδρικής & ανακαίνιση σπιτιού.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-ktinotrofous",
  },
};

export default function GiaKtinotrofousPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΚΟΙΝΟ 01 · ΑΓΡΟΤΕΣ, ΒΟΣΚΟΙ & ΙΔΙΟΚΤΗΤΕΣ"
      categoryLabel="ΑΠΛΑ ΕΛΛΗΝΙΚΑ · ΜΕΡΙΔΑ 100 € · ΤΙΜΗ ΓΑΛΑΚΤΟΣ · ΚΑΤΟΙΚΙΕΣ"
      title="Για τους Κτηνοτρόφους, τους Αμπελουργούς και τους Κατοίκους της Βροσίνας"
      subtitle="Όλα όσα χρειάζεται να ξέρετε σε απλά ελληνικά: τι κερδίζετε και τι δίνετε, με ποια τιμή και πότε πληρώνεστε το γάλα, τι ρισκάρετε, πώς ανακαινίζεται το κλειστό σας σπίτι χωρίς δική σας προκαταβολή και με ποιον μιλάτε."
      canonicalPath="/gia-ktinotrofous"
    >
      {/* Top Direct Contact & Printable A4 Callout (Μέρος Β Σελ. 3: Τηλέφωνο/Επικοινωνία στην κορυφή + Εκτυπώσιμο Α4) */}
      <section className="bg-white rounded-lg p-6 border-2 border-[#174935] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="text-sm font-bold text-[#174935]">
            ΜΕ ΠΟΙΟΝ ΜΙΛΑΤΕ (ΧΩΡΙΣ ΦΟΡΜΕΣ ΑΝ ΠΡΟΤΙΜΑΤΕ ΤΗΛΕΦΩΝΟ Ή ΣΥΝΑΝΤΗΣΗ ΣΤΟ ΧΩΡΙΟ)
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            Συντονιστής: Αθανάσιος Βούρδας · Βροσίνα, Δήμος Ζίτσας
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            Μπορείτε να αφήσετε μόνο το όνομα και το τηλέφωνό σας στο τέλος της σελίδας για να σας καλέσουμε εμείς εντός 24 ωρών, ή να τυπώσετε το <strong>Ανοιχτό Κάλεσμα (Α4)</strong> για το καφενείο και την Κοινότητα.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="#subpage-contact"
            className="px-5 py-3 rounded bg-[#174935] text-white font-bold text-base hover:bg-[#123828] transition"
          >
            Ζητήστε να σας Καλέσουμε →
          </a>
          <a
            href="/documents/Vrosina_2031_Village_Briefing.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded bg-[#f7f5f0] border-2 border-[#14191f] text-[#14191f] font-bold text-base hover:bg-stone-200 transition"
          >
            Εκτυπώσιμο Φυλλάδιο Α4 (PDF) ↓
          </a>
        </div>
      </section>

      {/* SECTION A: FOR EXISTING LOCAL HERDERS & VINEYARD GROWERS (5 Clear Lines + Milk Price + Risk) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="border-b border-stone-200 pb-4 space-y-2">
          <div className="text-sm font-bold text-[#9e4727]">
            1. ΕΧΩ ΗΔΗ ΚΟΠΑΔΙ Ή ΑΜΠΕΛΙ ΣΤΗ ΒΡΟΣΙΝΑ ΚΑΙ ΣΤΑ ΓΥΡΩ ΧΩΡΙΑ (ΜΟΛΟΣΣΟΙ / ΖΙΤΣΑ)
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
            Τι Κερδίζεις, Τι Δίνεις, Με Τι Τιμή Πληρώνεσαι & Τι Ρισκάρεις
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            Οι ήδη ενεργοί κτηνοτρόφοι και αμπελουργοί της περιοχής είναι η καρδιά του σχεδίου: εσείς παράγετε τους πρώτους <strong>600 τόνους γάλακτος</strong> του τυροκομείου και κρατάτε το <strong>30%</strong> της εταιρείας μεταποίησης μέσω του συνεταιρισμού.
          </p>
        </div>

        {/* 5 Lines: Τι κερδίζεις */}
        <div className="bg-[#f7f5f0] rounded-lg p-5 sm:p-6 border border-stone-300 space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#14191f]">
            Σε 5 απλές προτάσεις — Τι κερδίζεις ως μέλος:
          </h3>
          <ol className="space-y-2.5 text-base text-stone-900 list-decimal pl-5">
            <li>
              <strong>Σίγουρη απορρόφηση του γάλακτος και του σταφυλιού σου δίπλα στο σπίτι σου:</strong> Το τυροκομείο και το οινοποιείο στο πρώην Στρατόπεδο Βροσίνας παραλαμβάνουν την παραγωγή σου με γραπτό πολυετές συμβόλαιο.
            </li>
            <li>
              <strong>Καλύτερη τιμή γάλακτος + πριμ ποιότητας:</strong> Πληρώνεσαι στη μέση τιμή της Ηπείρου προσαυξημένη κατά <strong>+0,05 € έως +0,08 € το κιλό</strong> (ανάλογα με λιπαρά, πρωτεΐνη και καθαρότητα).
            </li>
            <li>
              <strong>Φθηνότερες ζωοτροφές (12%–18% κάτω):</strong> Ο συνεταιρισμός παραγγέλνει μαζικά καλαμπόκι, τριφύλλι και κριθάρι απευθείας από παραγωγούς, μειώνοντας το μεγαλύτερο έξοδό σου.
            </li>
            <li>
              <strong>Μέρισμα από το τυρί και το κρασί (όχι μόνο από το γάλα):</strong> Ο συνεταιρισμός των παραγωγών κατέχει το <strong>30%</strong> της εταιρείας του τυροκομείου-οινοποιείου, άρα κερδίζεις και από την πώληση του τελικού τυριού.
            </li>
            <li>
              <strong>Δωρεάν σύνταξη φακέλου για εκσυγχρονισμό στάβλου:</strong> Η ομάδα του συνεταιρισμού ετοιμάζει τον φάκελό σου για επιδότηση 50%–70% (Σχέδια Βελτίωσης) για αρμεκτήριο, παγολεκάνη ή επέκταση στάβλου.
            </li>
          </ol>
        </div>

        {/* 4 Key Questions Box: Πώς γίνεσαι μέλος / Τιμή & Πληρωμή / Τι ρισκάρεις / Πώς απαντάμε */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-lg bg-white border border-stone-300 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#174935]">
              Πώς γίνεσαι μέλος & τι δίνεις;
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              • <strong>Αρχική δήλωση ενδιαφέροντος:</strong> <strong>0 € (εντελώς δωρεάν)</strong>.<br />
              • <strong>Εγγραφή στην Κοιν.Σ.Επ.:</strong> Όταν ιδρυθεί επίσημα ο φορέας, πληρώνεις μία φορά <strong>100 € για 1 συνεταιριστική μερίδα</strong> (ένα μέλος = μία ψήφος στη Γενική Συνέλευση, ανεξάρτητα από το μέγεθος του κοπαδιού).
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-stone-300 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#174935]">
              Με τι τιμή θα πληρώνομαι και πότε;
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              • <strong>Φόρμουλα τιμής:</strong> Μέση τιμή ζώνης Ηπείρου (ΕΛΓΟ-ΔΗΜΗΤΡΑ) <strong>+ 0,05 € έως +0,08 €/κιλό</strong> πριμ ποιότητας.<br />
              • <strong>Πότε ανακοινώνεται:</strong> Ο ετήσιος τιμοκατάλογος και η ελάχιστη τιμή βάσης ανακοινώνονται κάθε <strong>1η Οκτωβρίου</strong> πριν την έναρξη της γαλακτοκομικής περιόδου.<br />
              • <strong>Εξόφληση:</strong> Κάθε <strong>30 ημέρες</strong> με τραπεζική κατάθεση.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-stone-300 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#9e4727]">
              Τι ρισκάρω; (Βάζω υποθήκη το κοπάδι ή το χωράφι μου;)
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              <strong>Δεν βάζεις καμία υποθήκη.</strong> Τα ζώα σου, ο στάβλος σου και τα χωράφια σου παραμένουν 100% δικά σου. Η ευθύνη σου στη συνεταιριστική επιχείρηση περιορίζεται αποκλειστικά στη μερίδα των <strong>100 €</strong> (Ν. 4430/2016).
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-stone-300 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#14191f]">
              Πώς απαντάτε αν θέλω να συμμετάσχω;
            </h3>
            <p className="text-base text-stone-800 leading-relaxed">
              Συμπληρώνεις το όνομα και το τηλέφωνό σου στη φόρμα στο τέλος της σελίδας ή παίρνεις το έντυπο από την Κοινότητα/καφενείο. Σε καλούμε τηλεφωνικά εντός 24 ωρών και κλείνουμε συνάντηση από κοντά στη Βροσίνα.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION B: FOR HOMEOWNERS (ΚΛΕΙΣΤΑ ΣΠΙΤΙΑ & ΜΑΓΑΖΙΑ) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="border-b border-stone-200 pb-4 space-y-2">
          <div className="text-sm font-bold text-[#174935]">
            2. ΕΧΩ ΚΛΕΙΣΤΟ ΣΠΙΤΙ, ΠΑΤΡΙΚΟ Ή ΚΑΤΑΣΤΗΜΑ ΣΤΗ ΒΡΟΣΙΝΑ
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
            Ανακαίνιση 20.000 €–50.000 € Χωρίς Δική σου Προκαταβολή (Μίσθωση 10–15 Ετών)
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            Αν έχεις κλειστό σπίτι που φθείρεται επειδή η ανακαίνιση πέτρας και στέγης είναι ακριβή, ο φορέας του «Βροσίνα 2031» αναλαμβάνει τη μελέτη, τις άδειες και την ανακαίνιση μέσω <strong>10–15ετούς μίσθωσης</strong>, χωρίς να χάσεις ποτέ την ιδιοκτησία σου.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOUSING_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#f7f5f0] rounded-lg p-5 border border-stone-300 space-y-3"
            >
              <div className="text-sm font-bold text-[#9e4727]">{cat.code}</div>
              <h3 className="font-serif font-bold text-lg text-[#14191f]">
                {cat.title}
              </h3>
              <div className="text-2xl font-bold text-[#174935]">
                {cat.cost} / κατοικία
              </div>
              <p className="text-base text-stone-800 leading-relaxed">
                {cat.works}
              </p>
              <div className="pt-3 border-t border-stone-300 space-y-1 text-sm">
                <div>
                  <strong>Επιδότηση:</strong> {cat.subsidy}
                </div>
                <div className="text-[#9e4727] font-bold">
                  <strong>Δική σου προκαταβολή:</strong> {cat.ownerOutOfPocket}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: PLAIN-GREEK GLOSSARY OF TERMS (Μέρος Β Σελ. 3: Εξήγηση όρων με απλά λόγια) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Τι σημαίνουν οι όροι που ακούτε στα προγράμματα (με απλά λόγια)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300">
            <strong>• ΟΣΔΕ (Δήλωση Καλλιέργειας / Ζώων):</strong> Η ετήσια δήλωση που κάνει κάθε αγρότης και βοσκός για το πόσα ζώα ή στρέμματα έχει, ώστε να παίρνει τις επιδοτήσεις του.
          </div>
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300">
            <strong>• Νέοι Γεωργοί (Πρόγραμμα Π3-75.1):</strong> Το κρατικό πρόγραμμα που δίνει εφάπαξ πριμ έως 32.500 € (χωρίς επιστροφή) σε όσους ξεκινούν για πρώτη φορά αγροτική ή κτηνοτροφική εκμετάλλευση.
          </div>
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300">
            <strong>• Τυπική Απόδοση (12.000 €):</strong> Το ελάχιστο μέγεθος παραγωγής που ζητά το κράτος για να σε θεωρήσει επαγγελματία κτηνοτρόφο (αντιστοιχεί περίπου σε 75–95 πρόβατα ή γίδια).
          </div>
          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300">
            <strong>• Μακροχρόνια Μίσθωση (Master Lease 10–15 ετών):</strong> Ενοικιαστήριο συμβόλαιο 10 έως 15 ετών, με το οποίο ο φορέας ανακαινίζει το κλειστό σου σπίτι και κρατά από τα ενοίκια το μη επιδοτούμενο μέρος της επισκευής.
          </div>
        </div>
      </section>

      {/* SECTION D: FOR NEW HERDERS COMING TO VROSINA (5-Step Guide) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="space-y-2 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#174935]">
            3. ΘΕΛΩ ΝΑ ΕΡΘΩ ΣΤΗ ΒΡΟΣΙΝΑ ΚΑΙ ΝΑ ΓΙΝΩ ΝΕΟΣ ΚΤΗΝΟΤΡΟΦΟΣ ΑΠΟ ΤΟ ΜΗΔΕΝ
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#14191f]">
            {ZERO_CAPITAL_HERDER_GUIDE.title}
          </h2>
          <p className="text-base text-stone-800 leading-relaxed">
            {ZERO_CAPITAL_HERDER_GUIDE.subtitle}
          </p>
        </div>

        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#9e4727] text-base text-stone-900 leading-relaxed">
          {ZERO_CAPITAL_HERDER_GUIDE.eligibilityDisclaimer}
        </div>

        <div className="space-y-4">
          {ZERO_CAPITAL_HERDER_GUIDE.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14191f]">
                  {st.stepNumber}: {st.title}
                </h3>
                <span className="px-3 py-1 rounded bg-emerald-100 text-[#174935] text-sm font-bold">
                  {st.amountBadge}
                </span>
              </div>
              <p className="text-base text-stone-800 leading-relaxed">
                {st.summary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-base">
                <div className="p-3.5 rounded bg-white border border-stone-200">
                  <strong className="text-[#9e4727] block mb-1">
                    Τι κάνεις:
                  </strong>
                  {st.whatYouDo}
                </div>
                <div className="p-3.5 rounded bg-white border border-stone-200">
                  <strong className="text-[#174935] block mb-1">
                    Το κέρδος σου:
                  </strong>
                  {st.yourGain}
                </div>
                <div className="p-3.5 rounded bg-white border border-stone-300">
                  <strong className="text-[#14191f] block mb-1">
                    Πώς σε στηρίζει το «Βροσίνα 2031»:
                  </strong>
                  {st.vrosinaAdvantage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION E: MORPHOLOGICAL REGULATION SUMMARY */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#9e4727]">
          4. ΠΟΛΕΟΔΟΜΙΚΟΙ ΚΑΝΟΝΕΣ & ΠΑΡΑΔΟΣΙΑΚΗ ΦΥΣΙΟΓΝΩΜΙΑ ΒΡΟΣΙΝΑΣ
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          {MORPHOLOGICAL_REGULATION_GUIDE.title}
        </h2>
        <p className="text-base text-stone-800 leading-relaxed">
          {MORPHOLOGICAL_REGULATION_GUIDE.howVrosina2031SolvesIt}
        </p>
      </section>
    </SeoSubpageShell>
  );
}
