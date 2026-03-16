/* ============================================================
   ui.js — renderização de listas, formulário e navegação
   ============================================================ */

/* --- Formatação de valores --- */
function fmt(v)      { return `€\u00a0${Number(v).toFixed(2).replace('.', ',')}`; }
function fmtShort(v) { return `€${Number(v).toFixed(0)}`; }

/* --- Saudação dinâmica por hora --- */
function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6  && h < 12) return { text: 'Bom dia',   emoji: '☀️'  };
  if (h >= 12 && h < 20) return { text: 'Boa tarde', emoji: '🌤️' };
  return                         { text: 'Boa noite', emoji: '🌙'  };
}

/* --- População dos selects de mês --- */
function populateMonthSelects() {
  const months = getMonths();
  ['dash-month', 'hist-month'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const current = el.value;
    el.innerHTML = months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
    if (current && months.includes(current)) el.value = current;
  });
}

/* --- HTML de um card de transação --- */
function transHTML(t) {
  const color   = CAT_COLOR[t.cat] || '#9ca3af';
  const icon    = CAT_ICON[t.cat]  || '📌';
  const [y, mo, d] = t.date.split('-');
  const dateStr = `${d}/${mo}`;

  return `
    <div class="trans-card">
      <div class="trans-icon" style="background:${color}22;">${icon}</div>
      <div class="trans-info">
        <div class="trans-name">${t.desc}</div>
        <div class="trans-cat">${t.cat}</div>
      </div>
      <div class="trans-right-col">
        <div class="trans-amount ${t.type === 'income' ? 'inc' : 'exp'}">
          ${t.type === 'income' ? '+' : '-'}${fmt(t.amount)}
        </div>
        <div class="trans-date-s">${dateStr}</div>
      </div>
      <button class="del-btn" onclick="deleteTransaction(${t.id})">×</button>
    </div>`;
}

/* --- Renderização do dashboard --- */
function renderDashboard() {
  const g = getGreeting();
  document.getElementById('greeting-main').textContent = g.text;
  document.getElementById('greeting-emoji').textContent = g.emoji;
  document.getElementById('dash-date-sub').textContent =
    new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });

  const month    = document.getElementById('dash-month')?.value || getMonths()[0];
  const filtered = getTransactionsByMonth(month);
  const income   = filtered.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0);
  const expense  = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const bal      = income - expense;

  document.getElementById('hero-bal').innerHTML = `<span>€</span>${Math.abs(bal).toFixed(2).replace('.', ',')}`;
  document.getElementById('hero-bal').style.color = bal >= 0 ? '#f1f1f3' : '#f87171';
  document.getElementById('hero-inc').textContent = fmt(income);
  document.getElementById('hero-exp').textContent = fmt(expense);

  const recent = filtered.slice(0, 4);
  document.getElementById('recent-list').innerHTML =
    recent.length ? recent.map(transHTML).join('') : '<div class="empty">Sem movimentos neste mês.</div>';

  renderCatChart(filtered);
}

/* --- Renderização do histórico --- */
function renderHistory() {
  const month = document.getElementById('hist-month')?.value || getMonths()[0];
  const type  = document.getElementById('hist-type')?.value  || 'all';

  let filtered = getTransactionsByMonth(month);
  if (type !== 'all') filtered = filtered.filter(t => t.type === type);

  document.getElementById('hist-list').innerHTML =
    filtered.length ? filtered.map(transHTML).join('') : '<div class="empty">Sem movimentos neste período.</div>';
}

/* --- Adicionar transação --- */
function addTransaction() {
  const desc = document.getElementById('f-desc').value.trim();
  const val  = parseFloat(document.getElementById('f-val').value);
  const cat  = document.getElementById('f-cat').value;
  const date = document.getElementById('f-date').value;

  if (!desc || !val || !date) {
    alert('Por favor preenche todos os campos.');
    return;
  }

  transactions.unshift({ id: Date.now(), desc, amount: val, cat, date, type: currentType });
  saveTransactions();

  document.getElementById('f-desc').value = '';
  document.getElementById('f-val').value  = '';

  populateMonthSelects();
  renderDashboard();
  renderHistory();
  showPage('dashboard');
}

/* --- Apagar transação --- */
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  populateMonthSelects();
  renderDashboard();
  renderHistory();
}

/* --- Toggle tipo (despesa/receita) --- */
let currentType = 'expense';

function setType(t) {
  currentType = t;
  document.getElementById('opt-exp').classList.toggle('active', t === 'expense');
  document.getElementById('opt-inc').classList.toggle('active', t === 'income');

  const catSel = document.getElementById('f-cat');
  catSel.innerHTML = t === 'income'
    ? '<option value="Salário">Salário</option><option value="Outros">Outros</option>'
    : CAT_NAMES.filter(c => c !== 'Salário').map(c => `<option value="${c}">${c}</option>`).join('');
}

/* --- Navegação entre páginas --- */
function showPage(p) {
  document.querySelectorAll('.page')  .forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(`page-${p}`).classList.add('active');
  const nb = document.getElementById(`nav-${p}`);
  if (nb) nb.classList.add('active');

  if (p === 'budget')    { renderBudgetInputs(); renderBudgetProgress(); }
  if (p === 'history')   renderHistory();
  if (p === 'dashboard') renderDashboard();
}
