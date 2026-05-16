const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'static', 'projects-index.json');
const sourcePath = path.join(repoRoot, 'src', 'scripts', 'modules.js');

function readSource() {
  return fs.readFileSync(sourcePath, 'utf8');
}

function extractProjectBlocks(source) {
  const blocks = [];
  const categoryRegex = /^(\s*)(process|governance|it|dev|stats|production):\s*\[/gm;
  let categoryMatch;

  while ((categoryMatch = categoryRegex.exec(source)) !== null) {
    const category = categoryMatch[2];
    const startIndex = categoryMatch.index + categoryMatch[0].length;
    let depth = 1;
    let i = startIndex;
    let blockStart = i;

    for (; i < source.length; i++) {
      const char = source[i];
      if (char === '[') depth += 1;
      if (char === ']') {
        depth -= 1;
        if (depth === 0) {
          blocks.push({ category, text: source.slice(blockStart, i) });
          categoryRegex.lastIndex = i;
          break;
        }
      }
    }
  }

  return blocks;
}

function parseProjects() {
  const source = readSource();
  const blocks = extractProjectBlocks(source);
  const projects = [];

  for (const block of blocks) {
    const itemRegex = /\{([\s\S]*?)\}/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(block.text)) !== null) {
      const item = itemMatch[1];
      const getString = (key) => {
        const m = item.match(new RegExp(`${key}:\\s*\"([^\"]+)\"`));
        return m ? m[1] : '';
      };
      const getBoolean = (key) => {
        const m = item.match(new RegExp(`${key}:\\s*(true|false)`));
        return m ? m[1] === 'true' : false;
      };
      const getArray = (key) => {
        const m = item.match(new RegExp(`${key}:\\s*\[(.*?)\]`, 's'));
        if (!m) return [];
        return m[1]
          .split(',')
          .map(s => s.trim().replace(/^\"|\"$/g, ''))
          .filter(Boolean);
      };

      const title = getString('title');
      const description = getString('description');
      const pathValue = getString('path');
      const hero = getBoolean('hero');
      const technologies = getArray('technologies');
      const keywords = getArray('keywords');
      const tags = [...new Set([...technologies, ...keywords])];

      if (title && pathValue) {
        projects.push({
          title,
          category: block.category,
          path: pathValue,
          hero,
          date: null,
          tags,
          description
        });
      }
    }
  }

  projects.sort((a, b) => {
    const heroA = a.hero ? 1 : 0;
    const heroB = b.hero ? 1 : 0;
    if (heroA !== heroB) return heroB - heroA;
    return a.title.localeCompare(b.title);
  });

  return projects;
}

function main() {
  const projects = parseProjects();
  const output = {
    generatedAt: new Date().toISOString(),
    source: 'src/scripts/modules.js',
    projects
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${projects.length} projects to ${path.relative(repoRoot, outputPath)}`);
}

main();
