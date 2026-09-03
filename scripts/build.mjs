import { mkdir, copyFile, readFile } from 'node:fs/promises';
JSON.parse(await readFile('data/sample/hub.json','utf8'));
for (const file of ['index.html','src/app.js','src/model.js','src/styles.css','data/sample/hub.json']) {
  await mkdir(`dist/${file.includes('/') ? file.slice(0,file.lastIndexOf('/')) : ''}`, {recursive:true});
  await copyFile(file, `dist/${file}`);
}
console.log('Static dashboard built in dist/ (public assets and sample data only).');
