<?php

// 1. Liga o carregador automático inteligente (Linha 4)
require_once __DIR__ . '/autoload.php';

// O Autoload agora vai carregar o EstudanteRepository, StudyFlowService,
// EstudanteController e Router sozinho assim que eles forem chamados abaixo!

// Cria as dependências de baixo para cima
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();