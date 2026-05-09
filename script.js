const storageKey = 'smartbudget-transactions';

const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const balanceAmount = document.getElementById('balance-amount');
const transactionForm = document.getElementById('transaction-form');
const transactionType = document.getElementById('transaction-type');
const transactionDescription = document.getElementById('transaction-description');
const transactionValue = document.getElementById('transaction-value');
const transactionTable = document.getElementById('transaction-table');
const clearAllButton = document.getElementById('clear-all');

let transactions = [];

function formatMoney(value) {
  return `${value.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽`;
}

function saveTransactions() {
  localStorage.setItem(storageKey, JSON.stringify(transactions));
}

function loadTransactions() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      transactions = JSON.parse(saved);
    } catch {
      transactions = [];
    }
  }
}

function updateSummary() {
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  incomeAmount.textContent = formatMoney(income);
  expenseAmount.textContent = formatMoney(expense);
  balanceAmount.textContent = formatMoney(balance);
}

function renderTransactions() {
  transactionTable.innerHTML = '';

  if (transactions.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.textContent = 'Транзакций пока нет. Добавьте первую запись.';
    cell.style.color = '#6b7280';
    row.appendChild(cell);
    transactionTable.appendChild(row);
    return;
  }

  transactions.forEach((tx) => {
    const row = document.createElement('tr');

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = tx.description;

    const typeCell = document.createElement('td');
    typeCell.textContent = tx.type === 'income' ? 'Доход' : 'Расход';
    typeCell.className = tx.type === 'income' ? 'status-income' : 'status-expense';

    const valueCell = document.createElement('td');
    const amountText = tx.type === 'expense' ? `- ${formatMoney(tx.amount)}` : formatMoney(tx.amount);
    valueCell.textContent = amountText;

    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeTransaction(tx.id));
    actionCell.appendChild(removeButton);

    row.append(descriptionCell, typeCell, valueCell, actionCell);
    transactionTable.appendChild(row);
  });
}

function addTransaction(event) {
  event.preventDefault();

  const amount = Number(transactionValue.value);
  if (!transactionDescription.value.trim() || Number.isNaN(amount) || amount <= 0) {
    transactionValue.focus();
    return;
  }

  const newTransaction = {
    id: Date.now().toString(),
    type: transactionType.value,
    description: transactionDescription.value.trim(),
    amount,
  };

  transactions.unshift(newTransaction);
  saveTransactions();
  renderTransactions();
  updateSummary();
  transactionForm.reset();
  transactionType.focus();
}

function removeTransaction(id) {
  transactions = transactions.filter((tx) => tx.id !== id);
  saveTransactions();
  renderTransactions();
  updateSummary();
}

function clearAllTransactions() {
  if (!window.confirm('Удалить все транзакции?')) {
    return;
  }
  transactions = [];
  saveTransactions();
  renderTransactions();
  updateSummary();
}

transactionForm.addEventListener('submit', addTransaction);
clearAllButton.addEventListener('click', clearAllTransactions);

loadTransactions();
renderTransactions();
updateSummary();
