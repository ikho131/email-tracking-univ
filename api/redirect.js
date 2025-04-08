// pages/api/redirect.js
export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  // 📤 Google Apps Script Web App으로 클릭 정보 전송
  await fetch("https://script.google.com/macros/s/AKfycbwHble9tzrRcWq7tGZg8lIJVXK22OCHMNig5HE_bmmzoJamMfwtG2DhIKPg3E3ztsGtkg/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type || "click",  // 기본값 click
      email,
      link,
      univ,
      company,
      time: new Date().toISOString(),
    }),
  });

  // 🔁 원래 링크로 리디렉션
  res.writeHead(302, { Location: link });
  res.end();
}
