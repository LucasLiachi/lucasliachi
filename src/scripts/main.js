const Translations = (() => {
  const translations = {
    en: {
      navbar: {
        home: "Home",
        about: "Resume",
        projects: "Projects"
      },
      hero: {
        title: "Technology Governance Specialist",
        welcome: "Hello! I'm Lucas Liachi and welcome to my professional space. Here, I share my journey through the projects I'm most proud of and the study materials that drive my knowledge. Explore my work to learn about my skills and, if you like what you see, let's connect on <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: "Strategic alignment of IT initiatives with organizational goals",
        about: "About me",
        resume: "Resume",
        projects: "Projects"
      },
      about: {
        career: {
          title: "Professional Career",
          description: "Timeline with professional experiences and achievements",
          timeline: {
            title: "Career Timeline",
            instructions: "Click on any experience item to see detailed information"
          }
        },
        academic: {
          title: "Academic Profile",
          description: "Academic background and university specializations"
        },
        certificate: {
          title: "Certificate",
          description: "Professional certifications and specialized training"
        },
        readMore: "Read More"
      },
      projects: {
        title: "Projects",
        filter: {
          placeholder: "Filter by category",
          all: "All Categories",
          process: "Process",
          governance: "Governance", 
          technology: "Technology",
          statistics: "Statistics"
        },
        categories: {
          process: "Process Improvement",
          governance: "Corporate Governance",
          it: "IT Governance & Agile",
          dev: "Software Development",
          stats: "Applied Statistics",
          technology: "Technology Solutions",
          statistics: "Statistics & Analytics",
          production: "Production Control"
        },
        viewCode: "View Code",
        liveDemo: "Live Demo",
        noResults: "No results found",
        resultsFound: "results found",
        noMatch: "No projects match your search criteria.",
        noMatchInCategory: "No projects match your criteria in this category.",
        readMore: "Read More"
      },
      modal: {
        about: {
          title: "About me",
          close: "Close",
          loading: "Loading...",
          error: "Error loading content"
        }
      },
      footer: {
        copyright: "© 2025 Lucas Liachi."
      }
    },
    pt: {
      navbar: {
        home: "Início",
        about: "Currículo",
        projects: "Projetos"
      },
      hero: {
        title: "Especialista em Governança de Tecnologia",
        welcome: "Olá! Sou Lucas Liachi e seja bem-vindo(a) ao meu espaço profissional. Aqui, compartilho minha jornada através dos projetos que mais me orgulho e dos materiais de estudo que impulsionam meu conhecimento. Explore meu trabalho para conhecer minhas habilidades e, se gostar do que vir, vamos nos conectar no <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: "Alinhamento estratégico de iniciativas de TI com objetivos organizacionais",
        about: "Sobre mim",
        resume: "Currículo",
        projects: "Projetos"
      },
      about: {
        title: "Currículo",
        career: {
          title: "Carreira Profissional",
          description: "Linha do tempo com experiências e conquistas profissionais",
          timeline: {
            title: "Linha do Tempo",
            instructions: "Clique em qualquer item da experiência para ver informações detalhadas"
          }
        },
        certificate: {
          title: "Certificados",
          description: "Certificações profissionais e treinamentos especializados"
        },
        readMore: "Leia Mais"
      },
      projects: {
        title: "Projetos",
        filter: {
          placeholder: "Filtrar por categoria",
          all: "Todas as Categorias",
          process: "Processos",
          governance: "Governança",
          technology: "Tecnologia", 
          statistics: "Estatística"
        },
        categories: {
          process: "Melhoria de Processos",
          governance: "Governança Corporativa",
          it: "Governança de TI & Agilidade",
          dev: "Desenvolvimento de Software",
          stats: "Estatística Aplicada",
          technology: "Soluções Tecnológicas",
          statistics: "Estatística & Analytics",
          production: "Controle de Produção"
        },
        viewCode: "Ver Código",
        liveDemo: "Demonstração",
        noResults: "Nenhum resultado encontrado",
        resultsFound: "resultados encontrados",
        noMatch: "Nenhum projeto corresponde aos seus critérios de pesquisa.",
        noMatchInCategory: "Nenhum projeto corresponde aos seus critérios nesta categoria.",
        readMore: "Leia Mais"
      },
      modal: {
        about: {
          title: "Sobre mim",
          close: "Fechar",
          loading: "Carregando...",
          error: "Erro ao carregar conteúdo"
        }
      },
      footer: {
        copyright: "© 2025 Lucas Liachi."
      }
    },
    es: {
      navbar: {
        home: "Inicio",
        about: "Currículum",
        projects: "Proyectos"
      },
      hero: {
        title: "Especialista en Gobernanza Tecnológica", 
        welcome: "¡Hola! Soy Lucas Liachi y bienvenido(a) a mi espacio profesional. Aquí, comparto mi trayecto a través de los proyectos de los que más me enorgullezco y los materiales de estudio que impulsan mi conocimiento. Explora mi trabajo para conocer mis habilidades y, si te gusta lo que ves, ¡conectemos en <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: "Alineamiento estratégico de iniciativas de TI com objetivos organizacionales",
        about: "Sobre mí",
        resume: "Currículum",
        projects: "Proyectos"
      },
      about: {
        title: "Currículum",
        career: {
          title: "Carrera Profesional",
          description: "Línea de tiempo con experiencias y logros profesionales",
          timeline: {
            title: "Línea de Tiempo",
            instructions: "Haga clic en cualquier elemento de experiencia para ver información detallada"
          }
        },
        academic: {
          title: "Perfil Académico",
          description: "Formación académica y especializaciones universitarias"
        },
        certificate: {
          title: "Certificados",
          description: "Certificaciones profesionales y entrenamientos especializados"
        },
        readMore: "Leer Más"
      },
      projects: {
        title: "Proyectos",
        filter: {
          placeholder: "Filtrar por categoría",
          all: "Todas las Categorías",
          process: "Procesos",
          governance: "Gobernanza",
          technology: "Tecnología",
          statistics: "Estadística"
        },
        categories: {
          process: "Mejora de Procesos",
          governance: "Gobernanza Corporativa",
          it: "Gobernanza de TI y Agilidad",
          dev: "Desarrollo de Software",
          stats: "Estadística Aplicada",
          technology: "Soluciones Tecnológicas",
          statistics: "Estadística & Analytics",
          production: "Control de Producción"
        },
        viewCode: "Ver Código",
        liveDemo: "Demostración",
        noResults: "No se encontraron resultados",
        resultsFound: "resultados encontrados",
        noMatch: "Ningún proyecto coincide con sus criterios de búsqueda.",
        noMatchInCategory: "Ningún proyecto coincide con sus criterios en esta categoría.",
        readMore: "Leer Más"
      },
      modal: {
        about: {
          title: "Sobre mí",
          close: "Cerrar",
          loading: "Cargando...",
          error: "Error al cargar contenido"
        }
      },
      footer: {
        copyright: "© 2025 Lucas Liachi."
      }
    }
  };

  let currentLanguage = 'en';

  function setLanguage(lang) {
    if (translations[lang]) {
      currentLanguage = lang;
      const event = new CustomEvent('languageChanged', { detail: { language: lang } });
      document.dispatchEvent(event);
      return true;
    }
    return false;
  }

  function get(key, lang = currentLanguage) {
    if (!key) return null;
    
    let value = translations[lang];
    const keyPath = key.split('.');
    
    for (const k of keyPath) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return null;
      }
    }
    
    return value;
  }
  
  function getCurrentLanguage() {
    return currentLanguage;
  }
  
  function getAllTranslations() {
    return translations;
  }

  return {
    setLanguage,
    get,
    getCurrentLanguage,
    getAllTranslations
  };
})();

