export default async function handler(req, res) {
  const { email, link, university, company } = req.query;

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

  res.writeHead(302, { Location: decodeURIComponent(link) });
  res.end();
}
