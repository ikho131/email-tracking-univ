export default async function handler(req, res) {
  const { email, company, t } = req.query;

  // 📡 Zapier Webhook으로 데이터 전송
  await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cco6m5/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, company, time: t }),
  });

  // 🖼️ 추적용 1픽셀 이미지 응답
  const imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AApIBzV+4Z6YAAAAASUVORK5CYII=",
    "base64"
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", imageBuffer.length);
  res.status(200).send(imageBuffer);
}
