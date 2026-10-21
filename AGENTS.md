# RESTORE — Development notes

RESTORE is maintained independently in GitHub and deployed on Vercel. Do not use Lovable for development, publishing, or website edits.

- Keep approved devotional bodies in day-range TypeScript data modules and merge them into `src/data/days.ts`.
- Preserve wording, paragraph boundaries, Scripture references and reflection questions from approved manuscripts.
- Keep all 112 days accessible, with progress tracking and memory-verse practice working.
- Use TanStack Start, Vite, Nitro, React and Tailwind; build with `npm install && npm run build`.
- Check the GitHub Actions build and live-site smoke test before treating a release as complete.
- Do not rewrite published Git history.
