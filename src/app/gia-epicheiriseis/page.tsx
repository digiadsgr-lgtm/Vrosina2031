import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  BUSINESS_THREE_PATHS,
  UNIFIED_GRANT_RATE_TEXT,
  UNIFIED_STRATEGIC_PARTNER_TEXT,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Ευκαιρίες για Επιχειρήσεις στη Βροσίνα 2031",
  description:
    "Ευκαιρίες για επιχειρήσεις στη Βροσίνα 2031: 10 ξενώνες, 5 καταστήματα, έργα αποκατάστασης κτιρίων (750.000 €, 350.000 €, 180.000 €), φωτοβολταϊκό και στρατηγικές συνεργασίες μεταποίησης.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-epicheiriseis",
  },
};

export default function GiaEpicheiriseisPage() {
  return (
    <SeoSubpageShell
      sectionCode="Για επιχειρήσεις"
      categoryLabel="10 ξενώνες · 5 καταστήματα · Τεχνικά έργα · Στρατηγικές συνεργασίες"
      title="Ευκαιρίες για επιχειρήσεις στη Βροσίνα 2031"
      subtitle="Είμαστε στη φάση προετοιμασίας. Δίνουμε το πλαίσιο και τις εκτιμήσεις του σχεδίου. Η επιλογή των ενδιαφερομένων θα γίνει με ανοιχτή πρόσκληση και δημόσια κριτήρια."
      canonicalPath="/gia-epicheiriseis"
    >
      {/* Γ3: Το επίσημο κείμενο της σελίδας «Για επιχειρήσεις» */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#B85D3B] space-y-6">
        <div className="space-y-2 border-b border-stone-200 pb-4">
          <p className="font-serif text-lg sm:text-xl italic text-[#A34A2B]">
            «Για να έρθει κάποιος δεν αρκεί ούτε η μονή ούτε το γεφύρι. Πρέπει να έχει να φάει, να ψωνίσει, να μείνει.» — «Αν το χωριό δεν έχει καφενείο, δεν είναι χωριό.»
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
            Τρεις Διαδρομές Συμμετοχής για Επιχειρήσεις & Επαγγελματίες
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
          {/* 1. Θέλω να ανοίξω δική μου επιχείρηση */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#A34A2B]">
              Θέλω να ανοίξω δική μου επιχείρηση
            </h3>
            <ul className="space-y-2.5 text-[#14191F] leading-relaxed">
              <li>
                • 10 ξενώνες (εκτίμηση του σχεδίου: περίπου 100.000 € ο καθένας, με δυνατότητα ενίσχυσης από το LEADER)
              </li>
              <li>• 5 καταστήματα</li>
            </ul>
          </div>

          {/* 2. Θέλω να κατασκευάσω ή να προμηθεύσω */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#1F5C43]">
              Θέλω να κατασκευάσω ή να προμηθεύσω
            </h3>
            <ul className="space-y-2.5 text-[#14191F] leading-relaxed">
              <li>
                • Αποκατάσταση κτιρίων: τρία έργα, με εκτιμήσεις του σχεδίου 750.000 €, 350.000 € και 180.000 €, για τοπικούς εργολάβους και τεχνίτες πέτρας.
              </li>
              <li>
                • Φωτοβολταϊκό και προμήθειες για τη λειτουργία του χωριού.
              </li>
            </ul>
          </div>

          {/* 3. Θέλω στρατηγική συνεργασία */}
          <div className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#14191F]">
              Θέλω στρατηγική συνεργασία
            </h3>
            <ul className="space-y-2.5 text-[#14191F] leading-relaxed">
              <li>
                • Συνεργασίες με επιχειρήσεις μεταποίησης (τυροκομείο, οινοποιείο), με συμμετοχή του εταίρου στην εταιρεία λειτουργίας.
              </li>
              <li>• {UNIFIED_STRATEGIC_PARTNER_TEXT}</li>
            </ul>
            <p className="text-sm text-[#14191F] pt-2 border-t border-stone-300">
              {UNIFIED_GRANT_RATE_TEXT}
            </p>
          </div>
        </div>

        {/* Τι ισχύει σήμερα */}
        <div className="p-5 rounded-lg bg-[#F7F5F0] border-l-4 border-[#14191F] space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#14191F]">
            Τι ισχύει σήμερα
          </h3>
          <p className="text-base text-[#14191F] leading-relaxed">
            Είμαστε στη φάση προετοιμασίας. Δίνουμε το πλαίσιο και τις εκτιμήσεις του σχεδίου. Οι τελικές τιμές, οι όροι και τα οικονομικά στοιχεία κάθε επένδυσης θα καθοριστούν στο επόμενο στάδιο, από τους αρμόδιους φορείς και συμβούλους. Η επιλογή των ενδιαφερομένων θα γίνει με ανοιχτή πρόσκληση και δημόσια κριτήρια. Δηλώστε ενδιαφέρον από τη φόρμα.
          </p>
        </div>
      </section>

      {/* Αναλυτικές Ενότητες Εκτιμήσεων Σχεδίου (Καταστήματα, Έργα, Συνεργασίες) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-6">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#A34A2B]">
            Εκτιμήσεις του επιχειρησιακού σχεδίου
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
            Αναλυτική Επισκόπηση ανά Κατηγορία Επιχειρηματικής Δραστηριότητας
          </h2>
        </div>

        <div className="space-y-5">
          {BUSINESS_THREE_PATHS.map((tr) => (
            <div
              key={tr.id}
              className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 space-y-3"
            >
              <div className="text-sm font-bold text-[#A34A2B]">{tr.badge}</div>
              <h3 className="font-serif font-bold text-lg text-[#14191F]">
                {tr.title}
              </h3>
              <div className="space-y-3">
                {tr.opportunities.map((opp, i) => (
                  <div
                    key={i}
                    className="p-4 rounded bg-white border border-stone-300 space-y-1.5 text-sm text-[#14191F]"
                  >
                    <div className="font-serif font-bold text-base text-[#14191F]">
                      {opp.name}
                    </div>
                    <div>
                      <strong>Εκτίμηση του σχεδίου:</strong> {opp.capex}
                    </div>
                    <div>
                      <strong>Κριτήρια επιλογής:</strong> {opp.selectionRule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Α4: Υποχρεωτική Επιφύλαξη */}
        <div className="p-4 rounded bg-amber-50 border-l-4 border-[#A34A2B] text-sm text-[#14191F] leading-relaxed">
          Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
        </div>
      </section>
    </SeoSubpageShell>
  );
}
