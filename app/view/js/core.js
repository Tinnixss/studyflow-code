// ============================================================
// StudyFlow | core.js — Utilitários Compartilhados (CORRIGIDO)
// ============================================================
// Inclua este arquivo em TODAS as páginas, antes dos scripts específicos.
// ============================================================

// ── Wrapper seguro para localStorage ───────────────────────
function lsGet(chave, fallback = null) {
  try { return localStorage.getItem(chave) ?? fallback; }
  catch { return fallback; }
}

function lsSet(chave, valor) {
  try { localStorage.setItem(chave, valor); }
  catch { console.warn('[StudyFlow] localStorage indisponível'); }
}

// ── Inicialização e Gerenciamento do Tema (Dark / Light) ───
function initTheme() {
  const htmlEl = document.documentElement;
  const elementoTema = document.getElementById('toggle-tema');
  
  // 1. Recupera o tema salvo ou define 'dark' como padrão
  const temaSalvo = lsGet('sf-tema') || 'dark';
  htmlEl.setAttribute('data-tema', temaSalvo);
  
  // Sincroniza o estado do checkbox/input se ele existir na página
  if (elementoTema && elementoTema.type === 'checkbox') {
    elementoTema.checked = (temaSalvo === 'light');
  }

  // Se o botão/elemento de alternar não existir nesta página, apenas aplica o tema e sai
  if (!elementoTema) return;

  // 2. Remove ouvintes antigos para evitar duplicidade e adiciona o evento de clique/mudança
  elementoTema.removeAttribute('onclick'); // Remove chamadas diretas do HTML antigas
  
  const atualizarTema = () => {
    const temaAtual = htmlEl.getAttribute('data-tema');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-tema', novoTema);
    lsSet('sf-tema', novoTema);
    
    // Atualiza elementos visuais de feedback se existirem (ícones ou labels)
    const iconeTema = document.getElementById('icone-tema');
    const labelTema = document.getElementById('label-tema');
    
    if (iconeTema) {
      iconeTema.textContent = novoTema === 'dark' ? '🌙' : '☀️';
    }
    if (labelTema) {
      labelTema.textContent = novoTema === 'dark' ? 'Modo Escuro' : 'Modo Claro';
    }
  };

  if (elementoTema.tagName === 'INPUT' && elementoTema.type === 'checkbox') {
    elementoTema.addEventListener('change', atualizarTema);
  } else {
    elementoTema.addEventListener('click', (e) => {
      e.preventDefault();
      atualizarTema();
    });
  }
}

// ── Correção do Menu de Navegação (Abas e Links) ───────────
function initNavigation() {
  // 1. Faz o clique no Logo (Navbar StudyFlow) ir para o topo ou index.html
  const brandLogo = document.querySelector('.navbar__brand, .brand-header, .logo');
  if (brandLogo) {
    brandLogo.style.cursor = 'pointer';
    brandLogo.addEventListener('click', () => {
      // Se estiver na landing page, rola pro topo de forma suave
      if (document.getElementById('funcionalidades') || document.getElementById('cadastro')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Se estiver em outra página, redireciona para a home
        window.location.href = 'index.html';
      }
    });
  }

  // 2. Seleciona todos os links do menu que apontam para IDs internos (#inicio, #funcionalidades, etc.)
  const linksMenu = document.querySelectorAll('nav a[href^="#"], .menu a[href^="#"]');
  
  linksMenu.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Se o link for apenas "#", ignora ou rola para o topo
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      
      // Se o elemento destino existir na página atual (ex: index.html), faz o scroll suave
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Se houver um menu móvel aberto, fecha-o aqui (opcional)
        const menuDispositivo = document.querySelector('.menu-responsivo.expandido');
        if (menuDispositivo) menuDispositivo.classList.remove('expandido');
      } else {
        // Se o elemento não existir na página (ex: você está no perfil.html e clicou em #funcionalidades),
        // redireciona para a página principal levando a âncora junto
        e.preventDefault();
        window.location.href = 'index.html' + targetId;
      }
    });
  });
}

// ── Execução unificada quando o DOM estiver pronto ─────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});