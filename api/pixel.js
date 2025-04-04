export default function handler(req, res) {
  const { email, university, t } = req.query;

  // 이메일 오픈 로그 기록
  console.log(`[UNI OPEN] Email: ${email} | Univ: ${university} | Time: ${new Date().toISOString()}`);

  // 1x1 PNG 픽셀 이미지 (Base64 인코딩된 값)
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgBfHuKcAAAAASUVORK5CYII=",
    "base64"
  );

  // 응답 헤더 설정
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");

  // 1x1 픽셀 이미지 전송
  res.status(200).send(pixel);
}
