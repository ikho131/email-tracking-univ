export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  // 📩 Zapier로 클릭 정보 전송
  await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cjmhpv/", {
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

  // 🌐 원래 링크로 리디렉션
  res.writeHead(302, { Location: link });
  res.end();
}
