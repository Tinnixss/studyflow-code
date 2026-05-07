<?php
// controller.php

require_once 'service.php';
require_once 'BusinessRuleException.php';

class EstudanteController {
    private StudyFlowService $service;

    // Injeção de Dependência: o service já vem pronto do index.php
    public function __construct(StudyFlowService $service) {
        $this->service = $service;
    }

    public function store(array $dados): string {
        try {
            // Delegamos a tarefa para o Service
            $this->service->registrarEstudante($dados);
            return "✅ Perfil criado com sucesso!";
            
        } catch (BusinessRuleException $e) {
            // Erros de regra de negócio (ex: idade menor que 12)
            return "⚠️ " . $e->getMessage();
            
        } catch (Exception $e) {
            // Erros técnicos inesperados (ex: banco fora do ar)
            return "❌ Erro inesperado no servidor.";
        }
    }
}