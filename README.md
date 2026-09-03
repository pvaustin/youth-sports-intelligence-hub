# Austin-area U15 Soccer Intelligence Hub

A working sample dashboard for coaches to follow Austin-area under-15 soccer: match results, team profiles, standings, and tournament schedules. Weekly coach digests remain Markdown drafts.

**SAMPLE DATA ONLY:** All teams, matches, venues, tournaments, results, and digest observations in this repository are fictional demonstrations. Dates are illustrative, not verified schedules. Nothing here describes actual youth athletes or club performance.

## Product scope

- **Match results:** Scores, opponents, match dates, competition, venue, and verification status. Support scheduled, final, postponed, and canceled matches; keep source links and correction timestamps for real records.
- **Team profiles:** Team name, Austin-area home location, U15 age group, division, season, and recent form. Begin with team-level information, without individual player profiles.
- **Rankings:** Transparent standings by season, division, and competition. The sample table awards three points for a win and one for a draw, sorting by points, goal difference, goals scored, then team name. Broader strength rankings are future work and must explain methodology and coverage limits.
- **Tournament schedules:** Dates, host area, venue, age eligibility, registration deadline, status, and organizer/source link. Verify real schedules before presenting them as actionable.
- **Weekly coach digests:** A concise weekly recap of results, standings movement, upcoming matches/tournaments, and items needing verification. Initial output is a Markdown draft for coach review; email delivery is out of scope for this starter.

## Initial coverage and conventions

- Geography: Austin and nearby communities, initially Round Rock, Cedar Park, Pflugerville, and surrounding areas.
- Audience: coaches and team administrators.
- Age group: U15; store season and division explicitly because eligibility and competition rules vary.
- Time zone: `America/Chicago`; match timestamps include a UTC offset. Tournament dates are local calendar dates.
- Keep separate standings for distinct divisions and competitions. The starter uses one fictional mixed demonstration division, not a real competition category.
- Start with manually reviewed, team-level records. Future imports need source attribution, permitted access, duplicate detection, and correction tracking.

## Starter files

- `data/sample/hub.json`: Fictional team profiles, completed and scheduled matches, derived standings, and one tournament schedule.
- `digests/sample-weekly-coach-digest.md`: Example coach-facing weekly draft based on the sample records.

## Run locally

Install Node.js 22 or newer. The dashboard uses native browser JavaScript, CSS, and Node's built-in HTTP server and test runner. There are no third-party packages and no install step.

From the repository folder:

```powershell
node scripts/serve.mjs
```

Open http://localhost:5173. Stop the server with Ctrl+C. If the port is occupied, set `$env:PORT = '5174'` before starting. Reload the browser after editing files; this lightweight server does not provide hot reload. Do not open `index.html` directly because the app fetches the JSON over HTTP.

To test, build static output, and preview that build:

```powershell
node --test
node scripts/build.mjs
node scripts/serve.mjs --dist
```

Stop the development server before starting preview on the same port. If npm is installed, equivalent scripts are `npm run dev`, `npm test`, `npm run build`, and `npm run preview`.

## Dashboard behavior

- Overview counts, profiles, matches, standings rows, and tournament events respond to the team and competition filters. Reset restores both filters.
- The league is identified by the existing dataset-level `competition_id`; matches inherit it when they have no explicit competition ID. Each tournament is a separate competition option. No extra fictional records were added.
- League standings are calculated from final results, then filtered for display; a team keeps its position against the full league. The legacy `rankings.table` field in the sample JSON is a standings snapshot, not power rankings.
- Points: win = 3, draw = 1, loss = 0. Tie breaks: goal difference, goals scored, then team name alphabetically. Scheduled matches with null scores do not count. The current sample returns Austin 4 points, Cedar Park 1, Round Rock 0.
- Power rankings appear in a separate panel as **not available**. No strength formula is applied to the two fictional results. Opponent strength and schedule difficulty are not represented by the standings.
- The calendar opens in September 2026, the sample tournament month, and supports previous/next months. It marks the September 10 deadline and September 19–20 tournament. Dates are illustrative; no live/current-date claims are made.
- Tournament team participation is unknown. Selecting a team hides unlinked tournaments rather than implying participation. Tournament-only filters show no profiles, results, or standings until those records exist.
- All dates/times use `America/Chicago`. The visible season is **2026 Fall SAMPLE**. The app has a loading message and a recoverable data-load error state.

## Implementation and verification

- `index.html`, `src/app.js`, `src/styles.css`: responsive single-page dashboard, native accessible filter controls, section navigation, and scrollable standings on small screens.
- `src/model.js`: standings, team/competition selection, and calendar date logic.
- `scripts/serve.mjs`: localhost-only development/preview server with an explicit public-file allowlist; private repository files are not served.
- `scripts/build.mjs`: copies only public dashboard assets and sample JSON into `dist/`.
- `tests/`: Node tests for sample integrity, standings, tie breaks, null scores, filters, calendar alignment, and application rendering/event callbacks using a minimal DOM test double. These are not real-browser visual or accessibility tests.

There are no live feeds, player-level data, authentication requirements for local use, or automated digest delivery. The existing coach digest is available in `digests/sample-weekly-coach-digest.md`.

## Data integrity and privacy

Every sample record has `is_sample: true`; the dataset also declares `data_status: SAMPLE_ONLY`. Preserve these labels in demos and keep future verified records separate from `data/sample/`. For real records, require a source, retrieval/verification time, and verification status. Represent unknown scores as `null`, never zero.

Collect only information needed for team-level reporting. Do not commit player names, birthdates, contact details, medical information, private rosters, or credentials. Sample data should remain safe to share even though this repository is intended to be private.

## Suggested implementation milestones

1. Agree on season/division definitions and approved sources with coaches.
2. Build a read-only results, profiles, standings, and schedule interface using the sample dataset.
3. Add reviewed ingestion and corrections with source and freshness indicators.
4. Generate weekly digest drafts from verified records, with coach review before distribution.

## GitHub setup

Intended repository name: `youth-sports-intelligence-hub`, with **private** visibility.

If connecting manually, create an empty private GitHub repository without an additional README, license, or gitignore, then run:

```powershell
git remote add origin https://github.com/YOUR_ACCOUNT/youth-sports-intelligence-hub.git
git push -u origin main
```

Use `git remote -v` to inspect an existing connection before adding one. Never place an access token in a remote URL or committed file.
