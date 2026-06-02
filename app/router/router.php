<?php

class Router {
    private EstudanteController $controller;

    public function __construct(EstudanteController $controller) {
        $this->controller = $controller;
    }

    public function handle() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
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

        // Caminho exato até a sua view
        $viewPath = dirname(__DIR__) . '/view/php/view.php';
        if (file_exists($viewPath)) {
            require_once $viewPath;
        } else {
            require_once dirname(__DIR__) . '/view/html/index.html';
        }
    }
}