/**
 * Quinta do Caçador Residence
 * Camada de Comportamento (JavaScript) - Padrão W3C & UX Avançada
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  // Sistema de Alternância Dark / Light Mode
  const updateThemeUI = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Mudar para modo claro');
        themeToggle.setAttribute('title', 'Mudar para modo claro');
      }
      if (themeToggleMobile) {
        themeToggleMobile.setAttribute('aria-label', 'Mudar para modo claro');
        themeToggleMobile.setAttribute('title', 'Mudar para modo claro');
      }
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Mudar para modo escuro');
        themeToggle.setAttribute('title', 'Mudar para modo escuro');
      }
      if (themeToggleMobile) {
        themeToggleMobile.setAttribute('aria-label', 'Mudar para modo escuro');
        themeToggleMobile.setAttribute('title', 'Mudar para modo escuro');
      }
    }
  };

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    updateThemeUI(!isCurrentlyDark);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  // Sincronizar com tema salvo ou preferência do sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    updateThemeUI(true);
  } else {
    updateThemeUI(false);
  }

  // Ouvir mudança nas configurações do SO caso não haja escolha explícita do usuário
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      updateThemeUI(e.matches);
    }
  });

  // Controle de elevação/sombra do header ao rolar
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('shadow-xl', 'backdrop-blur-2xl');
    } else {
      header.classList.remove('shadow-xl');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Controle do menu mobile com acessibilidade
  if (menuButton && mobileMenu) {
    const toggleMenu = (open) => {
      const shouldOpen = open !== undefined ? open : menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(shouldOpen));
      menuButton.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
      
      if (shouldOpen) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    };

    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Fechar ao clicar em qualquer link de navegação
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fechar com a tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
        menuButton.focus();
      }
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
  }

  // Atualização dinâmica do ano no rodapé
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Observador de intersecção com animação suave de revelação
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
});
