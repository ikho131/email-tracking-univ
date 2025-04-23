export default async function handler(req, res) {
  const { email, university, company, type, t, sentAt } = req.query;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwqe2O1MprupakJOWeKGLg3m-uIoWAFNTWjLJV3TJWIEEhwDtlXIHG1kRVjSEcKkPQ_JA/exec";

  console.log("📩 [PIXEL] 요청 수신됨");
  console.log("받은 쿼리값:", { email, university, company, type, t, sentAt });

  try {
    const payload = {
      type: type || "open",
      email,
      university,
      company,
      time: t,
      sentAt,
    };

    console.log("📤 Google Apps Script로 POST 요청 전송 ➡️", payload);

    await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("✅ Google Apps Script POST 완료");

    const pixel = Buffer.from("R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");
    res.setHeader("Content-Type", "image/gif");
    res.setHeader("Content-Length", pixel.length);
    res.status(200).send(pixel);
  } catch (err) {
    console.error("🔥 pixel error:", err);
    res.status(500).json({ error: "Pixel error", detail: err.message });
  }
}
