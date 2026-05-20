# StudyFlow — Sistema Inteligente de Gestão de Aprendizagem

O StudyFlow é uma aplicação web voltada ao gerenciamento de rotinas de estudo. O sistema automatiza a distribuição de tarefas, monitora sessões de foco utilizando a técnica Pomodoro e fornece métricas de desempenho para otimização do aprendizado.

---

## Integrantes do Projeto
* Maria
* Valentina

---

## Principais Funcionalidades
* **Algoritmo de Priorização:** Distribuição automatizada de cronogramas baseada na relação de Urgência e Complexidade ($P = U \times C$).
* **Módulo de Foco (Pomodoro):** Temporizador estruturado em blocos de 25 minutos com registro de notas de rendimento diretamente no banco de dados.
* **Painel de Desempenho:** Consolidação de estatísticas de tempo de estudo e métricas por disciplina.
* **Integração Full-Stack:** Comunicação assíncrona entre interface cliente (Front-End) e APIs de processamento (Back-End).

---

## Arquitetura e Tecnologias
* **Front-End:** HTML5, CSS3 estruturado e JavaScript nativo para manipulação assíncrona do DOM.
* **Back-End:** PHP 8 estruturado sob o padrão arquitetural MVC (Camadas de Controller, Service e Repository).
* **Banco de Dados:** SQLite para persistência relacional leve e ágil de dados de usuários, cronogramas e sessões.

---

## Estrutura do Diretório e Documentação
O repositório está organizado para manter a separação clara entre as camadas de negócio e as especificações de engenharia reversa do banco:

```text
├── docs/
│   └── database/
│       ├── schema.dbml    # Definição declarativa do banco de dados (Sintaxe DBML)
│       └── diagrama.png   # Diagrama Entidade-Relacionamento (ER) gerado
├── controller.php         # Interceptador de requisições e controle de fluxo
├── index.html             # Landing page e portal de entrada da aplicação
├── cronograma.html        # Interface de gerenciamento de horários do estudante
└── database.sqlite        # Instância local do banco de dados relacional