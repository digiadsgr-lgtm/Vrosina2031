import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import { BUSINESS_THREE_PATHS } from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Για Επιχειρήσεις, Ξενώνες & Εργολάβους",
  description:
    "Οι 3 δρόμοι συμμετοχής επιχειρήσεων στη Βροσίνα: 10 ξενώνες, 5 καταστήματα πλατείας (0 € ενοίκιο 2 ετών), τεχνικά έργα 2,23 εκ. € & στρατηγική συνεργασία μεταποίησης.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/gia-epicheiriseis",
  },
};

export default function GiaEpicheiriseisPage() {
  const openOpportunitiesSummary = [
    {
      num: "10",
      title: "Παραδοσιακοί Ξενώνες (40 Κλίνες)",
      budget: "100.000 € ανά ξενώνα (1.000.000 € συνολικά)",
      grant: "Έως 65%–80% επιδότηση (LEADER / Αναπτυξιακός)",
      when: "1η Πρόσκληση LEADER (έως 04/02/2027) & Επόμενος Κύκλος 2027",
    },
    {
      num: "5",
      title: "Καταστήματα Κεντρικής Πλατείας",
      budget: "30.000 €–40.000 € ανά κατάστημα (180.000 € συνολικά)",
      grant: "Έως 65% επιδότηση + 0 € ενοίκιο για τα πρώτα 2 έτη",
      when: "Εκκίνηση μισθώσεων: 2027",
    },
    {
      num: "20",
      title: "Αποκαταστάσεις Όψεων & Στεγών Κατοικιών",
      budget: "750.000 € κατασκευαστικό έργο για τοπικούς εργολάβους",
      grant: "Ανάθεση ανά ομάδα κτιρίων (20.000 €–50.000 € / κτίριο)",
      when: "Α' Φάση (10 κατοικίες): 2027–2028 · Β' Φάση: 2028–2029",
    },
    {
      num: "150 kWp",
      title: "Φωτοβολταϊκός Σταθμός & Υποδομές Στρατοπέδου",
      budget: "350.000 € (Φ/Β) + 600.000 € (Υποδομές) + 350.000 € (Πλατεία)",
      grant: "Διαγωνισμοί προμήθειας και τεχνικών έργων (1.300.000 €)",
      when: "Μετά την παραχώρηση του Στρατοπέδου (2027–2028)",
    },
  ];

  return (
    <SeoSubpageShell
      sectionCode="ΚΟΙΝΟ 02 · ΜΙΚΡΕΣ & ΜΕΓΑΛΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ"
      categoryLabel="10 ΞΕΝΩΝΕΣ · 5 ΚΑΤΑΣΤΗΜΑΤΑ · ΕΡΓΑ 2,23 ΕΚ. € · ΜΕΤΑΠΟΙΗΣΗ"
      title="Για Μικρές και Μεγάλες Επιχειρήσεις, Ξενώνες, Εργολάβους & Προμηθευτές"
      subtitle="Ποια είναι η ευκαιρία, πόσο κοστίζει, τι απόδοση έχει με ρεαλιστικές παραδοχές, ποιες είναι οι προϋποθέσεις και πώς επιλέγονται οι συνεργάτες με ανοιχτά κριτήρια (χωρίς «γνωριμίες»)."
      canonicalPath="/gia-epicheiriseis"
    >
      {/* Summary Grid: Τι Ευκαιρίες Ανοίγουν */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="text-sm font-bold text-[#174935]">
              ΣΥΝΟΠΤΙΚΟΣ ΠΙΝΑΚΑΣ ΕΠΙΧΕΙΡΗΜΑΤΙΚΩΝ ΕΥΚΑΙΡΙΩΝ
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
              Τι Ευκαιρίες Ανοίγουν στη Βροσίνα (Προϋπολογισμός, Επιδότηση & Χρόνος)
            </h2>
          </div>
          <a
            href="/documents/Vrosina_2031_Plan_In_5_Steps.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
          >
            Εκτυπώσιμη Σύνοψη Σχεδίου (PDF) ↓
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {openOpportunitiesSummary.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#14191f] text-[#c89d54] font-bold text-base">
                  {item.num}
                </span>
                <span className="text-sm font-semibold text-[#174935]">
                  {item.when}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#14191f]">
                {item.title}
              </h3>
              <p className="text-base text-stone-800">
                <strong>Προϋπολογισμός:</strong> {item.budget}
              </p>
              <p className="text-base text-[#9e4727] font-semibold">
                {item.grant}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Paths in Detail */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
          Οι 3 Δρόμοι Συμμετοχής Επιχειρήσεων (Κόστος, Απόδοση & Κανόνες Επιλογής)
        </h2>

        <div className="space-y-6">
          {BUSINESS_THREE_PATHS.map((bp) => (
            <article
              key={bp.id}
              className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191f] space-y-5"
            >
              <div className="border-b border-stone-200 pb-3 space-y-1">
                <div className="text-sm font-bold text-[#9e4727]">
                  {bp.badge}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                  {bp.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bp.opportunities.map((opp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2.5 text-base"
                  >
                    <h4 className="font-serif font-bold text-lg text-[#14191f]">
                      {opp.name}
                    </h4>
                    <div className="text-[#9e4727] font-semibold">
                      <strong>Ποσό / CAPEX:</strong> {opp.capex}
                    </div>
                    <div className="text-[#174935] font-semibold">
                      <strong>Επιδότηση & Ίδια Συμμετοχή:</strong> {opp.grantTarget}
                    </div>
                    <p className="text-stone-800 leading-relaxed">
                      <strong>Έσοδα, Πληρότητα & Απόσβεση:</strong> {opp.economics}
                    </p>
                    <p className="text-stone-800 leading-relaxed pt-2 border-t border-stone-300">
                      <strong>Πώς επιλέγονται (Κανόνες χωρίς «γνωριμίες»):</strong>{" "}
                      {opp.selectionRule}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
