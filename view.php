<?php
// REMOVEMOS o 'new StudyFlowService' daqui. 
// As variáveis $objetivos e $msg agora vêm "de fora" (do Router/Controller)
$objetivos = ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
$msg = $GLOBALS['mensagem_feedback'] ?? null;
?>
<!DOCTYPE html>
<html lang="pt-BR" data-tema="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow | Cadastro</title>
    <style>
        :root {
            --bg-base: #0f172a;
            --bg-surface: #1e293b;
            --bg-input: #0f172a;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --border: #334155;
            --accent: #6366f1;
            --accent-hover: #4f46e5;
            --accent-glow: rgba(99, 102, 241, 0.2);
            --r-xl: 1rem; --r-lg: 0.75rem; --r-md: 0.5rem;
            --s1: 0.25rem; --s2: 0.5rem; --s3: 0.75rem; --s4: 1rem; --s6: 1.5rem; --s8: 2rem;
            --font-sans: 'Inter', system-ui, sans-serif;
            --font-display: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            background-color: var(--bg-base);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            font-family: var(--font-sans);
            color: var(--text-primary);
        }

        .form-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            padding: var(--s8);
            border-radius: var(--r-xl);
            width: 100%;
            max-width: 420px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        .form-card h2 {
            font-family: var(--font-display);
            color: var(--text-primary);
            font-size: 28px;
            margin-bottom: var(--s2);
            letter-spacing: -0.5px;
        }

        .form-card p {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: var(--s6);
        }

        .input-wrapper {
            text-align: left;
            margin-bottom: var(--s4);
        }

        .input-wrapper label {
            display: block;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 600;
            margin-bottom: var(--s1);
            margin-left: 4px;
        }

        input, select {
            width: 100%;
            background: var(--bg-input);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: var(--s3) var(--s4);
            border-radius: var(--r-lg);
            font-size: 15px;
            transition: all 0.2s ease;
        }

        .btn-submit {
            background: var(--accent);
            color: white;
            border: none;
            width: 100%;
            padding: var(--s4);
            border-radius: var(--r-lg);
            font-family: var(--font-display);
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            margin-top: var(--s4);
            transition: all 0.3s ease;
        }

        .alert {
            padding: var(--s3);
            border-radius: var(--r-md);
            margin-bottom: var(--s6);
            font-size: 14px;
            font-weight: 500;
        }
        .alert-success { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid #059669; }
        .alert-error { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #dc2626; }
    </style>
</head>
<body>

    <div class="form-card">
        <h2>🚀 StudyFlow</h2>
        <p>Crie o seu perfil para começar a estudar com inteligência.</p>

        <?php if ($msg): ?>
            <div class="alert <?= (strpos($msg, '✅') !== false || strpos($msg, 'sucesso') !== false) ? 'alert-success' : 'alert-error' ?>">
                <?= $msg ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="index.php">
            <div class="input-wrapper">
                <label>Como quer ser chamado?</label>
                <input type="text" name="nome" placeholder="Digite seu nome..." required>
            </div>

            <div class="input-wrapper">
                <label>Sua idade</label>
                <input type="number" name="idade" placeholder="Ex: 18" required>
            </div>

            <div class="input-wrapper">
                <label>Qual seu foco?</label>
                <select name="objetivo">
                    <?php foreach ($objetivos as $obj): ?>
                        <option value="<?= $obj ?>"><?= $obj ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="btn-submit">Criar meu Plano →</button>
        </form>
    </div>

</body>
</html>