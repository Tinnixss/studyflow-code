<?php
// view.php
$objetivos = ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
$msg = $GLOBALS['mensagem_feedback'] ?? null;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow | Cadastro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
    
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
            --font-sans: 'Inter', sans-serif;
            --font-display: 'Plus Jakarta Sans', sans-serif;
        }

        <?php
<?php
<?php
// view.php
$objetivos = ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
$msg = $GLOBALS['mensagem_feedback'] ?? null;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow | Cadastro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
    
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
            --font-sans: 'Inter', sans-serif;
            --font-display: 'Plus Jakarta Sans', sans-serif;
        }

        /* RESET CRÍTICO */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background-color: var(--bg-base);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: var(--font-sans);
            color: var(--text-primary);
            padding: var(--s4);
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

        /* --- AJUSTE DO TÍTULO COM A LOGO --- */
        .brand-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px; /* Espaço entre o gatinho e o texto */
            margin-bottom: var(--s2);
        }

        .brand-logo {
            width: 32px;  /* Altura e largura ideais para alinhar com o texto */
            height: 32px;
            object-fit: contain;
        }

        .form-card h2 {
            font-family: var(--font-display);
            font-size: 28px;
            color: var(--text-primary);
            line-height: 1;
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

        /* Estilização unificada dos campos */
        input[type="text"], 
        input[type="number"], 
        select {
            width: 100%;
            background: var(--bg-input);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: var(--s3) var(--s4);
            border-radius: var(--r-lg);
            font-size: 15px;
            height: 46px;
            transition: all 0.2s ease;
        }

        /* Melhoria exclusiva da seletora */
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding-right: 40px;
            cursor: pointer;
        }

        .select-container {
            position: relative;
            width: 100%;
        }

        .select-container::after {
            content: "";
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 12px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            pointer-events: none;
            transition: transform 0.2s ease;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 4px var(--accent-glow);
        }

        select option {
            background-color: var(--bg-surface);
            color: var(--text-primary);
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
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
            margin-top: var(--s2);
            transition: all 0.3s ease;
        }

        .btn-submit:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }

        .alert {
            padding: var(--s3);
            border-radius: var(--r-md);
            margin-bottom: var(--s6);
            font-size: 14px;
            font-weight: 500;
            border: 1px solid transparent;
        }
        .alert-success { background: rgba(16, 185, 129, 0.1); color: #34d399; border-color: rgba(16, 185, 129, 0.2); }
        .alert-error { background: rgba(239, 68, 68, 0.1); color: #f87171; border-color: rgba(239, 68, 68, 0.2); }
    </style>
</head>
<body>

    <div class="form-card">
        
        <div class="brand-header">
            <img src="../img/logo.png" alt="StudyFlow Logo" class="brand-logo">
            <h2>StudyFlow</h2>
        </div>
        <p>Crie o seu perfil para começar a estudar com inteligência.</p>

        <?php if ($msg): ?>
            <div class="alert <?= (strpos($msg, '✅') !== false || strpos($msg, 'sucesso') !== false) ? 'alert-success' : 'alert-error' ?>">
                <?= $msg ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
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
                <div class="select-container">
                    <select name="objetivo">
                        <?php foreach ($objetivos as $obj): ?>
                            <option value="<?= $obj ?>"><?= $obj ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <button type="submit" class="btn-submit">Criar meu Plano →</button>
        </form>
    </div>

</body>
</html>