<?php
try {
    $pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Criando a tabela de Estudantes do StudyFlow
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS estudantes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            idade INTEGER NOT NULL,
            objetivo TEXT NOT NULL,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    echo "✅ [StudyFlow] Banco de dados pronto para cadastrar estudantes!" . PHP_EOL;
} catch (PDOException $e) {
    echo "❌ Erro ao preparar banco: " . $e->getMessage();
}