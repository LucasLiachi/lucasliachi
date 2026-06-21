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
// DARK MODE CONTROLLER
// =============================================================================

const DarkMode = (() => {
  const STORAGE_KEY = 'theme';
  const DARK_CLASS = 'dark';
  let mediaQuery = null;
  let bound = false;

  function getStoredTheme() {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  }

  function getSystemTheme() {
    if (!window.matchMedia) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getPreferredTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function applyTheme(theme, persist = true) {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.toggle(DARK_CLASS, normalizedTheme === 'dark');
    document.documentElement.style.colorScheme = normalizedTheme;

    if (persist) {
      localStorage.setItem(STORAGE_KEY, normalizedTheme);
    }

    updateThemeButtons(normalizedTheme);
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: normalizedTheme }
    }));
  }

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains(DARK_CLASS) ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  }

  function bindToggleButton() {
    const button = document.getElementById('dark-mode-toggle');
    if (!button || button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';
    button.addEventListener('click', toggleTheme);
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
      }
    });
  }

  function watchSystemPreference() {
    if (!window.matchMedia) {
      return;
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = event => {
      if (getStoredTheme()) {
        return;
      }

      applyTheme(event.matches ? 'dark' : 'light', false);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
    }
  }

  function initializeDarkMode() {
    applyTheme(getPreferredTheme(), false);
    bindToggleButton();
    watchSystemPreference();
  }

  return {
    initializeDarkMode,
    applyTheme,
    toggleTheme
  };
})();

