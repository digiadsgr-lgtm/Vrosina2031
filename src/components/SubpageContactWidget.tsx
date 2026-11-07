"use client";

import React, { useState } from "react";

interface SubpageContactWidgetProps {
  canonicalPath: string;
  pageTitle: string;
  defaultRole?: string;
}

export default function SubpageContactWidget({
  canonicalPath,
  pageTitle,
}: SubpageContactWidgetProps) {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [gdprAccepted, setGdprAccepted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const ROLE_LABELS: Record<string, string> = {
    herder: "Κτηνοτρόφος / Αγρότης / Παραγωγός της Περιοχής",
    owner: "Ιδιοκτήτης Κλειστής Κατοικίας / Καταστήματος / Γης",
    new_producer: "Νέος Κτηνοτρόφος / Τεχνίτης (Εγκατάσταση στη Βροσίνα)",
    business: "Μικρή ή Μεγάλη Επιχείρηση / Ξενώνας / Εργολάβος / Προμηθευτής",
    investor: "Στρατηγικός Επενδυτής / Ενδιαφερόμενος Εταίρος",
    benefactor: "Ευεργέτης / Χορηγός (Ταμείο Ευεργετών ΑΜΚΕ)",
    institution: "Δημόσιος Φορέας / Αυτοδιοίκηση / Οργανισμός / ΜΜΕ",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !gdprAccepted) return;
    setSubmitting(true);
    const roleLabel = ROLE_LABELS[role] || role;
    const payload: Record<string, string> = {
      _subject: `[ΒΡΟΣΙΝΑ 2031] ${roleLabel} — ${name} (${canonicalPath})`,
      _template: "table",
      _captcha: "false",
      Σελίδα_Προέλευσης: `${canonicalPath} (${pageTitle})`,
      Κατηγορία_Ενδιαφερομένου: roleLabel,
      Ονοματεπώνυμο_ή_Φορέας: name,
      Τηλέφωνο: phone,
      Email: email || "Δεν συμπληρώθηκε",
      Μήνυμα: message || "Αίτημα επικοινωνίας / τηλεφωνικής κλήσης",
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fallback handled below
    }

    try {
      await fetch("https://formsubmit.co/ajax/digiadsgr@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // ignore
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="subpage-contact"
      className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191f] space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[#9e4727]">
            ΑΜΕΣΗ ΕΠΙΚΟΙΝΩΝΙΑ & ΔΗΛΩΣΗ ΕΝΔΙΑΦΕΡΟΝΤΟΣ
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
            Μιλήστε Απευθείας με τον Συντονιστή ή Αφήστε το Τηλέφωνό σας
          </h2>
          <p className="text-base text-stone-700">
            Συντονιστής Πρωτοβουλίας: <strong>Αθανάσιος Βούρδας</strong> · Έδρα: Βροσίνα, Δήμος Ζίτσας Ιωαννίνων
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href="mailto:digiadsgr@gmail.com?subject=%5B%CE%92%CE%A1%CE%9F%CE%A3%CE%99%CE%9D%CE%91%202031%5D%20%CE%91%CE%AF%CF%84%CE%B7%CE%BC%CE%B1%20%CE%A4%CE%B7%CE%BB%CE%B5%CF%86%CF%89%CE%BD%CE%B9%CE%BA%CE%AE%CF%82%20%CE%95%CF%80%CE%B9%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%AF%CE%B1%CF%82"
            className="px-4 py-2.5 rounded bg-[#174935] text-white font-semibold text-sm hover:bg-[#123828] transition"
          >
            Email: digiadsgr@gmail.com
          </a>
        </div>
      </div>

      {submitted ? (
        <div className="p-5 rounded bg-emerald-50 border border-emerald-700 text-[#14191f] space-y-2">
          <div className="font-serif font-bold text-lg text-[#174935]">
            Το μήνυμά σας καταχωρήθηκε επιτυχώς.
          </div>
          <p className="text-base text-stone-800">
            Ο Συντονιστής της πρωτοβουλίας (Αθανάσιος Βούρδας) θα επικοινωνήσει τηλεφωνικά μαζί σας στο <strong>{phone}</strong> εντός 24 ωρών.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 rounded bg-[#14191f] text-white text-sm font-semibold cursor-pointer"
          >
            Νέο Μήνυμα
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subpage-role-select"
                className="block text-sm font-semibold text-[#14191f] mb-1.5"
              >
                1. Επιλέξτε ποιος είστε (Υποχρεωτικό) *
              </label>
              <select
                id="subpage-role-select"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base font-medium focus:outline-none focus:border-[#14191f]"
              >
                <option value="" disabled>
                  — Επιλέξτε ποιος είστε —
                </option>
                <option value="herder">
                  Κτηνοτρόφος / Αμπελουργός της περιοχής (Μέλος Κοιν.Σ.Επ. / Γάλα)
                </option>
                <option value="owner">
                  Ιδιοκτήτης Κλειστού Σπιτιού, Καταστήματος ή Γης στη Βροσίνα
                </option>
                <option value="new_producer">
                  Νέος Κτηνοτρόφος / Τεχνίτης (Εγκατάσταση στη Βροσίνα)
                </option>
                <option value="business">
                  Επιχείρηση / Ξενώνας / Κατάστημα / Εργολάβος / Προμηθευτής
                </option>
                <option value="investor">
                  Στρατηγικός Επενδυτής (Μεταποίηση / Αγροτουρισμός)
                </option>
                <option value="benefactor">
                  Ευεργέτης / Χορηγός (ΑΜΚΕ Ταμείο Ευεργετών Βροσίνας)
                </option>
                <option value="institution">
                  Εκπρόσωπος Φορέα / Δήμου / Περιφέρειας / Υπουργείου / ΜΜΕ
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="subpage-name-input"
                className="block text-sm font-semibold text-[#14191f] mb-1.5"
              >
                2. Ονοματεπώνυμο ή Επωνυμία Φορέα *
              </label>
              <input
                id="subpage-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="π.χ. Γιώργος Παπαδόπουλος"
                className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
              />
            </div>

            <div>
              <label
                htmlFor="subpage-phone-input"
                className="block text-sm font-semibold text-[#14191f] mb-1.5"
              >
                3. Τηλέφωνο για να σας καλέσουμε (Κινητό ή Σταθερό) *
              </label>
              <input
                id="subpage-phone-input"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="π.χ. 69XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
              />
            </div>

            <div>
              <label
                htmlFor="subpage-email-input"
                className="block text-sm font-semibold text-[#14191f] mb-1.5"
              >
                4. Email (Προαιρετικό — αν δεν έχετε, αφήστε μόνο τηλέφωνο)
              </label>
              <input
                id="subpage-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="π.χ. name@email.gr"
                className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subpage-message-input"
              className="block text-sm font-semibold text-[#14191f] mb-1.5"
            >
              5. Σύντομο Μήνυμα ή Ερώτημα (Προαιρετικό)
            </label>
            <textarea
              id="subpage-message-input"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Γράψτε με απλά λόγια τι σας ενδιαφέρει ή ποιες ώρες προτιμάτε να σας καλέσουμε..."
              className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="subpage-gdpr-checkbox"
              type="checkbox"
              required
              checked={gdprAccepted}
              onChange={(e) => setGdprAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#174935] cursor-pointer shrink-0"
            />
            <label
              htmlFor="subpage-gdpr-checkbox"
              className="text-sm text-stone-700 leading-relaxed cursor-pointer"
            >
              Συναινώ στην επεξεργασία των στοιχείων επικοινωνίας μου αποκλειστικά από την ομάδα συντονισμού της πρωτοβουλίας «Βροσίνα 2031» για την απάντηση στο αίτημά μου (GDPR Κανονισμός ΕΕ 2016/679). *
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || !role || !gdprAccepted}
            className="w-full sm:w-auto px-6 py-3 rounded bg-[#174935] hover:bg-[#123828] disabled:opacity-50 text-white font-bold text-base transition cursor-pointer"
          >
            {submitting
              ? "Αποστολή σε εξέλιξη..."
              : "Αποστολή & Αίτημα Τηλεφωνικής Επικοινωνίας →"}
          </button>
        </form>
      )}
    </section>
  );
}
