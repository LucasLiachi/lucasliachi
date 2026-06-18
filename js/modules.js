function initializeTabs() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const targetCategory = tab.getAttribute('data-category');
      switchToTab(targetCategory);
    });
  });
}

function switchToTab(categoryName) {
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.about-category').forEach(category => {
    category.classList.remove('active-content');
  });
  const activeTab = document.querySelector(`.category-tab[data-category="${categoryName}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
  const activeContent = document.getElementById(`about-${categoryName}`);
  if (activeContent) {
    activeContent.classList.add('active-content');
  }
}

function initializeExperience() {
  initializeTabs();
  loadCareerContent();
  loadExperienceContent();
}

function cleanMangledUTF8(str) {
  return String(str || '')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã£/g, 'ã')
    .replace(/Ã­/g, 'í')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã/g, 'a');
}

function normalizeMetadataKey(key) {
  let cleaned = cleanMangledUTF8(key).toLowerCase();
  try {
    cleaned = cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch (e) {
    // fallback
  }
  return cleaned.replace(/[^a-z0-9]/g, '');
}

function parseMarkdownMetadata(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const metadata = {};

  lines.forEach(line => {
    const match = line.match(/^[-*]\s+([^:]+):\s+(.+)$/);
    if (match) {
      const key = normalizeMetadataKey(match[1]);
      const val = cleanMangledUTF8(match[2].trim());
      metadata[key] = val;
    }
  });

  return metadata;
}

function extractMarkdownTitle(markdown, fallbackTitle) {
  const titleMatch = String(markdown || '').match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : fallbackTitle;
}

function parseCareerSections(markdown) {
  const text = String(markdown || '');
  // Split by section headers '## '
  const rawSections = text.split(/\r?\n##\s+/).map(s => s.trim()).filter(Boolean);
  // first chunk may contain the main title; skip if it doesn't start with '##'
  if (rawSections.length === 0) return [];
  // If the first chunk starts with a top-level title, keep remaining sections
  const sections = rawSections.slice(rawSections[0].startsWith('#') ? 1 : 0);

  return sections.map(raw => {
    const lines = raw.split(/\r?\n/);
    const title = (lines.shift() || '').trim();
    const remainder = lines.join('\n').trim();

    // Try to extract the bold company | period line e.g. **Softplan | 08/2022 ...**
    const boldMatch = remainder.match(/\*\*(.+?)\*\*/m);
    let company = '';
    let period = '';
    let body = remainder;
    if (boldMatch) {
      const bold = boldMatch[1].trim();
      const parts = bold.split('|').map(p => p.trim());
      company = parts[0] || '';
      period = parts[1] || '';
      body = remainder.replace(boldMatch[0], '').trim();
    }

    // Extract trailing tag line like *#tag1 #tag2*
    let tags = [];
    const tagMatch = body.match(/\*#([^*]+)\*/m);
    if (tagMatch) {
      tags = tagMatch[1].split(/\s+/).map(t => t.replace(/^#/, '').trim()).filter(Boolean);
      body = body.replace(tagMatch[0], '').trim();
    }

    const descriptionMarkdown = body.split(/\r?\n/).slice(0, 6).join('\n').trim();
    const description = (window.marked ? window.marked.parse(descriptionMarkdown) : descriptionMarkdown).replace(/(^<p>|<\/p>$)/g, '').trim();

    const metaItems = [];
    if (period) metaItems.push(`Period: ${period}`);

    const id = String(title || company || Math.random()).toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');

    return {
      id,
      title: title || company,
      secondaryLabel: company,
      description: description || '',
      metaItems,
      tags,
      sectionMarkdown: `## ${title}\n\n${boldMatch ? boldMatch[0] + '\n' : ''}${body}`
    };
  });
}

let _cachedCareerFolders = null;

async function fetchCareerFoldersIndex() {
  if (_cachedCareerFolders) return _cachedCareerFolders;
  try {
    const resp = await fetch('pages/career/index.json');
    if (resp && resp.ok) {
      const arr = await resp.json();
      if (Array.isArray(arr)) {
        _cachedCareerFolders = arr;
        return arr;
      }
    }
  } catch (e) {
    // fallthrough to other discovery methods
  }

  // Fallback: attempt to parse links from career/<LANG>.md to discover folders
  try {
    const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
    const resp = await fetch(`pages/career/${lang}.md`);
    if (resp && resp.ok) {
      const text = await resp.text();
      const linkPattern = /\(career\/([^\/)]+)\//g;
      const folders = new Set();
      let m;
      while ((m = linkPattern.exec(text)) !== null) {
        folders.add(m[1]);
      }
      const list = Array.from(folders);
      if (list.length) {
        _cachedCareerFolders = list;
        return list;
      }
    }
  } catch (e) {
    // ignore
  }

  // Final fallback: empty list
  _cachedCareerFolders = [];
  return _cachedCareerFolders;
}

