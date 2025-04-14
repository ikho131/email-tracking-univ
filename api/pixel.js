// ✅ pixel.js 최종 버전: 도메인 자동 분기 처리 (열람 트래킹)
export default async function handler(req, res) {
  const { email, university, company, type, t } = req.query;

// 발신자가 항상 ikho.3line@gmail.com이므로, 고정값으로 바로 처리
const scriptUrl = "https://script.google.com/macros/s/AKfycbwPZeTa9aAlr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLCQQGr4tGZlWb7J5bNBw/exec";


  const matchedKey = Object.keys(scriptMap).find(key => email.includes(key));
  const scriptUrl = matchedKey ? scriptMap[matchedKey] : null;

  if (!scriptUrl) {
    return res.status(400).json({ error: "Unknown email domain." });
  }

  // Google Apps Script로 데이터 전송
  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: type || "open", email, university, company, time: t })
  });

  // 1x1 픽셀 이미지 반환
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    "base64"
  );
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Content-Length", pixel.length);
  res.status(200).send(pixel);
}


// ✅ redirect.js 최종 버전: 도메인 자동 분기 처리 (클릭 트래킹)
export default async function handler(req, res) {
  const { email, university, company, link, t } = req.query;

  const scriptMap = {
    "threeline.ikho@gmail.com": "https://script.google.com/macros/s/AKfycbxiPqGMedWNa5HgKBpjdmPPU0WysW7jHA_jqZLS_FofkrHwNf-_3n3LXHo6P4t4pWoT/exec",
    "ikho.3lineb@gmail.com": "https://script.google.com/macros/s/AKfycbwk9Ldq3oPAtCp1Mp6qgH4ZB_KcGfsi-YXbj9C6qspoqG6RuPsiX88QQvk92FwQ8iNW/exec",
    "ikho.3line@gmail.com": "https://script.google.com/macros/s/AKfycbwPZeIa9aA1r3scgnGjYevC9n3Q5ObWo2wEI31CrtReze3jNLC0QGr4tGZIWb7JShBW/exec"
  };

  const matchedKey = Object.keys(scriptMap).find(key => email.includes(key));
  const scriptUrl = matchedKey ? scriptMap[matchedKey] : null;

  if (!scriptUrl || !link) {
    return res.status(400).json({ error: "Invalid request." });
  }

  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "click", email, university, company, link, time: t })
  });

  return res.redirect(link);
}
