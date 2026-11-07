import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import { CAMP_VIDEO_AUTOPSY } from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Στρατόπεδο Βροσίνας (13.695 τ.μ.) & Αυτοψία",
  description:
    "Αυτοψία πεδίου στα 8 κτίρια του πρώην Στρατοπέδου Παπακωνσταντίνου (13.695 τ.μ.) στη Βροσίνα Ιωαννίνων και σχέδιο μετατροπής σε Αγροδιατροφικό Κέντρο.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/stratopedo-vrosinas",
  },
};

export default function StratopedoVrosinasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CivicStructure",
    name: "Πρώην Στρατόπεδο «Παπακωνσταντίνου» Βροσίνας Ιωαννίνων",
    alternateName: [
      "Στρατόπεδο Βροσίνας",
      "Αγροδιατροφικό Κέντρο Βροσίνας 2031",
      "Stratopedo Papakonstantinou Vrosina",
    ],
    description: CAMP_VIDEO_AUTOPSY.executiveSummary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Βροσίνα, Δήμος Ζίτσας",
      addressRegion: "Ήπειρος (Π.Ε. Ιωαννίνων)",
      postalCode: "44003",
      addressCountry: "GR",
    },
  };

  return (
    <SeoSubpageShell
      sectionCode="ΠΥΛΩΝΑΣ 01 & ΑΥΤΟΨΙΑ ΠΕΔΙΟΥ"
      categoryLabel="ΣΤΡΑΤΟΠΕΔΟ «ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ» · 13.695 Τ.Μ. · Τ.Α.ΕΘ.Α."
      title="Πρώην Στρατόπεδο Βροσίνας («Παπακωνσταντίνου»): Αυτοψία των 8 Κτιρίων & Μετατροπή σε Αγροδιατροφικό Κέντρο"
      subtitle="Καταγραφή των υφιστάμενων εγκαταστάσεων του ανενεργού στρατοπέδου στη Βροσίνα Ιωαννίνων και η κοστολογημένη αξιοποίησή τους (3,60 εκατ. € συνολικά) σε Πρότυπο Τυροκομείο ΠΟΠ, Οινοποιείο Ντεμπίνας, Επισκέψιμο Κέντρο Γευσιγνωσίας και Φωτοβολταϊκό Σταθμό 150 kWp."
      canonicalPath="/stratopedo-vrosinas"
      jsonLd={jsonLd}
    >
      {/* Comparison Images */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded border border-stone-300 overflow-hidden">
          <img
            src="/images/real/camp-hwaJv7EIjLg-maxresdefault.jpg"
            alt="Πρώην Στρατόπεδο Παπακωνσταντίνου στη Βροσίνα Ιωαννίνων σήμερα"
            width={800}
            height={500}
            loading="lazy"
            className="w-full aspect-16/10 object-cover"
          />
          <div className="p-4 text-xs space-y-1">
            <div className="font-mono font-bold text-[#b85d3b]">
              ΣΗΜΕΡΑ (ΕΙΚΟΝΑ ΠΕΔΙΟΥ · ΦΩΤ. VRETTOS RIDER / YOUTUBE):
            </div>
            <p className="text-stone-700">
              Το επίπεδο πλάτωμα 13.695 τ.μ. με τους δύο ισόγειους θαλάμους
              οπλιτών αριστερά/κέντρο και τον πέτρινο φούρνο με την καμινάδα
              δεξιά.
            </p>
          </div>
        </div>

        <div className="bg-white rounded border border-stone-300 overflow-hidden relative">
          <div className="relative">
            <img
              src="/images/pillar1-agrofood-center.jpg"
              alt="Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render) Αγροδιατροφικού Κέντρου Βροσίνας 2031"
              width={800}
              height={500}
              loading="lazy"
              className="w-full aspect-16/10 object-cover"
            />
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/80 text-stone-200 font-mono text-xs border border-stone-600">
              Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render)
            </span>
          </div>
          <div className="p-4 text-xs space-y-1">
            <div className="font-mono font-bold text-[#1f5c43]">
              ΣΧΕΔΙΟ 2031 (ΣΤΑ ΙΔΙΑ ΚΤΙΡΙΑ — CONCEPT RENDER):
            </div>
            <p className="text-stone-700">
              Αποκατάσταση των ίδιων ισόγειων κτιρίων με φυσική ηπειρωτική
              πέτρα, φωτοβολταϊκά 150 kWp στις κεραμοσκεπές, αμπελώνα Ντεμπίνας
              και χώρο γευσιγνωσίας.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Full Video */}
      <section className="bg-[#14191f] text-white rounded p-6 border border-stone-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            {CAMP_VIDEO_AUTOPSY.title}
          </h2>
          <a
            href={CAMP_VIDEO_AUTOPSY.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#c89d54] hover:underline"
          >
            {CAMP_VIDEO_AUTOPSY.creator} ↗
          </a>
        </div>
        <div className="aspect-video w-full rounded overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${CAMP_VIDEO_AUTOPSY.videoId}?rel=0`}
            title={CAMP_VIDEO_AUTOPSY.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          />
        </div>
      </section>

      {/* Detailed 8-Building Encyclopedia Table */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#14191f]">
          Αναλυτικός Πίνακας των 8 Κτιρίων & Ζωνών του Στρατοπέδου «Παπακωνσταντίνου»
        </h2>
        <div className="space-y-4">
          {CAMP_VIDEO_AUTOPSY.steps.map((st) => (
            <article
              key={st.id}
              className="bg-white rounded p-5 border border-stone-300 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2 text-xs font-mono">
                <span className="text-[#b85d3b] font-bold">
                  ΚΤΙΡΙΟ {st.stepNumber} · ΧΡΟΝΟΣ ΒΙΝΤΕΟ: {st.timeDisplay}
                </span>
                <span className="text-[#1f5c43] font-bold">
                  {st.capexAllocation}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#14191f]">
                {st.buildingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <strong>Εικόνα Πεδίου:</strong> {st.currentAutopsy}
              </p>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-[#f7f5f0] p-3 rounded border-l-4 border-[#1f5c43]">
                <strong>Χρήση στο «Βροσίνα 2031» ({st.future2031Role}):</strong>{" "}
                {st.future2031Details}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