async function resolveCareerFolderPath(title, lang) {
  const normalizedTitle = String(title || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const codes = [String(lang || 'en').toUpperCase(), 'EN', 'PT', 'ES'];
  const folders = await fetchCareerFoldersIndex();

  for (const folder of folders) {
    for (const code of codes) {
      const candidate = `pages/career/${folder}/${code}.md`;
      try {
        const resp = await fetch(candidate);
        if (!resp || !resp.ok) continue;
        const text = await resp.text();
        const fileTitle = extractMarkdownTitle(text, '');
        const normFileTitle = String(fileTitle || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
        if (normFileTitle && normFileTitle === normalizedTitle) {
          return candidate;
        }
      } catch (e) {
        // ignore and continue
      }
    }
  }
  return null;
}

function splitCommaValues(value) {
  return String(value || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function buildProfileCardMarkup({
  id,
  title,
  secondaryLabel,
  description,
  metaItems = [],
  tags = [],
  linkPath,
  linkLabel,
  linkClass,
  titleIdPrefix
}) {
  const headerMetaItems = metaItems.slice(0, 3);
  const bodyMetaItems = metaItems.length > 3 ? metaItems.slice(3) : [];
  const metaMarkup = bodyMetaItems.length
    ? `<div class="project-technologies project-meta-tags">${bodyMetaItems.map(item => `<span class="tech-tag">${item}</span>`).join('')}</div>`
    : '';
  const tagsMarkup = tags.length
    ? `<div class="project-technologies">${tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}</div>`
    : '';
  const summaryMarkup = description
    ? `<p class="project-description">${description}</p>`
    : '';

  return `
    <div class="project-header">
      <div class="project-header-title-group">
        <h3 id="${titleIdPrefix}-${id}">${title}</h3>
        ${(secondaryLabel || headerMetaItems.length) ? `<div class="project-header-inline-meta">${secondaryLabel ? `<span class="project-category-tag">${secondaryLabel}</span>` : ''}${headerMetaItems.map(item => `<span class="project-inline-meta">${item}</span>`).join('')}</div>` : ''}
      </div>
    </div>
    ${summaryMarkup}
    ${metaMarkup}
    ${tagsMarkup}
    <div class="project-links">
      <a href="#" class="project-link ${linkClass}" data-path="${linkPath}">${linkLabel}</a>
    </div>
  `;
}

async function loadCareerContent() {
  const timelineContainer = document.getElementById('career-timeline');
  if (!timelineContainer) {
    console.error('Timeline container not found');
    return;
  }

  timelineContainer.classList.add('career-markdown-mode');

  const currentLang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
  const candidates = [`pages/career/${currentLang}.md`, 'pages/career/EN.md'];

  timelineContainer.setAttribute('aria-busy', 'true');
  timelineContainer.innerHTML = `<div class="career-loading">Loading career timeline...</div>`;

  try {
    let response = null;

    for (const candidate of candidates) {
      try {
        const candidateResponse = await fetch(candidate);
        if (candidateResponse.ok) {
          response = candidateResponse;
          break;
        }
      } catch (error) {
        // Continue to the next fallback
      }
    }

    if (!response) {
      throw new Error('Failed to load career markdown');
    }

    const markdown = await response.text();
    const markdownText = String(markdown || '');

    // Try to parse into sections and render as profile cards. If parsing fails, fall back to full markdown HTML.
    const sections = parseCareerSections(markdownText);
    if (sections && sections.length) {
      timelineContainer.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'projects-grid profile-grid';
      for (let idx = 0; idx < sections.length; idx++) {
        const entry = sections[idx];
        const card = document.createElement('article');
        card.className = 'project-card career-card profile-card fade-in';
        card.style.animationDelay = `${idx * 0.08}s`;
        card.setAttribute('aria-labelledby', `career-title-${entry.id}`);

        // try to resolve a folder path that matches this section title
        let resolvedPath = null;
        try {
          resolvedPath = await resolveCareerFolderPath(entry.title, currentLang);
        } catch (e) {
          resolvedPath = null;
        }

        card.innerHTML = buildProfileCardMarkup({
          id: entry.id,
          title: entry.title,
          secondaryLabel: entry.secondaryLabel,
          description: '', // Removed from card to make it lighter
          metaItems: [], // Removed from card
          tags: [], // Removed from card
          linkPath: resolvedPath || '#',
          linkLabel: window.Translations?.get('about.readMore') || 'Read More',
          linkClass: 'career-link btn btn-secondary',
          titleIdPrefix: 'career-title'
        });

        const anchor = card.querySelector('.career-link');
        if (anchor) {
          if (resolvedPath) {
            anchor.dataset.path = resolvedPath;
          } else {
            anchor.removeAttribute('data-path');
            anchor.dataset.section = encodeURIComponent(entry.sectionMarkdown || '');
          }
        }

        grid.appendChild(card);
      }
      timelineContainer.appendChild(grid);
      // bind career link handlers to open modal with section markdown
      timelineContainer.querySelectorAll('.career-link').forEach(link => {
        if (link.dataset.bound === 'true') return;
        link.dataset.bound = 'true';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPath = link.dataset.path || link.getAttribute('data-path');
          if (targetPath && targetPath !== '#' && window.loadProjectContent) {
            window.loadProjectContent(targetPath);
            return;
          }

          // fallback: use stored section markdown
          const section = link.dataset.section ? decodeURIComponent(link.dataset.section) : '';
          if (window.marked) {
            const html = window.marked.parse(section || markdownText);
            if (typeof window.showContentModal === 'function') {
              window.showContentModal(html, entry.title);
            } else {
              // Create a quick modal if everything else fails
              const contentEl = document.createElement('div');
              contentEl.classList.add('markdown-content');
              contentEl.innerHTML = html;
              const modal = document.createElement('div');
              modal.classList.add('modal');
              const modalContent = document.createElement('div');
              modalContent.classList.add('modal-content');
              const closeBtn = document.createElement('span');
              closeBtn.classList.add('close-modal');
              closeBtn.innerHTML = '&times;';
              const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                  if (document.body.contains(modal)) document.body.removeChild(modal);
                }, 300);
              };
              closeBtn.addEventListener('click', closeModal);
              modalContent.appendChild(closeBtn);
              modalContent.appendChild(contentEl);
              modal.appendChild(modalContent);
              document.body.appendChild(modal);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  modal.classList.add('active');
                });
              });
              modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
            }
          }
        });
      });
    } else {
      const html = window.marked ? window.marked.parse(markdownText) : markdownText;
      timelineContainer.innerHTML = `
        <div class="career-markdown-content markdown-content" data-language="${currentLang.toLowerCase()}">
          ${html}
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading career timeline:', error);
    timelineContainer.innerHTML = `
      <div class="career-loading error">
        <p>Unable to load career timeline.</p>
      </div>
    `;
  } finally {
    timelineContainer.removeAttribute('aria-busy');
  }
}

function loadExperienceContent() {
  document.querySelectorAll('.about-link').forEach(link => {
    if (link.id === 'hero-about-btn') {
      return;
    }
    link.addEventListener('click', (event) => {
      event.preventDefault();
      let path = link.getAttribute('data-path');
      const currentLang = window.currentLanguage || localStorage.getItem('language') || 'en';
      const langCode = currentLang.toUpperCase();
      if (path && path.includes('/')) {
        const parts = path.split('/');
        if (parts.length > 1 && (parts[1] === 'EN' || parts[1] === 'PT' || parts[1] === 'ES')) {
          parts[1] = langCode;
          path = parts.join('/');
        }
      }
      if (path) {
        fetch(path)
          .then(response => {
            if (!response.ok) {
              console.log(`File not found in ${langCode}, falling back to EN`);
              const parts = path.split('/');
              if (parts.length > 1) {
                parts[1] = 'EN';
                return fetch(parts.join('/'));
              }
              throw new Error(`Failed to fetch ${path}`);
            }
            return response;
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch content`);
            }
            return response.text();
          })
          .then(text => {
            if (window.marked) {
              const html = window.marked.parse(text);
              const contentEl = document.createElement('div');
              contentEl.classList.add('markdown-content');
              contentEl.innerHTML = html;
              const modal = document.createElement('div');
              modal.classList.add('modal');
              const modalContent = document.createElement('div');
              modalContent.classList.add('modal-content');
              const closeBtn = document.createElement('span');
              closeBtn.classList.add('close-modal');
              closeBtn.innerHTML = '&times;';
              closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
              });
              modalContent.appendChild(closeBtn);
              modalContent.appendChild(contentEl);
              modal.appendChild(modalContent);
              document.body.appendChild(modal);
              modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                  document.body.removeChild(modal);
                }
              });
            } else {
              console.error('marked library not found');
            }
          })
          .catch(error => {
            console.error('Error loading Markdown:', error);
          });
      }
    });
  });
}

