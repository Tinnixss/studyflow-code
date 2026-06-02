<?php

spl_autoload_register(function ($classe) {
    // Lista corrigida com os nomes exatos das suas pastas no plural dentro de 'app'
    $diretorios = [
        __DIR__ . '/app/services/',
        __DIR__ . '/app/controllers/', 
        __DIR__ . '/app/model/',
        __DIR__ . '/app/routes/',      
        __DIR__ . '/app/middleware/',
        __DIR__ . '/app/repository/',
        __DIR__ . '/app/'
    ];

    // Mapeamento exato de classes para arquivos com nomes diferentes
    $mapeamentoEspecial = [
        'StudyFlowService'    => 'service',
        'EstudanteController' => 'controller',
        'Router'              => 'router',
        'IEstudanteRepository'=> 'IEstudanteRepository'
    ];

    $tentativas = [$classe];
    if (isset($mapeamentoEspecial[$classe])) {
        $tentativas[] = $mapeamentoEspecial[$classe];
    }

    // 1. Tenta procurar dentro das pastas da estrutura 'app'
    foreach ($diretorios as $diretorio) {
        foreach ($tentativas as $nomeArquivo) {
            $arquivo = $diretorio . $nomeArquivo . '.php';
            if (file_exists($arquivo)) {
                require_once $arquivo;
                return;
            }
        }
    }

    // 2. Tenta procurar o arquivo solto diretamente na raiz do projeto (Ex: IEstudanteRepository.php)
    foreach ($tentativas as $nomeArquivo) {
        $arquivoRaiz = __DIR__ . '/' . $nomeArquivo . '.php';
        if (file_exists($arquivoRaiz)) {
            require_once $arquivoRaiz;
            return;
        }
    }
});