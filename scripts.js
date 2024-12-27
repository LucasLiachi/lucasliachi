document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('#sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    document.addEventListener('click', function(e) {
        if (sidebar && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    const menuItems = document.querySelectorAll('.has-submenu > a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('expanded');
        });
    });

    const userLang = navigator.language.split('-')[0];
    if (!window.location.pathname.includes(`/${userLang}/`)) {
        const supportedLangs = ['pt', 'en', 'es'];
        const defaultLang = supportedLangs.includes(userLang) ? userLang : 'pt';
        window.location.pathname = `/${defaultLang}${window.location.pathname}`;
    }

    const menuConfig = {
        pt: {
            items: [
                { title: 'Sobre', url: 'content/pt/about.md' },
                { title: 'Carreira Profissional', url: 'content/pt/about/career.md' },
                { title: 'Formações e Cursos', url: 'content/pt/about/academic.md' },
                { title: 'Áreas de conhecimento', url: 'content/pt/areas.md' },
                { title: 'Processos', url: 'content/pt/repository/process/process.md' },
                { title: 'Governança Corporativa', url: 'content/pt/repository/governance-corp/governance-corp.md' },
                { title: 'Governança de TI', url: 'content/pt/repository/governance-it/governance-it.md' },
                { title: 'Desenvolvimento', url: 'content/pt/repository/development/development.md' },
                { title: 'Estatística', url: 'content/pt/repository/statistics/statistics.md' }
            ]
        },
        en: {
            items: [
                { title: 'About', url: 'content/en/about.md' },
                { title: 'Professional Career', url: 'content/en/about/career.md' },
                { title: 'Education and Courses', url: 'content/en/about/academic.md' },
                { title: 'Knowledge Areas', url: 'content/en/areas.md' },
                { title: 'Processes', url: 'content/en/repository/process/process.md' },
                { title: 'Corporate Governance', url: 'content/en/repository/governance-corp/governance-corp.md' },
                { title: 'IT Governance', url: 'content/en/repository/governance-it/governance-it.md' },
                { title: 'Development', url: 'content/en/repository/development/development.md' },
                { title: 'Statistics', url: 'content/en/repository/statistics/statistics.md' }
            ]
        },
        es: {
            items: [
                { title: 'Acerca de', url: 'content/es/about.md' },
                { title: 'Carrera Profesional', url: 'content/es/about/career.md' },
                { title: 'Formación y Cursos', url: 'content/es/about/academic.md' },
                { title: 'Áreas de Conocimiento', url: 'content/es/areas.md' },
                { title: 'Procesos', url: 'content/es/repository/process/process.md' },
                { title: 'Gobernanza Corporativa', url: 'content/es/repository/governance-corp/governance-corp.md' },
                { title: 'Gobernanza de TI', url: 'content/es/repository/governance-it/governance-it.md' },
                { title: 'Desarrollo', url: 'content/es/repository/development/development.md' },
                { title: 'Estadística', url: 'content/es/repository/statistics/statistics.md' }
            ]
        }
    };

    const currentLang = 'pt';

    function loadMenu(lang) {
        const menuEl = document.getElementById('menu');
        menuEl.innerHTML = menuConfig[lang].items.map(item => 
            `<li><a href="#" data-url="${item.url}">${item.title}</a></li>`
        ).join('');

        menuEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = e.target.getAttribute('data-url');
                loadContent(url);
            });
        });
    }

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(text => {
                const html = marked.parse(text);
                document.getElementById('content').innerHTML = html;
                history.pushState(null, '', `#${url}`);
            })
            .catch(error => {
                document.getElementById('content').innerHTML = '<p>Conteúdo não encontrado.</p>';
                console.error('Erro ao carregar conteúdo:', error);
            });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.lang-button').forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                currentLang = lang;
                document.documentElement.lang = lang;
                document.querySelectorAll('.lang-button').forEach(btn => 
                    btn.classList.toggle('active', btn === button));
                loadMenu(lang);
                loadContent(`content/${lang}/about.md`);
            });
        });

        loadMenu(currentLang);
        loadContent(`content/${currentLang}/about.md`);
    });

    // Language configuration
    const translations = {
        en: {
            search: 'Search...',
            menu: {
                home: 'Home',
                processes: 'Processes',
                governance: 'Governance',
                resources: 'Resources',
                contact: 'Contact'
            },
            content: {
                about: 'Professional with experience in process management and organizational governance.',
                processes: 'End-to-end process analysis and optimization.',
                governance: 'Implementation of governance practices.',
                development: 'Software development projects.'
            }
        },
        es: {
            search: 'Buscar...',
            menu: {
                home: 'Inicio',
                processes: 'Procesos',
                governance: 'Gobernanza',
                resources: 'Recursos',
                contact: 'Contacto'
            },
            content: {
                about: 'Profesional con experiencia en gestión de procesos y gobernanza organizacional.',
                processes: 'Análisis y optimización de procesos de extremo a extremo.',
                governance: 'Implementación de prácticas de gobernanza.',
                development: 'Proyectos de desarrollo de software.'
            }
        },
        pt: {
            search: 'Pesquisar...',
            menu: {
                home: 'Início',
                processes: 'Processos',
                governance: 'Governança',
                resources: 'Recursos',
                contact: 'Contato'
            },
            content: {
                about: 'Profissional com experiência em gerenciamento de processos e governança organizacional.',
                processes: 'Análise e otimização de processos ponta a ponta.',
                governance: 'Implementação de práticas de governança.',
                development: 'Projetos de desenvolvimento de software.'
            }
        }
    };

    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update content
        updatePageContent(lang);
        
        // Update active state of language buttons
        document.querySelectorAll('.lang-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update search placeholder
        document.querySelector('#search').placeholder = translations[lang].search;

        // Update menu items
        document.querySelectorAll('.nav-links a').forEach(link => {
            const key = link.getAttribute('data-key');
            if (key && translations[lang].menu[key]) {
                link.textContent = translations[lang].menu[key];
            }
        });

        // Update main content
        updateMainContent(lang);
    }

    function updateMainContent(lang) {
        const aboutSection = document.querySelector('#sobre p');
        const processCard = document.querySelector('.card:nth-child(1) p');
        const governanceCard = document.querySelector('.card:nth-child(2) p');
        const developmentCard = document.querySelector('.card:nth-child(3) p');

        aboutSection.textContent = translations[lang].content.about;
        processCard.textContent = translations[lang].content.processes;
        governanceCard.textContent = translations[lang].content.governance;
        developmentCard.textContent = translations[lang].content.development;
    }

    // Add language button event listeners
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Initialize with default language
    switchLanguage(currentLang);
});