const DarkMode = (() => {
  function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark');
    updateDarkModeIcon(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }

  function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedDarkMode === null) {
      if (prefersColorScheme.matches) {
        document.body.classList.add('dark');
        updateDarkModeIcon(true);
      }
      prefersColorScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          if (e.matches) {
            document.body.classList.add('dark');
            updateDarkModeIcon(true);
          } else {
            document.body.classList.remove('dark');
            updateDarkModeIcon(false);
          }
        }
      });
    } else {
      const isDarkMode = savedDarkMode === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark');
      }
      updateDarkModeIcon(isDarkMode);
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }
  }

  return {
    initializeDarkMode,
    toggleDarkMode
  };
})();

window.Translations = Translations;
window.DarkMode = DarkMode;

function changeLanguage(language) {
  Translations.setLanguage(language);
  window.currentLanguage = language;
  
  updatePageContent();
  
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.toggle('active', option.dataset.language === language);
  });
  
  const heroAboutBtn = document.getElementById('hero-about-btn');
  if (heroAboutBtn) {
    heroAboutBtn.setAttribute('data-path', `about/${language.toUpperCase()}.md`);
    console.log(`Language changed: Updated hero button path to about/${language.toUpperCase()}.md`);
  }
  
  localStorage.setItem('language', language);
}

function getTranslation(key) {
  return Translations.get(key) || key;
}

