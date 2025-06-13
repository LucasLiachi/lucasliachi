/**
 * Utility functions and UI Components for Lucas Liachi's portfolio
 * Consolidated from utils.js and ui-components.js
 */

// =============================================================================
// LOGGER UTILITY
// =============================================================================

// Enhanced logging function that can be disabled in production
const Logger = {
  isEnabled: true, // Set to false in production
  
  log: function(message, data) {
    if (this.isEnabled) {
      if (data) {
        console.log(`[Portfolio] ${message}`, data);
      } else {
        console.log(`[Portfolio] ${message}`);
      }
    }
  },
  
  error: function(message, error) {
    if (this.isEnabled) {
      if (error) {
        console.error(`[Portfolio Error] ${message}`, error);
      } else {
        console.error(`[Portfolio Error] ${message}`);
      }
    }
  }
};

// =============================================================================
// ABOUT ME MODAL FUNCTIONALITY (consolidated from ui-components.js)
// =============================================================================

class AboutModal {
  constructor() {
    this.modal = document.getElementById('about-modal');
    this.modalContent = document.getElementById('about-modal-content');
    this.closeBtn = this.modal?.querySelector('.about-modal-close');
    this.isLoading = false;
    
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Bind event listeners
    this.bindEvents();
    
    // Load content immediately for better performance
    this.loadContent();
  }
  
  bindEvents() {
    // Close button
    this.closeBtn?.addEventListener('click', () => this.close());
    
    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }
  
  async loadContent() {
    if (this.isLoading || this.modalContent.innerHTML.trim()) return;
    
    this.isLoading = true;
    
    try {
      const currentLang = window.currentLanguage || 'en';
      const response = await fetch(`about/${currentLang.toUpperCase()}.md`);
      
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }
      
      const markdownContent = await response.text();
      
      // Convert markdown to HTML
      if (window.marked) {
        this.modalContent.innerHTML = window.marked.parse(markdownContent);
      } else {
        this.modalContent.innerHTML = this.simpleMarkdownParse(markdownContent);
      }
      
      this.processLinks();
      
    } catch (error) {
      Logger.error('Error loading about content:', error);
      
      const errorText = this.getTranslation('modal.about.error') || 'Error loading content';
      this.modalContent.innerHTML = `
        <div class="error-state">
          <p>${errorText}</p>
          <details>
            <summary>Technical Details</summary>
            <p>${error.message}</p>
          </details>
        </div>
      `;
    } finally {
      this.isLoading = false;
    }
  }
  
  simpleMarkdownParse(markdown) {
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>')
      .replace(/^(.+)$/gim, '<p>$1</p>')
      .replace(/^- (.+)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
  }
  
  processLinks() {
    const links = this.modalContent.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }
  
  getTranslation(key) {
    if (window.Translations) {
      return window.Translations.get(key);
    }
    return null;
  }

  open() {
    const heroBtn = document.getElementById('hero-about-btn');
    if (heroBtn && heroBtn.classList.contains('about-link') && heroBtn.getAttribute('data-path')) {
      Logger.log('Hero button is using about-link handler, not opening AboutModal');
      return;
    }
    
    if (!this.modalContent.innerHTML.trim()) {
      this.loadContent();
    }
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.closeBtn?.focus();
  }
  
  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    const aboutBtn = document.getElementById('hero-about-btn');
    aboutBtn?.focus();
  }
  
  updateLanguage() {
    this.modalContent.innerHTML = '';
    this.loadContent();
  }
}

// =============================================================================
// PROJECT CONTENT LOADER (from modules)
// =============================================================================

function loadProjectContent(path) {
  const currentLang = window.currentLanguage || 'en';
  let finalPath = path;

  // Handle language-specific paths
  if (path && path.includes('/')) {
    const parts = path.split('/');
    if (parts.length > 1 && (parts[1] === 'EN' || parts[1] === 'PT' || parts[1] === 'ES')) {
      parts[1] = currentLang.toUpperCase();
      finalPath = parts.join('/');
    }
  }

  // Try with current language first
  fetch(finalPath)
    .then(response => {
      if (!response.ok) {
        // Fallback to English
        Logger.log(`File not found in ${currentLang.toUpperCase()}, falling back to EN`);
        const parts = finalPath.split('/');
        if (parts.length > 1) {
          parts[1] = 'EN';
          return fetch(parts.join('/'));
        }
        throw new Error(`Failed to fetch ${finalPath}`);
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
        showContentModal(html, path);
      } else {
        Logger.error('Marked library not found');
      }
    })
    .catch(error => {
      Logger.error('Error loading project content:', error);
    });
}

function showContentModal(html, title) {
  // Create modal
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
  
  const contentEl = document.createElement('div');
  contentEl.classList.add('markdown-content');
  contentEl.innerHTML = html;
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(contentEl);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// =============================================================================
// EXPORTS
// =============================================================================

// Export Logger for global use
window.Logger = Logger;

// Create global AboutModal object
window.AboutModal = {
  instance: null,
  
  init() {
    if (!this.instance) {
      this.instance = new AboutModal();
      Logger.log('AboutModal initialized');
    }
    return this.instance;
  },
  
  open() {
    if (this.instance) {
      this.instance.open();
    }
  },
  
  close() {
    if (this.instance) {
      this.instance.close();
    }
  }
};

// Export loadProjectContent globally
window.loadProjectContent = loadProjectContent;

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.AboutModal.init();
  });
} else {
  window.AboutModal.init();
}

// Listen for language changes
document.addEventListener('languageChanged', () => {
  if (window.AboutModal.instance) {
    window.AboutModal.instance.updateLanguage();
  }
});
