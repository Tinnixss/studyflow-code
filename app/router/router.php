<?php

// Importa os arquivos corretos apontando para as pastas exatas da sua barra lateral
require_once __DIR__ . '/../repository/IEstudanteRepository.php';
require_once __DIR__ . '/../repository/EstudanteRepository.php';
require_once __DIR__ . '/../controllers/EstudanteController.php';

class Router {
    private EstudanteController $controller;

    public function __construct(EstudanteController $controller) {
        $this->controller = $controller;
    }

    public function handle() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                // Higienização dos dados vindos do formulário
                $dadosLimpos = [
                    'nome'     => htmlspecialchars(trim($_POST['nome'] ?? '')),
                    'idade'    => (int)($_POST['idade'] ?? 0),
                    'objetivo' => htmlspecialchars(trim($_POST['objetivo'] ?? ''))
                ];

                $GLOBALS['mensagem_feedback'] = $this->controller->store($dadosLimpos);
            } catch (Exception $e) {
                $GLOBALS['mensagem_feedback'] = '❌ ' . $e->getMessage();
            }
        }

        // Caminho exato até a sua view dentro de app/view/php/view.php
        $viewPath = dirname(__DIR__) . '/view/php/view.php';
        if (file_exists($viewPath)) {
            require_once $viewPath;
        } else {
            // Caso falte, ele tenta o index alternativo
            require_once dirname(__DIR__) . '/view/html/index.html';
        }
    }
}