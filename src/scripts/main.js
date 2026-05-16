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
        *** End Patch
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
    const key = element.getAttribute('data-i18n');

    const translation = getNestedTranslation(translations[currentLanguage], key);

