export default async function handler(req, res) {
  const { email, company, university, t } = req.query;

  // ✅ Vercel 로그 확인용 콘솔 로그 (순서: 대학교 → 부서 → 이메일 → 시간)
  console.log("📩 이메일 열람 기록:", {
    university,
    company,
    email,
    time: t,
  });

  // 🚀 Zapier로 데이터 전송
  await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cco6m5/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "open",
      university,
      company,
      email,
      time: t,
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
