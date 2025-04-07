export default async function handler(req, res) {
  const { email, link, univ, company } = req.query;

  // 클릭 정보 Zapier로 전송
  await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cco6m5/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click",
      email,
      link,
      univ,
      company,
      time: new Date().toISOString(),
    }),
  });

  // 원래 링크로 리디렉션
  res.writeHead(302, { Location: decodeURIComponent(link) });
  res.end();
}
