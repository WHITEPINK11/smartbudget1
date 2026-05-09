const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileGoal = document.getElementById('profile-goal');
const transactionCount = document.getElementById('transaction-count');
const lastVisit = document.getElementById('last-visit');

const profileKey = 'smartbudget-profile';

function loadProfile() {
  const saved = localStorage.getItem(profileKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}

function saveProfile(data) {
  localStorage.setItem(profileKey, JSON.stringify(data));
}

function updateProfileFields() {
  const profile = loadProfile();
  profileName.value = profile.name || '';
  profileEmail.value = profile.email || '';
  profileGoal.value = profile.goal || '';
}

function updateStats() {
  const transactions = JSON.parse(localStorage.getItem('smartbudget-transactions') || '[]');
  transactionCount.textContent = transactions.length;
  const visit = localStorage.getItem('smartbudget-last-visit');
  lastVisit.textContent = visit || '—';
}

function handleProfileSubmit(event) {
  event.preventDefault();
  saveProfile({
    name: profileName.value.trim(),
    email: profileEmail.value.trim(),
    goal: profileGoal.value.trim(),
  });
  localStorage.setItem('smartbudget-last-visit', new Date().toLocaleString());
  updateStats();
  alert(currentTexts.profileSaved);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = getSavedLanguage();
  initLanguageSelector('language-select', savedLang);
  translatePage(savedLang);
  updateProfileFields();
  updateStats();
  profileForm.addEventListener('submit', handleProfileSubmit);
});