function renderExperience(jobs) {
  const timelineContainer = document.getElementById('career-timeline');
  if (!timelineContainer) {
    console.error('Timeline container not found');
    return;
  }
  console.log('Rendering timeline with', jobs.length, 'jobs');
  timelineContainer.innerHTML = '';
  jobs.forEach((job, index) => {
    const jobElement = document.createElement('div');
    jobElement.className = `timeline-item ${job.left ? 'left' : 'right'} fade-in`;
    jobElement.style.animationDelay = `${index * 0.2}s`;
    jobElement.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-date">${job.date}</div>
        <h3 class="timeline-title">${job.title}</h3>
        <div class="timeline-company">${job.company}</div>
        <p>${job.description}</p>
      </div>
    `;
    timelineContainer.appendChild(jobElement);
  });
}

function generateCareerData() {
  return [];
}

function openCareerDetail(folder) {
  const lang = localStorage.getItem('language') || 'pt';
  const langCode = lang.toUpperCase();
  const path = `pages/career/${folder}/${langCode}.md`;
  fetch(path)
    .then(response => {
      if (!response.ok) {
        return fetch(`pages/career/${folder}/EN.md`);
      }
      return response;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch career details`);
      }
      return response.text();
    })
    .then(text => {
      if (window.marked) {
        const html = window.marked.parse(text);
        const contentEl = document.createElement('div');
        contentEl.classList.add('markdown-content');
        contentEl.innerHTML = html;
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-modal');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(contentEl);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error loading career detail:', error);
    });
}

