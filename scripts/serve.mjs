import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
const server = http.createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!['/', '/index.html', '/src/app.js', '/src/model.js', '/src/styles.css', '/data/sample/hub.json'].includes(path)) { res.writeHead(404); res.end('Not found'); return; }
    const body = await readFile(resolve(root, '.'+(path === '/' ? '/index.html' : path)));
    res.writeHead(200, {'Content-Type':types[extname(path === '/' ? 'index.html' : path)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}); res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(Number(process.env.PORT || 5173), '127.0.0.1', () => console.log(`Local: http://localhost:${server.address().port}`));
