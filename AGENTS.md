# AGENTS.md

## Mission
Build a memorable, high-signal portfolio that feels premium, technical, and clearly branded.

## Portfolio priorities
- Start with composition, not components.
- The first viewport must read as one clear composition, not a dashboard.
- John Rodriguez must be the strongest signal above the fold.
- Lead with one sharp positioning statement and one clear CTA.
- Treat the first screen like a poster, not a document.
- Avoid badge confetti, stat strips, logo clouds, and feature-card overload in the hero.

## Frontend direction
- Build mobile-first, then scale to desktop.
- Prefer full-bleed or full-canvas hero compositions.
- Use one dominant visual idea per section.
- Each section gets one job and one primary takeaway.
- Avoid placeholder copy, fake metrics, filler sections, and generic personal-site patterns.
- Keep motion subtle, meaningful, and respectful of reduced-motion preferences.

## Implementation rules
- Preserve existing architecture unless there is a clear reason to change it.
- Reuse existing tokens, utilities, and component patterns before introducing new abstractions.
- Keep code clean, readable, and easy to extend.
- Respect repo conventions, lint rules, package scripts, and existing browser investigation workflows documented in the README.
- Prioritize clarity, responsiveness, accessibility, and visual hierarchy together.

## Quality gates
- Run the project's quality checks before asking to push.
- If available, run lint, typecheck, build, and relevant tests.
- Use the repo's documented browser investigation workflow when validating local versus production behavior.
- Review final diffs for regressions, accessibility issues, and unnecessary complexity.
- Always include a short manual test plan after changes.

## Done when
- The first screen is clearly branded and memorable.
- The CTA is obvious.
- Mobile readability is strong.
- Visual clutter has been reduced.
- The final diff is concise and reviewable.
