export const LEAGUE = 'sample-league';
export function competitionOf(record, data) {
  return record.competition_id ?? data.competition_id;
}
export function standings(data, competition = 'all') {
  const rows = new Map(data.teams.map(team => [team.id, { ...team, played: 0, wins: 0, draws: 0, losses: 0, goals_for: 0, goals_against: 0, points: 0, form: [] }]));
  const matches = data.matches.filter(m => m.status === 'final' && (competition === 'all' || competitionOf(m, data) === competition)).sort((a,b) => a.kickoff.localeCompare(b.kickoff));
  for (const m of matches) {
    if (!Number.isInteger(m.home_score) || !Number.isInteger(m.away_score) || m.home_score < 0 || m.away_score < 0) continue;
    for (const [id, gf, ga] of [[m.home_team_id,m.home_score,m.away_score],[m.away_team_id,m.away_score,m.home_score]]) {
      const row = rows.get(id); if (!row) continue;
      row.played++; row.goals_for += gf; row.goals_against += ga;
      const result = gf > ga ? 'W' : gf === ga ? 'D' : 'L';
      row.form.push(result); row[result === 'W' ? 'wins' : result === 'D' ? 'draws' : 'losses']++;
      row.points += result === 'W' ? 3 : result === 'D' ? 1 : 0;
    }
  }
  return [...rows.values()].map(r => ({...r, goal_difference: r.goals_for-r.goals_against})).sort((a,b) => b.points-a.points || b.goal_difference-a.goal_difference || b.goals_for-a.goals_for || a.name.localeCompare(b.name)).map((r,i) => ({...r, rank: i+1}));
}
export function selectMatches(data, team = 'all', competition = 'all') {
  return data.matches.filter(m => (team === 'all' || m.home_team_id === team || m.away_team_id === team) && (competition === 'all' || competitionOf(m,data) === competition));
}
export function selectTournaments(data, team = 'all', competition = 'all') {
  return data.tournaments.filter(t => (competition === 'all' || competition === t.id) && (team === 'all' || t.team_ids?.includes(team)));
}
export function calendarCells(year, month) {
  const start = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month+1, 0)).getUTCDate();
  return Array.from({length: Math.ceil((start+count)/7)*7}, (_,i) => i >= start && i < start+count ? `${year}-${String(month+1).padStart(2,'0')}-${String(i-start+1).padStart(2,'0')}` : null);
}
