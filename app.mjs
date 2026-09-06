import { convertDate } from './calendar.mjs';
import { translations, THAI_MONTHS, ZODIAC_EMOJI, formatResult } from './locales.mjs';

const byId = (id) => document.getElementById(id);
const form = byId('date-form');
const yearInput = byId('year');
const monthInput = byId('month');
const dayInput = byId('day');
const ruleInput = byId('zodiac-rule');
let language = navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'zh';
let fontSize = 'standard';
try {
  const savedLanguage = localStorage.getItem('wandee-language');
  if (['zh', 'th'].includes(savedLanguage)) language = savedLanguage;
  const savedFontSize = localStorage.getItem('wandee-font-size');
  if (['standard', 'large', 'xlarge'].includes(savedFontSize)) fontSize = savedFontSize;
} catch { /* 私密瀏覽或禁止儲存時仍可使用所有換算功能。 */ }
let era = 'ce';
let currentResult = null;
let revision = 0;
let announcementTimer;

function setText(id, value) {
  byId(id).textContent = value;
}

function announce(message) {
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(() => setText('live-result', message), 350);
}

function clearCopy() {
  revision += 1;
  setText('copy-status', '');
  byId('manual-copy').hidden = true;
  byId('copy-text').value = '';
}

function render() {
  clearCopy();
  const t = translations[language];
  const result = convertDate({
    year: yearInput.value, month: monthInput.value, day: dayInput.value,
    era, rule: ruleInput.value,
  });
  currentResult = result.ok ? result : null;
  for (const input of [yearInput, monthInput, dayInput]) {
    input.setAttribute('aria-invalid', String(!result.ok && result.fields.includes(input.id)));
  }
  byId('form-error').hidden = result.ok;
  byId('result-content').hidden = !result.ok;
  byId('empty-result').hidden = result.ok;
  byId('copy-button').disabled = !result.ok;
  setText('result-badge', result.ok ? t.updated : t.waiting);
  setText('zodiac-help', t[ruleInput.value === 'lunar' ? 'lunarHelp' : 'solarHelp']);
  ruleInput.setAttribute('aria-describedby', 'zodiac-help');

  if (!result.ok) {
    const message = t[result.error].replace('{maxDay}', result.maxDay ?? '');
    setText('form-error', message);
    // 清掉待朗讀結果，避免無效日期仍宣告前一次換算。
    clearTimeout(announcementTimer);
    setText('live-result', '');
    return;
  }
  setText('form-error', '');
  const output = formatResult(result, language);
  setText('be-year', result.beYear);
  setText('be-era-label', t.beEra);
  setText('be-month-day', output.monthDay);
  setText('thai-date', output.thaiDate);
  setText('weekday', output.weekdayText);
  setText('weekday-secondary', output.weekdaySecondary);
  byId('weekday-secondary').lang = output.secondaryLanguage === 'zh' ? 'zh-Hant' : 'th';
  setText('zodiac-label', output.zodiacLabel);
  setText('zodiac', output.zodiac);
  setText('zodiac-secondary', output.zodiacSecondary);
  byId('zodiac-secondary').lang = 'th';
  setText('zodiac-icon', result.zodiacIndex === null ? '✧' : ZODIAC_EMOJI[result.zodiacIndex]);
  setText('ce-result', output.date);
  setText('roc-result', output.rocDate);
  byId('historical-note').hidden = result.year >= 1941;
  byId('unsupported-note').hidden = result.zodiacIndex !== null;
  announce(output.copy);
}

function updateYearHint() {
  const t = translations[language];
  setText('year-label', t[era === 'ce' ? 'ceYear' : 'rocYear']);
  setText('year-hint', t[era === 'ce' ? 'ceHint' : 'rocHint']);
  yearInput.placeholder = era === 'ce' ? '2026' : '115';
}

function applyFontSize({ announceChange = false } = {}) {
  const t = translations[language];
  const labels = {
    standard: t.fontStandard,
    large: t.fontLarge,
    xlarge: t.fontExtraLarge,
  };
  document.documentElement.dataset.fontSize = fontSize;
  for (const button of document.querySelectorAll('button[data-font-size]')) {
    const selected = button.dataset.fontSize === fontSize;
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-label', labels[button.dataset.fontSize]);
    button.title = labels[button.dataset.fontSize];
  }
  if (announceChange) {
    setText('preference-status', t.fontChanged.replace('{size}', labels[fontSize]));
  }
}

function applyLanguage() {
  const t = translations[language];
  document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'th';
  document.title = t.title;
  for (const element of document.querySelectorAll('[data-i18n]')) {
    element.textContent = t[element.dataset.i18n];
  }
  for (const button of document.querySelectorAll('[data-language]')) {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  }
  applyFontSize();
  const selectedMonth = monthInput.value || '1';
  monthInput.replaceChildren(...Array.from({ length: 12 }, (_, index) => {
    const option = document.createElement('option');
    option.value = String(index + 1);
    option.textContent = language === 'zh' ? `${index + 1} 月` : THAI_MONTHS[index];
    return option;
  }));
  monthInput.value = selectedMonth;
  updateYearHint();
  render();
}

function useToday() {
  const today = new Date();
  yearInput.value = String(today.getFullYear() - (era === 'roc' ? 1911 : 0));
  monthInput.value = String(today.getMonth() + 1);
  dayInput.value = String(today.getDate());
  render();
}

for (const button of document.querySelectorAll('[data-language]')) {
  button.addEventListener('click', () => {
    language = button.dataset.language;
    try { localStorage.setItem('wandee-language', language); } catch { /* 語言偏好儲存可略過。 */ }
    applyLanguage();
  });
}

for (const button of document.querySelectorAll('button[data-font-size]')) {
  button.addEventListener('click', () => {
    fontSize = button.dataset.fontSize;
    try { localStorage.setItem('wandee-font-size', fontSize); } catch { /* 字級偏好儲存可略過。 */ }
    applyFontSize({ announceChange: true });
  });
}

for (const radio of document.querySelectorAll('input[name="era"]')) {
  radio.addEventListener('change', () => {
    const previous = currentResult;
    era = radio.value;
    // 只轉寫有效日期；民國元年以前不以負數或民國零年冒充。
    yearInput.value = previous && (era === 'ce' || previous.rocYear > 0)
      ? String(era === 'ce' ? previous.year : previous.rocYear) : '';
    updateYearHint();
    render();
  });
}

for (const input of [yearInput, monthInput, dayInput, ruleInput]) {
  input.addEventListener('input', render);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  render();
  if (!currentResult) form.querySelector('[aria-invalid="true"]')?.focus();
});
byId('today-button').addEventListener('click', useToday);

byId('copy-button').addEventListener('click', async () => {
  if (!currentResult) return;
  const text = formatResult(currentResult, language).copy;
  const copyRevision = revision;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    if (copyRevision === revision) setText('copy-status', translations[language].copied);
  } catch {
    if (copyRevision !== revision) return;
    byId('manual-copy').hidden = false;
    byId('copy-text').value = text;
    byId('copy-text').focus();
    byId('copy-text').select();
    setText('copy-status', translations[language].copyFallback);
  }
});

// 僅保存語言與字級偏好，日期每次開啟都從裝置的今天開始。
const today = new Date();
yearInput.value = String(today.getFullYear());
dayInput.value = String(today.getDate());
applyLanguage();
monthInput.value = String(today.getMonth() + 1);
render();
