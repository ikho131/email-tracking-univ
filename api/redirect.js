export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  await fetch("https://script.google.com/macros/s/AKfycbwk9Ldq3oPAtCp1Mp6qgH4ZB_KcGfsi-YXbj9C6qspoqG6RuPsiX88QQvk92FwQ8iNW/exec", {
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

  res.writeHead(302, { Location: link });
  res.end();
}
