const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const modulesPath = path.join(repoRoot, 'js', 'modules.js');

if (!fs.existsSync(modulesPath)) {
  console.error('modules.js not found at', modulesPath);
  process.exit(2);
}

const content = fs.readFileSync(modulesPath, 'utf8');
const regex = /path:\s*['"`"]([^'"`]+)['"`]/g;
let m;
const found = new Set();
while ((m = regex.exec(content)) !== null) {
  found.add(m[1]);
}

const results = [];
for (const p of Array.from(found)) {
  const resolved = path.resolve(repoRoot, p);
  const entry = { path: p, resolved };
  if (fs.existsSync(resolved)) {
    const stat = fs.statSync(resolved);
    if (stat.isFile()) {
      entry.status = 'ok-file';
    } else if (stat.isDirectory()) {
      // check for index.md or README.md
      const indexMd = path.join(resolved, 'index.md');
      const readmeMd = path.join(resolved, 'README.md');
      if (fs.existsSync(indexMd) || fs.existsSync(readmeMd)) {
        entry.status = 'ok-dir-with-md';
        entry.found = fs.existsSync(indexMd) ? path.relative(repoRoot, indexMd) : path.relative(repoRoot, readmeMd);
      } else {
        entry.status = 'dir-no-md';
      }
    } else {
      entry.status = 'ok-other';
    }
  } else {
    // maybe the path is language-specific like carrer/folder/EN.md; try replacing language with EN
    const parts = p.split('/');
    if (parts.length > 2 && ['EN','PT','ES'].includes(parts[1].toUpperCase())) {
      const fallback = path.resolve(repoRoot, [parts[0],'EN',...parts.slice(2)].join('/'));
      if (fs.existsSync(fallback)) {
        entry.status = 'ok-fallback-EN';
        entry.found = path.relative(repoRoot, fallback);
      } else {
        entry.status = 'missing';
      }
    } else {
      entry.status = 'missing';
    }
  }
  results.push(entry);
}

const invalid = results.filter(r => r.status !== 'ok-file' && r.status !== 'ok-dir-with-md' && r.status !== 'ok-other' && r.status !== 'ok-fallback-EN');

console.log('Validation results:');
console.table(results.map(r => ({ path: r.path, status: r.status, found: r.found || '' })));

if (invalid.length > 0) {
  console.error('\nInvalid paths detected:', invalid.length);
  invalid.forEach(i => console.error('-', i.path));
  process.exit(1);
} else {
  console.log('\nAll paths appear valid or have acceptable fallbacks.');
  process.exit(0);
}
