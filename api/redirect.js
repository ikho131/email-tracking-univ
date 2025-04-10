export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  await fetch("https://script.google.com/macros/s/AKfycbxms06oJhlLtXdiqJXW6utMqUJR_UY3D68UmrmE0bWtuJAtmr9_ZOMqRo_ruqhFzjNw3Q/exec", {
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
