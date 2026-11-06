export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const timestamp = new Date().toISOString();

    // Permanent structured log in Vercel Function Logs (never lost even if email is delayed)
    console.log("==================================================");
    console.log(`[VROSINA 2031 LEAD CAPTURED] ${timestamp}`);
    console.log(JSON.stringify(body, null, 2));
    console.log("==================================================");

    return res.status(200).json({
      ok: true,
      loggedAt: timestamp,
    });
  } catch (err) {
    console.error("[VROSINA 2031 LEAD ERROR]", err);
    return res.status(200).json({ ok: false });
  }
}
