/* ============================================================
   charts.js — gráficos com Chart.js
   ============================================================ */

let catChartInstance = null;

/* --- Gráfico de rosca por categoria --- */
function renderCatChart(filtered) {
  const expenses = filtered.filter(t => t.type === 'expense');

  /* Agrupa por categoria */
  const catTotals = {};
  expenses.forEach(t => {
    catTotals[t.cat] = (catTotals[t.cat] || 0) + t.amount;
  });

  const labels = Object.keys(catTotals);
  const data   = Object.values(catTotals);
  const colors = labels.map(l => CAT_COLOR[l] || '#9ca3af');
  const total  = data.reduce((s, v) => s + v, 0);

  /* Atualiza total central */
  document.getElementById('dough-val').textContent = fmtShort(total);

  /* Destrói instância anterior se existir */
  if (catChartInstance) catChartInstance.destroy();

  /* Sem dados — limpa legenda e sai */
  if (!labels.length) {
    document.getElementById('cat-legend').innerHTML = '';
    return;
  }

  catChartInstance = new Chart(document.getElementById('cat-chart'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${fmt(ctx.raw)}`,
          },
        },
      },
    },
  });

  /* Legenda personalizada */
  document.getElementById('cat-legend').innerHTML =
    labels.map((l, i) => `
      <div class="cat-pill">
        <span class="cat-dot" style="background:${colors[i]};"></span>
        ${l}
      </div>`
    ).join('');
}
