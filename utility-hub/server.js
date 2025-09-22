
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import fetch from "node-fetch";
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(express.json({ limit: "2mb" }));
app.use(express.static("pages"));
app.use("/public", express.static("public"));

// Basic headers
app.use((req,res,next)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  next();
});

const limiter = new RateLimiterMemory({ points: 60, duration: 60 });
app.use(async (req, res, next) => {
  try { await limiter.consume(req.ip); next(); }
  catch { res.status(429).json({ error: "Too Many Requests. Coba lagi sebentar." }); }
});

app.post("/api/translate", async (req, res) => {
  try {
    const { q, source = "auto", target = "en", format = "text" } = req.body || {};
    if (!q?.trim()) return res.status(400).json({ error: "Text kosong" });
    const r = await fetch(process.env.LIBRE_URL || "https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.json({ translatedText: data.translatedText || data?.translated_text || "" });
  } catch (e) {
    res.status(500).json({ error: "Translate error", detail: String(e) });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
