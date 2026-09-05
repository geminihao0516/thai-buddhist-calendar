import test from 'node:test';
import assert from 'node:assert/strict';
import { convertDate, daysInMonth, parseDigits } from './calendar.mjs';
import { translations, formatResult } from './locales.mjs';

const convert = (year, month, day, extra = {}) => convertDate({ year, month, day, ...extra });

test('西元與民國輸入得到相同佛曆、星期與生肖', () => {
  const ce = convert(2026, 9, 5);
  const roc = convert(115, 9, 5, { era: 'roc' });
  assert.deepEqual(roc, ce);
  assert.equal(ce.beYear, 2569);
  assert.equal(ce.weekday, 6);
  assert.equal(ce.zodiacIndex, 6);
});

test('依西元年判斷閏日，包含世紀閏年規則', () => {
  assert.equal(convert(2000, 2, 29).ok, true);
  assert.equal(convert(2024, 2, 29).ok, true);
  assert.equal(convert(2023, 2, 29).error, 'invalidDay');
  assert.equal(convert(2100, 2, 29).error, 'invalidDay');
  assert.equal(convert(113, 2, 29, { era: 'roc' }).beYear, 2567);
  assert.equal(daysInMonth(1900, 2), 28);
  assert.equal(daysInMonth(2000, 2), 29);
});

test('2026 春節前一天屬蛇、春節當天屬馬（香港天文台 2026 月曆）', () => {
  assert.equal(convert(2026, 2, 16).zodiacIndex, 5);
  assert.equal(convert(2026, 2, 17).zodiacIndex, 6);
  assert.equal(convert(2026, 2, 17).weekday, 2);
  assert.equal(convert(2026, 1, 1).zodiacIndex, 5);
  assert.equal(convert(2026, 1, 1, { rule: 'solar' }).zodiacIndex, 6);
});

test('跨年生肖驗證：1984、2000、2023、2024、2025 春節邊界', () => {
  for (const [year, month, day, zodiac] of [
    [1984, 2, 2, 0], [2000, 2, 5, 4], [2023, 1, 22, 3],
    [2024, 2, 10, 4], [2025, 1, 29, 5],
  ]) {
    assert.equal(convert(year, month, day).zodiacIndex, zodiac);
    assert.equal(convert(year, month, day - 1).zodiacIndex, (zodiac + 11) % 12);
  }
});

test('各月份的最後一天有效，超出一天不得偷偷進位', () => {
  for (let month = 1; month <= 12; month += 1) {
    const last = daysInMonth(2026, month);
    assert.equal(convert(2026, month, last).ok, true);
    assert.equal(convert(2026, month, last + 1).error, 'invalidDay');
  }
});

test('拒絕空值、非整數、指數、負值、月份與日期越界', () => {
  for (const value of ['', ' ', '20x6', '2026.5', '2e3', '-2026', '+2026', Infinity]) {
    assert.equal(convert(value, 1, 1).ok, false);
  }
  for (const month of [0, 13, '', 1.5]) assert.equal(convert(2026, month, 1).ok, false);
  for (const day of [0, 32, '', 1.5]) assert.equal(convert(2026, 1, day).ok, false);
  assert.equal(convert(2026, 1, 1, { era: 'be' }).ok, false);
  assert.equal(convert(2026, 1, 1, { rule: 'unknown' }).ok, false);
});

test('日期範圍與民國元年邊界，不接受民國零年', () => {
  assert.equal(convert(1901, 1, 1).ok, true);
  assert.equal(convert(2100, 12, 31).ok, true);
  assert.equal(convert(1900, 12, 31).ok, false);
  assert.equal(convert(2101, 1, 1).ok, false);
  assert.equal(convert(1, 1, 1, { era: 'roc' }).year, 1912);
  assert.equal(convert(189, 12, 31, { era: 'roc' }).year, 2100);
  assert.equal(convert(0, 1, 1, { era: 'roc' }).ok, false);
  assert.equal(convert(190, 1, 1, { era: 'roc' }).ok, false);
});

test('接受泰文數字與全形數字', () => {
  assert.equal(parseDigits(' ๒๐๒๖ '), 2026);
  assert.equal(parseDigits('２０２６'), 2026);
  assert.equal(convert('๒๐๒๖', '๙', '๕').beYear, 2569);
  assert.equal(convert('１１５', '０９', '０５', { era: 'roc' }).beYear, 2569);
});

test('星期不受程序時區影響，七天都對應正確', () => {
  for (let day = 6; day <= 12; day += 1) {
    assert.equal(convert(2026, 9, day).weekday, day - 6);
  }
});

test('繁中與泰文的介面翻譯鍵完全對應', () => {
  assert.deepEqual(Object.keys(translations.zh).sort(), Object.keys(translations.th).sort());
  for (const t of Object.values(translations)) {
    assert.equal(t.weekdays.length, 7);
    assert.equal(t.animals.length, 12);
    assert.equal(t.animalYears.length, 12);
    assert.ok(Object.values(t).every((value) => value.length > 0));
  }
});

test('泰文結果含完整日期、星期與生肖；複製文字包含規則', () => {
  const result = convert(2026, 9, 5);
  const th = formatResult(result, 'th');
  const zh = formatResult(result, 'zh');
  assert.equal(th.thaiDate, 'วันเสาร์ที่ 5 กันยายน พ.ศ. 2569');
  assert.equal(th.zodiac, 'ปีมะเมีย');
  assert.match(th.copy, /ตรุษจีน/);
  assert.match(zh.copy, /農曆春節/);
  assert.match(zh.copy, /115 年 9 月 5 日/);
  assert.match(formatResult(convert(2026, 1, 1, { rule: 'solar' }), 'zh').copy, /西元年份/);
});

test('民國前標示正確；歷史日期和農曆不支援提示包含於複製內容', () => {
  assert.match(formatResult(convert(1911, 1, 1), 'zh').rocDate, /民國前 1 年/);
  assert.match(formatResult(convert(1901, 1, 1), 'zh').rocDate, /民國前 11 年/);
  assert.match(formatResult(convert(1940, 1, 1), 'zh').copy, /早於 1941/);
  assert.doesNotMatch(formatResult(convert(1941, 1, 1), 'zh').copy, /早於 1941/);
  const unavailable = { ...convert(2026, 1, 1), zodiacIndex: null, zodiacYear: null };
  assert.match(formatResult(unavailable, 'th').copy, /ไม่รองรับ/);
});
