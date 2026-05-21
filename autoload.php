<?php

spl_autoload_register(function ($classe) {
    // 1. Define a pasta base do projeto onde ficam as classes principais
    $baseDir = __DIR__ . '/app/';

    // Substitui contra-barras (se usares namespaces) por barras normais de caminhos
    $classePath = str_replace('\\', '/', $classe);

    // Caminho completo esperado dentro da pasta app
    $arquivo = $baseDir . $classePath . '.php';

    // Se o ficheiro existir dentro de 'app/...', importa-o automaticamente
    if (file_exists($arquivo)) {
        require_once $arquivo;
        return;
    }

    // 2. Caso a classe esteja solta diretamente na raiz (como a BusinessRuleException)
    $arquivoRaiz = __DIR__ . '/' . $classePath . '.php';
    if (file_exists($arquivoRaiz)) {
        require_once $arquivoRaiz;
    }
});