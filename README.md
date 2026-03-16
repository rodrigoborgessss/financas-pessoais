# 💸 Finanças Pessoais

> App de controlo financeiro pessoal — simples, bonita e direta ao ponto.

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![HTML](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-orange)
![Licença](https://img.shields.io/badge/licença-MIT-green)

---

## 📱 Sobre o projeto

**Finanças Pessoais** é uma app web com visual de telemóvel para acompanhares as tuas receitas, despesas e orçamento mensal — sem instalar nada, sem criar conta, sem complicações.

Funciona diretamente no browser. Os dados ficam guardados localmente no teu dispositivo via `localStorage`.

---

## ✨ Funcionalidades

- Painel com saldo disponível, receitas e despesas do mês
- Gráfico de rosca com despesas por categoria
- Histórico de movimentos filtrável por mês e tipo
- Registo rápido de despesas e receitas
- Orçamento mensal por categoria com barra de progresso
- Saudação dinâmica — Bom dia ☀️ / Boa tarde 🌤️ / Boa noite 🌙
- Dados persistentes no browser
- 100% offline após o primeiro carregamento

---

## 📁 Estrutura do projeto

```
financas-pessoais/
│
├── index.html          # Estrutura HTML e ligação aos assets
│
├── css/
│   ├── base.css        # Variáveis CSS, reset e layout principal
│   ├── components.css  # Componentes reutilizáveis (cards, nav, hero…)
│   └── pages.css       # Estilos específicos de cada página
│
└── js/
    ├── data.js         # Constantes, estado global e localStorage
    ├── ui.js           # Renderização de listas, formulário e navegação
    ├── charts.js       # Gráfico de rosca (Chart.js)
    ├── budget.js       # Lógica e renderização do orçamento
    └── app.js          # Inicialização da aplicação
```

---

## 🗂️ Categorias disponíveis

| Categoria    | Ícone |
|--------------|-------|
| Alimentação  | 🛒    |
| Transportes  | 🚌    |
| Habitação    | 🏠    |
| Saúde        | ❤️    |
| Lazer        | 🎉    |
| Educação     | 📚    |
| Salário      | 💼    |
| Outros       | 📌    |

---

## 🚀 Como usar

### Opção 1 — Abrir localmente

1. Faz download ou clona o repositório
2. Abre o `index.html` num browser moderno (Chrome, Firefox, Safari)
3. Começa a registar os teus movimentos!

> **Nota:** ao abrir diretamente como ficheiro local (`file://`), alguns browsers bloqueiam o carregamento de scripts externos. Recomenda-se usar um servidor local simples ou o GitHub Pages.

### Opção 2 — Servidor local rápido

```bash
# Com Python (recomendado)
python -m http.server 8000

# Com Node.js
npx serve .
```

Abre depois `http://localhost:8000` no browser.

### Opção 3 — GitHub Pages

1. Faz fork deste repositório ou cria um novo
2. Faz upload de todos os ficheiros mantendo a estrutura de pastas
3. Vai a **Settings → Pages**
4. Em *Branch*, seleciona `main` e a pasta `/ (root)`
5. Clica em **Save**
6. O teu link ficará disponível em:

```
https://o-teu-username.github.io/nome-do-repositorio/
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 / CSS3 / JavaScript | Base da aplicação, sem frameworks |
| [Chart.js 4.4](https://www.chartjs.org/) | Gráfico de rosca por categoria |
| [DM Sans + DM Serif Display](https://fonts.google.com/) | Tipografia |
| localStorage | Persistência de dados local |

---

## 🔒 Privacidade

Todos os dados são guardados **exclusivamente no teu browser**, na tua máquina. Nenhuma informação é enviada para servidores externos.

---

## 📄 Licença

Distribuído sob a licença MIT. Podes usar, modificar e partilhar à vontade.

---

Feito com ☕ e muito cuidado.
