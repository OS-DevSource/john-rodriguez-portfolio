# john-rodriguez-portfolio
Personal portfolio website for John Rodriguez. Built with a neon dark UI, showcasing projects, skills, and contact info. Deployed via Vercel.

## Browser Investigation Workflow

Run the repo preflight before opening the site in Playwright:

```bash
pnpm browser:context local
pnpm browser:context production
pnpm browser:context compare
```

- `local`: Use `http://localhost:3000` when debugging in-progress work or unshipped changes.
- `production`: Use `https://john-rodriguez-portfolio.vercel.app` when validating what is live.
- `compare`: Use both targets when Playwright and the live site seem to disagree.

For local checks, the preflight prints:

- current branch name
- current HEAD commit
- divergence versus `origin/main`
- divergence between local `main` and `origin/main`
- a warning when the current branch still roots at a stale local `main`

This keeps localhost available for visual debugging while making branch drift obvious before it gets mistaken for a bad deploy.
