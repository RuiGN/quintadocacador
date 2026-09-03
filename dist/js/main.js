/**
 * Quinta do Caçador Residence
 * Camada de Comportamento (JavaScript) - Padrão W3C & UX Avançada
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Controle de elevação/sombra do header ao rolar
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('shadow-xl', 'bg-ink/95');
      header.classList.remove('bg-ink/85');
    } else {
      header.classList.remove('shadow-xl', 'bg-ink/95');
      header.classList.add('bg-ink/85');
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
