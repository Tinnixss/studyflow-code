<?php

// Descobre a pasta raiz 'app' dinamicamente
$raizApp = dirname(__DIR__);

// Importa os arquivos usando caminhos absolutos baseados na pasta 'app'
require_once $raizApp . '/repository/IEstudanteRepository.php';
require_once $raizApp . '/repository/EstudanteRepository.php';
require_once $raizApp . '/controllers/EstudanteController.php';

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
        $viewPath = $raizApp . '/view/php/view.php';
        if (file_exists($viewPath)) {
            require_once $viewPath;
        } else {
            require_once $raizApp . '/view/html/index.html';
        }
    }
}