export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  console.log("📩 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  await fetch("https://script.google.com/macros/s/AKfycbwHble9tzrRcWq7tGZg8lIJVXK22OCHMNig5HE_bmmzoJamMfwtG2DhIKPg3E3ztsGtkg/exec", {
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
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8z8wEAApIBbzV+4Z6YAAAAAElFTkSuQmCC",
    "base64"
  );
  res.setHeader("Content-Type", "image/png");
  res.end(imageBuffer);
}
