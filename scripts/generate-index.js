const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'src', 'scripts', 'modules.js');
const outputPath = path.join(repoRoot, 'static', 'projects-index.json');

function readProjectData() {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const start = source.indexOf('const projectData = ');
  if (start === -1) {
    throw new Error('projectData declaration not found in modules.js');
  }

  const classMarker = '\nclass ProjectManager';
  const end = source.indexOf(classMarker, start);
  if (end === -1) {
    throw new Error('ProjectManager class marker not found after projectData in modules.js');
  }

  const objectLiteral = source
    .slice(source.indexOf('{', start), end)
    .replace(/;\s*$/, '')
    .trim();

  return vm.runInNewContext(`(${objectLiteral})`, {}, { timeout: 1000 });
}

function buildProjectsIndex(projectData) {
  const projects = [];

  for (const [category, items] of Object.entries(projectData)) {
    for (const item of items) {
      projects.push({
        title: item.title,
        category: item.category || category,
        path: item.path,
        hero: Boolean(item.hero),
        date: item.date ?? null,
        tags: [...new Set([...(item.technologies || []), ...(item.keywords || [])])],
        description: item.description || ''
      });
    }
  }

  return projects;
}

function main() {
  const projectData = readProjectData();
  const output = {
    source: 'src/scripts/modules.js',
    projects: buildProjectsIndex(projectData)
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${output.projects.length} projects to ${path.relative(repoRoot, outputPath)}`);
}

main();