class CertificateShowcase {
  constructor() {
    this.certificates = [];
    this.filteredCertificates = [];
    this.currentFilter = '';
    this.currentSort = 'date-desc';
    this.isLoading = false;
    this.container = document.getElementById('certificate-container');
    if (!this.container) return;
    this.createFilterUI();
    this.loadCertificates();
  }
  createFilterUI() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'certificate-filters';
    filterContainer.innerHTML = `
      <div class="filter-search">
        <label for="certificate-search" class="sr-only">Search certificates</label>
        <input 
          type="search" 
          id="certificate-search" 
          placeholder="Search certificates..." 
          data-i18n-placeholder="about.certificate.search.placeholder"
          aria-label="Search certificates by name or issuer"
          autocomplete="off"
        >
        <button id="certificate-clear-search" class="clear-search" aria-label="Clear certificate search" style="display: none;">
          ✕
        </button>
      </div>
      <div class="filter-sort">
        <label for="certificate-sort" class="sr-only">Sort certificates</label>
        <select id="certificate-sort" aria-label="Sort certificates by">
          <option value="date-desc" data-i18n="about.certificate.sort.newest">Newest first</option>
          <option value="date-asc" data-i18n="about.certificate.sort.oldest">Oldest first</option>
          <option value="name-asc" data-i18n="about.certificate.sort.nameAsc">Name (A-Z)</option>
          <option value="name-desc" data-i18n="about.certificate.sort.nameDesc">Name (Z-A)</option>
        </select>
      </div>
      <div id="certificate-search-results-count" class="search-results-count" style="display: none;"></div>
    `;
    this.container.parentNode.insertBefore(filterContainer, this.container);
    this.searchInput = document.getElementById('certificate-search');
    this.clearButton = document.getElementById('certificate-clear-search');
    this.searchResultsDisplay = document.getElementById('certificate-search-results-count');
    this.sortSelect = document.getElementById('certificate-sort');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.filterCertificates(query);
        if (this.clearButton) {
          this.clearButton.style.display = query ? 'block' : 'none';
        }
      });
    }

    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
        this.filterCertificates('');
        this.clearButton.style.display = 'none';
      });
      this.clearButton.style.display = this.searchInput && this.searchInput.value ? 'block' : 'none';
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortCertificates(e.target.value);
      });
    }
  }
  async loadCertificates() {
    this.isLoading = true;
    this.container.setAttribute('aria-busy', 'true');
    this.container.innerHTML = `
      <div class="no-certificates">
        <p>Loading certificates...</p>
      </div>
    `;

    try {
      const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
      const indexMarkdown = await this.fetchMarkdownFromCandidates([
        `pages/certificate/${lang}.md`,
        'pages/certificate/EN.md'
      ]);
      const entries = this.parseCertificateIndex(indexMarkdown);
      const certificates = await Promise.all(entries.map(entry => this.loadCertificateEntry(entry, lang)));
      this.certificates = certificates.filter(Boolean);
      this.isLoading = false;
      this.filterCertificates(this.searchInput ? this.searchInput.value.trim() : '');
    } catch (error) {
      console.error('Error loading certificates:', error);
      this.showErrorMessage();
    } finally {
      this.container.removeAttribute('aria-busy');
    }
  }
  async fetchMarkdownFromCandidates(candidates) {
    for (const candidate of candidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        // Try the next fallback path
      }
    }

    throw new Error('Failed to load certificate markdown files');
  }
  parseCertificateIndex(markdown) {
    const normalizedMarkdown = markdown.replace(/\]\s*\n\s*\(/g, '](');
    const entries = [];
    const linkPattern = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)/gm;
    let match;

    while ((match = linkPattern.exec(normalizedMarkdown)) !== null) {
      const title = match[1].trim();
      let path = match[2].trim();
      if (path.startsWith('certificate/')) {
        path = 'pages/' + path;
      }
      if (!path.startsWith('pages/certificate/')) {
        continue;
      }

      const parts = path.split('/').filter(Boolean);
      const certIdx = parts.indexOf('certificate');
      const folder = (certIdx !== -1 && parts.length > certIdx + 1) ? parts[certIdx + 1] : '';
      if (!folder) {
        continue;
      }

      entries.push({
        id: this.generateId(`${folder}-${title}`),
        title,
        folder,
        indexPath: path
      });
    }

    return entries;
  }
  async loadCertificateEntry(entry, lang) {
    const detailPathCandidates = this.buildCertificatePathCandidates(entry.indexPath, lang);
    let markdown = null;
    let resolvedPath = entry.indexPath;

    for (const candidate of detailPathCandidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          markdown = await response.text();
          resolvedPath = candidate;
          break;
        }
      } catch (error) {
        // Try next candidate
      }
    }

    if (!markdown) {
      return {
        id: entry.id,
        title: entry.title,
        issuer: this.getCertificateFolderLabel(entry.folder),
        category: this.getCertificateFolderLabel(entry.folder),
        folder: entry.folder,
        indexPath: entry.indexPath,
        path: entry.indexPath,
        date: new Date(0),
        dateText: '',
        expiresText: '',
        credentialId: '',
        competencies: '',
        description: '',
        searchBlob: `${entry.title} ${entry.folder} ${entry.indexPath}`.toLowerCase()
      };
    }

    return this.parseCertificateMarkdown(markdown, entry, resolvedPath);
  }
  buildCertificatePathCandidates(indexPath, lang) {
    let normalizedPath = String(indexPath || '').replace(/\\/g, '/');
    if (normalizedPath.startsWith('certificate/')) {
      normalizedPath = 'pages/' + normalizedPath;
    }
    const parts = normalizedPath.split('/').filter(Boolean);
    const certIdx = parts.indexOf('certificate');
    if (certIdx === -1 || parts.length <= certIdx + 1) {
      return [normalizedPath];
    }

    const folder = parts[certIdx + 1];
    const candidates = [
      `pages/certificate/${folder}/${lang}.md`,
      normalizedPath
    ];

    ['EN', 'PT', 'ES'].forEach(code => {
      const candidatePath = `pages/certificate/${folder}/${code}.md`;
      if (!candidates.includes(candidatePath)) {
        candidates.push(candidatePath);
      }
    });

    return [...new Set(candidates)];
  }
  parseCertificateMarkdown(markdown, entry, resolvedPath) {
    const metadata = parseMarkdownMetadata(markdown);
    const title = extractMarkdownTitle(markdown, entry.title);
    const issuer = metadata.issuer || metadata.emissor || this.getCertificateFolderLabel(entry.folder);
    const dateText = metadata.issued || metadata.emitido || '';
    const expiresText = metadata.expires || metadata.expira || '';
    const credentialId = metadata.credentialid || metadata.codigodacredencial || metadata.iddacredencial || '';
    const competencies = metadata.competencies || metadata.competencias || '';
    const descriptionParts = [];

    const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toLowerCase();
    let issuedLabel = 'Issued';
    let expiresLabel = 'Expires';
    let credIdLabel = 'Credential ID';

    if (lang === 'pt') {
      issuedLabel = 'Emitido';
      expiresLabel = 'Expira';
      credIdLabel = 'Código da credencial';
    } else if (lang === 'es') {
      issuedLabel = 'Emitido';
      expiresLabel = 'Expira';
      credIdLabel = 'ID de credencial';
    }

    if (dateText) {
      descriptionParts.push(`${issuedLabel}: ${dateText}`);
    }
    if (expiresText) {
      descriptionParts.push(`${expiresLabel}: ${expiresText}`);
    }
    if (credentialId) {
      descriptionParts.push(`${credIdLabel}: ${credentialId}`);
    }

    return {
      id: this.generateId(`${entry.folder}-${title}`),
      title,
      secondaryLabel: issuer,
      category: this.getCertificateFolderLabel(entry.folder),
      folder: entry.folder,
      indexPath: entry.indexPath,
      path: resolvedPath || entry.indexPath,
      date: this.parseCertificateDate(dateText),
      dateText,
      expiresText,
      credentialId,
      competencies,
      description: '',
      metaItems: descriptionParts,
      tags: splitCommaValues(competencies),
      searchBlob: [
        title,
        issuer,
        entry.folder,
        dateText,
        expiresText,
        credentialId,
        competencies,
        entry.indexPath,
        descriptionParts.join(' ')
      ].filter(Boolean).join(' ').toLowerCase()
    };
  }
  parseCertificateDate(dateText) {
    if (!dateText) {
      return new Date(0);
    }

    const parsedDate = new Date(dateText);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }

    // Try to normalize date text by removing "de " or "del "
    const cleaned = dateText.replace(/\b(de|del)\b/gi, '').replace(/\s+/g, ' ').trim();

    const parts = cleaned.match(/^([A-Za-zÀ-ÿ]{3,9})\s+(\d{4})$/);
    if (parts) {
      const monthStr = parts[1].toLowerCase();
      const monthMap = {
        // English
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, september: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11,
        
        // Portuguese
        janeiro: 0,
        fevereiro: 1,
        março: 2, marco: 2,
        abril: 3, abr: 3,
        maio: 4,
        junho: 5,
        julho: 6,
        agosto: 7,
        setembro: 8,
        outubro: 9,
        novembro: 10,
        dezembro: 11, dez: 11,
        
        // Spanish
        enero: 0, ene: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8, set: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11, dic: 11
      };

      if (monthMap[monthStr] !== undefined) {
        return new Date(Number(parts[2]), monthMap[monthStr], 1);
      }

      // Fallback to English parser if not in mapping
      const monthIndex = new Date(`${parts[1]} 1, 2000`).getMonth();
      if (monthIndex >= 0) {
        return new Date(Number(parts[2]), monthIndex, 1);
      }
    }

    return new Date(0);
  }
  getCertificateFolderLabel(folder) {
    if (!folder) {
      return 'Certificate';
    }

    return folder
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
  generateId(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  filterCertificates(searchTerm) {
    this.currentFilter = searchTerm.trim();
    const normalizedSearch = this.currentFilter.toLowerCase();
    this.filteredCertificates = this.certificates.filter(cert => {
      if (!normalizedSearch) {
        return true;
      }

      return (cert.searchBlob || '').includes(normalizedSearch);
    });
    this.sortCertificates(this.currentSort, false);
    this.renderCertificates();
  }
  sortCertificates(sortOption, shouldRender = true) {
    this.currentSort = sortOption;
    this.filteredCertificates.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return a.date - b.date;
        case 'date-desc':
          return b.date - a.date;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    if (shouldRender) {
      this.renderCertificates();
    }
  }
  renderCertificates() {
    if (!this.searchResultsDisplay) {
      this.searchResultsDisplay = document.getElementById('certificate-search-results-count');
    }

    this.updateSearchResultsCount(this.filteredCertificates.length);
    this.container.innerHTML = '';
    if (this.filteredCertificates.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-certificates';
      noResults.textContent = this.currentFilter 
        ? `No certificates found matching "${this.currentFilter}"`
        : 'No certificates available';
      this.container.appendChild(noResults);
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'projects-grid certificate-grid profile-grid';
    this.filteredCertificates.forEach((cert, index) => {
      const card = this.createCertificateCard(cert, index);
      grid.appendChild(card);
    });
    this.container.appendChild(grid);
    this.bindCertificateLinks();
  }
  updateSearchResultsCount(count) {
    if (!this.searchResultsDisplay) {
      return;
    }

    if (!this.currentFilter && !this.isLoading) {
      this.searchResultsDisplay.textContent = '';
      this.searchResultsDisplay.style.display = 'none';
      return;
    }

    this.searchResultsDisplay.style.display = 'block';
    this.searchResultsDisplay.textContent = count === 0
      ? 'No certificates found'
      : `${count} certificates found`;
  }
  createCertificateCard(cert, index) {
    const card = document.createElement('article');
    card.className = 'project-card certificate-card profile-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('aria-labelledby', `cert-title-${cert.id}`);
    card.innerHTML = buildProfileCardMarkup({
      id: cert.id,
      title: cert.title,
      secondaryLabel: cert.secondaryLabel || cert.issuer || '',
      description: cert.description || 'Professional certificate details available in the markdown file.',
      metaItems: cert.metaItems || [],
      tags: cert.tags || [],
      linkPath: cert.path,
      linkLabel: window.Translations?.get('projects.viewCertificate') || 'View certificate',
      linkClass: 'certificate-link btn btn-secondary',
      titleIdPrefix: 'cert-title'
    });
    return card;
  }
  bindCertificateLinks() {
    this.container.querySelectorAll('.certificate-link').forEach(link => {
      if (link.dataset.bound === 'true') {
        return;
      }

      link.dataset.bound = 'true';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = link.getAttribute('data-path');
        if (path && window.loadProjectContent) {
          window.loadProjectContent(path);
        }
      });
    });
  }
  showErrorMessage() {
    this.container.innerHTML = `
      <div class="certificate-error">
        <p>Unable to load certificates. Please try again later.</p>
      </div>
    `;
    if (this.searchResultsDisplay) {
      this.searchResultsDisplay.textContent = '';
      this.searchResultsDisplay.style.display = 'none';
    }
  }
}

