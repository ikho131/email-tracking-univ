export default async function handler(req, res) {
  const { email, univ, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  await fetch("https://script.google.com/macros/s/AKfycbx-JJhifHCENWl0f_5a-KahhaBqa7GwmNEyZGJrsW1Sm7pNLw2nj3dPeZVZWsiZ8KKY/exec", {
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
