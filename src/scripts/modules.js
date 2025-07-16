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
  renderExperience(generateCareerData());
  loadExperienceContent();
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
  const jobs = [
    {
      date: "2022 - Present",
      title: "Process Specialist & Governance",
      company: "GFT Group",
      description: "Leading process improvement initiatives and ensuring governance standards.",
      left: false
    },
    {
      date: "2021 - 2022",
      title: "Business Analyst Industries",
      company: "The Donald L. Resnick Endowed Chair of Agriculture",
      description: "Analyzed business requirements and implemented process improvements.",
      left: true
    },
    {
      date: "2018 - 2021",
      title: "Business Analyst IT Governance",
      company: "Kuhn do Brasil Implementos Agrícolas Ltda",
      description: "Led IT governance initiatives and process documentation.",
      left: false
    },
    {
      date: "2017 - 2018",
      title: "Business Process Analyst Consultant",
      company: "Consulting Firm",
      description: "Provided consulting services for business process optimization.",
      left: true
    },
    {
      date: "2016 - 2017",
      title: "ISO 9001 Scholar",
      company: "Educational Institution",
      description: "Specialized in ISO 9001 quality management systems.",
      left: false
    },
    {
      date: "2016",
      title: "Project Quality Analyst",
      company: "Project Management Office",
      description: "Ensured quality standards in project delivery.",
      left: true
    }
  ];
  return jobs;
}

function openCareerDetail(folder) {
  const lang = localStorage.getItem('language') || 'pt';
  const langCode = lang.toUpperCase();
  const path = `carrer/${folder}/${langCode}.md`; 
  fetch(path)
    .then(response => {
      if (!response.ok) {
        return fetch(`carrer/${folder}/EN.md`);
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
        >
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
    `;
    this.container.parentNode.insertBefore(filterContainer, this.container);
    document.getElementById('certificate-search').addEventListener('input', (e) => {
      this.filterCertificates(e.target.value);
    });
    document.getElementById('certificate-sort').addEventListener('change', (e) => {
      this.sortCertificates(e.target.value);
    });
  }
  async loadCertificates() {
    try {
      const response = await fetch('certificate/certifications.md');
      if (!response.ok) throw new Error('Failed to load certifications');
      const markdown = await response.text();
      this.certificates = this.parseCertificatesFromMarkdown(markdown);
      this.filterCertificates('');
    } catch (error) {
      console.error('Error loading certificates:', error);
      this.showErrorMessage();
    }
  }
  parseCertificatesFromMarkdown(markdown) {
    const certificates = [];
    const entries = markdown.split(/\n---\n|\n##\s+/);
    entries.forEach(entry => {
      if (!entry.trim()) return;
      const titleMatch = entry.match(/# (.+)/);
      const issuerMatch = entry.match(/\*\*Issuer:\*\* (.+)/);
      const dateMatch = entry.match(/\*\*Date:\*\* (.+)/);
      const descriptionMatch = entry.match(/\*\*Description:\*\* (.+)/);
      if (titleMatch) {
        certificates.push({
          id: this.generateId(titleMatch[1]),
          title: titleMatch[1].trim(),
          issuer: issuerMatch ? issuerMatch[1].trim() : 'Unknown Issuer',
          date: dateMatch ? new Date(dateMatch[1].trim()) : new Date(),
          description: descriptionMatch ? descriptionMatch[1].trim() : '',
        });
      }
    });
    return certificates;
  }
  generateId(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  filterCertificates(searchTerm) {
    this.currentFilter = searchTerm.toLowerCase();
    this.filteredCertificates = this.certificates.filter(cert => {
      if (!this.currentFilter) return true;
      return (
        cert.title.toLowerCase().includes(this.currentFilter) ||
        cert.issuer.toLowerCase().includes(this.currentFilter) ||
        (cert.description && cert.description.toLowerCase().includes(this.currentFilter))
      );
    });
    this.sortCertificates(this.currentSort);
    this.renderCertificates();
  }
  sortCertificates(sortOption) {
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
    this.renderCertificates();
  }
  renderCertificates() {
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
    grid.className = 'certificate-grid';
    this.filteredCertificates.forEach(cert => {
      const card = this.createCertificateCard(cert);
      grid.appendChild(card);
    });
    this.container.appendChild(grid);
  }
  createCertificateCard(cert) {
    const card = document.createElement('article');
    card.className = 'certificate-card';
    card.setAttribute('aria-labelledby', `cert-title-${cert.id}`);
    const imageContainer = document.createElement('div');
    imageContainer.className = 'certificate-image';
    const image = document.createElement('img');
    image.setAttribute('data-src', 'src/images/placeholder.svg');
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.loading = 'lazy';
    if ('loading' in HTMLImageElement.prototype) {
      image.src = 'src/images/placeholder.svg';
    } else {
      image.className = 'lazy';
    }
    imageContainer.appendChild(image);
    const content = document.createElement('div');
    content.className = 'certificate-content';
    const title = document.createElement('h3');
    title.id = `cert-title-${cert.id}`;
    title.textContent = cert.title;
    const issuer = document.createElement('p');
    issuer.className = 'certificate-issuer';
    issuer.textContent = cert.issuer;
    let description;
    if (cert.description) {
      description = document.createElement('p');
      description.className = 'certificate-description';
      description.textContent = cert.description;
    }
    const meta = document.createElement('div');
    meta.className = 'certificate-meta';
    const date = document.createElement('span');
    date.className = 'certificate-date';
    date.textContent = cert.date.toLocaleDateString();
    const viewLink = document.createElement('a');
    viewLink.href = '#';
    viewLink.className = 'certificate-link';
    viewLink.textContent = 'View certificate';
    viewLink.setAttribute('aria-label', `View ${cert.title} certificate details`);
    meta.appendChild(date);
    meta.appendChild(viewLink);
    content.appendChild(title);
    content.appendChild(issuer);
    if (description) content.appendChild(description);
    content.appendChild(meta);
    card.appendChild(imageContainer);
    card.appendChild(content);
    return card;
  }
  showErrorMessage() {
    this.container.innerHTML = `
      <div class="certificate-error">
        <p>Unable to load certificates. Please try again later.</p>
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
      keywords: ["HR", "recruitment", "retirement", "employee lifecycle", "human resources"]
    },
    {
      id: "process-analysis",
      title: "Business Process Analysis",
      description: "Process analysis and continuous improvement methodologies",
      technologies: ["BPMN", "Process Mapping", "Analysis", "Improvement"],
      path: "Projects/process/process.md",
      category: "process",
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
      keywords: ["statistics", "data analysis", "data science", "analytics"]
    },
    {
      id: "sixsigma-statistics",
      title: "Six Sigma Statistical Control",
      description: "Statistical process control using Six Sigma methodology",
      technologies: ["Six Sigma", "Statistics", "Process Control", "Quality"],
      path: "Projects/development/sixsigma-para-quality-assurance/",
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
        document.querySelectorAll('.projects-nav .project-tab').forEach(t => t.classList.remove('active'));
      } else {
        this.changeCategory(selectedCategory); 
      }
    });
  }
  setupCategoryTabs() {
    document.querySelectorAll('.projects-nav .project-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault(); 
        const category = e.target.dataset.category;
        if (category && this.categories.includes(category)) {
          this.changeCategory(category);
        }
      });
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
            document.querySelectorAll('.projects-nav .project-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.category === categoryFromHash);
            });
            return;
        }
    }
    this.currentCategory = null;
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
    document.querySelectorAll('.projects-nav .project-tab').forEach(t => t.classList.remove('active'));
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
    categoryTabs.forEach(tab => tab.style.opacity = '0.5');
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
    categoryTabs.forEach(tab => tab.style.opacity = '1'); 
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
    document.querySelectorAll('.projects-nav .project-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === this.currentCategory);
    });
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
  if (document.getElementById('certificate-container')) {
    window.certificateShowcase = new CertificateShowcase();
  }
  initializeExperience();
  if (document.getElementById('projects')) {
    window.projectManager = new ProjectManager();
  }
});