class AcademicShowcase {
  constructor() {
    this.academics = [];
    this.container = document.getElementById('academic-container');
    if (!this.container) return;
    this.loadAcademics();
  }

  async fetchMarkdownFromCandidates(candidates) {
    for (const candidate of candidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        // Try the next fallback path
      }
    }

    throw new Error('Failed to load academic markdown files');
  }

  parseAcademicIndex(markdown) {
    const normalizedMarkdown = String(markdown || '').replace(/\]\s*\n\s*\(/g, '](');
    const entries = [];
    const linkPattern = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)/gm;
    let match;

    while ((match = linkPattern.exec(normalizedMarkdown)) !== null) {
      const title = match[1].trim();
      let path = match[2].trim();
      if (path.startsWith('academic/')) {
        path = 'pages/' + path;
      }
      if (!path.startsWith('pages/academic/')) {
        continue;
      }

      const parts = path.split('/').filter(Boolean);
      const acadIdx = parts.indexOf('academic');
      const folder = (acadIdx !== -1 && parts.length > acadIdx + 1) ? parts[acadIdx + 1] : '';
      if (!folder) {
        continue;
      }

      entries.push({
        id: this.generateId(`${folder}-${title}`),
        title,
        folder,
        indexPath: path
      });
    }

    return entries;
  }

  buildAcademicPathCandidates(indexPath, lang) {
    let normalizedPath = String(indexPath || '').replace(/\\/g, '/');
    if (normalizedPath.startsWith('academic/')) {
      normalizedPath = 'pages/' + normalizedPath;
    }
    const parts = normalizedPath.split('/').filter(Boolean);
    const acadIdx = parts.indexOf('academic');
    if (acadIdx === -1 || parts.length <= acadIdx + 1) {
      return [normalizedPath];
    }

    const folder = parts[acadIdx + 1];
    const candidates = [
      `pages/academic/${folder}/${lang}.md`,
      normalizedPath
    ];

    ['EN', 'PT', 'ES'].forEach(code => {
      const candidatePath = `pages/academic/${folder}/${code}.md`;
      if (!candidates.includes(candidatePath)) {
        candidates.push(candidatePath);
      }
    });

    return [...new Set(candidates)];
  }

  generateId(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }

  getAcademicFolderLabel(folder) {
    if (!folder) {
      return 'Academic';
    }

    return folder
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  async loadAcademicEntry(entry, lang) {
    const detailPathCandidates = this.buildAcademicPathCandidates(entry.indexPath, lang);
    let markdown = null;
    let resolvedPath = entry.indexPath;

    for (const candidate of detailPathCandidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          markdown = await response.text();
          resolvedPath = candidate;
          break;
        }
      } catch (error) {
        // Try next candidate
      }
    }

    if (!markdown) {
      return {
        id: entry.id,
        title: entry.title,
        secondaryLabel: this.getAcademicFolderLabel(entry.folder),
        description: '',
        metaItems: [],
        tags: [],
        folder: entry.folder,
        indexPath: entry.indexPath,
        path: entry.indexPath,
        searchBlob: `${entry.title} ${entry.folder} ${entry.indexPath}`.toLowerCase()
      };
    }

    const metadata = parseMarkdownMetadata(markdown);
    const title = extractMarkdownTitle(markdown, entry.title);
    const institution = metadata.institution || metadata.instituicao || metadata.institucion || this.getAcademicFolderLabel(entry.folder);
    const degree = metadata.degree || metadata.grau || metadata.titulo || '';
    const period = metadata.period || metadata.periodo || '';
    const competencies = metadata.competencies || metadata.competencias || '';
    const highlights = metadata.highlights || metadata.destaques || metadata.destacados || '';
    const descriptionParts = [];

    if (degree) {
      descriptionParts.push(degree);
    }
    if (highlights) {
      descriptionParts.push(highlights);
    }

    return {
      id: this.generateId(`${entry.folder}-${title}`),
      title,
      secondaryLabel: institution,
      description: descriptionParts.join(' • '),
      metaItems: (() => {
        if (!period) return [];
        const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toLowerCase();
        const label = lang === 'pt' ? 'Período' : lang === 'es' ? 'Período' : 'Period';
        return [`${label}: ${period}`];
      })(),
      tags: splitCommaValues(competencies),
      folder: entry.folder,
      indexPath: entry.indexPath,
      path: resolvedPath || entry.indexPath,
      searchBlob: [
        title,
        institution,
        degree,
        period,
        competencies,
        highlights,
        entry.indexPath,
        descriptionParts.join(' ')
      ].filter(Boolean).join(' ').toLowerCase()
    };
  }

  async loadAcademics() {
    this.container.setAttribute('aria-busy', 'true');
    this.container.innerHTML = `
      <div class="no-certificates">
        <p>Loading academic profiles...</p>
      </div>
    `;

    try {
      const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
      const indexMarkdown = await this.fetchMarkdownFromCandidates([
        `pages/academic/${lang}.md`,
        'pages/academic/EN.md'
      ]);
      const entries = this.parseAcademicIndex(indexMarkdown);
      const academics = await Promise.all(entries.map(entry => this.loadAcademicEntry(entry, lang)));
      this.academics = academics.filter(Boolean);
      this.renderAcademics();
    } catch (error) {
      console.error('Error loading academic profiles:', error);
      this.showErrorMessage();
    } finally {
      this.container.removeAttribute('aria-busy');
    }
  }

  renderAcademics() {
    this.container.innerHTML = '';

    if (this.academics.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-certificates';
      noResults.textContent = 'No academic profiles available';
      this.container.appendChild(noResults);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'projects-grid profile-grid';
    this.academics.forEach((academic, index) => {
      grid.appendChild(this.createAcademicCard(academic, index));
    });
    this.container.appendChild(grid);
    this.bindAcademicLinks();
  }

  createAcademicCard(academic, index) {
    const card = document.createElement('article');
    card.className = 'project-card academic-card profile-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('aria-labelledby', `academic-title-${academic.id}`);
    card.innerHTML = buildProfileCardMarkup({
      id: academic.id,
      title: academic.title,
      secondaryLabel: academic.secondaryLabel,
      description: academic.description,
      metaItems: academic.metaItems || [],
      tags: academic.tags || [],
      linkPath: academic.path,
      linkLabel: window.Translations?.get('about.readMore') || 'Read More',
      linkClass: 'academic-link btn btn-secondary',
      titleIdPrefix: 'academic-title'
    });
    return card;
  }

  bindAcademicLinks() {
    this.container.querySelectorAll('.academic-link').forEach(link => {
      if (link.dataset.bound === 'true') {
        return;
      }

      link.dataset.bound = 'true';
      link.addEventListener('click', event => {
        event.preventDefault();
        const path = link.getAttribute('data-path');
        if (path && window.loadProjectContent) {
          window.loadProjectContent(path);
        }
      });
    });
  }

  showErrorMessage() {
    this.container.innerHTML = `
      <div class="certificate-error">
        <p>Unable to load academic profiles. Please try again later.</p>
      </div>
    `;
  }
}

