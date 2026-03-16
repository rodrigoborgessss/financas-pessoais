/* ============================================================
   app.js — ponto de entrada e inicialização da aplicação
   ============================================================ */

function init() {
  /* Carrega dados guardados */
  loadData();

  /* Dados de exemplo no primeiro acesso */
  if (!transactions.length) seedSampleData();

  /* Define a data de hoje no formulário */
  document.getElementById('f-date').value = new Date().toISOString().split('T')[0];

  /* Popula selects de mês */
  populateMonthSelects();

  /* Renderiza página inicial */
  renderDashboard();
}

/* Arranca quando o DOM está pronto */
document.addEventListener('DOMContentLoaded', init);
