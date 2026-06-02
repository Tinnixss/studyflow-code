<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. FORÇAR CAMINHOS MANUAIS (Garante que o PHP ache tudo se o Autoload falhar)
require_once __DIR__ . '/app/repository/IEstudanteRepository.php';
require_once __DIR__ . '/app/repository/EstudanteRepository.php';
require_once __DIR__ . '/app/controllers/EstudanteController.php';
require_once __DIR__ . '/app/routes/router.php';

// O Autoload vai se basear nesses caras se precisar, mas o PHP já lê direto acima!

// Cria as dependências de baixo para cima
$repository = new EstudanteRepository();

// NOTA: Se você tiver a classe StudyFlowService criada, mantenha a linha abaixo ativa.
// Caso dê erro nela, você pode passar o $repository direto para o EstudanteController.
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();