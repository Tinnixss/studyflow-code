<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. AJUDA MANUAL PARA AS EXCEÇÕES:
// O Autoload não adivinha o arquivo 'service.php' e ignora interfaces. Forçamos aqui:
require_once __DIR__ . '/app/repository/IEstudanteRepository.php';
require_once __DIR__ . '/app/services/service.php';

// 3. O Autoload carrega o restante sozinho assim que forem chamadas!
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();