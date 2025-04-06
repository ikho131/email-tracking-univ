export default async function handler(req, res) {
  const { email, link, university, company, type = "click" } = req.query;

  // type이 'click'일 때만 Zapier로 전송
  if (type.toLowerCase() === "click") {
    await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cjmhpv/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        email,
        link,
        university,
        company,
        time: new Date().toISOString(),
      }),
    });
  }

  res.writeHead(302, { Location: decodeURIComponent(link) });
  res.end();
}
