const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');

async function generateCareerIndex() {
  const careerDir = path.join(repoRoot, 'pages', 'career');
  const outFile = path.join(careerDir, 'index.json');
  try {
    const entries = await fsp.readdir(careerDir, { withFileTypes: true });
    const folders = entries
      .filter(e => e.isDirectory())
      .map(d => d.name)
      .filter(n => n !== '.' && n !== '..')
      .sort();
    await fsp.writeFile(outFile, JSON.stringify(folders, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${folders.length} folders to ${path.relative(repoRoot, outFile)}`);
    return true;
  } catch (err) {
    console.error('Failed to generate career/index.json', err);
    return false;
  }
}

function readProjectData() {
  const sourcePath = path.join(repoRoot, 'js', 'modules.js');
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

async function generateProjectsIndex() {
  try {
    const projectData = readProjectData();
    const outputPath = path.join(repoRoot, 'static', 'projects-index.json');
    const output = {
      source: 'js/modules.js',
      projects: buildProjectsIndex(projectData)
    };
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });
    await fsp.writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${output.projects.length} projects to ${path.relative(repoRoot, outputPath)}`);
    return true;
  } catch (err) {
    console.error('Failed to generate projects index', err);
    return false;
  }
}

async function main() {
  const careerOk = await generateCareerIndex();
  const projectsOk = await generateProjectsIndex();
  if (!careerOk || !projectsOk) process.exitCode = 1;
}

main();
