import { iniciarBanco, adicionarItem } from './db.js';

export const estado = { dia: 1, mes: 1, ano: '' };
export const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export function irParaStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('ativo'));
    document.getElementById(`step-${n}`).classList.add('ativo');

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.remove('ativo');
        if (i + 1 === n) dot.classList.add('ativo');
    });
}

// STEP 1 - Cliques caóticos
export function setupDiaPorCliques() {
    const counter = document.getElementById('click-counter');
    const target = document.getElementById('click-target');
    const btn = document.getElementById('btn-confirmar-dia');

    target.addEventListener('click', () => {
        estado.dia = Math.min(31, estado.dia + (Math.random() < 0.2 ? -1 : 1));
        if (estado.dia < 1) estado.dia = 1;

        counter.textContent = String(estado.dia).padStart(2, '0');
        
        const rot = (Math.random() * 30 - 15);
        target.style.transform = `rotate(${rot}deg)`;
        setTimeout(() => target.style.transform = '', 120);
    });

    btn.addEventListener('click', () => irParaStep(2));
}

// STEP 2 - Slider + botão fugitivo
export function setupSliderMisterioso() {
    const slider = document.getElementById('slider-mes');
    const val = document.getElementById('slider-val');
    const btn = document.getElementById('btn-confirmar-mes');

    slider.addEventListener('input', () => {
        val.classList.add('borrado'); // espera o 'change'
    });

    slider.addEventListener('change', () => {
        estado.mes = parseInt(slider.value);
        val.classList.remove('borrado');
        val.textContent = MESES[estado.mes - 1];
    });

    // Botão foge rápido
    let bx = 140, by = 180;
    btn.style.left = bx + 'px';
    btn.style.top = by + 'px';

    document.addEventListener('mousemove', e => {
        if (!document.getElementById('step-2').classList.contains('ativo')) return;
        const dx = e.clientX - (bx + 80);
        const dy = e.clientY - (by + 25);
        if (Math.hypot(dx, dy) < 160) {
            bx += dx * -0.8;
            by += dy * -0.8;
            btn.style.left = bx + 'px';
            btn.style.top = by + 'px';
        }
    });

    btn.addEventListener('click', () => irParaStep(3));
}

// STEP 3 - Teclado sabotador (corrigido)
export function setupTecladoSabotador() {
    const grid = document.getElementById('teclado-grid');
    const display = document.getElementById('ano-digitado');
    const limpar = document.getElementById('btn-limpar-ano');

    let anoAtual = '';

    const nums = [1,2,3,4,5,6,7,8,9,0];
    grid.innerHTML = '';

    nums.forEach(n => {
        const tecla = document.createElement('div');
        tecla.className = 'tecla';
        tecla.textContent = n;
        tecla.addEventListener('click', () => {
            if (anoAtual.length >= 4) return;

            let digitado = n;
            if (Math.random() < 0.55) { // sabotagem
                digitado = (n + (Math.random() < 0.5 ? 1 : -1) + 10) % 10;
            }
            anoAtual += digitado;
            display.textContent = anoAtual.padEnd(4, '_');

            if (anoAtual.length === 4) {
                estado.ano = anoAtual;
                setTimeout(() => {
                    irParaStep(4);
                    mostrarResultado();
                }, 600);
            }
        });
        grid.appendChild(tecla);
    });

    // tecla apagar
    const apagar = document.createElement('div');
    apagar.className = 'tecla apagar';
    apagar.textContent = 'APAGAR';
    apagar.addEventListener('click', () => {
        anoAtual = '';
        display.textContent = '____';
    });
    grid.appendChild(apagar);

    limpar.addEventListener('click', () => {
        anoAtual = '';
        display.textContent = '____';
    });
}

export function mostrarResultado() {
    const d = String(estado.dia).padStart(2, '0');
    const m = String(estado.mes).padStart(2, '0');
    const a = estado.ano || '????';
    document.getElementById('resultado-data-display').textContent = `${d}/${m}/${a}`;
}

export function setupSalvarDados() {
    const btn = document.getElementById('btn-salvar-indexeddb');
    const banner = document.getElementById('salvo-banner');

    btn.addEventListener('click', async () => {
        const data = {
            tipo: 'data-nascimento-caos',
            dia: estado.dia,
            mes: estado.mes,
            ano: parseInt(estado.ano) || new Date().getFullYear(),
            dataFormatada: `${String(estado.dia).padStart(2,'0')}/${String(estado.mes).padStart(2,'0')}/${estado.ano || '????'}`,
            salvoEm: new Date().toISOString()
        };

        try {
            await adicionarItem(data);
            banner.style.display = 'block';
            btn.textContent = '✅ SALVO (talvez)';
            btn.disabled = true;
        } catch (e) {
            alert('Falha ao salvar... tente de novo!');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    irParaStep(1);
    setupDiaPorCliques();
    setupSliderMisterioso();
    setupTecladoSabotador();
    setupSalvarDados();
});