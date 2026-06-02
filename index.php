<?php

// 1. Liga o carregador automático inteligente do seu projeto
require_once __DIR__ . '/autoload.php';

// 2. Monta a aplicação na ordem correta
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service); 

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();