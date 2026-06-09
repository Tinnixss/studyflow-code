// ============================================================
// StudyFlow | core.js — Utilitários Compartilhados (CORRIGIDO)
// ============================================================
// Inclua este arquivo em TODAS as páginas, antes dos scripts
// específicos de cada página:
//   <script src="core.js"></script>
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

function lsRemove(chave) {
  try { localStorage.removeItem(chave); }
  catch { console.warn('[StudyFlow] localStorage indisponível'); }
}


// ── Toggle Dark / Light (Adaptado para Botão, Link ou Checkbox) ───
function initTheme() {
  const htmlEl    = document.documentElement;
  const elementoTema = document.getElementById('toggle-tema');
  const labelTema = document.getElementById('label-tema');
  const iconeTema = document.getElementById('icone-tema');

  // Se o botão não existir nessa página específica, encerra sem quebrar o código
  if (!elementoTema) return;

  // Recupera o tema salvo ou define 'dark' como padrão
  const temaSalvo = lsGet('sf-tema') || 'dark';
  
  // Sincroniza o estado inicial visual com o tema salvo
  if (temaSalvo === 'light') {
    htmlEl.setAttribute('data-tema', 'light');
    if (elementoTema.type === 'checkbox') elementoTema.checked = true;
    if (labelTema) labelTema.textContent = 'Light';
    if (iconeTema) iconeTema.textContent = '☀️';
  } else {
    htmlEl.setAttribute('data-tema', 'dark');
    if (elementoTema.type === 'checkbox') elementoTema.checked = false;
    if (labelTema) labelTema.textContent = 'Dark';
    if (iconeTema) iconeTema.textContent = '🌙';
  }

  // Função centralizada para alternar o estado do tema
  function alternarTema() {
    const temaAtual = htmlEl.getAttribute('data-tema') || 'dark';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-tema', novoTema);
    lsSet('sf-tema', novoTema);

    // Atualiza os elementos auxiliares se eles existirem na interface
    if (labelTema) labelTema.textContent = novoTema === 'light' ? 'Light' : 'Dark';
    if (iconeTema) iconeTema.textContent = novoTema === 'light' ? '☀️' : '🌙';
    if (elementoTema.type === 'checkbox') elementoTema.checked = (novoTema === 'light');
  }

  // Detecta dinamicamente se deve escutar um 'change' (checkbox) ou 'click' (button/link)
  if (elementoTema.type === 'checkbox') {
    elementoTema.addEventListener('change', alternarTema);
  } else {
    elementoTema.addEventListener('click', (evento) => {
      evento.preventDefault();
      alternarTema();
    });
  }
}


// ── Navbar: scroll + hambúrguer (Protegido para Abas Internas) ──
function initNavigation() {
  const navEl     = document.getElementById('nav-principal');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  // Adiciona efeito visual na barra ao rolar a página
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('rolado', window.scrollY > 20);
    }, { passive: true });
  }

  // Configura menu sanduíche mobile (apenas se os seletores existirem)
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const aberto = navLinks.classList.toggle('aberto');
      navToggle.classList.toggle('aberto', aberto);
      navToggle.setAttribute('aria-expanded', String(aberto));
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu mobile ao clicar, contanto que seja um link de âncora da Landing Page
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        // Só interfere se for uma âncora interna (#funcionalidades, etc.), liberando abas e rotas reais
        if (href.startsWith('#')) {
          navLinks.classList.remove('aberto');
          navToggle.classList.remove('aberto');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menu');
        }
      });
    });
  }
}


// ── Loading Screen ──────────────────────────────────────────
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  const jaCarregou = sessionStorage.getItem('sf-loaded');

  if (jaCarregou) {
    loadingScreen.style.display = 'none';
    return;
  }

  sessionStorage.setItem('sf-loaded', 'true');

  function esconderLoading() {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1800);
  }

  if (document.readyState === 'complete') {
    esconderLoading();
  } else {
    window.addEventListener('load', esconderLoading);
  }

  // Trava de segurança contra carregamentos infinitos
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 6000);
}


// ── Sistema de Toast ────────────────────────────────────────
function showToast(mensagem, tipo = 'info', duracao = 3500) {
  let container = document.getElementById('sf-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'sf-toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: '99999',
      pointerEvents: 'none',
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const icones = { sucesso: '✅', erro: '❌', aviso: '⚠️', info: 'ℹ️' };
  const cores  = {
    sucesso: '#0f5132',
    erro:    '#842029',
    aviso:   '#664d03',
    info:    '#0c3460',
  };

  Object.assign(toast.style, {
    background:   cores[tipo] || cores.info,
    color:        '#fff',
    padding:      '12px 16px',
    borderRadius: '10px',
    fontSize:     '14px',
    fontFamily:   'Inter, sans-serif',
    boxShadow:    '0 4px 12px rgba(0,0,0,0.3)',
    display:      'flex',
    alignItems:   'center',
    gap:          '8px',
    opacity:      '0',
    transform:    'translateY(8px)',
    transition:   'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents:'auto',
    maxWidth:     '320px',
  });

  toast.innerHTML = `<span>${icones[tipo] || icones.info}</span><span>${mensagem}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, duracao);
}


// ── Inicialização automática ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initLoadingScreen();
});

console.log('[StudyFlow] core.js carregado e atualizado com sucesso!');