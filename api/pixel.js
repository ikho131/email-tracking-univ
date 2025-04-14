export default async function handler(req, res) {
  const { email, university, company, type, t } = req.query;

  // 발신자는 항상 ikho.3line@gmail.com 이므로, WebApp URL 고정
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwPZeTa9aAlr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLCQQGr4tGZlWb7J5bNBw/exec";

  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: type || "open", email, university, company, time: t })
  });

  // 1x1 픽셀 이미지 반환
  const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Content-Length", pixel.length);
  res.status(200).send(pixel);
}
