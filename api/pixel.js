export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  console.log("📬 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  await fetch("https://script.google.com/macros/s/AKfycbyqr2ScBox4QWF0CfI7drVvCB-BZZILeyUsDwYb4MzJiOf4cgFuPibY4WdXXk7K8iv9dw/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "open",
      university,
      company,
      email,
      time: t || new Date().toISOString(),
    }),
  });

  const imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwEAApIBbzv+4Z6YAAAAAElFTkSuQmCC",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.end(imageBuffer);
}
