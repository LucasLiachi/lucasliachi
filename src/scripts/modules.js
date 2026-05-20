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

function parseMarkdownMetadata(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const metadata = {};

  lines.forEach(line => {
    const match = line.match(/^[-*]\s+([^:]+):\s+(.+)$/);
    if (match) {
      metadata[match[1].trim().toLowerCase()] = match[2].trim();
    }
  });

  return metadata;
}

function extractMarkdownTitle(markdown, fallbackTitle) {
  const titleMatch = String(markdown || '').match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : fallbackTitle;
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
  const candidates = [`career/${currentLang}.md`, 'career/EN.md'];

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
    const html = window.marked ? window.marked.parse(markdown) : markdown;

    timelineContainer.innerHTML = `
      <div class="career-markdown-content markdown-content" data-language="${currentLang.toLowerCase()}">
        ${html}
      </div>
    `;
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
  const path = `career/${folder}/${langCode}.md`;
  fetch(path)
    .then(response => {
      if (!response.ok) {
        return fetch(`career/${folder}/EN.md`);
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
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
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
        `certificate/${lang}.md`,
        'certificate/EN.md'
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
      const path = match[2].trim();
      if (!path.startsWith('certificate/')) {
        continue;
      }

      const parts = path.split('/').filter(Boolean);
      const folder = parts.length >= 2 ? parts[1] : '';
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
    const normalizedPath = String(indexPath || '').replace(/\\/g, '/');
    const parts = normalizedPath.split('/').filter(Boolean);
    if (parts.length < 3) {
      return [normalizedPath];
    }

    const folder = parts[1];
    const candidates = [
      `certificate/${folder}/${lang}.md`,
      normalizedPath
    ];

    ['EN', 'PT', 'ES'].forEach(code => {
      const candidatePath = `certificate/${folder}/${code}.md`;
      if (!candidates.includes(candidatePath)) {
        candidates.push(candidatePath);
      }
    });

    return [...new Set(candidates)];
  }
  parseCertificateMarkdown(markdown, entry, resolvedPath) {
    const metadata = parseMarkdownMetadata(markdown);
    const title = extractMarkdownTitle(markdown, entry.title);
    const issuer = metadata.issuer || this.getCertificateFolderLabel(entry.folder);
    const dateText = metadata.issued || '';
    const expiresText = metadata.expires || '';
    const credentialId = metadata['credential id'] || '';
    const competencies = metadata.competencies || '';
    const descriptionParts = [];

    if (dateText) {
      descriptionParts.push(`Issued: ${dateText}`);
    }
    if (expiresText) {
      descriptionParts.push(`Expires: ${expiresText}`);
    }
    if (credentialId) {
      descriptionParts.push(`Credential ID: ${credentialId}`);
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

    const parts = dateText.match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
    if (parts) {
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
      const path = match[2].trim();
      if (!path.startsWith('academic/')) {
        continue;
      }

      const parts = path.split('/').filter(Boolean);
      const folder = parts.length >= 2 ? parts[1] : '';
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
    const normalizedPath = String(indexPath || '').replace(/\\/g, '/');
    const parts = normalizedPath.split('/').filter(Boolean);
    if (parts.length < 3) {
      return [normalizedPath];
    }

    const folder = parts[1];
    const candidates = [
      `academic/${folder}/${lang}.md`,
      normalizedPath
    ];

    ['EN', 'PT', 'ES'].forEach(code => {
      const candidatePath = `academic/${folder}/${code}.md`;
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
    const institution = metadata.institution || this.getAcademicFolderLabel(entry.folder);
    const degree = metadata.degree || '';
    const period = metadata.period || '';
    const competencies = metadata.competencies || '';
    const highlights = metadata.highlights || '';
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
      metaItems: period ? [`Period: ${period}`] : [],
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
        `academic/${lang}.md`,
        'academic/EN.md'
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

const projectData = {
  process: [
    {
      id: "e2e-hire-to-retire",
      title: "End-to-End Hire to Retire Process",
      description: "Complete HR process from recruitment to employee retirement",
      technologies: ["BPMN", "Process Mapping", "HR Management", "Workflow"],
      path: "Projects/process/e2e-hire-to-retire.md",
      category: "process",
      hero: true,
      keywords: ["HR", "recruitment", "retirement", "employee lifecycle", "human resources"]
    },
    {
      id: "process-analysis",
      title: "Business Process Analysis",
      description: "Process analysis and continuous improvement methodologies",
      technologies: ["BPMN", "Process Mapping", "Analysis", "Improvement"],
      path: "Projects/process/process.md",
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
      path: "Projects/governance/governance-corp.md",
      category: "governance",
      hero: true,
      keywords: ["corporate governance", "compliance", "risk management", "transparency"]
    },
    {
      id: "it-governance",
      title: "IT Governance Framework",
      description: "COBIT and ITIL implementation for IT governance",
      technologies: ["COBIT", "ITIL", "IT Management", "Governance"],
      path: "Projects/governance/governance-it.md",
      category: "governance",
      keywords: ["IT governance", "COBIT", "ITIL", "technology management"]
    },
    {
      id: "competency-evaluation",
      title: "Performance and Competency Evaluation",
      description: "Competency-based performance evaluation framework",
      technologies: ["Performance Management", "HR", "Evaluation", "Excel"],
      path: "Projects/governance/avaliacao-por-competencia/Avaliação-de-desempenho-e-ompetências.md",
      category: "governance",
      keywords: ["performance evaluation", "competency", "HR", "assessment"]
    },
    {
      id: "agile-metrics",
      title: "Agile Metrics Framework",
      description: "Comprehensive agile metrics and measurement system",
      technologies: ["Agile", "Metrics", "KPIs", "Performance"],
      path: "Projects/governance/metrica-agil/",
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
      path: "Projects/governance/governance-it.md",
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
      path: "Projects/development/sixsigma-para-quality-assurance/sixsigma-para-quality-assurance.md",
      category: "dev",
      hero: true,
      keywords: ["six sigma", "quality assurance", "statistics", "process improvement"]
    },
    {
      id: "development-projects",
      title: "Software Development Portfolio",
      description: "Collection of software development projects and methodologies",
      technologies: ["Software Development", "Programming", "Methodologies"],
      path: "Projects/development/development.md",
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
      path: "Projects/estats/estats.md",
      category: "stats",
      hero: true,
      keywords: ["statistics", "data analysis", "data science", "analytics"]
    },
    {
      id: "sixsigma-statistics",
      title: "Six Sigma Statistical Control",
      description: "Statistical process control using Six Sigma methodology",
      technologies: ["Six Sigma", "Statistics", "Process Control", "Quality"],
      path: "Projects/development/sixsigma-para-quality-assurance/sixsigma-para-quality-assurance.md",
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
      path: "Projects/production/oee-overall-equipment-effectiveness/",
      category: "production",
      hero: true,
      keywords: ["OEE", "equipment effectiveness", "manufacturing", "production efficiency"]
    },
    {
      id: "production-processes",
      title: "Production Process Management",
      description: "End-to-end production process optimization",
      technologies: ["Production", "Process Management", "Manufacturing"],
      path: "Projects/production/production.md",
      category: "production",
      keywords: ["production", "manufacturing", "process optimization", "efficiency"]
    }
  ]
};

class ProjectManager {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.allFilteredProjects = [];
    this.categories = ['process', 'technology', 'statistics'];
    this.categoryMapping = {
      'process': 'process',
      'governance': 'technology',
      'it': 'technology', 
      'dev': 'technology',
      'stats': 'statistics',
      'production': 'statistics'
    };
    this.DEFAULT_CATEGORY = 'process';
    this.currentCategory = null;
    this.currentFilter = '';
    this.currentSort = 'date-desc';
    this.isSearching = false;
    this.projectContainers = {
      process: document.getElementById('process-projects-container'),
      technology: document.getElementById('technology-projects-container'),
      statistics: document.getElementById('statistics-projects-container')
    };
    this.searchInput = document.getElementById('projects-search');
    this.clearButton = document.getElementById('clear-search');
    this.searchResultsDisplay = document.getElementById('search-results-count');
    this.categoryFilter = document.getElementById('category-filter');
    if (document.getElementById('projects') && !Object.values(this.projectContainers).some(c => c)) {
        console.warn('ProjectManager: No project category containers found, but #projects section exists. Projects may not display.');
    }
    this.setupGlobalSearch();
    this.setupCategoryFilter();
    this.setupCategoryTabs();
    this.loadProjects();
  }
  setupGlobalSearch() {
    if (!this.searchInput) return;
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      this.performGlobalSearch(query);
    });
    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        this.clearGlobalSearch();
      });
      this.searchInput.addEventListener('input', (e) => {
        this.clearButton.style.display = e.target.value ? 'block' : 'none';
      });
      this.clearButton.style.display = this.searchInput.value ? 'block' : 'none';
    }
  }
  setupCategoryFilter() {
    if (!this.categoryFilter) return;
    this.categoryFilter.addEventListener('change', (e) => {
      const selectedCategory = e.target.value;
      const currentSearchTerm = this.searchInput ? this.searchInput.value.trim() : '';
      if (selectedCategory === 'all') {
        this.performGlobalSearch(currentSearchTerm);
        this.updateTabsActiveState(null);
      } else {
        this.changeCategory(selectedCategory); 
      }
    });
  }
  setupCategoryTabs() {
    const tabs = document.querySelectorAll('.projects-nav .project-tab');
    if (!tabs || tabs.length === 0) return; // fallback: no visual tabs in template
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const category = tab.dataset.category || (e.target && e.target.dataset && e.target.dataset.category);
        if (category && this.categories.includes(category)) {
          this.changeCategory(category);
        }
      });
    });
  }

  updateTabsActiveState(activeCategory) {
    const tabs = document.querySelectorAll('.projects-nav .project-tab');
    if (!tabs || tabs.length === 0) return;
    tabs.forEach(tab => {
      if (activeCategory === null) {
        tab.classList.remove('active');
      } else {
        tab.classList.toggle('active', tab.dataset.category === activeCategory);
      }
    });
  }
  loadProjects() {
    this.projects = Object.entries(projectData).flatMap(([categoryKey, projectsInCategory]) => {
      return projectsInCategory.map(project => ({
        ...project,
        originalCategory: project.category || categoryKey,
        category: this.categoryMapping[project.category || categoryKey] || 'technology',
        date: project.date || '1970-01-01'
      }));
    }).sort((a, b) => {
      const heroA = a.hero ? 1 : 0;
      const heroB = b.hero ? 1 : 0;
      if (heroA !== heroB) {
        return heroB - heroA;
      }
      return a.title.localeCompare(b.title);
    });
    this.handleInitialHash();
    if (!this.currentCategory) {
      this.hideAllProjectContainers();
    } else {
      this.changeCategory(this.currentCategory);
    }
  }
  hideAllProjectContainers() {
    Object.values(this.projectContainers).forEach(container => {
      if (container) container.style.display = 'none';
    });
  }
  handleInitialHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#projects-')) {
        const categoryFromHash = hash.substring('#projects-'.length);
        if (this.categories.includes(categoryFromHash)) {
            this.currentCategory = categoryFromHash;
        this.updateTabsActiveState(categoryFromHash);
            return;
        }
    }
    // If no valid hash, set default category to ensure projects render on load
    this.currentCategory = this.DEFAULT_CATEGORY || null;
  }
  performGlobalSearch(query) {
    this.currentFilter = query;
    if (!query && this.categoryFilter && this.categoryFilter.value !== 'all') {
        this.isSearching = false;
        this.changeCategory(this.categoryFilter.value);
        if (this.clearButton) this.clearButton.style.display = 'none';
        return;
    }
    this.isSearching = true;
    if (this.categoryFilter && this.categoryFilter.value !== 'all') {
        this.categoryFilter.value = 'all';
    }
    this.updateTabsActiveState(null);
    if (!query) {
        this.allFilteredProjects = [...this.projects];
    } else {
        this.allFilteredProjects = this.projects.filter(project => {
          const searchLower = query.toLowerCase();
          return (
            project.title.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(searchLower))) ||
            (project.keywords && project.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)))
          );
        });
    }
    this.updateSearchResultsCount(this.allFilteredProjects.length);
    this.displayGlobalSearchResults();
    if (this.clearButton) {
      this.clearButton.style.display = query ? 'block' : 'none';
    }
  }
  clearGlobalSearch() {
    if (this.searchInput) this.searchInput.value = '';
    this.performGlobalSearch(''); 
  }
  updateSearchResultsCount(count) {
    if (!this.searchResultsDisplay) return;
    const queryExists = (this.searchInput && this.searchInput.value.trim() !== '');
    if (!this.isSearching && !queryExists) { 
      this.searchResultsDisplay.textContent = '';
      this.searchResultsDisplay.style.display = 'none';
      return;
    }
    this.searchResultsDisplay.style.display = 'block';
    let noResultsText = 'No results found';
    let resultsTextSuffix = 'results found';
    if (window.Translations) {
        noResultsText = window.Translations.get('projects.noResults') || noResultsText;
        resultsTextSuffix = window.Translations.get('projects.resultsFound') || resultsTextSuffix;
    }
    if (count === 0) {
      this.searchResultsDisplay.textContent = noResultsText;
    } else {
      this.searchResultsDisplay.textContent = `${count} ${resultsTextSuffix}`;
    }
  }
  displayGlobalSearchResults() {
    Object.values(this.projectContainers).forEach(container => {
      if (container) container.style.display = 'none';
    });
    const categoryTabs = document.querySelectorAll('.projects-nav .project-tab');
    if (categoryTabs && categoryTabs.length) categoryTabs.forEach(tab => tab.style.opacity = '0.5');
    let searchResultsContainer = document.getElementById('search-results-container');
    if (!searchResultsContainer) {
      searchResultsContainer = document.createElement('div');
      searchResultsContainer.id = 'search-results-container';
      searchResultsContainer.className = 'search-results-container';
      const projectsNav = document.querySelector('.projects-nav');
      if (projectsNav) {
        projectsNav.parentNode.insertBefore(searchResultsContainer, projectsNav.nextSibling);
      } else {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) projectsSection.appendChild(searchResultsContainer);
        else console.error("ProjectManager: Cannot find .projects-nav or #projects to append search results container.");
      }
    }
    searchResultsContainer.style.display = 'block';
    this.renderProjectsToContainer(this.allFilteredProjects, searchResultsContainer, true);
  }
  hideGlobalSearchResults() {
    const categoryTabs = document.querySelectorAll('.projects-nav .project-tab');
    if (categoryTabs && categoryTabs.length) categoryTabs.forEach(tab => tab.style.opacity = '1');
    const searchResultsContainer = document.getElementById('search-results-container');
    if (searchResultsContainer) {
      searchResultsContainer.style.display = 'none';
      searchResultsContainer.innerHTML = ''; 
    }
  }
  changeCategory(category) {
    if (!this.categories.includes(category)) {
        return;
    }
    if (this.isSearching) {
        this.hideGlobalSearchResults();
    }
    this.isSearching = false;
    this.currentCategory = category;
    window.location.hash = `projects-${category}`;
    if (this.categoryFilter && this.categoryFilter.value !== category) {
        this.categoryFilter.value = category;
    }
    this.updateTabsActiveState(this.currentCategory);
    Object.entries(this.projectContainers).forEach(([catKey, container]) => {
        if (container) {
            container.style.display = (catKey === this.currentCategory) ? 'block' : 'none';
        }
    });
    const currentSearchQuery = this.searchInput ? this.searchInput.value.trim() : '';
    this.filterProjectsByCategory(currentSearchQuery);
  }
  filterProjectsByCategory(query) {
    if (this.isSearching) { 
      return; 
    }
    if (!this.currentCategory || !this.categories.includes(this.currentCategory)) {
        return;
    }
    const localQuery = query ? query.toLowerCase() : '';
    const container = this.projectContainers[this.currentCategory];
    if (!container) {
        return;
    }
    this.filteredProjects = this.projects.filter(project => {
      if (project.category !== this.currentCategory) return false;
      if (!localQuery) return true;
      return (
        project.title.toLowerCase().includes(localQuery) ||
        project.description.toLowerCase().includes(localQuery) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(localQuery))) ||
        (project.keywords && project.keywords.some(keyword => keyword.toLowerCase().includes(localQuery)))
      );
    });
    this.applySortToCategoryProjects(); 
    this.renderProjectsToContainer(this.filteredProjects, container, false); 
    this.updateSearchResultsCount(this.filteredProjects.length); 
  }
  sortCategoryProjects(sortBy) { 
    if (sortBy) {
      this.currentSort = sortBy;
    }
    this.applySortToCategoryProjects();
    const container = this.projectContainers[this.currentCategory];
    this.renderProjectsToContainer(this.filteredProjects, container, false);
  }
  applySortToCategoryProjects() {
    const [criterion, direction] = this.currentSort.split('-');
    this.filteredProjects.sort((a, b) => {
      let comparison = 0;
      if (criterion === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (!isNaN(dateA) && !isNaN(dateB)) {
            comparison = dateB - dateA;
        }
      } else if (criterion === 'name') {
        comparison = a.title.localeCompare(b.title);
      }
      return direction === 'asc' ? -comparison : comparison;
    });
  }
  renderProjectsToContainer(projectsToRender, container, isGlobalSearchLayout) {
    if (!container) {
      return;
    }
    container.innerHTML = '';
    let noResultsTextKey = isGlobalSearchLayout ? 'projects.noMatch' : 'projects.noMatchInCategory';
    let noResultsDefaultText = isGlobalSearchLayout ? 'No projects match your search criteria.' : 'No projects match your criteria in this category.';
    let noResultsText = noResultsDefaultText;
    if (window.Translations) {
        noResultsText = window.Translations.get(noResultsTextKey) || noResultsDefaultText;
    }
    if (projectsToRender.length === 0) {
      container.innerHTML = `<div class="no-results"><p>${noResultsText}</p></div>`;
      return;
    }
    if (isGlobalSearchLayout) {
        const groupedResults = projectsToRender.reduce((acc, project) => {
            if (!acc[project.category]) acc[project.category] = [];
            acc[project.category].push(project);
            return acc;
        }, {});
        Object.entries(groupedResults).forEach(([categoryKey, projectsInCategory]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'search-category-section';
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'search-category-title';
            categoryTitle.textContent = this.getCategoryDisplayName(categoryKey);
            categorySection.appendChild(categoryTitle);
            const projectsGrid = document.createElement('div');
            projectsGrid.className = `project-category search-projects-grid ${categoryKey}-projects active`; 
            projectsInCategory.forEach((project, index) => {
                const projectElement = this.createProjectCardElement(project, index, true);
                projectsGrid.appendChild(projectElement);
            });
            categorySection.appendChild(projectsGrid);
            container.appendChild(categorySection);
        });
    } else {
        projectsToRender.forEach((project, index) => {
            const projectElement = this.createProjectCardElement(project, index, false);
            container.appendChild(projectElement);
        });
    }
    container.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        if (path) loadProjectContent(path);
        else console.warn("Project card link clicked, but data-path attribute is missing or empty.");
      });
    });
  }
  getCategoryDisplayName(categoryKey) {
    if (window.Translations) {
        const translationKey = `projects.category.${categoryKey}`;
        const translatedName = window.Translations.get(translationKey);
        if (translatedName && translatedName !== translationKey) return translatedName;
    }
    const names = {
      process: 'Process Improvement',
      governance: 'Governance & Management',
      it: 'IT & Technology',
      dev: 'Development',
      stats: 'Statistics & Analytics',
      production: 'Production & Manufacturing'
    };
    return names[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  }
  createProjectCardElement(project, index, isGlobalSearchContext) {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card fade-in'; 
    projectElement.style.animationDelay = `${index * 0.1}s`;
    const technologiesHtml = (project.technologies || [])
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');
    let readMoreText = 'Read More';
    if (window.Translations) {
        readMoreText = window.Translations.get('projects.readMore') || readMoreText;
    }
    projectElement.innerHTML = `
      <div class="project-header">
        <h3>${project.title}</h3>
        ${project.hero ? '<span class="project-badge project-badge-hero">Hero</span>' : ''}
        ${isGlobalSearchContext ? `<span class="project-category-tag">${this.getCategoryDisplayName(project.category)}</span>` : ''}
      </div>
      <p class="project-description">${project.description || 'No description available.'}</p>
      <div class="project-technologies">
        ${technologiesHtml}
      </div>
      <div class="project-links">
        <a href="#" class="project-link btn btn-secondary" data-path="${project.path}">${readMoreText}</a>
      </div>
    `;
    return projectElement;
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
});

document.dispatchEvent(new CustomEvent('moduleExperienceLoaded'));
document.dispatchEvent(new CustomEvent('moduleProjectsLoaded'));