class ArticleShowcase {
  constructor() {
    this.articles = [];
    this.container = document.getElementById('articles-container');
    if (!this.container) return;
    this.loadArticles();
  }

  async fetchMarkdownFromCandidates(candidates) {
    for (const candidate of candidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        // Try the next fallback path
      }
    }
    throw new Error('Failed to load article markdown files');
  }

  parseArticleIndex(markdown) {
    const normalizedMarkdown = String(markdown || '').replace(/\]\s*\n\s*\(/g, '](');
    const entries = [];
    const linkPattern = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)/gm;
    let match;

    while ((match = linkPattern.exec(normalizedMarkdown)) !== null) {
      const title = match[1].trim();
      let path = match[2].trim();
      if (path.startsWith('articles/')) {
        path = 'pages/' + path;
      }
      if (!path.startsWith('pages/articles/')) {
        continue;
      }

      const parts = path.split('/').filter(Boolean);
      const artIdx = parts.indexOf('articles');
      const folder = (artIdx !== -1 && parts.length > artIdx + 1) ? parts[artIdx + 1] : '';
      if (!folder) {
        continue;
      }

      entries.push({
        id: this.generateId(`${folder}-${title}`),
        title,
        folder,
        indexPath: path
      });
    }

    return entries;
  }

  buildArticlePathCandidates(indexPath, lang) {
    let normalizedPath = String(indexPath || '').replace(/\\/g, '/');
    if (normalizedPath.startsWith('articles/')) {
      normalizedPath = 'pages/' + normalizedPath;
    }
    const parts = normalizedPath.split('/').filter(Boolean);
    const artIdx = parts.indexOf('articles');
    if (artIdx === -1 || parts.length <= artIdx + 1) {
      return [normalizedPath];
    }

    const folder = parts[artIdx + 1];
    const candidates = [
      `pages/articles/${folder}/${lang}.md`,
      normalizedPath
    ];

    ['EN', 'PT', 'ES'].forEach(code => {
      const candidatePath = `pages/articles/${folder}/${code}.md`;
      if (!candidates.includes(candidatePath)) {
        candidates.push(candidatePath);
      }
    });

    return [...new Set(candidates)];
  }

  generateId(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }

  getArticleFolderLabel(folder) {
    if (!folder) {
      return 'Article';
    }
    return folder
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  async loadArticleEntry(entry, lang) {
    const detailPathCandidates = this.buildArticlePathCandidates(entry.indexPath, lang);
    let markdown = null;
    let resolvedPath = entry.indexPath;

    for (const candidate of detailPathCandidates) {
      try {
        const response = await fetch(candidate);
        if (response.ok) {
          markdown = await response.text();
          resolvedPath = candidate;
          break;
        }
      } catch (error) {
        // Try next candidate
      }
    }

    if (!markdown) {
      return {
        id: entry.id,
        title: entry.title,
        secondaryLabel: this.getArticleFolderLabel(entry.folder),
        description: '',
        metaItems: [],
        tags: [],
        folder: entry.folder,
        indexPath: entry.indexPath,
        path: entry.indexPath,
        searchBlob: `${entry.title} ${entry.folder} ${entry.indexPath}`.toLowerCase()
      };
    }

    const metadata = parseMarkdownMetadata(markdown);
    const title = extractMarkdownTitle(markdown, entry.title);
    const author = metadata.author || metadata.autor || 'Lucas Liachi';
    const category = metadata.category || metadata.categoria || this.getArticleFolderLabel(entry.folder);
    const dateText = metadata.date || metadata.data || metadata.fecha || '';
    const competencies = metadata.competencies || metadata.competencias || '';
    const descriptionParts = [];

    if (category) {
      descriptionParts.push(category);
    }

    return {
      id: this.generateId(`${entry.folder}-${title}`),
      title,
      secondaryLabel: author,
      description: descriptionParts.join(' • '),
      metaItems: (() => {
        if (!dateText) return [];
        const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toLowerCase();
        const label = lang === 'pt' ? 'Data' : lang === 'es' ? 'Fecha' : 'Date';
        return [`${label}: ${dateText}`];
      })(),
      tags: splitCommaValues(competencies),
      folder: entry.folder,
      indexPath: entry.indexPath,
      path: resolvedPath || entry.indexPath,
      searchBlob: [
        title,
        author,
        category,
        dateText,
        competencies,
        entry.indexPath,
        descriptionParts.join(' ')
      ].filter(Boolean).join(' ').toLowerCase()
    };
  }

  async loadArticles() {
    this.container.setAttribute('aria-busy', 'true');
    this.container.innerHTML = `
      <div class="no-certificates">
        <p data-i18n="articles.loading">Loading articles...</p>
      </div>
    `;

    try {
      const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
      const indexMarkdown = await this.fetchMarkdownFromCandidates([
        `pages/articles/${lang}.md`,
        'pages/articles/EN.md'
      ]);
      const entries = this.parseArticleIndex(indexMarkdown);
      const articles = await Promise.all(entries.map(entry => this.loadArticleEntry(entry, lang)));
      this.articles = articles.filter(Boolean);
      this.renderArticles();
    } catch (error) {
      console.error('Error loading articles:', error);
      this.showErrorMessage();
    } finally {
      this.container.removeAttribute('aria-busy');
    }
  }

  renderArticles() {
    this.container.innerHTML = '';

    if (this.articles.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-certificates';
      noResults.setAttribute('data-i18n', 'articles.noResults');
      noResults.textContent = window.Translations?.get('articles.noResults') || 'No articles available';
      this.container.appendChild(noResults);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'projects-grid profile-grid';
    this.articles.forEach((article, index) => {
      grid.appendChild(this.createArticleCard(article, index));
    });
    this.container.appendChild(grid);
    this.bindArticleLinks();
  }

  createArticleCard(article, index) {
    const card = document.createElement('article');
    card.className = 'project-card article-card profile-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('aria-labelledby', `article-title-${article.id}`);
    card.innerHTML = buildProfileCardMarkup({
      id: article.id,
      title: article.title,
      secondaryLabel: article.secondaryLabel,
      description: article.description,
      metaItems: article.metaItems || [],
      tags: article.tags || [],
      linkPath: article.path,
      linkLabel: window.Translations?.get('articles.readArticle') || 'Read Article',
      linkClass: 'article-link btn btn-secondary',
      titleIdPrefix: 'article-title'
    });
    return card;
  }

  bindArticleLinks() {
    this.container.querySelectorAll('.article-link').forEach(link => {
      if (link.dataset.bound === 'true') {
        return;
      }

      link.dataset.bound = 'true';
      link.addEventListener('click', event => {
        event.preventDefault();
        const path = link.getAttribute('data-path');
        if (path && window.loadProjectContent) {
          window.loadProjectContent(path);
        }
      });
    });
  }

  showErrorMessage() {
    this.container.innerHTML = `
      <div class="certificate-error">
        <p data-i18n="articles.error">Unable to load articles. Please try again later.</p>
      </div>
    `;
  }
}

const projectData = {
  process: [
    {
      id: "e2e-hire-to-retire",
      title: "End-to-End Hire to Retire Process",
      description: "Complete HR process from recruitment to employee retirement",
      technologies: ["BPMN", "Process Mapping", "HR Management", "Workflow"],
      path: "pages/Projects/process/e2e-hire-to-retire.md",
      category: "process",
      hero: true,
      keywords: ["HR", "recruitment", "retirement", "employee lifecycle", "human resources"]
    },
    {
      id: "process-analysis",
      title: "Business Process Analysis",
      description: "Process analysis and continuous improvement methodologies",
      technologies: ["BPMN", "Process Mapping", "Analysis", "Improvement"],
      path: "pages/Projects/process/process.md",
      category: "process",
      hero: true,
      keywords: ["process improvement", "BPMN", "business analysis", "efficiency"]
    }
  ],
  governance: [
    {
      id: "corporate-governance",
      title: "Corporate Governance Framework",
      description: "Implementation of corporate governance structure and policies",
      technologies: ["Corporate Governance", "Risk Management", "Compliance", "ESG"],
      path: "pages/Projects/governance/governance-corp.md",
      category: "governance",
      hero: true,
      keywords: ["corporate governance", "compliance", "risk management", "transparency"]
    },
    {
      id: "it-governance",
      title: "IT Governance Framework",
      description: "COBIT and ITIL implementation for IT governance",
      technologies: ["COBIT", "ITIL", "IT Management", "Governance"],
      path: "pages/Projects/governance/governance-it.md",
      category: "governance",
      keywords: ["IT governance", "COBIT", "ITIL", "technology management"]
    },
    {
      id: "competency-evaluation",
      title: "Performance and Competency Evaluation",
      description: "Competency-based performance evaluation framework",
      technologies: ["Performance Management", "HR", "Evaluation", "Excel"],
      path: "pages/Projects/governance/avaliacao-por-competencia/Avaliação-de-desempenho-e-ompetências.md",
      category: "governance",
      keywords: ["performance evaluation", "competency", "HR", "assessment"]
    },
    {
      id: "agile-metrics",
      title: "Agile Metrics Framework",
      description: "Comprehensive agile metrics and measurement system",
      technologies: ["Agile", "Metrics", "KPIs", "Performance"],
      path: "pages/Projects/governance/metrica-agil/",
      category: "governance",
      keywords: ["agile metrics", "KPIs", "performance measurement", "scrum"]
    }
  ],
  it: [
    {
      id: "it-governance-framework",
      title: "IT Governance Best Practices",
      description: "Implementation of IT governance frameworks and methodologies",
      technologies: ["COBIT", "ITIL", "IT Strategy", "Governance"],
      path: "pages/Projects/governance/governance-it.md",
      category: "it",
      keywords: ["IT governance", "best practices", "framework", "methodology"]
    }
  ],
  dev: [
    {
      id: "sixsigma-qa",
      title: "Six Sigma for Quality Assurance",
      description: "Application of Six Sigma methodology in quality assurance processes",
      technologies: ["Six Sigma", "Quality Assurance", "Python", "Statistics"],
      path: "pages/Projects/development/sixsigma-para-quality-assurance/sixsigma-para-quality-assurance.md",
      category: "dev",
      hero: true,
      keywords: ["six sigma", "quality assurance", "statistics", "process improvement"]
    },
    {
      id: "development-projects",
      title: "Software Development Portfolio",
      description: "Collection of software development projects and methodologies",
      technologies: ["Software Development", "Programming", "Methodologies"],
      path: "pages/Projects/development/development.md",
      category: "dev",
      keywords: ["software development", "programming", "coding", "applications"]
    }
  ],
  stats: [
    {
      id: "statistical-analysis",
      title: "Applied Statistics Projects",
      description: "Statistical analysis and data science projects",
      technologies: ["Statistics", "Data Analysis", "Python", "R"],
      path: "pages/Projects/estats/estats.md",
      category: "stats",
      hero: true,
      keywords: ["statistics", "data analysis", "data science", "analytics"]
    },
    {
      id: "sixsigma-statistics",
      title: "Six Sigma Statistical Control",
      description: "Statistical process control using Six Sigma methodology",
      technologies: ["Six Sigma", "Statistics", "Process Control", "Quality"],
      path: "pages/Projects/development/sixsigma-para-quality-assurance/sixsigma-para-quality-assurance.md",
      category: "stats",
      keywords: ["six sigma", "statistical control", "quality control", "process control"]
    }
  ],
  production: [
    {
      id: "oee-effectiveness",
      title: "Overall Equipment Effectiveness (OEE)",
      description: "OEE implementation and monitoring system",
      technologies: ["OEE", "Production", "Manufacturing", "KPIs"],
      path: "pages/Projects/production/oee-overall-equipment-effectiveness/",
      category: "production",
      hero: true,
      keywords: ["OEE", "equipment effectiveness", "manufacturing", "production efficiency"]
    },
    {
      id: "production-processes",
      title: "Production Process Management",
      description: "End-to-end production process optimization",
      technologies: ["Production", "Process Management", "Manufacturing"],
      path: "pages/Projects/production/production.md",
      category: "production",
      keywords: ["production", "manufacturing", "process optimization", "efficiency"]
    }
  ]
};

class ProjectManager {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.categories = ['process', 'technology', 'statistics'];
    this.categoryMapping = {
      'process': 'process',
      'governance': 'technology',
      'it': 'technology', 
      'dev': 'technology',
      'stats': 'statistics',
      'production': 'statistics'
    };
    this.currentCategory = 'process';
    this.currentFilter = '';
    this.currentSort = 'date-desc';
    this.container = document.getElementById('projects-container');
    if (!this.container) return;
    this.setupUI();
    this.loadProjects();
  }

  setupUI() {
    const tabs = document.querySelectorAll('.project-tabs .project-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const category = tab.dataset.category;
        if (category && this.categories.includes(category)) {
          this.changeCategory(category);
        }
      });
    });

    this.searchInput = document.getElementById('projects-search');
    this.clearButton = document.getElementById('projects-clear-search');
    this.searchResultsDisplay = document.getElementById('projects-search-results-count');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.filterProjects(query);
        if (this.clearButton) {
          this.clearButton.style.display = query ? 'block' : 'none';
        }
      });
    }

    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
        this.filterProjects('');
        this.clearButton.style.display = 'none';
      });
    }

    this.sortSelect = document.getElementById('projects-sort');
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortProjects(e.target.value);
      });
    }
  }

  loadProjects() {
    this.projects = Object.entries(projectData).flatMap(([categoryKey, projectsInCategory]) => {
      return projectsInCategory.map(project => ({
        ...project,
        originalCategory: project.category || categoryKey,
        category: this.categoryMapping[project.category || categoryKey] || 'technology',
        date: project.date || '1970-01-01'
      }));
    });

    this.filterProjects(this.searchInput ? this.searchInput.value.trim() : '');
  }

  changeCategory(category) {
    this.currentCategory = category;
    
    const tabs = document.querySelectorAll('.project-tabs .project-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    const query = this.searchInput ? this.searchInput.value.trim() : '';
    this.filterProjects(query);
  }

  filterProjects(searchTerm) {
    this.currentFilter = searchTerm.trim();
    const normalizedSearch = this.currentFilter.toLowerCase();
    
    this.filteredProjects = this.projects.filter(project => {
      if (project.category !== this.currentCategory) {
        return false;
      }
      if (!normalizedSearch) {
        return true;
      }
      return (
        project.title.toLowerCase().includes(normalizedSearch) ||
        (project.description && project.description.toLowerCase().includes(normalizedSearch)) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(normalizedSearch))) ||
        (project.keywords && project.keywords.some(kw => kw.toLowerCase().includes(normalizedSearch)))
      );
    });

    this.sortProjects(this.currentSort, false);
    this.renderProjects();
  }

  sortProjects(sortOption, shouldRender = true) {
    this.currentSort = sortOption;
    this.filteredProjects.sort((a, b) => {
      const heroA = a.hero ? 1 : 0;
      const heroB = b.hero ? 1 : 0;
      if (heroA !== heroB) {
        return heroB - heroA;
      }

      switch (sortOption) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    if (shouldRender) {
      this.renderProjects();
    }
  }

  renderProjects() {
    this.updateSearchResultsCount(this.filteredProjects.length);
    this.container.innerHTML = '';

    if (this.filteredProjects.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      const noResultsTextKey = 'projects.noMatchInCategory';
      const noResultsText = window.Translations?.get(noResultsTextKey) || 'No projects match your criteria in this category.';
      noResults.innerHTML = `<p>${noResultsText}</p>`;
      this.container.appendChild(noResults);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'projects-grid profile-grid';
    
    this.filteredProjects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      grid.appendChild(card);
    });

    this.container.appendChild(grid);
    this.bindProjectLinks();
  }

  updateSearchResultsCount(count) {
    if (!this.searchResultsDisplay) {
      return;
    }

    if (!this.currentFilter) {
      this.searchResultsDisplay.textContent = '';
      this.searchResultsDisplay.style.display = 'none';
      return;
    }

    this.searchResultsDisplay.style.display = 'block';
    
    let resultsTextSuffix = 'projects found';
    if (window.Translations) {
      resultsTextSuffix = window.Translations.get('projects.resultsFound') || resultsTextSuffix;
    }
    
    this.searchResultsDisplay.textContent = count === 0
      ? (window.Translations?.get('projects.noResults') || 'No results found')
      : `${count} ${resultsTextSuffix}`;
  }

  getCategoryDisplayName(categoryKey) {
    if (window.Translations) {
      const translationKey = `projects.category.${categoryKey}`;
      const translatedName = window.Translations.get(translationKey);
      if (translatedName && translatedName !== translationKey) return translatedName;
    }
    const names = {
      process: 'Process Improvement',
      technology: 'Technology Solutions',
      statistics: 'Statistics & Analytics'
    };
    return names[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  }

  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card profile-card fade-in';
    card.style.animationDelay = `${index * 0.08}s`;
    card.setAttribute('aria-labelledby', `project-title-${project.id}`);

    const badges = [];
    if (project.hero) {
      badges.push('Hero');
    }

    card.innerHTML = buildProfileCardMarkup({
      id: project.id,
      title: project.title,
      secondaryLabel: this.getCategoryDisplayName(project.category),
      description: project.description || '',
      metaItems: badges,
      tags: project.technologies || [],
      linkPath: project.path,
      linkLabel: window.Translations?.get('projects.readMore') || 'Read More',
      linkClass: 'project-link btn btn-secondary',
      titleIdPrefix: 'project-title'
    });
    return card;
  }

  bindProjectLinks() {
    this.container.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        if (path && window.loadProjectContent) {
          window.loadProjectContent(path);
        } else {
          console.warn("Project card link clicked, but data-path attribute is missing or empty.");
        }
      });
    });
  }
}

if (!window.initializeExperience) {
  window.initializeExperience = initializeExperience;
}
if (!window.loadExperienceContent) {
  window.loadExperienceContent = loadExperienceContent;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('academic-container')) {
    window.academicShowcase = new AcademicShowcase();
  }
  if (document.getElementById('certificate-container')) {
    window.certificateShowcase = new CertificateShowcase();
  }
  if (document.getElementById('articles-container')) {
    window.articleShowcase = new ArticleShowcase();
  }
  initializeExperience();
  if (document.getElementById('projects')) {
    window.projectManager = new ProjectManager();
  }
});

document.addEventListener('languageChanged', () => {
  if (window.academicShowcase) {
    window.academicShowcase.loadAcademics();
  }
  if (document.getElementById('career-timeline')) {
    loadCareerContent();
  }
  if (window.certificateShowcase) {
    window.certificateShowcase.loadCertificates();
  }
  if (window.articleShowcase) {
    window.articleShowcase.loadArticles();
  }
  if (window.projectManager) {
    window.projectManager.loadProjects();
  }
});

document.dispatchEvent(new CustomEvent('moduleExperienceLoaded'));
document.dispatchEvent(new CustomEvent('moduleProjectsLoaded'));

