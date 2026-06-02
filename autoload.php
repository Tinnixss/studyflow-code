<?php

spl_autoload_register(function ($classe) {
    // Lista com os nomes exatos das suas pastas reais (no singular e minúsculo)
    $diretorios = [
        __DIR__ . '/app/services/',
        __DIR__ . '/app/controller/',  
        __DIR__ . '/app/model/',       // Pasta do modelo
        __DIR__ . '/app/router/',     
        __DIR__ . '/app/middleware/',
        __DIR__ . '/app/repository/',
        __DIR__ . '/app/'
    ];

    // Mapeamento explícito de nomes de classes para os seus arquivos físicos correspondentes
    $mapeamentoEspecial = [
        'StudyFlowService'    => 'service',    // Procura service.php
        'EstudanteController' => 'controller', // Procura controller.php
        'Router'              => 'router',     // Procura router.php
        'IEstudanteRepository'=> 'IEstudanteRepository',
        'EstudanteModel'      => 'model'       // <-- CORRIGIDO: Mapeia EstudanteModel para model.php!
    ];

    $tentativas = [$classe];
    if (isset($mapeamentoEspecial[$classe])) {
        $tentativas[] = $mapeamentoEspecial[$classe];
    }

    // 1. Procura as classes e as exceções dentro das pastas do diretório 'app'
    foreach ($diretorios as $diretorio) {
        foreach ($tentativas as $nomeArquivo) {
            $arquivo = $diretorio . $nomeArquivo . '.php';
            if (file_exists($arquivo)) {
                require_once $arquivo;
                return;
            }
        }
    }

    // 2. Fallback: Procura o arquivo solto diretamente na raiz do projeto (como IEstudanteRepository)
    foreach ($tentativas as $nomeArquivo) {
        $arquivoRaiz = __DIR__ . '/' . $nomeArquivo . '.php';
        if (file_exists($arquivoRaiz)) {
            require_once $arquivoRaiz;
            return;
        }
    }
});