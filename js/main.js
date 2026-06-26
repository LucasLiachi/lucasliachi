const Translations = (() => {
  const translations = {
    en: {
      navbar: {
        home: 'Home',
        about: 'About',
        career: 'Career',
        projects: 'Projects',
        certificates: 'Certificates',
        blog: 'Blog',
        library: 'Library',
        dashboard: 'Dashboard',
        search: 'Search',
        contact: 'Contact'
      },
      hero: {
        title: 'Technology Governance Specialist',
        welcome: "Hello! I'm Lucas Liachi and welcome to my professional space. Here, I share my journey through the projects I'm most proud of and the study materials that drive my knowledge. Explore my work to learn about my skills and, if you like what you see, let's connect on <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: 'Strategic alignment of IT initiatives with organizational goals',
        about: 'About me',
        resume: 'Resume',
        projects: 'Projects'
      },
      about: {
        title: 'Resume',
        career: {
          title: 'Professional Career',
          description: 'Timeline with professional experiences and achievements',
          timeline: {
            title: 'Career Timeline',
            instructions: 'Click on any experience item to see detailed information'
          }
        },
        academic: {
          title: 'Academic Profile',
          description: 'Academic background and university specializations'
        },
        certificate: {
          title: 'Certificate',
          description: 'Professional certifications and specialized training',
          search: {
            placeholder: 'Search certificates...'
          },
          sort: {
            newest: 'Newest first',
            oldest: 'Oldest first',
            nameAsc: 'Name (A-Z)',
            nameDesc: 'Name (Z-A)'
          }
        },
        readMore: 'Read More'
      },
      projects: {
        title: 'Projects',
        search: {
          placeholder: 'Search projects...'
        },
        filter: {
          placeholder: 'Filter by category',
          all: 'All Categories',
          process: 'Process',
          governance: 'Governance',
          technology: 'Technology',
          statistics: 'Statistics'
        },
        sort: {
          newest: 'Newest first',
          oldest: 'Oldest first',
          nameAsc: 'Name (A-Z)',
          nameDesc: 'Name (Z-A)'
        },
        tab: {
          process: 'Process Improvement',
          technology: 'Technology Solutions',
          statistics: 'Statistics & Analytics'
        },
        category: {
          process: 'Process Improvement',
          governance: 'Corporate Governance',
          it: 'IT Governance & Agile',
          dev: 'Software Development',
          stats: 'Applied Statistics',
          technology: 'Technology Solutions',
          statistics: 'Statistics & Analytics',
          production: 'Production Control'
        },
        categories: {
          process: 'Process Improvement',
          governance: 'Corporate Governance',
          it: 'IT Governance & Agile',
          dev: 'Software Development',
          stats: 'Applied Statistics',
          technology: 'Technology Solutions',
          statistics: 'Statistics & Analytics',
          production: 'Production Control'
        },
        viewCode: 'View Code',
        viewCertificate: 'View certificate',
        liveDemo: 'Live Demo',
        noResults: 'No results found',
        resultsFound: 'results found',
        noMatch: 'No projects match your search criteria.',
        noMatchInCategory: 'No projects match your criteria in this category.',
        readMore: 'Read More',
        github: {
          unavailable: 'GitHub repositories temporarily unavailable.',
          loading: 'Loading GitHub projects...'
        },
        viewRepo: 'View Repository',
        viewDemo: 'Live Demo',
        lastUpdated: 'Last updated',
        local: 'Local Project'
      },
      articles: {
        title: 'Blog',
        description: 'Technical articles and insights on technology, governance and data.',
        search: { placeholder: 'Search articles...' },
        filterAll: 'All',
        readTime: 'min read',
        readArticle: 'Read Article',
        loading: 'Loading articles...',
        noResults: 'No articles found.',
        error: 'Unable to load articles.',
        backToBlog: '← Back to Blog',
        publishedOn: 'Published on',
        category: 'Category',
        count: {
          singular: 'article',
          plural: 'articles'
        }
      },
      library: {
        title: 'Knowledge Library',
        description: 'Study materials, cheatsheets, formula sheets and reference guides organized by subject.',
        search: { placeholder: 'Search materials...' },
        filterAll: 'All',
        filterType: 'Type',
        filterLevel: 'Level',
        openItem: 'Open →',
        backToLibrary: '← Back to Library',
        loading: 'Loading materials...',
        noResults: 'No materials found.',
        error: 'Unable to load library.',
        updated: 'Updated',
        count: {
          singular: 'material',
          plural: 'materials'
        },
        types: {
          resumo: 'Summary',
          cheatsheet: 'Cheatsheet',
          formulas: 'Formulas',
          guia: 'Guide'
        },
        levels: {
          iniciante: 'Beginner',
          intermediario: 'Intermediate',
          avancado: 'Advanced'
        }
      },
      certificates: {
        title: 'Certificates'
      },
      modal: {
        about: {
          title: 'About me',
          close: 'Close',
          loading: 'Loading...',
          error: 'Error loading content'
        }
      },
      breadcrumb: {
        home: 'Home'
      },
      contact: {
        title: 'Contact',
        description: 'Get in touch via the platforms below.'
      },
      pages: {
        about: { title: 'About', description: 'Learn more about Lucas Liachi, his background and professional profile.', profile: { title: 'Professional Profile' }, academic: { title: 'Academic Profile', viewMaterial: 'View material' } },
        career: { title: 'Career', description: 'Professional timeline with experiences, roles and achievements.', loading: 'Loading timeline...', printResume: 'Print Resume', viewDetails: 'View details →', backToCareer: '← Back to Career', viewer: { pageTitle: 'Career Detail — Lucas Liachi', notFound: 'Career entry not found.', noContent: 'Detailed content not available.' } },
        certificate: {
          title: 'Certificates',
          description: 'Professional certifications, courses and training programs.',
          loading: 'Loading certificates...',
          noResults: 'No certificates found.',
          viewFile: 'View Certificate',
          search: { placeholder: 'Search certificates...' },
          filter: {
            all: 'All Categories',
            placeholder: 'Filter by category'
          },
          sort: {
            newest: 'Newest first',
            oldest: 'Oldest first',
            nameAsc: 'Name (A–Z)',
            nameDesc: 'Name (Z–A)'
          },
          countSingular: 'certificate',
          countPlural: 'certificates'
        },
        projects: { title: 'Projects', description: 'Portfolio of projects in process improvement, governance, data and development.' },
        blog: { title: 'Blog', description: 'Technical articles and insights on technology, governance and data.' },
        library: { title: 'Library', description: 'Study materials, cheatsheets and reference guides.' },
        dashboard: {
          title: 'Dashboard',
          description: 'Professional indicators and career metrics.',
          indicators: 'Indicators',
          chartsTitle: 'Charts',
          cards: {
            projects: 'Total Projects',
            certificates: 'Certificates',
            articles: 'Published Articles',
            experience: 'Years of Experience',
            technologies: 'Technologies Mastered',
            repos: 'Public Repositories',
            years: 'years'
          },
          charts: {
            certsByCategory: 'Certificates by Category',
            projectsByTech: 'Top Technologies in Projects'
          },
          loading: 'Loading dashboard data...',
          error: 'Unable to load some data. Showing available information.'
        },
        search: {
          title: 'Global Search',
          description: 'Search across all projects, certificates, articles and career entries.',
          placeholder: 'Search projects, certificates, articles...',
          results: 'results',
          result: 'result',
          noResults: 'No results found for your search.',
          loading: 'Loading...',
          hint: 'Type to search across the entire portfolio',
          groups: {
            projects: 'Projects',
            certificates: 'Certificates',
            articles: 'Articles',
            career: 'Career',
            library: 'Library'
          },
          viewItem: 'View'
        },
        contact: {
          title: 'Contact',
          description: 'Get in touch with me through the form or direct channels below.',
          form: {
            title: 'Send a message',
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            success: 'Message sent successfully!',
            error: 'Failed to send. Try again.'
          },
          links: {
            title: 'Direct contact'
          },
          map: {
            title: 'Location'
          }
        }
      },
      footer: {
        copyright: '© ' + new Date().getFullYear() + ' Lucas Liachi.'
      }
    },
    pt: {
      navbar: {
        home: 'Início',
        about: 'Sobre',
        career: 'Carreira',
        projects: 'Projetos',
        certificates: 'Certificações',
        blog: 'Blog',
        library: 'Biblioteca',
        dashboard: 'Dashboard',
        search: 'Busca',
        contact: 'Contato'
      },
      hero: {
        title: 'Especialista em Governança de Tecnologia',
        welcome: "Olá! Sou Lucas Liachi e seja bem-vindo(a) ao meu espaço profissional. Aqui, compartilho minha jornada através dos projetos que mais me orgulho e dos materiais de estudo que impulsionam meu conhecimento. Explore meu trabalho para conhecer minhas habilidades e, se gostar do que vir, vamos nos conectar no <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: 'Alinhamento estratégico de iniciativas de TI com objetivos organizacionais',
        about: 'Sobre mim',
        resume: 'Currículo',
        projects: 'Projetos'
      },
      about: {
        title: 'Currículo',
        career: {
          title: 'Carreira Profissional',
          description: 'Linha do tempo com experiências profissionais e conquistas',
          timeline: {
            title: 'Linha do Tempo da Carreira',
            instructions: 'Clique em qualquer experiência para ver mais detalhes'
          }
        },
        academic: {
          title: 'Formação Acadêmica',
          description: 'Formação acadêmica e especializações universitárias'
        },
        certificate: {
          title: 'Certificados',
          description: 'Certificações profissionais e treinamentos especializados',
          search: {
            placeholder: 'Pesquisar certificados...'
          },
          sort: {
            newest: 'Mais recentes',
            oldest: 'Mais antigos',
            nameAsc: 'Nome (A-Z)',
            nameDesc: 'Nome (Z-A)'
          }
        },
        readMore: 'Ler mais'
      },
      projects: {
        title: 'Projetos',
        search: {
          placeholder: 'Pesquisar projetos...'
        },
        filter: {
          placeholder: 'Filtrar por categoria',
          all: 'Todas as categorias',
          process: 'Processo',
          governance: 'Governança',
          technology: 'Tecnologia',
          statistics: 'Estatística'
        },
        sort: {
          newest: 'Mais recentes',
          oldest: 'Mais antigos',
          nameAsc: 'Nome (A-Z)',
          nameDesc: 'Nome (Z-A)'
        },
        tab: {
          process: 'Melhoria de Processos',
          technology: 'Soluções em Tecnologia',
          statistics: 'Estatística e Análise'
        },
        category: {
          process: 'Melhoria de Processos',
          governance: 'Governança Corporativa',
          it: 'Governança de TI e Ágil',
          dev: 'Desenvolvimento de Software',
          stats: 'Estatística Aplicada',
          technology: 'Soluções em Tecnologia',
          statistics: 'Estatística e Análise',
          production: 'Controle de Produção'
        },
        categories: {
          process: 'Melhoria de Processos',
          governance: 'Governança Corporativa',
          it: 'Governança de TI e Ágil',
          dev: 'Desenvolvimento de Software',
          stats: 'Estatística Aplicada',
          technology: 'Soluções em Tecnologia',
          statistics: 'Estatística e Análise',
          production: 'Controle de Produção'
        },
        viewCode: 'Ver código',
        viewCertificate: 'Ver certificado',
        liveDemo: 'Demo ao vivo',
        noResults: 'Nenhum resultado encontrado',
        resultsFound: 'resultados encontrados',
        noMatch: 'Nenhum projeto corresponde aos critérios de busca.',
        noMatchInCategory: 'Nenhum projeto corresponde aos critérios nesta categoria.',
        readMore: 'Ler mais',
        github: {
          unavailable: 'Repositórios do GitHub temporariamente indisponíveis.',
          loading: 'Carregando projetos do GitHub...'
        },
        viewRepo: 'Ver Repositório',
        viewDemo: 'Demo ao Vivo',
        lastUpdated: 'Última atualização',
        local: 'Projeto Local'
      },
      articles: {
        title: 'Blog',
        description: 'Artigos técnicos sobre tecnologia, governança e dados.',
        search: { placeholder: 'Pesquisar artigos...' },
        filterAll: 'Todos',
        readTime: 'min de leitura',
        readArticle: 'Ler Artigo',
        loading: 'Carregando artigos...',
        noResults: 'Nenhum artigo encontrado.',
        error: 'Não foi possível carregar os artigos.',
        backToBlog: '← Voltar ao Blog',
        publishedOn: 'Publicado em',
        category: 'Categoria',
        count: {
          singular: 'artigo',
          plural: 'artigos'
        }
      },
      library: {
        title: 'Biblioteca de Conhecimento',
        description: 'Materiais de estudo, cheatsheets, fórmulas e guias de referência organizados por área.',
        search: { placeholder: 'Pesquisar materiais...' },
        filterAll: 'Todos',
        filterType: 'Tipo',
        filterLevel: 'Nível',
        openItem: 'Abrir →',
        backToLibrary: '← Voltar à Biblioteca',
        loading: 'Carregando materiais...',
        noResults: 'Nenhum material encontrado.',
        error: 'Não foi possível carregar a biblioteca.',
        updated: 'Atualizado',
        count: {
          singular: 'material',
          plural: 'materiais'
        },
        types: {
          resumo: 'Resumo',
          cheatsheet: 'Cheatsheet',
          formulas: 'Fórmulas',
          guia: 'Guia'
        },
        levels: {
          iniciante: 'Iniciante',
          intermediario: 'Intermediário',
          avancado: 'Avançado'
        }
      },
      certificates: {
        title: 'Certificados'
      },
      modal: {
        about: {
          title: 'Sobre mim',
          close: 'Fechar',
          loading: 'Carregando...',
          error: 'Erro ao carregar o conteúdo'
        }
      },
      breadcrumb: {
        home: 'Início'
      },
      contact: {
        title: 'Contato',
        description: 'Entre em contato pelas plataformas abaixo.'
      },
      pages: {
        about: { title: 'Sobre', description: 'Conheça Lucas Liachi, sua trajetória e perfil profissional.', profile: { title: 'Perfil Profissional' }, academic: { title: 'Perfil Acadêmico', viewMaterial: 'Ver material' } },
        career: { title: 'Carreira', description: 'Linha do tempo profissional com experiências, cargos e conquistas.', loading: 'Carregando linha do tempo...', printResume: 'Imprimir Currículo', viewDetails: 'Ver detalhes →', backToCareer: '← Voltar à Carreira', viewer: { pageTitle: 'Career Detail — Lucas Liachi', notFound: 'Experiência não encontrada.', noContent: 'Conteúdo detalhado não disponível.' } },
        certificate: {
          title: 'Certificados',
          description: 'Certificações profissionais, cursos e treinamentos.',
          loading: 'Carregando certificados...',
          noResults: 'Nenhum certificado encontrado.',
          viewFile: 'Ver Certificado',
          search: { placeholder: 'Pesquisar certificados...' },
          filter: {
            all: 'Todas as Categorias',
            placeholder: 'Filtrar por categoria'
          },
          sort: {
            newest: 'Mais recentes',
            oldest: 'Mais antigos',
            nameAsc: 'Nome (A–Z)',
            nameDesc: 'Nome (Z–A)'
          },
          countSingular: 'certificado',
          countPlural: 'certificados'
        },
        projects: { title: 'Projetos', description: 'Portfólio de projetos em melhoria de processos, governança, dados e desenvolvimento.' },
        blog: { title: 'Blog', description: 'Artigos técnicos sobre tecnologia, governança e dados.' },
        library: { title: 'Biblioteca', description: 'Materiais de estudo, cheatsheets e guias de referência.' },
        dashboard: {
          title: 'Dashboard',
          description: 'Indicadores profissionais e métricas de carreira.',
          indicators: 'Indicadores',
          chartsTitle: 'Gráficos',
          cards: {
            projects: 'Total de Projetos',
            certificates: 'Certificados',
            articles: 'Artigos Publicados',
            experience: 'Anos de Experiência',
            technologies: 'Tecnologias Dominadas',
            repos: 'Repositórios Públicos',
            years: 'anos'
          },
          charts: {
            certsByCategory: 'Certificados por Categoria',
            projectsByTech: 'Top Tecnologias em Projetos'
          },
          loading: 'Carregando dados do dashboard...',
          error: 'Não foi possível carregar alguns dados. Exibindo informações disponíveis.'
        },
        search: {
          title: 'Busca Global',
          description: 'Pesquise em todos os projetos, certificados, artigos e experiências profissionais.',
          placeholder: 'Buscar projetos, certificados, artigos...',
          results: 'resultados',
          result: 'resultado',
          noResults: 'Nenhum resultado encontrado para a sua busca.',
          loading: 'Carregando...',
          hint: 'Digite para buscar em todo o portfólio',
          groups: {
            projects: 'Projetos',
            certificates: 'Certificados',
            articles: 'Artigos',
            career: 'Carreira',
            library: 'Biblioteca'
          },
          viewItem: 'Ver'
        },
        contact: {
          title: 'Contato',
          description: 'Entre em contato pelo formulário ou pelos canais diretos abaixo.',
          form: {
            title: 'Envie uma mensagem',
            name: 'Nome',
            email: 'E-mail',
            subject: 'Assunto',
            message: 'Mensagem',
            send: 'Enviar',
            success: 'Mensagem enviada com sucesso!',
            error: 'Erro ao enviar. Tente novamente.'
          },
          links: {
            title: 'Contato direto'
          },
          map: {
            title: 'Localização'
          }
        }
      },
      footer: {
        copyright: '© ' + new Date().getFullYear() + ' Lucas Liachi.'
      }
    },
    es: {
      navbar: {
        home: 'Inicio',
        about: 'Sobre',
        career: 'Carrera',
        projects: 'Proyectos',
        certificates: 'Certificados',
        blog: 'Blog',
        library: 'Biblioteca',
        dashboard: 'Dashboard',
        search: 'Buscar',
        contact: 'Contacto'
      },
      hero: {
        title: 'Especialista en Gobernanza de Tecnología',
        welcome: "¡Hola! Soy Lucas Liachi y bienvenido(a) a mi espacio profesional. Aquí comparto mi trayectoria a través de los proyectos de los que más me enorgullezco y del material de estudio que impulsa mi conocimiento. Explora mi trabajo para conocer mis habilidades y, si te gusta lo que ves, conéctate conmigo en <a href='https://www.linkedin.com/in/lucasliachi/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!",
        subtitle: 'Alineación estratégica de iniciativas de TI con objetivos organizacionales',
        about: 'Sobre mí',
        resume: 'Currículum',
        projects: 'Proyectos'
      },
      about: {
        title: 'Currículum',
        career: {
          title: 'Carrera Profesional',
          description: 'Línea de tiempo con experiencias profesionales y logros',
          timeline: {
            title: 'Línea de Tiempo Profesional',
            instructions: 'Haz clic en cualquier experiencia para ver información detallada'
          }
        },
        academic: {
          title: 'Formación Académica',
          description: 'Formación académica y especializaciones universitarias'
        },
        certificate: {
          title: 'Certificados',
          description: 'Certificaciones profesionales y formación especializada',
          search: {
            placeholder: 'Buscar certificados...'
          },
          sort: {
            newest: 'Más recientes',
            oldest: 'Más antiguos',
            nameAsc: 'Nombre (A-Z)',
            nameDesc: 'Nombre (Z-A)'
          }
        },
        readMore: 'Leer más'
      },
      projects: {
        title: 'Proyectos',
        search: {
          placeholder: 'Buscar proyectos...'
        },
        filter: {
          placeholder: 'Filtrar por categoría',
          all: 'Todas las categorías',
          process: 'Proceso',
          governance: 'Gobernanza',
          technology: 'Tecnología',
          statistics: 'Estadística'
        },
        sort: {
          newest: 'Más recientes',
          oldest: 'Más antiguos',
          nameAsc: 'Nombre (A-Z)',
          nameDesc: 'Nombre (Z-A)'
        },
        tab: {
          process: 'Mejora de Procesos',
          technology: 'Soluciones Tecnológicas',
          statistics: 'Estadística y Análisis'
        },
        category: {
          process: 'Mejora de Procesos',
          governance: 'Gobernanza Corporativa',
          it: 'Gobernanza de TI y Ágil',
          dev: 'Desarrollo de Software',
          stats: 'Estadística Aplicada',
          technology: 'Soluciones Tecnológicas',
          statistics: 'Estadística y Análisis',
          production: 'Control de Producción'
        },
        categories: {
          process: 'Mejora de Procesos',
          governance: 'Gobernanza Corporativa',
          it: 'Gobernanza de TI y Ágil',
          dev: 'Desarrollo de Software',
          stats: 'Estadística Aplicada',
          technology: 'Soluciones Tecnológicas',
          statistics: 'Estadística y Análisis',
          production: 'Control de Producción'
        },
        viewCode: 'Ver código',
        viewCertificate: 'Ver certificado',
        liveDemo: 'Demo en vivo',
        noResults: 'No se encontraron resultados',
        resultsFound: 'resultados encontrados',
        noMatch: 'Ningún proyecto coincide con los criterios de búsqueda.',
        noMatchInCategory: 'Ningún proyecto coincide con los criterios de esta categoría.',
        readMore: 'Leer más',
        github: {
          unavailable: 'Repositorios de GitHub temporalmente no disponibles.',
          loading: 'Cargando proyectos de GitHub...'
        },
        viewRepo: 'Ver Repositorio',
        viewDemo: 'Demo en Vivo',
        lastUpdated: 'Última actualización',
        local: 'Proyecto Local'
      },
      articles: {
        title: 'Blog',
        description: 'Artículos técnicos sobre tecnología, gobernanza y datos.',
        search: { placeholder: 'Buscar artículos...' },
        filterAll: 'Todos',
        readTime: 'min de lectura',
        readArticle: 'Leer Artículo',
        loading: 'Cargando artículos...',
        noResults: 'No se encontraron artículos.',
        error: 'No se pudieron cargar los artículos.',
        backToBlog: '← Volver al Blog',
        publishedOn: 'Publicado el',
        category: 'Categoría',
        count: {
          singular: 'artículo',
          plural: 'artículos'
        }
      },
      library: {
        title: 'Biblioteca de Conocimiento',
        description: 'Materiales de estudio, cheatsheets, fórmulas y guías de referencia organizados por área.',
        search: { placeholder: 'Buscar materiales...' },
        filterAll: 'Todos',
        filterType: 'Tipo',
        filterLevel: 'Nivel',
        openItem: 'Abrir →',
        backToLibrary: '← Volver a la Biblioteca',
        loading: 'Cargando materiales...',
        noResults: 'No se encontraron materiales.',
        error: 'No se pudo cargar la biblioteca.',
        updated: 'Actualizado',
        count: {
          singular: 'material',
          plural: 'materiales'
        },
        types: {
          resumo: 'Resumen',
          cheatsheet: 'Cheatsheet',
          formulas: 'Fórmulas',
          guia: 'Guía'
        },
        levels: {
          iniciante: 'Principiante',
          intermediario: 'Intermedio',
          avancado: 'Avanzado'
        }
      },
      certificates: {
        title: 'Certificados'
      },
      modal: {
        about: {
          title: 'Sobre mí',
          close: 'Cerrar',
          loading: 'Cargando...',
          error: 'Error al cargar el contenido'
        }
      },
      breadcrumb: {
        home: 'Inicio'
      },
      contact: {
        title: 'Contacto',
        description: 'Contáctame a través de las plataformas a continuación.'
      },
      pages: {
        about: { title: 'Sobre', description: 'Conoce a Lucas Liachi, su trayectoria y perfil profesional.', profile: { title: 'Perfil Profesional' }, academic: { title: 'Perfil Académico', viewMaterial: 'Ver material' } },
        career: { title: 'Carrera', description: 'Línea de tiempo profesional con experiencias, cargos y logros.', loading: 'Cargando línea de tiempo...', printResume: 'Imprimir Currículum', viewDetails: 'Ver detalles →', backToCareer: '← Volver a Carrera', viewer: { pageTitle: 'Career Detail — Lucas Liachi', notFound: 'Experiencia no encontrada.', noContent: 'Contenido detallado no disponible.' } },
        certificate: {
          title: 'Certificados',
          description: 'Certificaciones profesionales, cursos y programas de formación.',
          loading: 'Cargando certificados...',
          noResults: 'No se encontraron certificados.',
          viewFile: 'Ver Certificado',
          search: { placeholder: 'Buscar certificados...' },
          filter: {
            all: 'Todas las Categorías',
            placeholder: 'Filtrar por categoría'
          },
          sort: {
            newest: 'Más recientes',
            oldest: 'Más antiguos',
            nameAsc: 'Nombre (A–Z)',
            nameDesc: 'Nombre (Z–A)'
          },
          countSingular: 'certificado',
          countPlural: 'certificados'
        },
        projects: { title: 'Proyectos', description: 'Portafolio de proyectos en mejora de procesos, gobernanza, datos y desarrollo.' },
        blog: { title: 'Blog', description: 'Artículos técnicos sobre tecnología, gobernanza y datos.' },
        library: { title: 'Biblioteca', description: 'Materiales de estudio, cheatsheets y guías de referencia.' },
        dashboard: {
          title: 'Dashboard',
          description: 'Indicadores profesionales y métricas de carrera.',
          indicators: 'Indicadores',
          chartsTitle: 'Gráficos',
          cards: {
            projects: 'Total de Proyectos',
            certificates: 'Certificados',
            articles: 'Artículos Publicados',
            experience: 'Años de Experiencia',
            technologies: 'Tecnologías Dominadas',
            repos: 'Repositorios Públicos',
            years: 'años'
          },
          charts: {
            certsByCategory: 'Certificados por Categoría',
            projectsByTech: 'Top Tecnologías en Proyectos'
          },
          loading: 'Cargando datos del dashboard...',
          error: 'No se pudieron cargar algunos datos. Mostrando información disponible.'
        },
        search: {
          title: 'Búsqueda Global',
          description: 'Busca en todos los proyectos, certificados, artículos y experiencias profesionales.',
          placeholder: 'Buscar proyectos, certificados, artículos...',
          results: 'resultados',
          result: 'resultado',
          noResults: 'No se encontraron resultados para tu búsqueda.',
          loading: 'Cargando...',
          hint: 'Escribe para buscar en todo el portafolio',
          groups: {
            projects: 'Proyectos',
            certificates: 'Certificados',
            articles: 'Artículos',
            career: 'Carrera',
            library: 'Biblioteca'
          },
          viewItem: 'Ver'
        },
        contact: {
          title: 'Contacto',
          description: 'Ponte en contacto a través del formulario o los canales directos a continuación.',
          form: {
            title: 'Enviar un mensaje',
            name: 'Nombre',
            email: 'Correo electrónico',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar',
            success: '¡Mensaje enviado con éxito!',
            error: 'Error al enviar. Inténtalo de nuevo.'
          },
          links: {
            title: 'Contacto directo'
          },
          map: {
            title: 'Ubicación'
          }
        }
      },
      footer: {
        copyright: '© ' + new Date().getFullYear() + ' Lucas Liachi.'
      }
    }
  };

  function normalizeLanguage(language) {
    const normalized = String(language || 'en').toLowerCase();
    return Object.prototype.hasOwnProperty.call(translations, normalized) ? normalized : 'en';
  }

  function getNestedTranslation(source, key) {
    if (!source || !key) {
      return null;
    }

    const value = key.split('.').reduce((accumulator, segment) => {
      if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, segment)) {
        return accumulator[segment];
      }
      return undefined;
    }, source);

    if (value !== undefined) {
      return value;
    }

    if (key.startsWith('projects.category.')) {
      const categoryKey = key.replace('projects.category.', '');
      return source.projects?.categories?.[categoryKey] ?? source.projects?.category?.[categoryKey] ?? null;
    }

    return null;
  }

  return {
    all: translations,
    get(key, language = getCurrentLanguage()) {
      const normalizedLanguage = normalizeLanguage(language);
      const localizedValue = getNestedTranslation(translations[normalizedLanguage], key);
      if (localizedValue !== null && localizedValue !== undefined) {
        return localizedValue;
      }
      return getNestedTranslation(translations.en, key) ?? key;
    }
  };
})();

