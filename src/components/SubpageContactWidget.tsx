"use client";

import React, { useState } from "react";

interface SubpageContactWidgetProps {
  defaultRole?: string;
  contextTitle: string;
}

export default function SubpageContactWidget({
  defaultRole = "",
  contextTitle,
}: SubpageContactWidgetProps) {
  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("_subject", `[ΒΡΟΣΙΝΑ 2031] ${contextTitle} — ${name}`);
      fd.append("Σελίδα", contextTitle);
      fd.append("Ιδιότητα", role);
      fd.append("Ονοματεπώνυμο / Φορέας", name);
      fd.append("Τηλέφωνο", phone);
      fd.append("Email", email || "Δεν συμπληρώθηκε");
      fd.append("Μήνυμα", message || "Αίτημα επικοινωνίας");
      fd.append("_template", "table");
      fd.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/ajax/digiadsgr@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Fallback");
      }
    } catch {
      const subject = encodeURIComponent(
        `[ΒΡΟΣΙΝΑ 2031] ${contextTitle} — ${name}`
      );
      const body = encodeURIComponent(
        `Σελίδα: ${contextTitle}\nΙδιότητα: ${role}\nΟνοματεπώνυμο: ${name}\nΤηλέφωνο: ${phone}\nEmail: ${email}\nΜήνυμα: ${message}`
      );
      window.location.href = `mailto:digiadsgr@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="epikinonia"
      className="bg-white rounded-lg p-6 sm:p-8 border-2 border-[#14191F] shadow-sm space-y-5"
    >
      <div className="space-y-1 border-b border-stone-200 pb-4">
        <div className="text-sm font-bold text-[#A34A2B]">
          Επικοινωνία & Δήλωση Ενδιαφέροντος
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191F]">
          Επικοινωνήστε μαζί μας
        </h2>
        <p className="text-base text-[#14191F]">
          Συμπληρώστε τη σύντομη φόρμα για το τμήμα «{contextTitle}» και θα επικοινωνήσουμε μαζί σας.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-lg bg-emerald-50 border-2 border-[#1F5C43] space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#1F5C43]">
            Ευχαριστούμε. Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε μαζί σας σύντομα.
          </h3>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 rounded bg-[#14191F] text-white text-sm font-semibold cursor-pointer"
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
                className="block text-sm font-semibold text-[#14191F] mb-1.5"
              >
                1. Ποιος είστε *
              </label>
              <select
                id="subpage-role-select"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base font-medium focus:outline-none focus:border-[#14191F]"
              >
                <option value="" disabled>
                  Επιλέξτε ποιος είστε…
                </option>
                <option value="Κτηνοτρόφος / παραγωγός της περιοχής">
                  Κτηνοτρόφος / παραγωγός της περιοχής
                </option>
                <option value="Κάτοικος ή ιδιοκτήτης σπιτιού ή γης">
                  Κάτοικος ή ιδιοκτήτης σπιτιού ή γης
                </option>
                <option value="Επιχειρηματίας (μικρός ή μεγάλος)">
                  Επιχειρηματίας (μικρός ή μεγάλος)
                </option>
                <option value="Επενδυτής">Επενδυτής</option>
                <option value="Εκπρόσωπος φορέα ή Δήμου">
                  Εκπρόσωπος φορέα ή Δήμου
                </option>
                <option value="Δημοσιογράφος">Δημοσιογράφος</option>
                <option value="Άλλο">Άλλο</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="subpage-name-input"
                className="block text-sm font-semibold text-[#14191F] mb-1.5"
              >
                2. Ονοματεπώνυμο ή Φορέας *
              </label>
              <input
                id="subpage-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="π.χ. Γιώργος Παπαδόπουλος"
                className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base focus:outline-none focus:border-[#14191F]"
              />
            </div>

            <div>
              <label
                htmlFor="subpage-phone-input"
                className="block text-sm font-semibold text-[#14191F] mb-1.5"
              >
                3. Τηλέφωνο επικοινωνίας *
              </label>
              <input
                id="subpage-phone-input"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="π.χ. 69XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base focus:outline-none focus:border-[#14191F]"
              />
            </div>

            <div>
              <label
                htmlFor="subpage-email-input"
                className="block text-sm font-semibold text-[#14191F] mb-1.5"
              >
                4. Email (προαιρετικό)
              </label>
              <input
                id="subpage-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="π.χ. name@email.gr"
                className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base focus:outline-none focus:border-[#14191F]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subpage-msg-input"
              className="block text-sm font-semibold text-[#14191F] mb-1.5"
            >
              5. Μήνυμα ή ερώτημα (προαιρετικό)
            </label>
            <textarea
              id="subpage-msg-input"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Γράψτε με απλά λόγια τι σας ενδιαφέρει..."
              className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base focus:outline-none focus:border-[#14191F]"
            />
          </div>

          <p className="text-sm text-[#14191F] bg-[#F7F5F0] p-3 rounded border border-stone-300">
            Τα στοιχεία σας χρησιμοποιούνται μόνο για να απαντήσουμε στο αίτημά σας και δεν δίνονται σε τρίτους.
          </p>

          <button
            type="submit"
            disabled={submitting || !role}
            className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#1F5C43] hover:bg-[#174935] disabled:opacity-50 text-white font-bold text-base transition cursor-pointer"
          >
            {submitting ? "Αποστολή..." : "Αποστολή Μηνύματος →"}
          </button>
        </form>
      )}
    </section>
  );
}
