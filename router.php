<?php
// router.php — O Roteador Central do StudyFlow

require_once 'middleware.php'; // 🛡️ Importa a camada de segurança
require_once 'controller.php';

class Router
{
    public function handle()
    {
        // Se o usuário está apenas ACESSANDO a página (carregamento inicial)
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            require 'view.php';
            return;
        }

        // Se o usuário está ENVIANDO o formulário (clicou no botão)
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                // 1. O Router chama o Middleware para validar os dados primeiro
                Middleware::validar($_POST); 

                // 2. Se a validação passar, chama o Controller para processar
                $controller = new EstudanteController();
                $resultado = $controller->registrar($_POST);

                // 3. Guarda a mensagem de sucesso para exibir na tela
                $GLOBALS['mensagem_feedback'] = $resultado;

            } catch (Exception $e) {
                // 4. Se houver qualquer erro (idade baixa, campos vazios), guarda o erro
                $GLOBALS['mensagem_feedback'] = "❌ " . $e->getMessage();
            }

            // Recarrega a página para mostrar o feedback (sucesso ou erro)
            require 'view.php';
        }
    }
}