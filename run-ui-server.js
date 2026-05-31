const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const url = require('url');

const INDEX = path.join(__dirname, 'ui-index.html');
const PKG = path.join(__dirname, 'package.json');
const PORT = process.env.PORT || 3000;
const SPEC_DIR = path.join(__dirname, 'tests');

function getScripts() {
  try {
    const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'));
    return pkg.scripts || {};
  } catch (e) {
    return {};
  }
}

function getSpecs() {
  try {
    if (!fs.existsSync(SPEC_DIR)) return [];
    function walk(dir) {
      let results = [];
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) results = results.concat(walk(full));
        else if (/\.(spec|test)\.(js|ts|mjs|cjs)$/.test(f)) results.push(path.relative(__dirname, full).replace(/\\\\/g, '/'));
      }
      return results;
    }
    return walk(SPEC_DIR);
  } catch (e) {
    return [];
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'GET' && parsed.pathname === '/') {
    fs.readFile(INDEX, (err, data) => {
      if (err) { res.writeHead(500); res.end('index not found'); return; }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    });
  } else if (req.method === 'GET' && parsed.pathname === '/scripts') {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(getScripts()));
  } else if (req.method === 'GET' && parsed.pathname === '/specs') {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(getSpecs()));
  } else if (req.method === 'POST' && parsed.pathname === '/run') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let payload = {};
      try { payload = JSON.parse(body); } catch (e) { payload = {}; }

      // Run single test file
      if (payload.testFile) {
        const testFile = payload.testFile.replace(/\\/g, '/');
        const child = spawn('npx', ['playwright', 'test', testFile], { shell: true });
        res.writeHead(200, {'Content-Type':'application/json'});
        let output = '';
        child.stdout.on('data', d => output += d.toString());
        child.stderr.on('data', d => output += d.toString());
        child.on('close', code => res.end(JSON.stringify({code, output})));
        return;
      }

      // Run all tests
      if (payload.runAll) {
        const child = spawn('npx', ['playwright', 'test'], { shell: true });
        res.writeHead(200, {'Content-Type':'application/json'});
        let output = '';
        child.stdout.on('data', d => output += d.toString());
        child.stderr.on('data', d => output += d.toString());
        child.on('close', code => res.end(JSON.stringify({code, output})));
        return;
      }

      // Run specs if provided
      if (payload.specs && Array.isArray(payload.specs)) {
        const child = spawn('npx', ['playwright', 'test', ...payload.specs], { shell: true });
        res.writeHead(200, {'Content-Type':'application/json'});
        let output = '';
        child.stdout.on('data', d => output += d.toString());
        child.stderr.on('data', d => output += d.toString());
        child.on('close', code => res.end(JSON.stringify({code, output})));
        return;
      }

      if (payload.spec) {
        const child = spawn('npx', ['playwright', 'test', payload.spec], { shell: true });
        res.writeHead(200, {'Content-Type':'application/json'});
        let output = '';
        child.stdout.on('data', d => output += d.toString());
        child.stderr.on('data', d => output += d.toString());
        child.on('close', code => res.end(JSON.stringify({code, output})));
        return;
      }

      // fallback to npm scripts
      let name;
      try { name = payload.script; } catch(e){ name = null; }
      if (!name) { res.writeHead(400); res.end('Missing script or spec'); return; }
      const scripts = getScripts();
      if (!scripts[name]) { res.writeHead(400); res.end('Unknown script'); return; }
      const child = spawn('npm', ['run', name], { shell: true });
      res.writeHead(200, {'Content-Type':'application/json'});
      let output = '';
      child.stdout.on('data', d => output += d.toString());
      child.stderr.on('data', d => output += d.toString());
      child.on('close', code => {
        res.end(JSON.stringify({code, output}));
      });
    });
  } else {
    res.writeHead(404); res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Run UI listening on http://localhost:${PORT}`);
});
