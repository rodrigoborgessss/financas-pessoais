/* ============================================================
   budget.js — gestão e visualização do orçamento mensal
   ============================================================ */

const BUDGET_CATS = CAT_NAMES.filter(c => c !== 'Salário');

/* --- Renderiza os inputs para definir limites --- */
function renderBudgetInputs() {
  document.getElementById('budget-inputs').innerHTML = BUDGET_CATS.map(c => {
    const safeId = `budget-${c.replace(/[^a-z]/gi, '_')}`;
    return `
      <div class="b-row">
        <span class="b-row-label">${CAT_ICON[c] || ''} ${c}</span>
        <input
          class="b-input"
          type="number"
          id="${safeId}"
          placeholder="Limite €"
          value="${budgets[c] || ''}"
          min="0"
          step="10"
        />
      </div>`;
  }).join('');
}

/* --- Guarda os limites e atualiza o progresso --- */
function saveBudgets() {
  BUDGET_CATS.forEach(c => {
    const safeId = `budget-${c.replace(/[^a-z]/gi, '_')}`;
    const v = parseFloat(document.getElementById(safeId).value);
    if (v > 0) budgets[c] = v;
    else delete budgets[c];
  });

  saveBudgetsData();
  renderBudgetProgress();
}

/* --- Renderiza barras de progresso por categoria --- */
function renderBudgetProgress() {
  const month    = getMonths()[0];
  const filtered = getTransactionsByMonth(month).filter(t => t.type === 'expense');

  /* Totais gastos por categoria */
  const catTotals = {};
  filtered.forEach(t => {
    catTotals[t.cat] = (catTotals[t.cat] || 0) + t.amount;
  });

  const definedCats = Object.keys(budgets);

  if (!definedCats.length) {
    document.getElementById('budget-progress').innerHTML =
      '<div class="empty">Define limites abaixo para veres o progresso.</div>';
    return;
  }

  document.getElementById('budget-progress').innerHTML = definedCats.map(c => {
    const spent = catTotals[c] || 0;
    const limit = budgets[c];
    const pct   = Math.min(100, Math.round((spent / limit) * 100));

    /* Cor da barra: verde → amarelo → vermelho */
    const barColor = pct >= 90 ? '#f87171' : pct >= 70 ? '#fbbf24' : '#34d399';

    return `
      <div class="budget-item">
        <div class="budget-top">
          <span class="budget-cat">${CAT_ICON[c] || ''} ${c}</span>
          <span class="budget-vals">${fmt(spent)} / ${fmt(limit)}</span>
        </div>
        <div class="budget-bar-bg">
          <div class="budget-bar" style="width:${pct}%; background:${barColor};"></div>
        </div>
      </div>`;
  }).join('');
}
