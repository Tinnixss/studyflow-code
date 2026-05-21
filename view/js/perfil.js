// ── CONFIGURAÇÕES E BANCO DE DADOS LOCAL (localStorage) ────────
const DEFAULTS = {
  avatar: '🐱', 
  nome: '', 
  curso: '',
  horas: 0, 
  tarefas: 0, 
  sequencia: 0,
  disciplinas: []
};

function salvarDados(d) { 
  localStorage.setItem('sf-perfil', JSON.stringify(d)); 
}

function carregarDados() {
  try {
    const s = localStorage.getItem('sf-perfil');
    return s ? { ...DEFAULTS, ...JSON.parse(s) } : { ...DEFAULTS };
  } catch { 
    return { ...DEFAULTS }; 
  }
}

// ── SISTEMA DE TOAST (NOTIFICAÇÕES FLUTUANTES) ──────────────────
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!t || !msgEl) return;
  
  msgEl.textContent = msg;
  t.classList.add('visivel');
  setTimeout(() => t.classList.remove('visivel'), 2500);
}

// ── SISTEMA DE PROGRESSÃO: XP E NÍVEL ──────────────────────────
function calcularNivel(h) {
  if (h < 10)  return { nivel: 1, titulo: 'Iniciante',   xp: h * 10, max: 100  };
  if (h < 30)  return { nivel: 2, titulo: 'Aprendiz',    xp: h * 8,  max: 240  };
  if (h < 60)  return { nivel: 3, titulo: 'Estudioso',   xp: h * 7,  max: 420  };
  if (h < 100) return { nivel: 4, titulo: 'Dedicado',    xp: h * 6,  max: 600  };
  if (h < 150) return { nivel: 5, titulo: 'Explorador',  xp: h * 5,  max: 750  };
  if (h < 250) return { nivel: 6, titulo: 'Veterano',    xp: h * 4,  max: 1000 };
  return             { nivel: 7, titulo: 'Mestre',       xp: h * 3,  max: 1200 };
}

// ── RENDERIZAÇÃO DO PERFIL E STATUS PRINCIPAIS ─────────────────
function renderPerfil(d) {
  document.getElementById('avatar-display').textContent  = d.avatar;
  document.getElementById('nome-display').textContent    = d.nome || 'Estudante';
  document.getElementById('curso-display').textContent   = d.curso || 'Não informado';
  document.getElementById('stat-horas').textContent      = d.horas + 'h';
  document.getElementById('stat-tarefas').textContent    = d.tarefas;
  document.getElementById('stat-sequencia').textContent  = d.sequencia;
  
  const n   = calcularNivel(d.horas);
  const pct = Math.min(100, Math.round((n.xp / n.max) * 100));
  
  document.getElementById('nivel-display').textContent   = `⚡ Nível ${n.nivel} — ${n.titulo}`;
  document.getElementById('xp-label').textContent        = `XP: ${n.xp.toLocaleString()} / ${n.max.toLocaleString()}`;
  document.getElementById('xp-pct').textContent          = pct + '%';
  document.getElementById('xp-fill').style.width         = pct + '%';
  
  const hora = new Date().getHours();
  const saud = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
  const primeiroNome = d.nome ? d.nome.split(' ')[0] : 'Estudante';
  document.getElementById('saudacao').textContent = `${saud}, ${primeiroNome}!`;
}

// ── RENDERIZAÇÃO DO GRÁFICO SEMANAL ────────────────────────────
function renderGrafico() {
  let horasPorDia;
  try {
    const raw = localStorage.getItem('sf-horas-semana');
    horasPorDia = raw ? JSON.parse(raw) : [2.5, 4, 3, 5.5, 2, 4.5, 3];
  } catch { 
    horasPorDia = [2.5, 4, 3, 5.5, 2, 4.5, 3]; 
  }

  const nomes   = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const hojeIdx = (new Date().getDay() + 6) % 7; // Ajusta para Segunda ser 0
  const maxH    = Math.max(...horasPorDia, 0.1);
  const cont    = document.getElementById('grafico-barras');
  if (!cont) return;
  
  cont.innerHTML = '';
  horasPorDia.forEach((h, i) => {
    const altura = Math.round((h / maxH) * 100);
    cont.innerHTML += `
      <div class="barra-col">
        <div class="barra-col__fill${i === hojeIdx ? ' hoje' : ''}"
          style="height:${altura}px" data-horas="${h}h"></div>
        <span class="barra-col__label${i === hojeIdx ? ' hoje' : ''}">${nomes[i]}</span>
      </div>`;
  });
}

