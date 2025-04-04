export default function handler(req, res) {
  const { email, university, t } = req.query;

  console.log(`[UNI OPEN] Email: ${email} | Univ: ${university} | Time: ${new Date().toISOString()}`);

  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgBfHuKcAAAAASUVORK5CYII=",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(pixel);
}

