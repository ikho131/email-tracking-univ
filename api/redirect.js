export default async function handler(req, res) {
  const { email, university, company, type } = req.query;
  const link = decodeURIComponent(req.query.link || "");

  // 고정된 Web App URL (ikho.3line@gmail.com 계정에서 생성된 것)
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwPZeTa9aALr3scgnGjYcvC9n3Q50bWob2wE13ICtrReze3jNLC0QQGr4tGZIWb7J5bNBw/exec";

  if (!scriptUrl || !link) {
    return res.status(400).json({ error: "Invalid request." });
  }

  try {
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
  } catch (err) {
    console.error("🔥 redirect error", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
