import nodemailer from "nodemailer";

function escapeHtml(val) {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildVrosinaOwnerHtml(data) {
  const {
    name,
    email,
    phone,
    roleLabel,
    origin,
    pageUrl,
    referrer,
    contextDetails,
    message,
    submittedAt,
  } = data;

  const rows = [
    [
      "📍 Πηγή / Κουμπί Προέλευσης",
      `<strong style="color:#ffbf00;">${escapeHtml(origin)}</strong>`,
    ],
    ["🏷️ Κατηγορία / Ιδιότητα", escapeHtml(roleLabel)],
    ["👤 Ονοματεπώνυμο / Φορέας", `<strong>${escapeHtml(name)}</strong>`],
    [
      "📞 Τηλέφωνο Επικοινωνίας",
      phone
        ? `<a href="tel:${escapeHtml(phone)}" style="color:#4ade80;text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a>`
        : "—",
    ],
    [
      "📧 Email",
      email
        ? `<a href="mailto:${escapeHtml(email)}" style="color:#38bdf8;text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>`
        : "—",
    ],
    ["🧮 Στοιχεία Ενότητας / Υπολογιστή", escapeHtml(contextDetails || "—")],
    [
      "🌐 Σελίδα URL",
      `<a href="${escapeHtml(pageUrl)}" style="color:#94a3b8;">${escapeHtml(pageUrl)}</a>`,
    ],
    ["🔗 Προέλευση Κίνησης (Referrer)", escapeHtml(referrer || "Direct")],
    ["🕒 Ημερομηνία & Ώρα (Ελλάδα)", escapeHtml(submittedAt)],
  ];

  return `<!DOCTYPE html>
<html lang="el">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d1115;font-family:'Inter',Arial,sans-serif;color:#f5f2eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1115;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#14191f;border-radius:14px;border:1px solid #2b333c;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(90deg,#1f5c43,#b85d3b,#c89d54);padding:4px 0;"></td>
          </tr>
          <tr>
            <td style="padding:28px 32px 18px;">
              <div style="font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c89d54;font-weight:700;">
                🔔 ΜΗΤΡΩΟ ΣΥΜΜΕΤΟΧΗΣ & ΕΠΕΝΔΥΤΩΝ · ΒΡΟΣΙΝΑ 2031
              </div>
              <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:8px 0 6px;line-height:1.3;">
                Νέα Αίτηση / Εκδήλωση Ενδιαφέροντος 🎯
              </h1>
              <p style="color:#94a3b8;font-size:13px;margin:0;">
                Απευθείας αποστολή από <strong style="color:#f5f2eb;">vrosina2031.vercel.app</strong> → <strong style="color:#c89d54;">digiadsgr@gmail.com</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1b222a;border:1px solid #2e3843;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${rows
                        .map(
                          ([label, val]) => `
                      <tr>
                        <td style="color:#94a3b8;font-size:12px;padding:8px 8px 8px 0;width:38%;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.05);">${label}</td>
                        <td style="color:#ffffff;font-size:13px;padding:8px 0;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.05);">${val}</td>
                      </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <div style="font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c89d54;margin-bottom:8px;font-weight:700;">
                💬 ΜΗΝΥΜΑ / ΠΕΡΙΓΡΑΦΗ ΑΙΤΗΜΑΤΟΣ
              </div>
              <div style="background:#1b222a;border:1px solid #2e3843;border-radius:10px;padding:16px 20px;color:#e2e8f0;font-size:14px;line-height:1.6;white-space:pre-line;">${escapeHtml(
                message || "(Χωρίς επιπλέον σχόλιο)"
              )}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 30px;text-align:center;">
              <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(
                "Απάντηση στο αίτημά σας — Πρωτοβουλία «Βροσίνα 2031»"
              )}" style="display:inline-block;background:#1f5c43;color:#ffffff;font-size:13px;font-weight:700;padding:13px 28px;border-radius:8px;text-decoration:none;margin-right:8px;">
                Απάντηση μέσω Email στον/στην ${escapeHtml(name)} →
              </a>
              ${
                phone
                  ? `<a href="tel:${escapeHtml(phone)}" style="display:inline-block;background:#b85d3b;color:#ffffff;font-size:13px;font-weight:700;padding:13px 24px;border-radius:8px;text-decoration:none;">
                Κλήση: ${escapeHtml(phone)}
              </a>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="background:#0a0d10;padding:16px 32px;text-align:center;border-top:1px solid #222930;color:#64748b;font-size:11px;">
              Πλατφόρμα «Βροσίνα 2031» · Σύστημα Lead Capture Powered by <a href="https://digiads.gr" style="color:#c89d54;text-decoration:none;">DIGIADS</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildApplicantConfirmationHtml(data) {
  const { name, roleLabel, origin, contextDetails, message } = data;
  return `<!DOCTYPE html>
<html lang="el">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f5f2eb;font-family:'Inter',Arial,sans-serif;color:#14191f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2eb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;border:1px solid #d6d0c4;overflow:hidden;">
          <tr>
            <td style="background:#14191f;padding:24px 32px;">
              <div style="font-family:Georgia,serif;font-size:20px;font-weight:700;color:#ffffff;">
                ΒΡΟΣΙΝΑ<span style="color:#b85d3b;">2031</span>
              </div>
              <div style="font-family:monospace;font-size:11px;color:#c89d54;margin-top:4px;">
                ΣΥΝΤΟΝΙΣΤΙΚΟ DESK & ΜΗΤΡΩΟ ΣΥΜΜΕΤΟΧΗΣ
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <h2 style="margin:0 0 12px;font-size:20px;color:#14191f;">
                Λάβαμε το αίτημά σας, ${escapeHtml(name)}! ✓
              </h2>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
                Σας ευχαριστούμε για το ενδιαφέρον σας στο Στρατηγικό & Επιχειρησιακό Σχέδιο <strong>«Βροσίνα 2031» (10,45 εκ. €)</strong>. Το αίτημά σας καταχωρίστηκε επιτυχώς και η ομάδα συντονισμού θα επικοινωνήσει άμεσα μαζί σας.
              </p>
              <div style="background:#f8f6f1;border:1px solid #e5e0d5;border-radius:8px;padding:16px;font-size:13px;line-height:1.6;margin-bottom:20px;">
                <div><strong>Κατηγορία:</strong> ${escapeHtml(roleLabel)}</div>
                <div><strong>Ενότητα Προέλευσης:</strong> ${escapeHtml(origin)}</div>
                ${contextDetails ? `<div><strong>Παράμετροι:</strong> ${escapeHtml(contextDetails)}</div>` : ""}
                ${message ? `<div style="margin-top:8px;"><strong>Μήνυμα:</strong> ${escapeHtml(message)}</div>` : ""}
              </div>
              <p style="margin:0;font-size:13px;color:#4b5563;">
                Μπορείτε ανά πάσα στιγμή να κατεβάσετε τον πλήρη φάκελο τεκμηρίωσης (13 μελέτες & Business Plan v2.0) από το <a href="https://vrosina2031.vercel.app/#data-room" style="color:#1f5c43;font-weight:700;">Data Room της πλατφόρμας</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#14191f;padding:16px 32px;text-align:center;color:#9ca3af;font-size:11px;">
              Πρωτοβουλία «Βροσίνα 2031» · Δ.Ε. Μολοσσών, Δήμος Ζίτσας, Π.Ε. Ιωαννίνων · <a href="https://vrosina2031.vercel.app" style="color:#c89d54;text-decoration:none;">vrosina2031.vercel.app</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const submittedAt = new Date().toLocaleString("el-GR", {
      timeZone: "Europe/Athens",
    });

    const name =
      body.name ||
      body["06_Ονοματεπώνυμο_ή_Φορέας"] ||
      "Ενδιαφερόμενος Βροσίνα 2031";
    const email = (body.email || body["08_Email"] || "").trim();
    const phone = (body.phone || body["07_Τηλέφωνο_Επικοινωνίας"] || "").trim();
    const roleLabel =
      body.roleLabel ||
      body["05_Κατηγορία_Ενδιαφέροντος"] ||
      "Εκδήλωση Ενδιαφέροντος";
    const origin =
      body.origin ||
      body["02_Πηγή_Φόρμας_Ενότητα"] ||
      "Φόρμα Πλατφόρμας Βροσίνα 2031";
    const pageUrl =
      body.pageUrl ||
      body["03_Σελίδα_URL"] ||
      "https://vrosina2031.vercel.app";
    const referrer =
      body.referrer || body["04_Referrer"] || "Απευθείας Επίσκεψη (Direct)";
    const contextDetails =
      body.contextDetails || body["09_Στοιχεία_Υπολογιστή_ή_Ενότητας"] || "—";
    const message =
      body.message ||
      body["10_Μήνυμα_Ενδιαφερόμενου"] ||
      "(Χωρίς επιπλέον μήνυμα)";

    console.log("==================================================");
    console.log(`[VROSINA 2031 LEAD CAPTURED] ${submittedAt}`);
    console.log(
      JSON.stringify(
        {
          name,
          email,
          phone,
          roleLabel,
          origin,
          pageUrl,
          contextDetails,
          message,
        },
        null,
        2
      )
    );
    console.log("==================================================");

    const smtpUser = (process.env.SMTP_EMAIL || "").trim();
    const smtpPass = (process.env.SMTP_PASSWORD || "").trim();
    const notificationEmail = (
      process.env.NOTIFICATION_EMAIL || "digiadsgr@gmail.com"
    ).trim();

    let ownerSent = false;

    // 1. Direct SMTP if environment variables are configured on this Vercel project
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const ownerHtml = buildVrosinaOwnerHtml({
        name,
        email,
        phone,
        roleLabel,
        origin,
        pageUrl,
        referrer,
        contextDetails,
        message,
        submittedAt,
      });

      const mailTasks = [
        transporter.sendMail({
          from: `"ΒΡΟΣΙΝΑ 2031 — Lead Desk" <${smtpUser}>`,
          to: notificationEmail,
          replyTo: email || notificationEmail,
          subject: `🎯 [ΒΡΟΣΙΝΑ 2031] ${roleLabel} | Πηγή: ${origin} (${name})`,
          html: ownerHtml,
        }),
      ];

      if (
        email &&
        email.includes("@") &&
        email.toLowerCase() !== notificationEmail.toLowerCase()
      ) {
        const applicantHtml = buildApplicantConfirmationHtml({
          name,
          roleLabel,
          origin,
          contextDetails,
          message,
        });
        mailTasks.push(
          transporter.sendMail({
            from: `"Πρωτοβουλία ΒΡΟΣΙΝΑ 2031" <${smtpUser}>`,
            to: email,
            replyTo: notificationEmail,
            subject: `Επιβεβαίωση Αιτήματος — ΒΡΟΣΙΝΑ 2031 (${roleLabel})`,
            html: applicantHtml,
          })
        );
      }

      const results = await Promise.allSettled(mailTasks);
      ownerSent = results[0]?.status === "fulfilled";
    }

    // 2. Zero-Secret Server-to-Server Relay via DIGIADS Central Mailer (which holds SMTP env vars in Vercel)
    if (!ownerSent) {
      const summaryLines = [
        `ΕΡΓΟ: ΒΡΟΣΙΝΑ 2031 (vrosina2031.vercel.app)`,
        `ΠΗΓΗ / ΚΟΥΜΠΙ ΠΡΟΕΛΕΥΣΗΣ: ${origin}`,
        `ΚΑΤΗΓΟΡΙΑ / ΙΔΙΟΤΗΤΑ: ${roleLabel}`,
        `ΟΝΟΜΑΤΕΠΩΝΥΜΟ / ΦΟΡΕΑΣ: ${name}`,
        `ΤΗΛΕΦΩΝΟ: ${phone || "—"}`,
        `EMAIL: ${email || "—"}`,
        `ΣΤΟΙΧΕΙΑ ΥΠΟΛΟΓΙΣΤΗ / ΕΝΟΤΗΤΑΣ: ${contextDetails || "—"}`,
        `ΣΕΛΙΔΑ URL: ${pageUrl}`,
        `REFERRER: ${referrer}`,
        `ΗΜΕΡΟΜΗΝΙΑ & ΩΡΑ: ${submittedAt}`,
        `--------------------------------------------------`,
        `ΜΗΝΥΜΑ ΕΝΔΙΑΦΕΡΟΜΕΝΟΥ:`,
        `${message || "(Χωρίς επιπλέον σχόλιο)"}`,
      ].join("\n");

      const relayRes = await fetch("https://www.digiads.gr/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} [ΒΡΟΣΙΝΑ 2031]`,
          email: email || notificationEmail,
          phone: phone || "—",
          service: `🎯 [ΒΡΟΣΙΝΑ 2031] ${roleLabel} | Πηγή: ${origin}`,
          chatSummary: summaryLines,
        }),
      });

      ownerSent = relayRes.ok;
    }

    return res.status(200).json({
      ok: ownerSent,
      smtpSent: ownerSent,
      loggedAt: submittedAt,
    });
  } catch (err) {
    console.error("[VROSINA 2031 LEAD ERROR]", err);
    return res
      .status(200)
      .json({ ok: false, smtpSent: false, error: String(err) });
  }
}
