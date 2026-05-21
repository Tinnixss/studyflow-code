<?php

spl_autoload_register(function ($classe) {
    // Lista de todas as subpastas dentro de 'app' onde podem existir classes
    $diretorios = [
        __DIR__ . '/app/services/',
        __DIR__ . '/app/controller/',
        __DIR__ . '/app/model/',
        __DIR__ . '/app/router/',
        __DIR__ . '/app/middleware/',
        __DIR__ . '/app/'
    ];

    // Procura o ficheiro da classe em cada uma das pastas listadas
    foreach ($diretorios as $diretorio) {
        $arquivo = $diretorio . $classe . '.php';
        
        if (file_exists($arquivo)) {
            require_once $arquivo;
            return; // Encontrou o ficheiro, para o loop
        }
    }

    // Caso a classe esteja solta diretamente na raiz do projeto (como a BusinessRuleException)
    $arquivoRaiz = __DIR__ . '/' . $classe . '.php';
    if (file_exists($arquivoRaiz)) {
        require_once $arquivoRaiz;
    }
});