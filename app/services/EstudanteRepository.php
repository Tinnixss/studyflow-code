<?php

class EstudanteRepository implements IEstudanteRepository {
    private PDO $pdo;

    public function __construct() {
        try {
            // MUDANÇA AQUI: Alterado de 'database.db' para 'database.sqlite'
            // para usar o banco correto onde a tabela já existe!
            $caminhoBanco = __DIR__ . '/../../database.sqlite';
            
            $this->pdo = new PDO("sqlite:" . $caminhoBanco);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Cannot connect to the SQLite database: " . $e->getMessage();
            exit;
        }
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