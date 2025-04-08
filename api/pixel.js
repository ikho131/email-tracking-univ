export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  // ✅ 로그 출력 (Vercel 콘솔 확인용)
  console.log("📩 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  // 📨 Google Apps Script Web App으로 열람 정보 전송
  await fetch("https://script.google.com/macros/s/AKfycbzsgqBmDfU93Dn-KwzW4EPukxC3q-X4p-RyTzoM7AaODT5n4pZitfsbBHbI3Q3ZVidb/exec", {
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

  // 🖼️ 1픽셀 이미지 응답
  const imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8zwEAApIBzv+4Z6YAAAAAElFTkSuQmCC",
    "base64"
  );
  res.setHeader("Content-Type", "image/png");
  res.end(imageBuffer);
}
