export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  // ✅ 로그 출력 (Vercel console에서 확인)
  console.log("📩 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  // ✅ Google Apps Script Web App으로 전송
  await fetch("https://script.google.com/macros/s/AKfycbwZeoggsdWfDXin_hkG8ovALdoRQ_lIMZ0U_GvEOJ8FK4qiocJEtRaJYlxlm3eWP1r_ag/exec", {
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

  // 🖼️ 1픽셀 추적 이미지 응답
  const imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8xwEAApIBzV+4Z6YAAAAASUVORK5CYII=",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", imageBuffer.length);
  res.status(200).send(imageBuffer);
}
