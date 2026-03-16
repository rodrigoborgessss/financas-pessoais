/* ============================================================
   data.js — constantes, dados e persistência (localStorage)
   ============================================================ */

/* --- Categorias e metadados --- */
const CATEGORIES = [
  { name: 'Alimentação', icon: '🛒', color: '#34d399' },
  { name: 'Transportes', icon: '🚌', color: '#818cf8' },
  { name: 'Habitação',   icon: '🏠', color: '#f87171' },
  { name: 'Saúde',       icon: '❤️',  color: '#fbbf24' },
  { name: 'Lazer',       icon: '🎉', color: '#a78bfa' },
  { name: 'Educação',    icon: '📚', color: '#60a5fa' },
  { name: 'Salário',     icon: '💼', color: '#4ade80' },
  { name: 'Outros',      icon: '📌', color: '#9ca3af' },
];

/* Mapas de acesso rápido */
const CAT_ICON  = Object.fromEntries(CATEGORIES.map(c => [c.name, c.icon]));
const CAT_COLOR = Object.fromEntries(CATEGORIES.map(c => [c.name, c.color]));
const CAT_NAMES = CATEGORIES.map(c => c.name);

/* Chaves de armazenamento */
const STORAGE_KEY_TRANS   = 'fin_pt_trans';
const STORAGE_KEY_BUDGETS = 'fin_pt_budgets';

/* --- Estado em memória --- */
let transactions = [];
let budgets = {};

/* --- Persistência --- */
function loadData() {
  try { transactions = JSON.parse(localStorage.getItem(STORAGE_KEY_TRANS)   || '[]'); } catch (e) { transactions = []; }
  try { budgets      = JSON.parse(localStorage.getItem(STORAGE_KEY_BUDGETS) || '{}'); } catch (e) { budgets = {};      }
}

function saveTransactions() {
  try { localStorage.setItem(STORAGE_KEY_TRANS, JSON.stringify(transactions)); } catch (e) {}
}

function saveBudgetsData() {
  try { localStorage.setItem(STORAGE_KEY_BUDGETS, JSON.stringify(budgets)); } catch (e) {}
}

/* --- Dados de exemplo (primeiro acesso) --- */
function seedSampleData() {
  const m = new Date().toISOString().slice(0, 7);
  transactions = [
    { id: 1, desc: 'Vencimento',   amount: 1800, cat: 'Salário',      date: `${m}-01`, type: 'income'  },
    { id: 2, desc: 'Renda',        amount: 650,  cat: 'Habitação',    date: `${m}-05`, type: 'expense' },
    { id: 3, desc: 'Continente',   amount: 120,  cat: 'Alimentação',  date: `${m}-08`, type: 'expense' },
    { id: 4, desc: 'Passe mensal', amount: 40,   cat: 'Transportes',  date: `${m}-03`, type: 'expense' },
    { id: 5, desc: 'Ginásio',      amount: 35,   cat: 'Saúde',        date: `${m}-02`, type: 'expense' },
    { id: 6, desc: 'Cinema',       amount: 18,   cat: 'Lazer',        date: `${m}-11`, type: 'expense' },
  ];
  saveTransactions();
}

/* --- Utilitários de datas e meses --- */
function getMonths() {
  const set = new Set();
  const now = new Date();
  set.add(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  transactions.forEach(t => set.add(t.date.slice(0, 7)));
  return [...set].sort().reverse();
}

function monthLabel(m) {
  const [y, mo] = m.split('-');
  const names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  return `${names[parseInt(mo) - 1]} ${y}`;
}

function getTransactionsByMonth(month) {
  return transactions.filter(t => t.date.startsWith(month));
}
