// ============================================================
// StudyFlow | core.js — Sistema Central Isolado (BLINDADO)
// ============================================================

(function() {
  // ── WRAPPERS SEGUROS DE LOCALSTORAGE ───────────────────────
  function lsGet(chave, fallback = null) {
    try { return localStorage.getItem(chave) ?? fallback; }
    catch { return fallback; }
  }
  function lsSet(chave, valor) {
    try { localStorage.setItem(chave, valor); }
    catch { console.warn('[StudyFlow] localStorage indisponível'); }
  }

  // ── CONTROLE DO TEMA (DARK / LIGHT) ────────────────────────
  function initTheme() {
    const htmlEl = document.documentElement;
    const elementoTema = document.getElementById('toggle-tema');
    const labelTema = document.getElementById('label-tema');
    const iconeTema = document.getElementById('icone-tema');

    // Força a aplicação do tema salvo imediatamente no carregamento
    const temaSalvo = lsGet('sf-tema') || 'dark';
    htmlEl.setAttribute('data-tema', temaSalvo);

    if (!elementoTema) return; // Se o botão não existir nesta página, sai sem quebrar

    // Atualiza os textos/ícones visuais do botão
    function aplicarVisualTema(tema) {
      htmlEl.setAttribute('data-tema', tema);
      if (labelTema) labelTema.textContent = tema === 'light' ? 'Light' : 'Dark';
      if (iconeTema) iconeTema.textContent = tema === 'light' ? '☀️' : '🌙';
    }

    aplicarVisualTema(temaSalvo);

    // Remove qualquer listener antigo e adiciona o clique definitivo
    elementoTema.onclick = function(e) {
      e.preventDefault();
      const temaAtual = htmlEl.getAttribute('data-tema') || 'dark';
      const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
      aplicarVisualTema(novoTema);
      lsSet('sf-tema', novoTema);
    };
  }

  // ── CONTROLE DA NAVBAR E MENU MOBILE ───────────────────────
  function initNavigation() {
    const navEl     = document.getElementById('nav-principal');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.getElementById('nav-links');

    if (navEl) {
      window.addEventListener('scroll', () => {
        navEl.classList.toggle('rolado', window.scrollY > 20);
      }, { passive: true });
    }

    if (!navToggle || !navLinks) return;

    // Configura o clique do menu mobile isolando o evento
    navToggle.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      const aberto = navLinks.classList.toggle('aberto');
      navToggle.classList.toggle('aberto', aberto);
      navToggle.setAttribute('aria-expanded', String(aberto));
    };

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && e.target !== navToggle) {
        navLinks.classList.remove('aberto');
        navToggle.classList.remove('aberto');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── SINCRONIZAÇÃO DOS DADOS DO PERFIL NA NAVBAR ────────────
  function sincronizarNavbar() {
    try {
      const dadosPerfil = JSON.parse(localStorage.getItem('sf-perfil') || '{}');
      const navUserNome = document.querySelector('.nav-user__nome');
      const navUserAvatar = document.querySelector('.nav-user__avatar');
      
      if (navUserNome && dadosPerfil.nome) navUserNome.textContent = dadosPerfil.nome;
      if (navUserAvatar && dadosPerfil.avatar) navUserAvatar.textContent = dadosPerfil.avatar;
    } catch (e) {
      // Ignora silenciosamente para não travar o resto do script
    }
  }

  // EXECUÇÃO IMEDIATA E SEGURA
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initNavigation();
      sincronizarNavbar();
    });
  } else {
    initTheme();
    initNavigation();
    sincronizarNavbar();
  }

  // Expõe a função global do Toast para que os outros scripts usem sem quebrar
  window.showToast = function(mensagem, tipo = 'info', duracao = 3500) {
    let container = document.getElementById('sf-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'sf-toast-container';
      Object.assign(container.style, {
        position: 'fixed', bottom: '24px', right: '24px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        zIndex: '99999', pointerEvents: 'none'
      });
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const icones = { sucesso: '✅', erro: '❌', aviso: '⚠️', info: 'ℹ️' };
    const cores = { sucesso: '#0f5132', erro: '#842029', aviso: '#664d03', info: '#0c3460' };

    Object.assign(toast.style, {
      background: cores[tipo] || cores.info, color: '#fff',
      padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
      fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', gap: '8px',
      opacity: '0', transform: 'translateY(8px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease', pointerEvents: 'auto'
    });

    toast.innerHTML = `<span>${icones[tipo] || icones.info}</span><span>${mensagem}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      });
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, duracao);
  };
})();