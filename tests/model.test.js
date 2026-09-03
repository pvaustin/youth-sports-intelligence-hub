import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { standings, selectMatches, selectTournaments, calendarCells } from '../src/model.js';
const data = JSON.parse(await readFile(new URL('../data/sample/hub.json',import.meta.url),'utf8'));
test('computed standings agree with every sample snapshot field',()=>{
  for (const row of standings(data)) {
    const saved=data.rankings.table.find(r=>r.team_id===row.id);
    for(const key of ['rank','played','wins','draws','losses','goals_for','goals_against','goal_difference','points']) assert.equal(row[key],saved[key],`${row.id}: ${key}`);
  }
});
test('scheduled and malformed final scores do not count as completed results',()=>{
  const copy=structuredClone(data);
  copy.matches.push({...data.matches[0],home_score:null});
  assert.deepEqual(standings(copy),standings(data));
  assert.equal(standings(data).reduce((sum,r)=>sum+r.played,0),4);
});
test('team filter includes home and away games and composes with competition',()=>{
  assert.equal(selectMatches(data,'sample-austin').length,2);
  assert.equal(selectMatches(data,'sample-round-rock').length,2);
  assert.equal(selectMatches(data,'sample-austin','sample-tournament-1').length,0);
  assert.equal(selectMatches(data,'all','sample-league').length,3);
});
test('unknown tournament participation is never inferred from U15 eligibility',()=>{
  assert.equal(selectTournaments(data).length,1);
  assert.equal(selectTournaments(data,'sample-austin').length,0);
  assert.equal(selectTournaments(data,'all','sample-league').length,0);
  assert.equal(selectTournaments(data,'all','sample-tournament-1').length,1);
});
test('standings apply GD, goals scored, then alphabetical tie breaks',()=>{
  const fixture={teams:['Beta','Alpha','Gamma'].map(name=>({id:name,name})),matches:[{status:'final',home_team_id:'Beta',away_team_id:'Gamma',home_score:2,away_score:1,kickoff:'2026-01-01'},{status:'final',home_team_id:'Alpha',away_team_id:'Gamma',home_score:2,away_score:1,kickoff:'2026-01-02'}]};
  assert.deepEqual(standings(fixture).map(r=>r.name),['Alpha','Beta','Gamma']);
  fixture.matches[1].home_score=3; fixture.matches[1].away_score=2;
  assert.equal(standings(fixture)[0].name,'Alpha');
  fixture.matches[0].home_score=4;
  assert.equal(standings(fixture)[0].name,'Beta');
});
test('calendar aligns September 2026 and leap-year February correctly',()=>{
  const cells=calendarCells(2026,8);
  assert.deepEqual(cells.slice(0,3),[null,null,'2026-09-01']);
  assert.equal(cells.filter(Boolean).length,30);
  assert.equal(cells.length%7,0);
  assert.equal(calendarCells(2028,1).filter(Boolean).length,29);
});
test('all source entities remain labeled as fictional sample data',()=>{
  assert.equal(data.data_status,'SAMPLE_ONLY');
  assert.match(data.season,/SAMPLE/);
  for(const record of [...data.teams,...data.matches,...data.tournaments]) assert.equal(record.is_sample,true);
});
