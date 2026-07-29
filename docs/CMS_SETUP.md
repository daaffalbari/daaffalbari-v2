# CMS setup (Keystatic)

Your portfolio has a built-in CMS at **`/keystatic`** for adding projects/research
and writing blog posts — no code edits.

- **Projects & research** → case-study pages at `/work/<slug>`
- **Blog posts** → merged with your Medium feed on the homepage + `/blog/<slug>`

Content is stored as files in this repo (`src/content/`). Saving in the CMS
commits those files; on Vercel that triggers a redeploy, and the change is live
in ~1 minute.

---

## Editing locally (works now, no setup)

```bash
npm run dev
```

Open **http://localhost:3000/keystatic**. In local mode the CMS writes straight
to disk — add a project, write a post, hit **Save**, then commit and push. This
is the simplest way to manage content.

---

## Editing on the live site (one-time GitHub App setup)

To edit at `https://<your-domain>/keystatic` from any browser, the deployed CMS
needs a GitHub App so it can commit to this repo. Until you do this, the live
`/keystatic` is view-only; the public site and local editing are unaffected.

### 1. Create a GitHub App

Go to **https://github.com/settings/apps/new** and set:

| Field | Value |
|---|---|
| **GitHub App name** | anything, e.g. `daffa-portfolio-cms` |
| **Homepage URL** | `https://<your-domain>` |
| **Callback URL** | `https://<your-domain>/api/keystatic/github/oauth/callback` |
| **Request user authorization (OAuth) during installation** | ✅ checked |
| **Webhook → Active** | ☐ unchecked |
| **Permissions → Repository → Contents** | **Read and write** |
| **Where can this GitHub App be installed?** | Only on this account |

Click **Create GitHub App**.

### 2. Collect four values

- **Client ID** — shown on the App page → `KEYSTATIC_GITHUB_CLIENT_ID`
- **Client secret** — click *Generate a new client secret* → `KEYSTATIC_GITHUB_CLIENT_SECRET`
- **Signing secret** — generate one locally: `openssl rand -hex 32` → `KEYSTATIC_SECRET`
- **App slug** — the name in the App's URL `github.com/apps/<slug>` → `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

Then **Install** the App (left sidebar → *Install App*) on the
`daaffalbari-v2` repository.

### 3. Add them to Vercel

Vercel → your project → **Settings → Environment Variables** → add all four
(Production + Preview). Then **redeploy**.

```
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

After the redeploy, visit `https://<your-domain>/keystatic`, sign in with GitHub,
and edits will commit to the repo automatically.

> The config switches to GitHub mode **only when `KEYSTATIC_GITHUB_CLIENT_ID` is
> present** (see `keystatic.config.ts`). No env vars = local mode. This is why
> the build never breaks if the variables aren't set yet.

---

## Notes

- **Images** you upload in the CMS are saved under `public/images/projects/` (or
  `.../blog/`) and committed with the entry.
- **Drafts:** toggle *Draft* on a post to keep it off the live site.
- The chatbot ("Abel") reads projects from the CMS, so new projects show up in
  its answers automatically.
