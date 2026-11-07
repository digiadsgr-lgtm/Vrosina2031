import type { Metadata } from "next";
import SeoSubpageShell from "@/components/SeoSubpageShell";
import {
  ABOUT_US_AND_STATUS,
  VISION_SPEECH_SECTIONS,
  TV_MEDIA_APPEARANCES,
} from "@/data/vrosinaData";

export const metadata: Metadata = {
  title: "Ποιοι Είμαστε, Ιστορία & Πού Βρισκόμαστε",
  description:
    "Η ανθρώπινη ιστορία της Βροσίνας, ο Συντονιστής της πρωτοβουλίας (Αθανάσιος Βούρδας), η νομική κατάσταση των φορέων, οι μαρτυρίες κατοίκων και η πορεία του έργου σήμερα.",
  alternates: {
    canonical: "https://vrosina2031.vercel.app/poioi-eimaste",
  },
};

export default function PoioiEimastePage() {
  return (
    <SeoSubpageShell
      sectionCode="ΤΑΥΤΟΤΗΤΑ ΠΡΩΤΟΒΟΥΛΙΑΣ & ΔΙΑΦΑΝΕΙΑ"
      categoryLabel="ΠΟΙΟΙ ΕΙΜΑΣΤΕ · ΜΑΡΤΥΡΙΕΣ ΚΑΤΟΙΚΩΝ · ΚΑΤΑΣΤΑΣΗ ΕΡΓΟΥ ΣΗΜΕΡΑ"
      title="Ποιοι Είμαστε, Η Ιστορία της Βροσίνας & Πού Βρισκόμαστε Σήμερα"
      subtitle="Το ανθρώπινο πρόσωπο της πρωτοβουλίας «Βροσίνα 2031»: ποιος συντονίζει την προσπάθεια, σε ποιο νομικό στάδιο βρίσκονται οι φορείς σήμερα, τι λένε οι κάτοικοι και οι κτηνοτρόφοι, και η πλήρης ιστορία του χωριού."
      canonicalPath="/poioi-eimaste"
    >
      {/* 1. Coordinator & 3 Governance Entities Status */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white rounded-lg p-6 border-2 border-[#14191f] space-y-4">
          <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
            <img
              src="/images/real/tv-SOt0DH7kivY-hqdefault.jpg"
              alt={ABOUT_US_AND_STATUS.coordinatorCard.name}
              width={96}
              height={96}
              loading="lazy"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#9e4727] shrink-0"
            />
            <div>
              <div className="text-sm font-bold text-[#9e4727]">
                ΣΥΝΤΟΝΙΣΜΟΣ ΠΡΩΤΟΒΟΥΛΙΑΣ
              </div>
              <h2 className="font-serif text-xl font-bold text-[#14191f]">
                {ABOUT_US_AND_STATUS.coordinatorCard.name}
              </h2>
              <div className="text-sm font-semibold text-[#174935]">
                {ABOUT_US_AND_STATUS.coordinatorCard.role}
              </div>
            </div>
          </div>

          <p className="text-base text-stone-800 leading-relaxed">
            {ABOUT_US_AND_STATUS.coordinatorCard.bio}
          </p>

          <div className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1 text-sm text-stone-800">
            <div>
              <strong>Έδρα Πρωτοβουλίας:</strong>{" "}
              {ABOUT_US_AND_STATUS.coordinatorCard.seat}
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${ABOUT_US_AND_STATUS.coordinatorCard.email}`}
                className="text-[#174935] font-semibold underline"
              >
                {ABOUT_US_AND_STATUS.coordinatorCard.email}
              </a>
            </div>
            <div>{ABOUT_US_AND_STATUS.coordinatorCard.directCallNote}</div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg p-6 border border-stone-300 space-y-4">
            <div className="text-sm font-bold text-[#174935]">
              ΝΟΜΙΚΟ ΚΑΘΕΣΤΩΣ ΦΟΡΕΩΝ ΣΗΜΕΡΑ (ΠΛΗΡΗΣ ΔΙΑΦΑΝΕΙΑ)
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
              Οι 3 Φορείς του Οικοσυστήματος «Βροσίνα 2031»
            </h2>
            <div className="space-y-3">
              {ABOUT_US_AND_STATUS.governanceEntitiesStatus.map((ent, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg text-[#14191f]">
                      {ent.name}
                    </h3>
                    <span className="px-3 py-1 rounded bg-amber-100 border border-amber-400 text-stone-900 text-sm font-bold">
                      {ent.status}
                    </span>
                  </div>
                  <p className="text-base text-stone-800 leading-relaxed">
                    {ent.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Timeline with Dates: Πού Βρισκόμαστε Σήμερα */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="text-sm font-bold text-[#174935]">
            ΠΟΡΕΙΑ ΕΡΓΟΥ ΜΕ ΗΜΕΡΟΜΗΝΙΕΣ
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            Πού Βρισκόμαστε Σήμερα: Τι Έχει Ολοκληρωθεί, Τι Τρέχει Τώρα & Τι Έπεται
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ABOUT_US_AND_STATUS.projectTimelineStatus.map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#9e4727]">
                  {col.date}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white border border-stone-300 text-sm font-semibold text-[#14191f]">
                  {col.stage}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#14191f]">
                {col.title}
              </h3>
              <p className="text-base text-stone-800 leading-relaxed">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Local Voices / Testimonials */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <div className="text-sm font-bold text-[#174935]">
          ΦΩΝΕΣ ΑΠΟ ΤΗ ΒΡΟΣΙΝΑ & ΤΗ Δ.Ε. ΜΟΛΟΣΣΩΝ
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Τι Λένε οι Άνθρωποι της Παραγωγής και οι Ιδιοκτήτες Κατοικιών
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ABOUT_US_AND_STATUS.localVoices.map((v, idx) => (
            <blockquote
              key={idx}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 border-l-4 border-l-[#174935] space-y-3"
            >
              <p className="font-serif italic text-base text-stone-900 leading-relaxed">
                {v.quote}
              </p>
              <div className="text-sm font-bold text-[#174935]">{v.role}</div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 4. Full Story of Vrosina ("Το χωριό που σωπαίνει" — Μέρος Β #5) */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-5">
        <div className="border-b border-stone-200 pb-4 space-y-1">
          <div className="text-sm font-bold text-[#9e4727]">
            Η ΠΛΗΡΗΣ ΙΣΤΟΡΙΑ & ΤΟ ΟΡΑΜΑ (ΚΕΦΑΛΑΙΟ 1 BUSINESS PLAN)
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
            Το Χωριό που Σωπαίνει — Και Πώς η Βροσίνα Ξαναπαίρνει Ζωή
          </h2>
        </div>

        <div className="space-y-6 text-base text-stone-800 leading-relaxed">
          {VISION_SPEECH_SECTIONS.map((sec) => (
            <div key={sec.roman} className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-[#14191f]">
                {sec.roman}. {sec.title}
              </h3>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200 font-serif font-bold text-base text-[#174935]">
          — Πρωτοβουλία «Βροσίνα 2031» · Δ.Ε. Μολοσσών, Δήμος Ζίτσας Ιωαννίνων
        </div>
      </section>

      {/* 5. TV Appearances */}
      <section className="bg-white rounded-lg p-6 sm:p-8 border border-stone-300 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
          Τηλεοπτικές Παρουσίες στα ΜΜΕ της Ηπείρου
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TV_MEDIA_APPEARANCES.map((tv) => (
            <div
              key={tv.id}
              className="p-5 rounded-lg bg-[#f7f5f0] border border-stone-300 space-y-2.5"
            >
              <div className="text-sm font-bold text-[#174935]">
                {tv.channel} · {tv.speaker}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#14191f]">
                {tv.title}
              </h3>
              <p className="text-base text-stone-800 leading-relaxed">
                {tv.summary}
              </p>
              <a
                href={tv.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 text-sm font-bold text-[#9e4727] underline"
              >
                Παρακολούθηση στο YouTube ({tv.shortUrl}) ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </SeoSubpageShell>
  );
}
