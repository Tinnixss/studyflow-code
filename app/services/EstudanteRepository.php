<?php

class EstudanteRepository implements IEstudanteRepository {
    private PDO $pdo;

    public function __construct() {
        // O Autoload vai carregar a classe Database automaticamente aqui!
        $this->pdo = Database::getConnection();
    }

    public function save(EstudanteModel $estudante): bool {
        $stmt = $this->pdo->prepare("INSERT INTO estudantes (nome, idade, objetivo) VALUES (?, ?, ?)");
        return $stmt->execute([$estudante->nome, $estudante->idade, $estudante->objetivo]);
    }

    public function findAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM estudantes");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}