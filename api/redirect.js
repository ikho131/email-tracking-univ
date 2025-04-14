export default async function handler(req, res) {
  const { email, university, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  // 📌 scriptUrl 고정 (발신자 계정이 항상 ikho.3line@gmail.com 이므로)
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwPZeTa9aAlr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLC0QQGr4tGZlWb7J5bNBw/exec";

  if (!scriptUrl || !link) {
    return res.status(400).json({ error: "Invalid request." });
  }

  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type || "click",
      email,
      university,
      company,
      link,
      time: new Date().toISOString(),
    }),
  });

  res.writeHead(302, { Location: link });
  res.end();
}
