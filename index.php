<?php

// 1. Liga o carregador automático inteligente
require_once __DIR__ . '/autoload.php';

// 2. CORREÇÃO DOS CAMINHOS MANUAIS (Para os arquivos que não seguem o nome exato da classe)
require_once __DIR__ . '/app/model/Database.php';               // Garante que o Database funcione na linha 8!
require_once __DIR__ . '/app/repository/IEstudanteRepository.php'; // Interface do repositório
require_once __DIR__ . '/app/services/service.php';             // Seu arquivo de serviço real
require_once __DIR__ . '/app/controllers/controller.php';       // Seu arquivo de controlador real

// 3. Monta a aplicação na ordem correta de dependências
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();