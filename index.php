<?php

// 1. Liga o carregador automático que acabámos de criar
require_once __DIR__ . '/autoload.php';

// 2. Importa os ficheiros estruturais de rotas e inicialização que estão dentro de app
require_once 'app/services/service.php';
require_once 'app/controller/controller.php';
require_once 'app/router/router.php';

// Cria as dependências de baixo para cima
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();