<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. AJUDA MANUAL PARA AS EXCEÇÕES (Pastas e arquivos que o Autoload não mapeia sozinho)
require_once __DIR__ . '/app/model/Database.php';           // <-- Linha mágica adicionada!
require_once __DIR__ . '/app/repository/IEstudanteRepository.php';
require_once __DIR__ . '/app/services/service.php';

// 3. O Autoload carrega o restante sozinho assim que forem chamadas!
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();