// ── CALENDÁRIO DINÂMICO DE SEQUÊNCIA (OFENSIVA) ───────────────
function renderSequencia() {
  const agora    = new Date();
  const ano      = agora.getFullYear();
  const mes      = agora.getMonth();
  const diaHoje  = agora.getDate();
  const meses    = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const diasSem  = ['D','S','T','Q','Q','S','S'];
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const mesSeq = document.getElementById('mes-sequencia');
  if (mesSeq) mesSeq.textContent = `${meses[mes]} ${ano}`;

  let diasFeitos = [];
  try {
    diasFeitos = JSON.parse(localStorage.getItem('sf-dias-feitos') || '[]');
  } catch { 
    diasFeitos = []; 
  }

  // Geração Mock demonstrativa caso esteja vazio
  if (diasFeitos.length === 0) {
    for (let d = 1; d < diaHoje; d++) {
      if (d % 3 !== 0) {
        diasFeitos.push(`${ano}-${String(mes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
      }
    }
  }

  const cont = document.getElementById('sequencia-dias');
  if (!cont) return;
  cont.innerHTML = '';
  
  for (let d = 1; d <= totalDias; d++) {
    const chave   = `${ano}-${String(mes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const nomeDia = diasSem[new Date(ano, mes, d).getDay()];
    const el      = document.createElement('div');
    el.className  = 'dia';
    el.innerHTML  = `<span class="dia__num">${d}</span><span>${nomeDia}</span>`;
    
    if (d === diaHoje) el.classList.add('hoje');
    else if (diasFeitos.includes(chave)) el.classList.add('feito');
    else if (d < diaHoje) el.classList.add('falhou');
    
    cont.appendChild(el);
  }
}

// ── CONTROLE E RENDERIZAÇÃO DAS DISCIPLINAS ────────────────────
function renderDisciplinas(disciplinas) {
  const lista = document.getElementById('disciplinas-lista');
  if (!lista) return;
  lista.innerHTML = '';

  if (disciplinas.length === 0) {
    lista.innerHTML = `
      <div class="estado-vazio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <div class="estado-vazio__titulo">Nenhuma disciplina ainda</div>
        <div class="estado-vazio__desc">Adicione suas matérias para acompanhar o progresso</div>
      </div>`;
    return;
  }

  const maxH = Math.max(...disciplinas.map(d => d.horas), 1);
  disciplinas.forEach((d, i) => {
    const pct = Math.round((d.horas / maxH) * 100);
    const el  = document.createElement('div');
    el.className = 'disciplina-item';
    el.innerHTML = `
      <div class="disciplina-item__icone">${d.icone}</div>
      <div class="disciplina-item__info">
        <div class="disciplina-item__nome">${d.nome}</div>
        <div class="disciplina-item__sub">Contabilizado pelo sistema</div>
      </div>
      <div class="disciplina-item__barra-wrap">
        <div class="disciplina-item__barra-track">
          <div class="disciplina-item__barra-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <button class="btn-delete" data-index="${i}" title="Remover" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
      </button>`;
    lista.appendChild(el);
  });

  lista.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      dados.disciplinas.splice(parseInt(btn.dataset.index), 1);
      salvarDados(dados);
      renderDisciplinas(dados.disciplinas);
      mostrarToast('Disciplina removida');
    });
  });
}

// ── INICIALIZAÇÃO DA PÁGINA ────────────────────────────────────
let dados = carregarDados();
renderPerfil(dados);
renderGrafico();
renderSequencia();
renderDisciplinas(dados.disciplinas);

// ── LOGICA DO MODAL DE PERFIL COM CARROSSEL 3D ─────────────────
let avatarSel = dados.avatar;
const modalOverlay = document.getElementById('modal-overlay');
const avatarCarousel = document.getElementById('avatar-carousel');

if (avatarCarousel) {
  const itensAvatar = Array.from(avatarCarousel.querySelectorAll('.avatar-item'));
  let currentIndex = itensAvatar.findIndex(item => item.dataset.emoji === dados.avatar);
  if (currentIndex === -1) currentIndex = 0;

  // Renderiza a rotação tridimensional das classes baseadas no índice ativo
  function updateCarousel() {
    itensAvatar.forEach((item, index) => {
      item.className = 'avatar-item';
      let offset = index - currentIndex;
      
      // Tratamento cíclico infinito para bordas extremas do carrossel
      if (offset < -1 && currentIndex === itensAvatar.length - 1) offset = 1;
      if (offset > 1 && currentIndex === 0) offset = -1;

      if (offset === 0) {
        item.classList.add('center');
        avatarSel = item.dataset.emoji; // Vincula ao coletor de dados de salvamento
      } else if (offset === 1 || offset === -(itensAvatar.length - 1)) {
        item.classList.add('right');
      } else if (offset === -1 || offset === (itensAvatar.length - 1)) {
        item.classList.add('left');
      }
    });
  }

  // Eventos das Setas Laterais
  document.getElementById('prev-avatar')?.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + itensAvatar.length) % itensAvatar.length;
    updateCarousel();
  });

  document.getElementById('next-avatar')?.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % itensAvatar.length;
    updateCarousel();
  });

  // Evento ao clicar direto em um elemento do carrossel lateral
  avatarCarousel.addEventListener('click', e => {
    const targetItem = e.target.closest('.avatar-item');
    if (!targetItem) return;
    const targetIndex = itensAvatar.indexOf(targetItem);
    if (targetIndex !== -1 && targetIndex !== currentIndex) {
      currentIndex = targetIndex;
      updateCarousel();
    }
  });

  // Centraliza e prepara a visualização do modal ao abrir
  function abrirModal() {
    document.getElementById('input-nome').value  = dados.nome;
    document.getElementById('input-curso').value = dados.curso;
    avatarSel = dados.avatar;
    
    const savedIndex = itensAvatar.findIndex(item => item.dataset.emoji === dados.avatar);
    if (savedIndex !== -1) currentIndex = savedIndex;
    
    updateCarousel();
    modalOverlay.classList.add('aberto');
  }

  const fecharModal = () => modalOverlay.classList.remove('aberto');

  document.getElementById('btn-editar')?.addEventListener('click', abrirModal);
  document.getElementById('modal-fechar')?.addEventListener('click', fecharModal);
  document.getElementById('btn-cancelar')?.addEventListener('click', fecharModal);
  modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) fecharModal(); });

  document.getElementById('btn-salvar')?.addEventListener('click', () => {
    dados.avatar = avatarSel;
    dados.nome   = document.getElementById('input-nome').value.trim()  || dados.nome;
    dados.curso  = document.getElementById('input-curso').value.trim() || dados.curso;
    salvarDados(dados);
    renderPerfil(dados);
    fecharModal();
    mostrarToast('Perfil salvo com sucesso!');
  });
}

// ── LOGICA DO MODAL DE ADICIONAR DISCIPLINAS ──────────────────
let discIconeSel = '📐';
const modalDisc  = document.getElementById('modal-disciplina');

document.getElementById('btn-add-disciplina')?.addEventListener('click', () => {
  document.getElementById('disc-nome').value = '';
  discIconeSel = '📐';
  document.querySelectorAll('#disc-icone-grid .avatar-op').forEach((op, i) =>
    op.classList.toggle('selecionado', i === 0));
  modalDisc.classList.add('aberto');
});

const fecharModalDisc = () => modalDisc.classList.remove('aberto');
document.getElementById('modal-disc-fechar')?.addEventListener('click', fecharModalDisc);
document.getElementById('modal-disc-cancelar')?.addEventListener('click', fecharModalDisc);
modalDisc?.addEventListener('click', e => { if (e.target === modalDisc) fecharModalDisc(); });

document.getElementById('disc-icone-grid')?.addEventListener('click', e => {
  const op = e.target.closest('.avatar-op'); if (!op) return;
  document.querySelectorAll('#disc-icone-grid .avatar-op').forEach(a => a.classList.remove('selecionado'));
  op.classList.add('selecionado'); 
  discIconeSel = op.dataset.emoji;
});

document.getElementById('modal-disc-salvar')?.addEventListener('click', () => {
  const nome = document.getElementById('disc-nome').value.trim();
  if (!nome) { mostrarToast('⚠️ Digite o nome da disciplina!'); return; }
  dados.disciplinas.push({ icone: discIconeSel, nome, horas: 0 });
  salvarDados(dados);
  renderDisciplinas(dados.disciplinas);
  fecharModalDisc();
  mostrarToast('Disciplina adicionada!');
});

// Aplica propriedades de renderização e carregamento dinâmico
document.querySelectorAll('[data-w]').forEach(el => {
  requestAnimationFrame(() => { el.style.width = el.dataset.w + '%'; });
});