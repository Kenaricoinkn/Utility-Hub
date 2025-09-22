
# Utility Hub (Vercel/Netlify)
- Tools: Translate (proxy), Converter (ffmpeg.wasm client-side), Subtitle shift (client-side)
- Legal: Privacy, Terms, About, Contact
- Monetization: AdSense placeholders
- SEO: robots.txt, sitemap.xml, OG tags

## Run local / Termux
npm install
npm start
# http://localhost:3000

## Deploy
- Vercel: vercel.json included
- Netlify: netlify.toml + functions/translate.js

## Config
Set env `LIBRE_URL` ke endpoint LibreTranslate kamu (mis. Railway):
LIBRE_URL=https://your-railway-app.up.railway.app/translate
