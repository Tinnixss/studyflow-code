<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. AJUDA MANUAL PARA AS EXCEÇÕES:
// Forçamos os arquivos que possuem nomes diferentes das classes ou que são interfaces
require_once __DIR__ . '/app/repository/IEstudanteRepository.php';
require_once __DIR__ . '/app/services/service.php';
require_once __DIR__ . '/app/controllers/controller.php'; // <-- Mudado de 'EstudanteController.php' para 'controller.php'

// 3. O Autoload corrigido vai carregar o restante (como o Router e EstudanteRepository) sozinho!
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();