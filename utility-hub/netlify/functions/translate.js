
export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }
    const { q, source = "auto", target = "en", format = "text" } = JSON.parse(event.body || "{}");
    if (!q || !q.trim()) return { statusCode: 400, body: JSON.stringify({ error: "Text kosong" }) };

    const LIBRE_URL = process.env.LIBRE_URL || "https://libretranslate.com/translate";
    const r = await fetch(LIBRE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format })
    });
    const data = await r.json();
    if (!r.ok) return { statusCode: r.status, body: JSON.stringify(data) };

    return { statusCode: 200, body: JSON.stringify({ translatedText: data.translatedText || data.translated_text || "" }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "Translate error", detail: String(e) }) };
  }
}
