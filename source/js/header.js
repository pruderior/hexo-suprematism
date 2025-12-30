/**
 * Constructivist Header Bar
 * Minimal typographic design that harmonizes with Suprematist background
 */

(function() {
  function createHeader() {
    const container = document.getElementById('title-composition');
    if (!container) return;
    
    const data = window.SITE_DATA || {
      title: '题目',
      subtitle: '副标题',
      description: '描述'
    };
    
    container.innerHTML = '';
    
    // Simple Constructivist composition - title only, links to home
    container.innerHTML = `
      <a href="/" class="header-content">
        <span class="header-accent"></span>
        <h1 class="header-title">${data.title}</h1>
      </a>
    `;
  }

  // Scroll behavior
  function initScrollBehavior() {
    const header = document.getElementById('header-bar');
    if (!header) return;
    
    let lastScrollY = 0;
    let ticking = false;
    
    function handleScroll() {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled
      if (currentScrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  function init() {
    createHeader();
    initScrollBehavior();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
