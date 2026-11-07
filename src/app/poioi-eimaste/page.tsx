import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  ABOUT_US_AND_STATUS,
  VISION_SPEECH_SECTIONS,
  TV_MEDIA_APPEARANCES,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Ποιοι Είμαστε, Πού Βρισκόμαστε Τώρα & Ιστορία",
  description:
    "Ποιοι είμαστε (Θανάσης Βούρδας, Επιτροπή Βροσίνα 2031), πού βρισκόμαστε τώρα (κατάσταση έργου Νοέμβριος 2026), πώς λειτουργούμε και η πλήρης ιστορία της Βροσίνας.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/poioi-eimaste",
  },
};

export default function PoioiEimastePage() {
  return (
    <SeoSubpageShell
      sectionCode="Ταυτότητα Πρωτοβουλίας"
      categoryLabel="Ποιοι είμαστε · Πού βρισκόμαστε τώρα · Πώς λειτουργούμε · Η ιστορία του χωριού"
      title="Ποιοι είμαστε & Πού βρισκόμαστε τώρα"
      subtitle="Η Βροσίνα 2031 ξεκίνησε από τον Θανάση Βούρδα, με καταγωγή από τη Βροσίνα και εμπειρία στην επικοινωνία, το μάρκετινγκ, τον τουρισμό και την επιχειρηματική ανάπτυξη."
      canonicalPath="/poioi-eimaste"
    >
      {/* Γ6: Ποιοι είμαστε & Πού βρισκόμαστε τώρα */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Αριστερή στήλη: Ποιοι είμαστε + Προφίλ Συντονιστή */}
        <div className="lg:col-span-6 bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191F] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-stone-200 pb-5">
            <img
              src="/images/real/athanasios-vourdas-portrait.jpg"
              alt="Αθανάσιος Βούρδας — Εμπνευστής & Συντονιστής της Πρωτοβουλίας Βροσίνα 2031"
              width={120}
              height={120}
              className="w-28 h-28 rounded-full object-cover object-top border-2 border-[#A34A2B] shrink-0 shadow-sm"
            />
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#A34A2B]">
                Ποιοι είμαστε
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#14191F]">
                Αθανάσιος (Θανάσης) Βούρδας
              </h2>
              <div className="text-sm font-semibold text-[#1F5C43]">
                Εμπνευστής & Συντονιστής Πρωτοβουλίας «Βροσίνα 2031»
              </div>
            </div>
          </div>

          <div className="space-y-3 text-base text-[#14191F] leading-relaxed">
            <p>
              Η <strong>Βροσίνα 2031</strong> ξεκίνησε από τον{" "}
              <strong>Θανάση Βούρδα</strong>, με καταγωγή από τη Βροσίνα και
              εμπειρία στην επικοινωνία, το μάρκετινγκ, τον τουρισμό και την
              επιχειρηματική ανάπτυξη.
            </p>
            <p>
              Με αφετηρία την πληροφορική και το ηλεκτρονικό εμπόριο στη Μεγάλη
              Βρετανία (Liverpool) και στην Ελλάδα, και πολυετή ενεργή πορεία στη
              διοίκηση μονάδων φιλοξενίας, στην οργάνωση επιχειρησιακών
              διαδικασιών και στη στρατηγική ψηφιακής ανάπτυξης επιχειρήσεων,
              μετέφερε την τεχνογνωσία οργάνωσης, κοστολόγησης και εμπορικής
              δικτύωσης σε ένα ολοκληρωμένο, εφαρμόσιμο σχέδιο αναγέννησης για
              τον τόπο καταγωγής του.
            </p>
            <p>
              Συγκροτείται η <strong>«Επιτροπή Βροσίνα 2031»</strong> για την
              προώθηση του σχεδίου. Καλούμε την{" "}
              <strong>Αδελφότητα Βροσινιωτών</strong> και{" "}
              <strong>Βροσινιώτες επαγγελματίες</strong> (νομικούς, μηχανικούς,
              αρχιτέκτονες και άλλους) να συμμετάσχουν εθελοντικά.
            </p>
            <p>
              Η νομική μορφή (κοινωνική συνεταιριστική επιχείρηση) βρίσκεται υπό
              σύσταση.
            </p>
            <p className="font-semibold text-[#1F5C43]">
              Επικοινωνία:{" "}
              <a href="#epikinonia" className="underline">
                μέσω της φόρμας του site ↓
              </a>
            </p>
          </div>
        </div>

        {/* Δεξιά στήλη: Πού βρισκόμαστε τώρα (Κατάσταση έργου, Νοέμβριος 2026) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#1F5C43] space-y-4">
            <div className="text-sm font-bold text-[#1F5C43]">
              Πού βρισκόμαστε τώρα
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#14191F]">
              Κατάσταση έργου, Νοέμβριος 2026
            </h2>

            <ul className="space-y-3 text-base text-[#14191F] leading-relaxed">
              <li className="p-3.5 rounded bg-[#F7F5F0] border border-stone-300">
                <strong>✔</strong> Δημοσιεύθηκε το δελτίο τύπου και το site. Δύο
                τηλεοπτικές παρουσιάσεις.
              </li>
              <li className="p-3.5 rounded bg-[#F7F5F0] border border-stone-300">
                <strong>✔</strong> Ετοιμάστηκε το επιχειρησιακό σχέδιο και η
                ανάλυση του οφέλους για το Δημόσιο.
              </li>
              <li className="p-3.5 rounded bg-[#F7F5F0] border border-stone-300">
                <strong>✔</strong> Ετοιμάστηκε πρόταση συνεργασίας με τη
                Γαλακτοκομική Σχολή Ιωαννίνων.
              </li>
              <li className="p-3.5 rounded bg-amber-50 border border-[#C89D54]">
                <strong>● Σε εξέλιξη:</strong> σύσταση κοινωνικής συνεταιριστικής
                επιχείρησης, με ανοιχτό κάλεσμα για ιδρυτικά μέλη (ελάχιστη
                μερίδα 100 €, ν. 4430/2016).
              </li>
              <li className="p-3.5 rounded bg-[#F7F5F0] border border-stone-300">
                <strong>○ Επόμενο:</strong> αίτημα παραχώρησης του στρατοπέδου
                και προετοιμασία για την πρόσκληση LEADER (προθεσμία 4/2/2027).
              </li>
            </ul>
          </div>

          {/* Α3: Πώς λειτουργούμε */}
          <div className="bg-white rounded-lg p-6 border border-stone-300 space-y-2.5">
            <h3 className="font-serif font-bold text-xl text-[#14191F]">
              Πώς λειτουργούμε
            </h3>
            <p className="text-base text-[#14191F] leading-relaxed">
              Η Βροσίνα 2031 είναι μια μη κομματική πρωτοβουλία για την
              αναγέννηση του χωριού. Απευθυνόμαστε σε όλους τους φορείς,
              ανεξάρτητα από παράταξη, με το ίδιο αίτημα και το ίδιο υλικό. Δεν
              ζητάμε από το Δημόσιο να αναλάβει το κόστος της λειτουργίας.
              Ζητάμε θεσμική και αδειοδοτική στήριξη για ένα έργο που, με βάση
              τις εκτιμήσεις μας, αποδίδει στο Δημόσιο έσοδα και θέσεις
              εργασίας. Οι αποφάσεις της κοινότητας λαμβάνονται με ένα μέλος,
              μία ψήφο. Όλα τα έγγραφα βρίσκονται στο Κέντρο Τεκμηρίωσης.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Κεντρικά Ερωτήματα Παραγωγών & Ιδιοκτητών Κατοικιών (Κ2) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#1F5C43]">
          Ερωτήματα από τη Βροσίνα & τη Δ.Ε. Μολοσσών
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          Τι Ρωτούν οι Κτηνοτρόφοι και οι Ιδιοκτήτες Κλειστών Σπιτιών
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ABOUT_US_AND_STATUS.localVoices.map((v, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#F7F5F0] border border-stone-300 border-l-4 border-l-[#1F5C43] space-y-2"
            >
              <div className="text-sm font-bold text-[#1F5C43]">{v.role}</div>
              <p className="font-serif text-base text-[#14191F] leading-relaxed">
                {v.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Full Story of Vrosina ("Το χωριό που σωπαίνει" — Μέρος Β #5) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="border-b border-stone-200 pb-4 space-y-1">
          <div className="text-sm font-bold text-[#A34A2B]">
            Η Πλήρης Ιστορία & Το Όραμα (Κεφάλαιο 1 Business Plan)
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
            Το Χωριό που Σωπαίνει — Και Πώς η Βροσίνα Ξαναπαίρνει Ζωή
          </h2>
        </div>

        <div className="space-y-6 text-base text-[#14191F] leading-relaxed">
          {VISION_SPEECH_SECTIONS.map((sec) => (
            <div key={sec.roman} className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-[#14191F]">
                {sec.roman}. {sec.title}
              </h3>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200 font-serif font-bold text-base text-[#1F5C43]">
          — Πρωτοβουλία «Βροσίνα 2031» · Δ.Ε. Μολοσσών, Δήμος Ζίτσας Ιωαννίνων
        </div>
      </section>

      {/* 4. Τηλεοπτικές Παρουσίες */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
          Τηλεοπτικές Παρουσίες στα ΜΜΕ της Ηπείρου
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TV_MEDIA_APPEARANCES.map((tv) => (
            <div
              key={tv.id}
              className="rounded-lg bg-[#F7F5F0] border border-stone-300 overflow-hidden flex flex-col justify-between"
            >
              <img
                src={tv.thumbnail}
                alt={tv.title}
                width={640}
                height={360}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2.5">
                <div className="text-sm font-bold text-[#1F5C43]">
                  {tv.channel} · {tv.speaker}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#14191F]">
                  {tv.title}
                </h3>
                <p className="text-base text-[#14191F] leading-relaxed">
                  {tv.summary}
                </p>
                <a
                  href={tv.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 text-sm font-bold text-[#A34A2B] underline"
                >
                  Παρακολούθηση στο YouTube ({tv.shortUrl}) ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
