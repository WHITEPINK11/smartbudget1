const availableLanguages = ['ru', 'en'];

const texts = {
  ru: {
    locale: 'ru-RU',
    appTitle: 'SmartBudget',
    appSubtitle: 'Управляйте доходами и расходами простым способом.',
    navHome: 'Главная',
    navProfile: 'Профиль',
    languageLabel: 'Язык',
    addTransactionHeader: 'Добавить транзакцию',
    labelType: 'Тип',
    labelDescription: 'Описание',
    labelValue: 'Сумма',
    placeholderDescription: 'Например: Зарплата или Продукты',
    placeholderValue: '5000',
    addButton: 'Добавить',
    transactionsHeader: 'Транзакции',
    clearAllButton: 'Очистить всё',
    columnDescription: 'Описание',
    columnType: 'Тип',
    columnAmount: 'Сумма',
    columnAction: 'Действие',
    noTransactions: 'Транзакций пока нет. Добавьте первую запись.',
    noteText: 'Данные сохраняются в браузере и останутся при обновлении страницы.',
    profileHeader: 'Личная страница',
    profileText: 'Здесь вы можете сохранить свое имя, цель и увидеть общее количество операций.',
    profileInfoTitle: 'Ваши данные',
    labelName: 'Имя',
    labelEmail: 'Email',
    labelGoal: 'Цель',
    placeholderName: 'Иван Иванов',
    placeholderEmail: 'example@mail.ru',
    placeholderGoal: 'Накопить на отпуск',
    saveProfileButton: 'Сохранить',
    profileStatsTitle: 'Статистика',
    profileTransactionsCount: 'Операций',
    profileLastVisit: 'Последний визит',
    profileSaved: 'Профиль сохранён.',
    balanceTitle: 'Баланс',
    incomeTitle: 'Доход',
    expenseTitle: 'Расход',
    deleteButton: 'Удалить',
    confirmClear: 'Удалить все транзакции?',
  },
  en: {
    locale: 'en-US',
    appTitle: 'SmartBudget',
    appSubtitle: 'Manage income and expenses with ease.',
    navHome: 'Home',
    navProfile: 'Profile',
    languageLabel: 'Language',
    addTransactionHeader: 'Add transaction',
    labelType: 'Type',
    labelDescription: 'Description',
    labelValue: 'Amount',
    placeholderDescription: 'For example: Salary or Groceries',
    placeholderValue: '5000',
    addButton: 'Add',
    transactionsHeader: 'Transactions',
    clearAllButton: 'Clear all',
    columnDescription: 'Description',
    columnType: 'Type',
    columnAmount: 'Amount',
    columnAction: 'Action',
    noTransactions: 'No transactions yet. Add your first one.',
    noteText: 'Data is stored in the browser and will remain after refresh.',
    profileHeader: 'Personal page',
    profileText: 'Here you can save your name, goal, and see total operations.',
    profileInfoTitle: 'Your info',
    labelName: 'Name',
    labelEmail: 'Email',
    labelGoal: 'Goal',
    placeholderName: 'Jane Doe',
    placeholderEmail: 'example@mail.com',
    placeholderGoal: 'Save for vacation',
    saveProfileButton: 'Save',
    profileStatsTitle: 'Stats',
    profileTransactionsCount: 'Transactions',
    profileLastVisit: 'Last visit',
    profileSaved: 'Profile saved.',
    balanceTitle: 'Balance',
    incomeTitle: 'Income',
    expenseTitle: 'Expense',
    deleteButton: 'Delete',
    confirmClear: 'Delete all transactions?',
  },
};

function getSavedLanguage() {
  const lang = localStorage.getItem('smartbudget-language');
  return availableLanguages.includes(lang) ? lang : 'ru';
}

function saveLanguage(lang) {
  if (availableLanguages.includes(lang)) {
    localStorage.setItem('smartbudget-language', lang);
  }
}

function translatePage(lang = getSavedLanguage()) {
  const current = texts[lang] || texts.ru;
  window.currentTexts = current;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (current[key]) {
      element.textContent = current[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (current[key]) {
      element.placeholder = current[key];
    }
  });

  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.value = lang;
  }

  document.dispatchEvent(new Event('languageChanged'));
}

function initLanguageSelector(selectId, initialLang) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = availableLanguages
    .map((lang) => `<option value="${lang}">${lang.toUpperCase()}</option>`)
    .join('');
  select.value = initialLang || getSavedLanguage();

  select.addEventListener('change', () => {
    const chosen = select.value;
    saveLanguage(chosen);
    translatePage(chosen);
  });
}

window.getSavedLanguage = getSavedLanguage;
window.translatePage = translatePage;
window.initLanguageSelector = initLanguageSelector;
window.currentTexts = texts[getSavedLanguage()];
