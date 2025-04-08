export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  // ✅ 로그 출력
  console.log("📩 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  // 📨 Google Apps Script Web App으로 열람 정보 전송
  await fetch("https://script.google.com/macros/s/AKfycbxSLwfmctyzAA2yWMx73tdRhEpPDqai_ZWGg7uEgYnfhdTUCfkwxIFNYZhFsiiLg-JgMQ/exec", {
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

  // 🖼️ 추적용 1픽셀 이미지 응답
  const imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8xwEAApIBzV+4Z6YAAAAASUVORK5CYII=",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", imageBuffer.length);
  res.status(200).send(imageBuffer);
}
