<?php

// 1. Liga o carregador automático inteligente do seu projeto
require_once __DIR__ . '/autoload.php';

// 2. CAMINHOS MANUAIS REAIS (Apenas para o que o Autoload não mapeia ou tem nome diferente)
require_once __DIR__ . '/app/model/Database.php';                 // <-- Carrega o seu Database real!
require_once __DIR__ . '/app/repository/IEstudanteRepository.php'; // Interface do repositório
require_once __DIR__ . '/app/services/service.php';               // Seu arquivo de serviço real
require_once __DIR__ . '/app/controllers/controller.php';         // Seu arquivo de controlador real

// 3. Monta a aplicação na ordem correta de dependências
$repository = new EstudanteRepository();
$service = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();