window.DarkMode = DarkMode;

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
    
    // Escape key to close and Tab trapping
    this._boundHandleKeyDown = (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        e.preventDefault();
        this.close();
        return;
      }

      if (e.key === 'Tab' && this.modal.classList.contains('active')) {
        this.maintainFocus(e);
      }
    };

    document.addEventListener('keydown', this._boundHandleKeyDown);

    // Ensure focus doesn't leave modal via focusin events (for screen readers)
    this._boundFocusIn = (e) => {
      if (!this.modal.contains(e.target) && this.modal.classList.contains('active')) {
        e.stopPropagation();
        this.focusFirstElement();
      }
    };
    document.addEventListener('focusin', this._boundFocusIn);
  }
  
  async loadContent() {
    if (this.isLoading || this.modalContent.innerHTML.trim()) return;
    
    this.isLoading = true;
    
    try {
      const currentLang = window.currentLanguage || 'en';
      const response = await fetch(`pages/about/${currentLang.toUpperCase()}.md`);
      
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
      
      // Update modal title and close label for accessibility
      const titleEl = this.modal.querySelector('#about-modal-title');
      const translatedTitle = this.getTranslation('modal.about.title') || titleEl?.textContent || 'About';
      if (titleEl) titleEl.textContent = translatedTitle;
      const closeLabel = this.getTranslation('modal.about.close') || 'Close';
      this.closeBtn?.setAttribute('aria-label', closeLabel + ' about dialog');

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

  getFocusableElements() {
    if (!this.modal) return [];
    const selectors = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    return Array.from(this.modal.querySelectorAll(selectors)).filter(el => el.offsetWidth || el.offsetHeight || el === document.activeElement);
  }

  focusFirstElement() {
    const elems = this.getFocusableElements();
    if (elems.length) {
      elems[0].focus();
      return true;
    }
    this.modalContent?.focus();
    return false;
  }

  maintainFocus(e) {
    const focusable = this.getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
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
    const path = heroBtn?.getAttribute('data-path');

    // If modal markup is NOT present, fall back to the generic loader which
    // creates its own modal element. Otherwise prefer using the existing
    // `#about-modal` so we keep consistent styling, animations and focus
    // management.
    if ((!this.modal || !this.modalContent) && heroBtn && heroBtn.classList.contains('about-link') && path && window.loadProjectContent) {
      Logger.log('AboutModal markup not found — delegating to loadProjectContent');
      window.loadProjectContent(path);
      return;
    }

    if (!this.modalContent.innerHTML.trim()) {
      this.loadContent();
    }

    // Save currently focused element to restore focus later
    this._previouslyFocused = document.activeElement;

    // Mark main content as inert/hidden to assist assistive tech
    const mainNodes = document.querySelectorAll('body > header, body > main, body > footer');
    mainNodes.forEach(node => {
      try {
        if ('inert' in HTMLElement.prototype) node.inert = true;
        node.setAttribute('aria-hidden', 'true');
      } catch (e) {
        node.setAttribute('aria-hidden', 'true');
      }
    });

    this.modal.setAttribute('aria-hidden', 'false');
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Move focus into modal
    setTimeout(() => this.focusFirstElement(), 50);
  }
  
  close() {
    // Play closing animation if available, then remove active
    const handleAnimationEnd = () => {
      this.modal.classList.remove('active');
      this.modal.classList.remove('closing');
      this.modal.removeEventListener('animationend', handleAnimationEnd);

      // Restore main nodes
      const mainNodes = document.querySelectorAll('body > header, body > main, body > footer');
      mainNodes.forEach(node => {
        try {
          if ('inert' in HTMLElement.prototype) node.inert = false;
          node.removeAttribute('aria-hidden');
        } catch (e) {
          node.removeAttribute('aria-hidden');
        }
      });

      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Remove focus handlers
      if (this._boundHandleKeyDown) document.removeEventListener('keydown', this._boundHandleKeyDown);
      if (this._boundFocusIn) document.removeEventListener('focusin', this._boundFocusIn);

      // Restore focus
      try {
        (this._previouslyFocused || document.getElementById('hero-about-btn'))?.focus();
      } catch (e) {
        // ignore
      }
    };

    this.modal.classList.add('closing');
    this.modal.addEventListener('animationend', handleAnimationEnd);
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

  // Try a sequence of candidate paths and pick the first that responds OK
  const tryPaths = async (candidates) => {
    for (const p of candidates) {
      try {
        const resp = await fetch(p);
        if (resp.ok) return resp;
      } catch (e) {
        // continue
      }
    }
    return null;
  };

  (async () => {
    const candidates = [];
    candidates.push(finalPath);

    // language fallback
    if (finalPath && finalPath.includes('/')) {
      const parts = finalPath.split('/');
      if (parts.length > 1 && (parts[1] === 'EN' || parts[1] === 'PT' || parts[1] === 'ES')) {
        parts[1] = currentLang.toUpperCase();
        candidates.unshift(parts.join('/'));
        parts[1] = 'EN';
        candidates.push(parts.join('/'));
      }
    }

    // If path looks like a directory or ends without .md, try index/readme variants
    if (!finalPath.endsWith('.md')) {
      const normalized = finalPath.replace(/\\/g, '/').replace(/\/$/, '');
      candidates.push(`${normalized}/index.md`);
      candidates.push(`${normalized}/README.md`);
    }

    // Ensure uniqueness
    const uniq = [...new Set(candidates)];
    const response = await tryPaths(uniq);

    if (!response) {
      Logger.error('Error loading project content: no candidate paths succeeded', uniq);
      return;
    }

    try {
      const text = await response.text();
      if (window.marked) {
        const html = window.marked.parse(text);

        // Try to match the Attachment/Anexo key in markdown
        const attachmentMatch = String(text || '').match(/^[-*]\s+(Attachment|Anexo):\s+(.+)$/mi);
        const attachmentPath = attachmentMatch ? attachmentMatch[2].trim() : null;

        // Do not hijack AboutModal to prevent replacing the "About Me" content
        try {
          const titleMatch = String(text || '').match(/^#\s+(.+)$/m);
          const modalTitle = titleMatch ? titleMatch[1].trim() : null;
          showContentModal(html, modalTitle || path, attachmentPath);
        } catch (e) {
          Logger.error('Failed to open generic modal with project content', e);
        }
      } else {
        Logger.error('Marked library not found');
      }
    } catch (err) {
      Logger.error('Error processing project content:', err);
    }
  })();
}

function showContentModal(html, title, attachmentPath) {
  // Create modal
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
  
  const contentEl = document.createElement('div');
  contentEl.classList.add('markdown-content');

  const textEl = document.createElement('div');
  textEl.innerHTML = html;
  contentEl.appendChild(textEl);

  if (attachmentPath) {
    const isPdf = attachmentPath.toLowerCase().endsWith('.pdf');
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('modal-media-container');
    
    if (isPdf) {
      mediaContainer.innerHTML = `
        <iframe 
          src="${attachmentPath}" 
          class="modal-pdf-iframe" 
          title="${title || 'Certificate PDF'}" 
          frameborder="0"
        ></iframe>
      `;
    } else {
      mediaContainer.innerHTML = `
        <img 
          src="${attachmentPath}" 
          class="modal-img-preview" 
          alt="${title || 'Certificate Image'}"
        />
      `;
    }
    contentEl.appendChild(mediaContainer);
  }
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(contentEl);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
  
  // Show with transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
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
      return;
    }

    // No AboutModal instance found in the DOM — try delegating to
    // `loadProjectContent` using the hero about button `data-path` if available.
    const heroBtn = document.getElementById('hero-about-btn');
    const path = heroBtn?.getAttribute('data-path');
    if (path && window.loadProjectContent) {
      Logger.log('AboutModal instance not present — delegating to loadProjectContent');
      window.loadProjectContent(path);
      return;
    }
    Logger.log('AboutModal.open called but no instance or fallback available');
  },
  
  close() {
    if (this.instance) {
      this.instance.close();
    }
  }
};

// Export loadProjectContent globally
window.loadProjectContent = loadProjectContent;

// Export showContentModal globally
window.showContentModal = showContentModal;

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
