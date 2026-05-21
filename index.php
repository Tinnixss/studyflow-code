<?php

// 1. Liga o carregador automático inteligente (Linha 4)
require_once __DIR__ . '/autoload.php';

// O Autoload vai carregar cada classe abaixo sozinho assim que forem chamadas!

// Cria as dependências de baixo para cima (Atenção às maiúsculas!)
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();