window.Translations = Translations;

const SUPPORTED_LANGUAGES = new Set(['en', 'pt', 'es']);

function normalizeLanguage(language) {
  const normalized = String(language || 'en').toLowerCase();
  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : 'en';
}

function getCurrentLanguage() {
  return normalizeLanguage(window.currentLanguage || localStorage.getItem('language') || 'en');
}

window.currentLanguage = getCurrentLanguage();

function resolveLocalizedPath(path, language = getCurrentLanguage()) {
  if (!path) {
    return path;
  }

  const normalizedLanguage = normalizeLanguage(language).toUpperCase();
  return path.replace(/(^|\/)(EN|PT|ES)(?=\/|\.md|$)/gi, `$1${normalizedLanguage}`);
}

function updateLocalizedLinks(language) {
  const localizedLanguage = normalizeLanguage(language);
  document.querySelectorAll('.about-link[data-path]').forEach(link => {
    const basePath = link.dataset.basePath || link.getAttribute('data-path');
    if (!link.dataset.basePath && basePath) {
      link.dataset.basePath = basePath;
    }

    if (basePath) {
      link.setAttribute('data-path', resolveLocalizedPath(link.dataset.basePath || basePath, localizedLanguage));
    }
  });
}

function applyLanguageToDocument(language) {
  const normalizedLanguage = normalizeLanguage(language);
  const locale = normalizedLanguage === 'pt' ? 'pt-BR' : normalizedLanguage === 'es' ? 'es-ES' : 'en';
  document.documentElement.lang = locale;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = Translations.get(key, normalizedLanguage);
    if (translation !== null && translation !== undefined) {
      element.innerHTML = translation;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = Translations.get(key, normalizedLanguage);
    if (translation !== null && translation !== undefined) {
      element.setAttribute('placeholder', translation);
      element.setAttribute('aria-label', translation);
      element.setAttribute('title', translation);
    }
  });

  document.querySelectorAll('.language-option').forEach(option => {
    const isActive = option.dataset.language === normalizedLanguage;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-pressed', String(isActive));
  });

  updateLocalizedLinks(normalizedLanguage);
}