// Inicializa o Mermaid
mermaid.initialize({ startOnLoad: false });

// Lista de arquivos Markdown para indexação
let markdownPaths = [
    'content/sobre.md',
    'content/areas.md',
    'content/repository/process/process.md',
    'content/repository/governance-corp/governance-corp.md',
    'content/repository/governance-it/governance-it.md',
    'content/repository/development/development.md',
    'content/repository/statistics/statistics.md'
];

// Índice de busca
let searchIndex = [];

// Função para construir o índice de busca
function buildSearchIndex() {
    const promises = markdownFiles.map(file => {
        return fetch(file)
            .then(response => response.text())
            .then(text => {
                searchIndex.push({
                    file: file,
                    content: text.toLowerCase(),
                    title: extractTitle(text),
                    rawContent: text
                });
            });
    });
    return Promise.all(promises);
}

// Extrai o título do conteúdo Markdown
function extractTitle(markdownContent) {
    const titleMatch = markdownContent.match(/^#\s+(.*)$/m);
    return titleMatch ? titleMatch[1] : 'Sem Título';
}

// Função para carregar um arquivo Markdown
function loadMarkdown(file) {
    const currentLang = document.documentElement.lang || 'pt';
    const langPath = `/${currentLang}`;
    const fullPath = file.startsWith(langPath) ? file : `${langPath}${file}`;
    
    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Arquivo não encontrado');
            }
            return response.text();
        })
        .then(text => {
            const html = marked.parse(text);
            document.getElementById('content').innerHTML = generateBreadcrumbs(file) + html;
            mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
            highlightCodeBlocks();
            addContentLinkListeners();
            updateActiveMenuItem(file);
            // Limpa a busca quando um novo conteúdo é carregado
            document.getElementById('search').value = '';
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Conteúdo não encontrado.</p>';
            console.error('Erro ao carregar o arquivo Markdown:', error);
        });
}

// Adiciona ouvintes aos links internos no conteúdo
function addContentLinkListeners() {
    const links = document.querySelectorAll('#content a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.md')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loadMarkdown(href); // Usa diretamente o href sem adicionar 'content/'
                history.pushState(null, '', '#' + href);
            });
        }
    });
}

// Adiciona ouvintes aos links no menu lateral
function addSidebarLinkListeners() {
    const links = document.querySelectorAll('#sidebar a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.md')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loadMarkdown(href); // Usa diretamente o href sem adicionar 'content/'
                history.pushState(null, '', '#' + href); // Atualiza a URL com o novo hash
            });
        }
    });
}

// Carrega o arquivo Markdown baseado no hash da URL
function loadContentFromHash() {
    const hash = window.location.hash.substring(1); // Remove o '#' do início
    if (hash) {
        loadMarkdown(hash); // Usa diretamente o hash como caminho do arquivo
    } else {
        // Se não houver hash, carrega um arquivo padrão (por exemplo, 'sobre.md')
        loadMarkdown('content/sobre.md');
    }
}

