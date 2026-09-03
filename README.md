# Austin-area U15 Soccer Intelligence Hub

A planning-stage hub for coaches to follow Austin-area under-15 soccer: match results, team profiles, rankings, tournament schedules, and weekly coach digests.

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

This is a documentation and data scaffold. No application, data feed, automated ranking engine, or digest delivery service is implemented yet. Open the JSON and Markdown directly; no dependencies are required.

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
