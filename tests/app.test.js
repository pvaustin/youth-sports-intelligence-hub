import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('dashboard renders sample data and responds to filter and calendar actions',async()=>{
  const nodes=new Map();
  const get=selector=>{if(!nodes.has(selector)) nodes.set(selector,{innerHTML:'',textContent:'',setAttribute(){},focus(){},addEventListener(name,handler){this[name]=handler}}); return nodes.get(selector)};
  const previousDocument=globalThis.document, previousFetch=globalThis.fetch;
  globalThis.document={querySelector:get};
  globalThis.fetch=async()=>({ok:true,json:async()=>JSON.parse(await readFile(new URL('../data/sample/hub.json',import.meta.url),'utf8'))});
  try {
    await import('../src/app.js');
    const html=()=>get('#app').innerHTML;
    assert.match(html(),/The Austin touchline/);
    assert.match(html(),/Showing 3 teams, 3 matches, and 1 tournaments/);
    assert.match(html(),/September 2026/);
    get('#team-filter').change({target:{value:'sample-austin'}});
    assert.match(html(),/Showing 1 teams, 2 matches, and 0 tournaments/);
    get('#competition-filter').change({target:{value:'sample-tournament-1'}});
    assert.match(html(),/No standings available/);
    get('#reset').click();
    assert.match(html(),/Showing 3 teams, 3 matches, and 1 tournaments/);
    get('#next-month').click();
    assert.match(html(),/October 2026/);
    assert.match(html(),/No sample tournaments or deadlines this month/);
    get('#prev-month').click();
    assert.match(html(),/September 2026/);
  } finally {globalThis.document=previousDocument;globalThis.fetch=previousFetch}
});
