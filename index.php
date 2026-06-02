<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. FORÇAR CAMINHOS MANUAIS (Corrigidos com base na sua árvore de arquivos)
require_once __DIR__ . '/app/repository/IEstudanteRepository.php';
require_once __DIR__ . '/app/repository/EstudanteRepository.php';
require_once __DIR__ . '/app/services/service.php'; // <-- Corrigido para carregar seu arquivo 'service.php'
require_once __DIR__ . '/app/controllers/EstudanteController.php';
require_once __DIR__ . '/app/routes/router.php';

// Cria as dependências de baixo para cima perfeitamente
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();