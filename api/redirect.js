export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  await fetch("https://script.google.com/macros/s/AKfycbwHble9tzrRcWq7tGZg8lIJVXK22OCHMNig5HE_bmmzoJamMfwtG2DhIKPg3E3ztsGtkg/exec", {
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
