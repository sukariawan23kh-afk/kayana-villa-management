# Deploying KAYANA to Netlify

This guide walks you through deploying the **KAYANA Villa Management** website
(including the **admin CMS**) to Netlify with a managed Postgres database.

The admin CMS lives at `/admin/*` and ships inside the same Next.js app —
so it deploys automatically with the public site. No separate service needed.

---

## 0. What you'll need

- A **GitHub** account (to host the code)
- A **Netlify** account (free)
- A **Postgres** database (free tier from [Neon](https://neon.tech),
  [Supabase](https://supabase.com), or [Prisma Postgres](https://www.prisma.io/postgres))

> ⚠️ The local SQLite database (`db/custom.db`) **cannot** be used on Netlify
> — its filesystem is ephemeral/read-only in serverless. You must use a hosted
> Postgres. The switch is one env var (see Step 3).

---

## 1. Push the code to GitHub

```bash
git init
git add .
git commit -m "KAYANA villa management site + admin CMS (Netlify-ready)"
git branch -M main
git remote add origin https://github.com/<you>/kayana-villa.git
git push -u origin main
```

> Make sure `.gitignore` excludes `.env`, `db/*.db`, `.next/`, `node_modules/`.
> (Already configured — verify before committing.)

---

## 2. Create a hosted Postgres database

Pick **one** (all have generous free tiers):

### Option A — Neon (recommended, Prisma-friendly)
1. Sign up at https://neon.tech
2. Create a project → copy the **connection string**
   (looks like `postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require`)

### Option B — Supabase
1. Sign up at https://supabase.com
2. New project → Settings → Database → Connection string (URI)

### Option C — Prisma Postgres
1. Sign up at https://www.prisma.io/postgres
2. Create instance → copy the connection URL

Save the connection string — you'll paste it into Netlify in Step 4.

---

## 3. Push the schema + seed the production database

Run **once locally** (pointing at your hosted Postgres, not the local SQLite):

```bash
# Temporarily switch to Postgres for this step:
export DATABASE_PROVIDER=postgresql
export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Create all tables in the hosted DB:
bun run db:push

# Seed default content (6 villas, 13 FAQs, 3 testimonial placeholders, 1 settings row):
bun run db:seed

# Verify connection + row counts:
bun run db:check
```

You should see:
```
✅ Connection OK
Tables:
  villas       : 6
  faqs         : 13
  testimonials : 3
  siteSettings : 1
```

> After this, unset the env vars so local dev goes back to SQLite:
> ```bash
> unset DATABASE_PROVIDER DATABASE_URL
> ```
> (Or just re-source `.env`.)

---

## 4. Connect to Netlify

1. Go to https://app.netlify.com → **Add new site** → **Import an existing project**
2. Pick your GitHub repo → **Deploy site**
3. Netlify auto-detects Next.js. Build settings (from `netlify.toml`):
   - **Build command:** `next build` (the `postinstall` hook runs `prisma generate`)
   - **Publish directory:** `.next`
   - **Plugin:** `@netlify/plugin-nextjs` (auto-installed)

### Set environment variables
In Netlify dashboard → **Site settings** → **Environment variables**, add:

| Key | Value | Notes |
|---|---|---|
| `DATABASE_PROVIDER` | `postgresql` | **Required** — switches Prisma to Postgres |
| `DATABASE_URL` | `postgresql://...` | Your hosted Postgres connection string |
| `ADMIN_PASSWORD` | `your-strong-password` | **Change from `kayana2026`!** |
| `ADMIN_SECRET` | (long random string) | Signs the admin session cookie. E.g. `openssl rand -hex 32` |
| `KAYANA_WHATSAPP` | `6281234567890` | Digits only, no `+` |
| `KAYANA_WHATSAPP_DISPLAY` | `+62 812 3456 7890` | Shown to users |
| `KAYANA_EMAIL` | `hello@kayanavilla.com` | |

> 💡 Tip: generate a strong `ADMIN_SECRET` with:
> ```bash
> openssl rand -hex 32
> ```

4. **Save** → **Trigger a new deploy** (Deploys → Deploy site).

---

## 5. Verify the deployment

Once the build finishes (green ✅), open your Netlify URL:
`https://kayana-xxx.netlify.app/`

- ✅ Public website loads (hero "Your Villa. Our Expertise.")
- ✅ Bilingual toggle (EN | ID) works
- ✅ WhatsApp floating button works
- ✅ Contact form saves leads (they'll appear in the admin)

### Access the admin CMS
Add `/admin` to the URL: `https://kayana-xxx.netlify.app/admin`
- Login with the `ADMIN_PASSWORD` you set
- Dashboard → Leads → Villas → FAQs → Testimonials → Settings

### Edit content live
1. In admin → **Settings**, change WhatsApp/email/socials → click **Save settings**
2. Open the public site → the changes appear immediately ✅

---

## 6. Going forward

- **Every `git push` to `main`** triggers a new Netlify deploy automatically.
- **Database changes**: if you add a Prisma field, run `bun run db:push` locally
  with the Postgres env vars (Step 3) to sync the schema.
- **Backups**: Neon/Supabase offer daily backups on free tiers — enable them.
- **Custom domain**: Netlify → Domain settings → add `kayana-villa-management.com`.
  Update the `site.url` in `src/lib/site.ts` (or better: move it to an env var).

---

## Troubleshooting

### Build fails: "Cannot find module '@prisma/client'"
The `postinstall` script runs `prisma generate`. If it's missing, add it manually:
```bash
# In netlify build settings, prepend to build command:
prisma generate && next build
```

### Admin redirects to login in a loop
- Check `ADMIN_SECRET` is set in Netlify env (must be non-empty).
- Check `ADMIN_PASSWORD` is what you typed.

### "Invalid `datasource.url`" Prisma error
- `DATABASE_PROVIDER` must be exactly `postgresql` (not `postgres`).
- `DATABASE_URL` must start with `postgresql://` (or `postgres://`).
- If your host requires SSL, append `?sslmode=require` to the URL.

### Images don't load (broken villa thumbnails)
The site fetches villa images from `z-cdn.chatglm.cn`. This is already
whitelisted in `next.config.mjs` → `images.remotePatterns`. If you change
image hosts, update that list.

### Contact form submissions don't appear in admin
- Check `DATABASE_URL` is the same one you seeded.
- Check the API route logs in Netlify → Functions.

---

## Quick reference

```bash
# Local dev (SQLite):
bun run dev

# Switch to Postgres locally (for testing prod-like):
export DATABASE_PROVIDER=postgresql
export DATABASE_URL="postgresql://..."
bun run dev

# Seed the production DB:
DATABASE_PROVIDER=postgresql DATABASE_URL="postgresql://..." bun run db:seed

# Check DB connection + row counts:
DATABASE_PROVIDER=postgresql DATABASE_URL="postgresql://..." bun run db:check
```

---

**Admin URL pattern:** `https://<your-netlify-site>.netlify.app/admin`
**Default password (CHANGE IT):** `kayana2026` → set `ADMIN_PASSWORD` env var.
