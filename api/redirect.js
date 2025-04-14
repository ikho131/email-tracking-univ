export default async function handler(req, res) {
  const { email, university, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

// 발신자가 항상 ikho.3line@gmail.com이므로, 고정값으로 바로 처리
const scriptUrl = "https://script.google.com/macros/s/AKfycbwPZeTa9aAlr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLCQQGr4tGZlWb7J5bNBw/exec";


  const matchedKey = Object.keys(scriptMap).find(key => email.includes(key));
  const scriptUrl = matchedKey ? scriptMap[matchedKey] : null;

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
