import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import { HOUSING_CATEGORIES } from "@/data/vrosinaData";

export const metadata: Metadata = {
  title:
    "Ανακαίνιση Κλειστών Κατοικιών (Master Lease) & «Έλα να Βοσκήσεις — Έλα να Μείνεις» | Βροσίνα 2031",
  description:
    "Πώς ανακαινίζονται 20 κλειστές κατοικίες και 5 καταστήματα στη Βροσίνα Ιωαννίνων με 0 € επιβάρυνση ιδιοκτήτη (Master Lease 9–12 ετών, Κατηγορίες Α: 20k €, Β: 37.5k €, Γ: 50k €) και πώς εγκαθίστανται 12 νέοι κτηνοτρόφοι με Πακέτο Πρώτου Κοπαδιού.",
  alternates: {
    canonical: "https://vrosina2031.gr/katoikia-neoi-paragogoi",
  },
};

export default function KatoikiaNeoiParagogoiPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΠΥΛΩΝΕΣ 02 & 03 · ΚΑΤΟΙΚΙΑ, ΕΡΓΑΣΙΑ & ΔΗΜΟΓΡΑΦΙΚΟ"
      categoryLabel="ΜΗΤΡΩΟ ΚΛΕΙΣΤΩΝ ΚΑΤΟΙΚΙΩΝ · MASTER LEASE · ΠΑΚΕΤΟ ΠΡΩΤΟΥ ΚΟΠΑΔΙΟΥ"
      title="Αποκατάσταση Κλειστών Κατοικιών με 0 € Ίδια Συμμετοχή & Πρόγραμμα Νέων Παραγωγών «Έλα να Βοσκήσεις — Έλα να Μείνεις»"
      subtitle="Ο Δεσμευτικός Μορφολογικός Κανονισμός της Βροσίνας (φυσική ηπειρωτική πέτρα, κεραμίδι & γκρίζα λιθόπλακα), το μοντέλο Master Lease 9–12 ετών για τους ιδιοκτήτες κλειστών σπιτιών, η επαναλειτουργία του Δημοτικού Σχολείου και η Σχολή Πετράδων (ΔΥΠΑ)."
      canonicalPath="/katoikia-neoi-paragogoi"
    >
      {/* 3 Housing Categories */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Οι 3 Κατηγορίες Μορφολογικής & Ενεργειακής Αποκατάστασης Κατοικιών
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
              Επιδότηση έως 80% για αγορά 50–80 θηλυκών ζώων αναπαραγωγής και
              σταβλικών εγκαταστάσεων, με προκαταβολή-γέφυρα μέσω HDB και
              Ταμείου Ευεργετών ώστε ο νέος κτηνοτρόφος να ξεκινά από την πρώτη
              ημέρα.
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
