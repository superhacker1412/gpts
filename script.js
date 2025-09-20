const root = document.documentElement;
const toggle = document.querySelector('#theme-toggle');
const icon = toggle.querySelector('.theme-toggle__icon');
const yearEl = document.querySelector('#year');

const THEMES = {
  light: {
    label: '🌙',
    next: 'dark',
  },
  dark: {
    label: '☀️',
    next: 'light',
  },
};

const STORAGE_KEY = 'landing-theme-preference';

function applyTheme(theme) {
  root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  icon.textContent = THEMES[theme].label;
}

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    /* ignore private mode issues */
  }
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = THEMES[current].next;
  applyTheme(next);
  storeTheme(next);
}

toggle.addEventListener('click', toggleTheme);

const storedTheme = getStoredTheme();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
