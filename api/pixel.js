export default function handler(req, res) {
  const { email, university, t } = req.query;

  console.log(`[UNI OPEN] Email: ${email} | Univ: ${university} | Time: ${new Date().toISOString()}`);

  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgBfHuKcAAAAASUVORK5CYII=",
    "base64"
  );

  // 🔄 Webhook으로 열람 기록 전송
  fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbwaKWUvdTnD8c3CCim-O1YupzDXv6NtVfl9xwdfbwN0vF7it83DBf3u_ZgDKaiuG0ki1Q/exec/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      university: university,
      time: new Date().toISOString()
    })
  }).catch(err => console.error("Error sending to Google Apps Script:", err));

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(pixel);
}
