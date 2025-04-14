// ✅ redirect.js 최종 버전: 도메인별 자동 분기 처리 (클릭 트래킹)
export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  // 도메인별 Google Apps Script Web App URL 매핑
  const scriptMap = {
    "threeline.ikho@gmail.com": "https://script.google.com/macros/s/AKfycbxiPqGMedWNa5HgKBpjdmPPU0WysW7jHA_jqZLS_FofkrHwNf-_3n3LXHo6P4t4pWoT/exec",
    "ikho.3lineb@gmail.com": "https://script.google.com/macros/s/AKfycbwk9Ldq3oPAtCp1Mp6qgH4ZB_KcGfsi-YXbj9C6qspoqG6RuPsiX88QQvk92FwQ8iNW/exec",
    "ikho.3line@gmail.com": "https://script.google.com/macros/s/AKfycbwPZeTa9aAlr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLCQQGr4tGZlWb7J5bNBw/exec"
  };

  const matchedKey = Object.keys(scriptMap).find(key => email.includes(key));
  const scriptUrl = matchedKey ? scriptMap[matchedKey] : null;

  if (!scriptUrl) {
    return res.status(400).json({ error: "Unknown email domain." });
  }

  // Google Apps Script로 클릭 데이터 전송
  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type || "click",
      email,
      link,
      univ,
      company,
      time: new Date().toISOString(),
    }),
  });

  // 링크로 실제 이동
  res.writeHead(302, { Location: link });
  res.end();
}