// Função para destacar blocos de código
function highlightCodeBlocks() {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

// Função para gerar breadcrumbs (caminho de navegação)
function generateBreadcrumbs(file) {
    const parts = file.replace('content/', '').replace('.md', '').split('/');
    let breadcrumbs = '';
    parts.forEach((part, index) => {
        breadcrumbs += `<span>${part}</span>`;
        if (index < parts.length - 1) breadcrumbs += ' > ';
    });
    return breadcrumbs;
}

// Exibe os resultados da busca
function displaySearchResults(results) {
    const contentDiv = document.getElementById('content');
    if (results.length > 0) {
        let html = '<ul>';
        results.forEach(result => {
            html += `<li><a href="#${result.file}">${result.title}</a></li>`;
        });
        html += '</ul>';
        contentDiv.innerHTML = html;
        addContentLinkListeners(); // Adiciona ouvintes aos links dos resultados da busca
    } else {
        contentDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

// Implementação da busca
function implementSearch() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            const results = searchIndex.filter(item => item.content.includes(query));
            displaySearchResults(results);
        } else if (query.length === 0) {
            loadContentFromHash();
        }
    });
}

// Inicialização da aplicação
window.addEventListener('load', () => {
    buildSearchIndex().then(() => {
        addSidebarLinkListeners();
        implementSearch();
        loadContentFromHash();
    });
});

// Suporte à navegação pelo histórico do navegador (botões voltar/avançar)
window.addEventListener('popstate', loadContentFromHash);

// Adicionar após loadMarkdown()
function updateActiveMenuItem(file) {
    document.querySelectorAll('#menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === file) {
            link.classList.add('active');
        }
    });
}

// Variável global de idioma
let currentLang = 'en';
// Configuração do Mermaid
// Configurações e traduções
const translations = {
    en: {
        // ...existing translations object...
    },
    es: {
        // ...existing translations object...
    },
    pt: {
        // ...existing translations object...
    }
};

// Lista de arquivos Markdown para indexação
const markdownFiles = [
    'content/sobre.md',
    'content/areas.md',
    'content/repository/process/process.md',
    'content/repository/governance-corp/governance-corp.md',
    'content/repository/governance-it/governance-it.md',
    'content/repository/development/development.md',
    'content/repository/statistics/statistics.md'
];

// Funções principais
function buildSearchIndex() {
    return Promise.all(markdownFiles.map(file => 
        fetch(file)
            .then(response => response.text())
            .then(text => {
                searchIndex.push({
                    file: file,
                    content: text.toLowerCase(),
                    title: extractTitle(text),
                    rawContent: text
                });
            })
    ));
}

function loadMarkdown(file) {
    const langPath = `/${currentLang}`;
    const fullPath = file.startsWith(langPath) ? file : `${langPath}${file}`;
    
    fetch(fullPath)
        .then(response => {
            if (!response.ok) throw new Error('Arquivo não encontrado');
            return response.text();
        })
        .then(text => {
            const html = marked.parse(text);
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = generateBreadcrumbs(file) + html;
            
            // Inicializar componentes
            mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
            highlightCodeBlocks();
            addContentLinkListeners();
            updateActiveMenuItem(file);
            
            // Limpar busca
            document.getElementById('search').value = '';
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo Markdown:', error);
            document.getElementById('content').innerHTML = '<p>Conteúdo não encontrado.</p>';
        });
}

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Atualizar traduções
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[lang]);
        if (translation) element.textContent = translation;
    });
    
    // Atualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = translations[lang][key];
        if (translation) element.placeholder = translation;
    });

    // Atualizar estado dos botões de idioma
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Recarregar conteúdo atual
    const currentPath = window.location.hash.substring(1) || 'content/sobre.md';
    loadMarkdown(currentPath);
}

// Funções auxiliares
function extractTitle(markdownContent) {
    const titleMatch = markdownContent.match(/^#\s+(.*)$/m);
    return titleMatch ? titleMatch[1] : 'Sem Título';
}

function generateBreadcrumbs(file) {
    const parts = file.replace('content/', '').replace('.md', '').split('/');
    return parts.map((part, index) => 
        `<span>${part}</span>${index < parts.length - 1 ? ' > ' : ''}`
    ).join('');
}

function highlightCodeBlocks() {
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
}

function updateActiveMenuItem(file) {
    document.querySelectorAll('#menu a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === file);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar busca
    buildSearchIndex().then(() => {
        implementSearch();
        loadContentFromHash();
    });

    // Configurar listeners de idioma
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => {
            switchLanguage(button.dataset.lang);
        });
    });

    // Configurar listener de navegação
    window.addEventListener('popstate', loadContentFromHash);
});

// Inicializar com idioma padrão
switchLanguage(currentLang);

// Menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    // Update ARIA attributes
    const isExpanded = navLinks.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});