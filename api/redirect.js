// 📨 Zapier로 전송
await fetch("https://hooks.zapier.com/hooks/catch/22340938/2cjmhpv/", {
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

// ✅ Google Apps Script Webhook에도 전송
await fetch("https://script.google.com/macros/s/AKfycbxGqeAZFxcvVglyZJPt0oE_7EvCtB9s8SPSJU7K7htzSECPTc1nIXU7ZvqUrtWM1KrQ/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: type || "click",
    email,
    link,
  }),
});
