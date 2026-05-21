<?php

spl_autoload_register(function ($classe) {
    // Lista de todas as subpastas dentro de 'app'
    $diretorios = [
        __DIR__ . '/app/services/',
        __DIR__ . '/app/controller/',
        __DIR__ . '/app/model/',
        __DIR__ . '/app/router/',
        __DIR__ . '/app/middleware/',
        __DIR__ . '/app/'
    ];

    // Cria uma lista de tentativas para o nome do arquivo
    $tentativas = [$classe];

    // Se o PHP pedir a classe com maiúscula, tentamos procurar o arquivo em minúsculo também
    if ($classe === 'StudyFlowService') {
        $tentativas[] = 'service';
    }
    if ($classe === 'EstudanteController') {
        $tentativas[] = 'controller';
    }
    if ($classe === 'Router') {
        $tentativas[] = 'router'; // <-- Adicionado para resolver a linha 14!
    }

    // Varre as pastas procurando por qualquer uma das combinações
    foreach ($diretorios as $diretorio) {
        foreach ($tentativas as $nomeArquivo) {
            $arquivo = $diretorio . $nomeArquivo . '.php';
            if (file_exists($arquivo)) {
                require_once $arquivo;
                return;
            }
        }
    }

    // Fallback para arquivos soltos na raiz (como BusinessRuleException)
    $arquivoRaiz = __DIR__ . '/' . $classe . '.php';
    if (file_exists($arquivoRaiz)) {
        require_once $arquivoRaiz;
    }
});