function openAboutModal() {
  if (window.AboutModal?.init && !window.AboutModal.instance) {
    window.AboutModal.init();
  }

  if (window.AboutModal?.open) {
    window.AboutModal.open();
    return;
  }

  const heroAboutBtn = document.getElementById('hero-about-btn');
  const path = heroAboutBtn?.getAttribute('data-path');
  if (window.loadProjectContent && path) {
    window.loadProjectContent(path);
  }
}

function setupLanguageButtons() {
  document.querySelectorAll('.language-option').forEach(option => {
    if (option.dataset.bound === 'true') {
      return;
    }

    option.dataset.bound = 'true';
    option.addEventListener('click', () => {
      changeLanguage(option.getAttribute('data-language'));
    });
  });
}

function setupMobileMenu() {
  const toggleButton = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggleButton || !nav || toggleButton.dataset.bound === 'true') {
    return;
  }

  toggleButton.dataset.bound = 'true';
  const navLinks = Array.from(nav.querySelectorAll('a'));

  const closeMenu = () => {
    nav.classList.remove('active');
    toggleButton.classList.remove('active');
    toggleButton.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggleButton.focus();
  };

  const openMenu = () => {
    nav.classList.add('active');
    toggleButton.classList.add('active');
    toggleButton.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    navLinks[0]?.focus();
  };

  nav.setAttribute('aria-hidden', 'true');

  toggleButton.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMenu();
    }
  }, { passive: true });
}