document.dispatchEvent(new CustomEvent('moduleExperienceLoaded'));
document.dispatchEvent(new CustomEvent('moduleProjectsLoaded'));
    categoryTabs.forEach(tab => tab.style.opacity = '0.5');

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
    categoryTabs.forEach(tab => tab.style.opacity = '1'); 

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
    // Só atualiza o hash se uma categoria foi explicitamente selecionada
    window.location.hash = `projects-${category}`;

    if (this.categoryFilter && this.categoryFilter.value !== category) {
        this.categoryFilter.value = category;
    }

    document.querySelectorAll('.projects-nav .project-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === this.currentCategory);
    });

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

// ===========================================
// MODULE INITIALIZATION AND EXPORTS
// ===========================================

// Export functions for external use
if (!window.initializeExperience) {
  window.initializeExperience = initializeExperience;
}
if (!window.loadExperienceContent) {
  window.loadExperienceContent = loadExperienceContent;
}

// Initialize modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize certificate showcase
  if (document.getElementById('certificate-container')) {
    window.certificateShowcase = new CertificateShowcase();
  }
  
  // Initialize experience content handlers
  initializeExperience();
  
  // Initialize project manager
  if (document.getElementById('projects')) {
    window.projectManager = new ProjectManager();
  }
});

// Notify that the modules are loaded
document.dispatchEvent(new CustomEvent('moduleExperienceLoaded'));
document.dispatchEvent(new CustomEvent('moduleProjectsLoaded'));
