export const MIN_YEAR = 1901;
export const MAX_YEAR = 2100;

let lunarFormatter;

/** 接受半形、全形與泰文數字，拒絕小數、正負號及其他文字。 */
export function parseDigits(value) {
  const normalized = String(value).trim().normalize('NFKC')
    .replace(/[๐-๙]/g, (digit) => String(digit.charCodeAt(0) - 0x0e50));
  return /^\d+$/.test(normalized) ? Number(normalized) : NaN;
}

/** 以西元公曆判斷閏年；佛曆年份不能直接套用閏年公式。 */
export function daysInMonth(year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return NaN;
  }
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/** 固定 UTC 日曆日期，避免使用者所在時區改變星期或生肖日期。 */
export function getLunarYear(date) {
  try {
    lunarFormatter ??= new Intl.DateTimeFormat('en-u-ca-chinese-nu-latn', {
      year: 'numeric', timeZone: 'UTC',
    });
    if (lunarFormatter.resolvedOptions().calendar !== 'chinese') return null;
    const part = lunarFormatter.formatToParts(date).find((item) => item.type === 'relatedYear');
    const year = Number(part?.value);
    return Number.isInteger(year) && year > 0 ? year : null;
  } catch {
    // 部分舊瀏覽器缺少農曆資料，仍保留佛曆與星期換算。
    return null;
  }
}

/** 驗證輸入並回傳換算結果；無效日期不允許 JavaScript 自動進位。 */
export function convertDate({ year, month, day, era = 'ce', rule = 'lunar' }) {
  if (!['ce', 'roc'].includes(era) || !['lunar', 'solar'].includes(rule)) {
    return { ok: false, error: 'invalidMode', fields: [] };
  }
  const inputYear = parseDigits(year);
  const parsedMonth = parseDigits(month);
  const parsedDay = parseDigits(day);
  const gregorianYear = era === 'roc' ? inputYear + 1911 : inputYear;
  if (!Number.isInteger(inputYear) || gregorianYear < MIN_YEAR || gregorianYear > MAX_YEAR
      || (era === 'roc' && inputYear < 1)) {
    return { ok: false, error: era === 'roc' ? 'invalidRocYear' : 'invalidCeYear', fields: ['year'] };
  }
  if (!Number.isInteger(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    return { ok: false, error: 'invalidMonth', fields: ['month'] };
  }
  const maxDay = daysInMonth(gregorianYear, parsedMonth);
  if (!Number.isInteger(parsedDay) || parsedDay < 1 || parsedDay > maxDay) {
    return { ok: false, error: 'invalidDay', fields: ['day'], maxDay };
  }
  const date = new Date(Date.UTC(gregorianYear, parsedMonth - 1, parsedDay, 12));
  const zodiacYear = rule === 'solar' ? gregorianYear : getLunarYear(date);
  return {
    ok: true,
    year: gregorianYear,
    month: parsedMonth,
    day: parsedDay,
    beYear: gregorianYear + 543,
    rocYear: gregorianYear - 1911,
    weekday: date.getUTCDay(),
    zodiacYear,
    zodiacIndex: zodiacYear === null ? null : ((zodiacYear - 4) % 12 + 12) % 12,
    rule,
  };
}
