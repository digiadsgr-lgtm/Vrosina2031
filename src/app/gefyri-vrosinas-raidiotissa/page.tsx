import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import { REAL_VROSINA_VIDEOS } from "@/data/vrosinaData";

export const metadata: Metadata = {
  title:
    "Βροσίνα Ιωαννίνων | Πέτρινο Γεφύρι Βροσίνας, Ζαλογγογέφυρο (1605) & Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628)",
  description:
    "Οδηγός ιστορίας, αρχιτεκτονικής, φωτογραφιών και 6 βίντεο drone της Βροσίνας Δήμου Ζίτσας Ιωαννίνων: Το Πέτρινο Γεφύρι της Βροσίνας, το Ζαλογγογέφυρο του 1605 στον Ζαλογγίτικο ποταμό και η Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628) στα βράχια («ραϊδιά»).",
  alternates: {
    canonical: "https://vrosina2031.gr/gefyri-vrosinas-raidiotissa",
  },
};

export default function GefyriVrosinasRaidiotissaPage() {
  return (
    <SeoSubpageShell
      sectionCode="ΠΥΛΩΝΑΣ 04 · ΠΟΛΙΤΙΣΜΟΣ, ΦΥΣΗ & ΜΝΗΜΕΙΑ"
      categoryLabel="ΒΡΟΣΙΝΑ ΖΙΤΣΑΣ ΙΩΑΝΝΙΝΩΝ · ΓΕΦΥΡΙΑ 1605 · ΜΟΝΗ ΡΑΪΔΙΩΤΙΣΣΑΣ 1628"
      title="Βροσίνα Ιωαννίνων: Τα Δύο Ιστορικά Πέτρινα Γεφύρια, ο Ζαλογγίτικος Ποταμός & η Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628)"
      subtitle="Πλήρης ιστορική, γεωγραφική και φωτογραφική τεκμηρίωση των μνημείων της Βροσίνας (έδρας Δ.Ε. Μολοσσών του Δήμου Ζίτσας) και το επενδυτικό σχέδιο 950.000 € για την ήπια ανάπλαση κοίτης (soft engineering), το παραποτάμιο μονοπάτι και την αναστήλωση της πτέρυγας κελιών της Ραϊδιώτισσας."
      canonicalPath="/gefyri-vrosinas-raidiotissa"
    >
      {/* 3 Monument Cards with Real Photos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <article className="bg-white rounded border border-stone-300 overflow-hidden">
          <img
            src="/images/real/real-gefyri-vrosinas-zitsa.jpg"
            alt="Το Πέτρινο Γεφύρι της Βροσίνας εντός του οικισμού"
            className="w-full aspect-16/10 object-cover"
          />
          <div className="p-4 space-y-2 text-xs">
            <div className="font-mono font-bold text-[#b85d3b]">
              ΜΝΗΜΕΙΟ 01 · ΕΝΤΟΣ ΟΙΚΙΣΜΟΥ
            </div>
            <h2 className="font-serif font-bold text-base text-[#14191f]">
              Το Πέτρινο Γεφύρι της Βροσίνας
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Μονότοξο πέτρινο γεφύρι με δύο βοηθητικά ανακουφιστικά τόξα,
              συνολικού μήκους 25 μ., ανοίγματος κύριου τόξου 10,30 μ. και ύψους
              5,30 μ., δίπλα στην παλιά λιθόκτιστη βρύση του χωριού. Χτίστηκε με
              χορηγία της Ιεράς Μονής Μακραλέξης.
            </p>
          </div>
        </article>

        <article className="bg-white rounded border border-stone-300 overflow-hidden">
          <img
            src="/images/real/real-zalongogefyro-1605-zitsa.jpg"
            alt="Το Ιστορικό Ζαλογγογέφυρο του 1605 στη Βροσίνα"
            className="w-full aspect-16/10 object-cover"
          />
          <div className="p-4 space-y-2 text-xs">
            <div className="font-mono font-bold text-[#1f5c43]">
              ΜΝΗΜΕΙΟ 02 · ΕΤΟΣ 1605
            </div>
            <h2 className="font-serif font-bold text-base text-[#14191f]">
              Το Ιστορικό Ζαλογγογέφυρο (1605)
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Τολμηρό μονότοξο πέτρινο γεφύρι του 1605 πάνω στον Ζαλογγίτικο
              ποταμό (παραπόταμο του Καλαμά), στα όρια Βροσίνας και Κάτω
              Ζαλόγγου, με άνοιγμα τόξου 11,30 μ. και ύψος 8,00 μ., επίσης
              χρηματοδοτημένο από τη Μονή Μακραλέξης.
            </p>
          </div>
        </article>

        <article className="bg-white rounded border border-stone-300 overflow-hidden">
          <img
            src="/images/real/real-raidiotissa-epirusgate.jpg"
            alt="Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628) στη Βροσίνα"
            className="w-full aspect-16/10 object-cover"
          />
          <div className="p-4 space-y-2 text-xs">
            <div className="font-mono font-bold text-[#14191f]">
              ΜΝΗΜΕΙΟ 03 · ΕΤΟΣ 1628
            </div>
            <h2 className="font-serif font-bold text-base text-[#14191f]">
              Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628)
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Ιστορική Μονή Κοιμήσεως της Θεοτόκου (1628), σφηνωμένη στους
              απόκρημνους βράχους («ραϊδιά») 450 μ. νότια της Βροσίνας. Το
              καθολικό της έχει αναστηλωθεί, ενώ στο «Βροσίνα 2031» προβλέπεται
              η αποκατάσταση της ερειπωμένης πτέρυγας των κελιών.
            </p>
          </div>
        </article>
      </section>

      {/* Video Archive */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Τα 6 Πραγματικά Βίντεο Drone & Περιήγησης στη Βροσίνα
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REAL_VROSINA_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded border border-stone-300 overflow-hidden"
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.id}?rel=0`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="p-4 space-y-1 text-xs">
                <div className="font-mono text-[#b85d3b] font-bold">
                  {vid.category}
                </div>
                <h3 className="font-serif font-bold text-sm text-[#14191f]">
                  {vid.title}
                </h3>
                <p className="text-stone-600">{vid.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
