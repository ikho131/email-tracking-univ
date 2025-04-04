export default async function handler(req, res) {
  const { email, link, university, company } = req.query;

  // 🔔 Zapier Webhook으로 클릭 정보 전송
  await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cco6m5/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click",
      email,
      link,
      university,
      company,
      time: new Date().toISOString(),
    }),
  });

  // 🔁 원래 링크로 리디렉션
  res.writeHead(302, { Location: decodeURIComponent(link) });
  res.end();
}