function setupAboutTabs() {
  document.querySelectorAll('.category-tab').forEach(tab => {
    if (tab.dataset.bound === 'true') {
      return;
    }

    tab.dataset.bound = 'true';
    tab.addEventListener('click', event => {
      event.preventDefault();
      const targetCategory = tab.getAttribute('data-category');

      document.querySelectorAll('.category-tab').forEach(otherTab => {
        otherTab.classList.remove('active');
      });

      document.querySelectorAll('.about-category').forEach(category => {
        category.classList.remove('active-content');
      });

      tab.classList.add('active');
      const activeContent = document.getElementById(`about-${targetCategory}`);
      if (activeContent) {
        activeContent.classList.add('active-content');
      }
    });
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.dataset.bound === 'true') {
      return;
    }

    link.dataset.bound = 'true';
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nav = document.getElementById('main-nav');
      const toggleButton = document.getElementById('mobile-menu-toggle');
      nav?.classList.remove('active');
      toggleButton?.classList.remove('active');
      toggleButton?.setAttribute('aria-expanded', 'false');
      nav?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function bindHeroAboutButton() {
  const heroAboutBtn = document.getElementById('hero-about-btn');
  if (!heroAboutBtn || heroAboutBtn.dataset.bound === 'true') {
    return;
  }

  heroAboutBtn.dataset.bound = 'true';
  heroAboutBtn.addEventListener('click', event => {
    event.preventDefault();
    openAboutModal();
  });
}

function changeLanguage(language) {
  const normalizedLanguage = normalizeLanguage(language);
  window.currentLanguage = normalizedLanguage;
  localStorage.setItem('language', normalizedLanguage);

  applyLanguageToDocument(normalizedLanguage);
  bindHeroAboutButton();

  document.dispatchEvent(new CustomEvent('languageChanged', {
    detail: { language: normalizedLanguage }
  }));
}

function updatePageContent(language = getCurrentLanguage()) {
  window.currentLanguage = normalizeLanguage(language);
  applyLanguageToDocument(window.currentLanguage);
}

function initializeSite() {
  const savedLanguage = getCurrentLanguage();
  window.currentLanguage = savedLanguage;

  setupLanguageButtons();
  setupMobileMenu();
  setupAboutTabs();
  setupSmoothScrolling();
  bindHeroAboutButton();
  updatePageContent(savedLanguage);

  if (window.initializeExperience) {
    window.initializeExperience();
  } else {
    document.addEventListener('moduleExperienceLoaded', () => {
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

document.addEventListener('DOMContentLoaded', () => {
  if (window.DarkMode?.initializeDarkMode) {
    window.DarkMode.initializeDarkMode();
  }

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
if (!window.resolveLocalizedPath) {
  window.resolveLocalizedPath = resolveLocalizedPath;
}
if (!window.getCurrentLanguage) {
  window.getCurrentLanguage = getCurrentLanguage;
}
