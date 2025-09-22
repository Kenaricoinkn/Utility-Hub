
# LibreTranslate on Railway

## Deploy steps
1. Fork this repo (or upload these files to a new repo).
2. Go to https://railway.app → New Project → Deploy from GitHub → select repo.
3. Set **Region**: Singapore (recommended for Indonesia).
4. No special env needed. Optional: `LT_LOAD_AUTO_DOWNLOAD_MODELS=true` (default in Dockerfile).
5. Deploy → get public URL, example:
   https://your-railway-app.up.railway.app

## API endpoint
Append `/translate`:
https://your-railway-app.up.railway.app/translate

## Test
curl -X POST https://your-railway-app.up.railway.app/translate \
  -H "Content-Type: application/json" \
  -d '{"q":"halo dunia","source":"auto","target":"en"}'

## Use in Utility Hub
Set in your website env:
LIBRE_URL=https://your-railway-app.up.railway.app/translate
