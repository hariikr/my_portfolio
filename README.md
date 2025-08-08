# Professional Portfolio (React + Express + Tailwind)

Scripts:
- Server: `npm run dev:server`
- Client: `npm run dev:client`
- Both: `npm run dev`
- Build (client): `npm run build`
- Start (prod): `npm start`

Environment:
- Edit `.env` with SMTP creds for the contact form.

## Quick Start
1) Install deps
```
npm install
npm --prefix server install
npm --prefix client install
```
2) Configure `.env` at repo root
```
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Gmail (recommended)
SMTP_SERVICE=gmail
SMTP_USER=you@gmail.com
SMTP_PASS=<GMAIL_APP_PASSWORD>
MAIL_FROM=Portfolio <you@gmail.com>
MAIL_TO=you@gmail.com
```
Notes:
- Use a Gmail App Password (requires 2‑Step Verification). Do not use your normal password.
- Alternatively, set SMTP_HOST/SMTP_PORT/SMTP_SECURE instead of SMTP_SERVICE.

## Run in Development
- Backend: `npm run dev:server`
- Frontend: `npm run dev:client`
- Both (concurrently): `npm run dev`

App URLs:
- Client: http://localhost:5173
- API: http://localhost:5000

## Build & Run in Production
```
npm run build
npm start
```
- The server will run on PORT and serve the built client from `client/dist`.

## Deploy to Render
Web Service (single service: API serves client):
- Build Command: `npm run render-build`
- Start Command: `npm run render-start`
- Environment Variables:
  - NODE_ENV=production
  - SMTP_SERVICE=gmail (or SMTP_HOST/SMTP_PORT/SMTP_SECURE)
  - SMTP_USER, SMTP_PASS (Gmail App Password)
  - MAIL_FROM=Harikrishnan <your@gmail.com>
  - MAIL_TO=harikrishnananish0@gmail.com
  - CLIENT_ORIGIN=<your site url>
- Health Check Path: `/health`
- Auto Deploy: On (main)

If you prefer two services (Static + API), see the previous section on CORS and full API URLs.

## Project Structure
- `server/` Express API (contact route, security middleware)
- `client/` React (Vite, Tailwind)
- `.env` SMTP and config

## Troubleshooting (Contact Form)
- Error: "Email service authentication failed"
  - Ensure `.env` has SMTP_SERVICE=gmail and a valid Gmail App Password, or proper SMTP_HOST/PORT/SECURE.
  - Make sure MAIL_FROM uses your authenticated email (same as SMTP_USER). replyTo is set to the sender.
  - Restart the server after any `.env` changes.
- Rate limit: Max 5 contact requests per minute.
- Honeypot: Hidden `company` field must be empty; bots are ignored silently.

## CI/CD (GitHub Actions)
- CI (`.github/workflows/ci.yml`):
  - Installs deps, lints client, builds client, smoke‑tests Express `/health`, and uploads `client/dist` as artifact.
- Deploy (`.github/workflows/deploy.yml`):
  - Manual trigger. Builds client and uploads artifact. Replace the placeholder with your hosting CLI/API.

Secrets (optional for server tests or deployments):
- In GitHub repo → Settings → Secrets and variables → Actions:
  - SMTP_SERVICE / SMTP_HOST / SMTP_PORT / SMTP_SECURE
  - SMTP_USER / SMTP_PASS
  - MAIL_FROM / MAIL_TO
  - Any provider tokens (e.g., RENDER_API_KEY, RAILWAY_TOKEN, FLY_API_TOKEN)

To customize deployment: edit `deploy.yml` per your hosting (Render, Railway, Fly.io, EC2, etc.).