function updatePageContent() {
  const currentLang = window.currentLanguage || 'pt';
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getTranslation(key);
    
    if (translation && typeof translation === 'string') {
      if (key === 'hero.welcome') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key);
    
    if (translation && typeof translation === 'string') {
      element.placeholder = translation;
    }
  });
  
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    const translation = getTranslation(key);
    
    if (translation && typeof translation === 'string') {
      element.title = translation;
    }
  });
  
  document.querySelectorAll('[data-path]').forEach(element => {
    const path = element.getAttribute('data-path');
    if (path && path.includes('/')) {
      const parts = path.split('/');
      if (parts.length > 1 && (parts[1] === 'EN' || parts[1] === 'PT' || parts[1] === 'ES')) {
        parts[1] = currentLang.toUpperCase();
        element.setAttribute('data-path', parts.join('/'));
        if (element.id === 'hero-about-btn') {
          console.log(`Updated hero button path to: ${parts.join('/')}`);
        }
      }
    }
  });
  
  const heroBtn = document.getElementById('hero-about-btn');
  if (heroBtn) {
    heroBtn.setAttribute('data-path', `about/${currentLang.toUpperCase()}.md`);
  }
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('nav-links');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', function() {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });
  
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#main-nav') && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupAboutTabs() {
  const tabs = document.querySelectorAll('.about-nav .category-tab');
  const categories = document.querySelectorAll('.about-category');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      categories.forEach(category => category.classList.remove('active'));
      const categoryId = tab.getAttribute('href').substring(1);
      const category = document.getElementById(categoryId);
      if (category) {
        category.classList.add('active');
      }
    });
  });
  
  if (tabs.length > 0) {
    tabs[0].classList.add('active');
    const firstCategoryId = tabs[0].getAttribute('href').substring(1);
    const firstCategory = document.getElementById(firstCategoryId);
    if (firstCategory) {
      firstCategory.classList.add('active');
    }
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#about-') || href.startsWith('#projects-')) {
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        const navLinks = document.getElementById('nav-links');
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

function loadMarkdownContent(path) {
  if (!path.startsWith('src/')) {
    path = 'src/' + path;
  }
  fetch(path)
    .then(response => response.text())
    .then(text => {
      console.log('Markdown content loaded:', path);
    })
    .catch(error => {
      console.error('Error loading markdown content:', error);
    });
}

function initializeSite() {
  const savedLanguage = localStorage.getItem('language');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = savedLanguage || (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es' ? browserLang : 'en');
  changeLanguage(defaultLang);
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
      const language = option.getAttribute('data-language');
      changeLanguage(language);
    });
  });
  setupMobileMenu();
  setupAboutTabs();
  setupSmoothScrolling();
  if (window.initializeExperience) {
    window.initializeExperience();
  } else {
    document.addEventListener('moduleExperienceLoaded', function() {
      if (window.initializeExperience) {
        window.initializeExperience();
      }
    });
    setTimeout(() => {
      if (window.initializeExperience) {
        window.initializeExperience();
      } else if (window.loadExperienceContent) {
        window.loadExperienceContent();
      }
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  DarkMode.initializeDarkMode();
  initializeSite();
});

if (!window.changeLanguage) {
  window.changeLanguage = changeLanguage;
}
if (!window.updatePageContent) {
  window.updatePageContent = updatePageContent;
}
if (!window.initializeSite) {
  window.initializeSite = initializeSite;
}
      
      // Skip if it's a tab link
      if (href.startsWith('#about-') || href.startsWith('#projects-')) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const navLinks = document.getElementById('nav-links');
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// =============================================================================
// MARKDOWN CONTENT LOADING
// =============================================================================

function loadMarkdownContent(path) {
  // Add src/ prefix if not present
  if (!path.startsWith('src/')) {
    path = 'src/' + path;
  }
  
  fetch(path)
    .then(response => response.text())
    .then(text => {
      // Here you would process markdown content
      // This is a placeholder for markdown processing
      console.log('Markdown content loaded:', path);
    })
    .catch(error => {
      console.error('Error loading markdown content:', error);
    });
}

// =============================================================================
// INITIALIZATION FUNCTIONS
// =============================================================================

function initializeSite() {
  // Set up language from localStorage or browser default
  const savedLanguage = localStorage.getItem('language');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = savedLanguage || (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es' ? browserLang : 'en');
  
  // Initialize language with consolidated translations module
  changeLanguage(defaultLang);
  
  // Set up listeners for language selector buttons
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
      const language = option.getAttribute('data-language');
      changeLanguage(language);
    });
  });
  
  // Set up mobile menu
  setupMobileMenu();
  
  // Set up tabs navigation
  setupAboutTabs();
  // setupProjectTabs(); // Removed as module-projects.js handles this
  
  // Set up smooth scrolling
  setupSmoothScrolling();
  
  // Make sure the modal handlers are attached to all about-link elements
  if (window.initializeExperience) {
    window.initializeExperience();
  } else {
    // If module-curriculum.js hasn't loaded yet, wait for it
    document.addEventListener('moduleExperienceLoaded', function() {
      if (window.initializeExperience) {
        window.initializeExperience();
      }
    });
    
    // Try again after a delay as a fallback
    setTimeout(() => {
      if (window.initializeExperience) {
        window.initializeExperience();
      } else if (window.loadExperienceContent) {
        window.loadExperienceContent();
      }
    }, 500);
  }
}

// =============================================================================
// DOM CONTENT LOADED EVENT
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dark mode first
  DarkMode.initializeDarkMode();
  
  // Initialize the main site
  initializeSite();
});

// Export functions for external use
if (!window.changeLanguage) {
  window.changeLanguage = changeLanguage;
}
if (!window.updatePageContent) {
  window.updatePageContent = updatePageContent;
}
if (!window.initializeSite) {
  window.initializeSite = initializeSite;
}
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(translations[currentLanguage], key);
    if (translation) {
      if (key === 'hero.welcome') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });


