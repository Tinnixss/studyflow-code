// ============================================================
// StudyFlow | controller.js — Controlador Central (CORRIGIDO)
// ============================================================
// Versão revisada — Correção de erros de concorrência e DOM nulo
// ============================================================

document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Verifica se a função de banco existe no escopo global
    if (typeof iniciarBanco === 'function') {
      await iniciarBanco();
    } else {
      console.warn('[StudyFlow] Função "iniciarBanco" não encontrada. Usando localStorage como fallback.');
    }

    // Detecta a página e inicializa de forma segura
    const pagina = detectarPagina();

    if (pagina === 'cronograma') {
      inicializarCronograma();
    } else if (pagina === 'perfil') {
      inicializarPerfil();
    }

    // Configura listeners comuns se houver necessidade global
    configurarGlobalListeners();

  } catch (e) {
    console.error('[StudyFlow] Erro na inicialização do controlador:', e.message);
  }
});

// ── Detecta em qual aba/página estamos ───────────────────────
function detectarPagina() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('cronograma')) return 'cronograma';
  if (path.includes('perfil') || path.includes('view.php')) return 'perfil';
  
  // Fallback baseado em elementos únicos na tela
  if (document.getElementById('tabela-cronograma') || document.getElementById('btn-nova-tarefa')) {
    return 'cronograma';
  }
  if (document.getElementById('form-perfil') || document.getElementById('perfil-nome')) {
    return 'perfil';
  }
  return 'index';
}

// ── Inicialização Segura da Aba Cronograma ──────────────────
function inicializarCronograma() {
  console.log('[StudyFlow] Inicializando módulo: Cronograma');
  
  const btnNovaTarefa = document.getElementById('btn-nova-tarefa');
  const modalTarefa   = document.getElementById('modal-tarefa');
  const btnFecharModal= document.getElementById('btn-fechar-modal');
  const formTarefa    = document.getElementById('form-tarefa');

  // Só adiciona os eventos se os elementos de fato existirem na tela
  if (btnNovaTarefa && modalTarefa) {
    btnNovaTarefa.addEventListener('click', () => {
      modalTarefa.classList.add('ativo');
      modalTarefa.style.display = 'flex'; // Garante exibição física se necessário
    });
  }

  if (btnFecharModal && modalTarefa) {
    btnFecharModal.addEventListener('click', () => {
      modalTarefa.classList.remove('ativo');
      modalTarefa.style.display = 'none';
    });
  }

  if (formTarefa) {
    formTarefa.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const descInput = document.getElementById('tarefa-descricao');
      const dataInput = document.getElementById('tarefa-data');
      const horaInput = document.getElementById('tarefa-hora');

      if (!descInput || !dataInput) return;

      const novaTarefa = {
        id: Date.now(),
        descricao: descInput.value,
        data: dataInput.value,
        hora: horaInput ? horaInput.value : '',
        concluida: false
      };

      const salvo = await salvarTarefa(novaTarefa);
      if (salvo) {
        if (typeof showToast === 'function') showToast('Tarefa adicionada com sucesso!', 'sucesso');
        formTarefa.reset();
        if (modalTarefa) {
          modalTarefa.classList.remove('ativo');
          modalTarefa.style.display = 'none';
        }
        // Recarrega a listagem se a função existir
        if (typeof renderizarTarefas === 'function') renderizarTarefas();
      }
    });
  }

  // Renderização inicial das tarefas da aba
  if (typeof renderizarTarefas === 'function') {
    renderizarTarefas();
  }
}

// ── Inicialização Segura da Aba Perfil ──────────────────────
function inicializarPerfil() {
  console.log('[StudyFlow] Inicializando módulo: Perfil');
  
  const formPerfil = document.getElementById('form-perfil');
  if (formPerfil) {
    formPerfil.addEventListener('submit', function() {
      if (typeof showToast === 'function') showToast('Sincronizando dados do perfil...', 'info');
    });
  }
}

// ── Configurações Globais Extras ────────────────────────────
function configurarGlobalListeners() {
  // Evita que cliques em links vazios ou desalinhados quebrem a execução
  const abasLinks = document.querySelectorAll('.menu-link, .nav-link');
  abasLinks.forEach(link => {
    if (!link.getAttribute('href')) {
      link.addEventListener('click', (e) => e.preventDefault());
    }
  });
}

// ── Sincronização e Salvamento de Tarefas ───────────────────
async function salvarTarefa(tarefa) {
  try {
    // 1. Atualiza o localStorage
    const raw = localStorage.getItem('sf-tarefas');
    const tarefas = raw ? JSON.parse(raw) : [];
    tarefas.push(tarefa);
    localStorage.setItem('sf-tarefas', JSON.stringify(tarefas));

    // 2. Replica no IndexedDB de forma secundária (se disponível)
    if (typeof adicionarItem === 'function') {
      try {
        await adicionarItem(tarefa, 'tarefas');
      } catch (dbErr) {
        console.warn('[StudyFlow] Falha ao replicar no IndexedDB, mantido no localStorage:', dbErr.message);
      }
    }

    return true;
  } catch (e) {
    console.error('[StudyFlow] Erro ao salvar tarefa:', e.message);
    return false;
  }
}

// ── Salva sessão Pomodoro no IndexedDB ──────────────────────
async function salvarSessaoPomodoro(sessao) {
  try {
    if (typeof adicionarItem === 'function') {
      await adicionarItem({
        ...sessao,
        data: new Date().toISOString().split('T')[0]
      }, 'sessoes');
    }
  } catch (e) {
    console.error('[StudyFlow] Erro ao salvar sessão:', e.message);
  }
}

// ── Exporta dados completos (para backup/debug) ─────────────
async function exportarDados() {
  try {
    if (typeof buscarItens !== 'function') {
      // Fallback usando localStorage
      return {
        tarefas: JSON.parse(localStorage.getItem('sf-tarefas') || '[]'),
        sessoes: [],
        exportadoEm: new Date().toISOString(),
        fonte: 'localStorage'
      };
    }

    const [tarefas, sessoes] = await Promise.all([
      buscarItens('tarefas'),
      buscarItens('sessoes'),
    ]);
    return {
      tarefas,
      sessoes,
      exportadoEm: new Date().toISOString(),
      fonte: 'IndexedDB'
    };
  } catch (e) {
    console.error('[StudyFlow] Erro ao exportar dados:', e.message);
    return null;
  }
}