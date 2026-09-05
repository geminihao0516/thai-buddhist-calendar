import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

// 可使用既有 Playwright；產品本身沒有 npm 相依套件。
const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const baseUrl = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const outputDirectory = process.env.SCREENSHOT_DIR || '/tmp/thai-calendar-verification';
await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 }, locale: 'zh-TW', timezoneId: 'Asia/Taipei',
});
await context.grantPermissions(['clipboard-read', 'clipboard-write']);
const page = await context.newPage();
const pageErrors = [];
const failedResponses = [];
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('response', (response) => {
  if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
});
let checks = 0;
function check(condition, message) {
  assert.ok(condition, message);
  checks += 1;
  console.log(`✓ ${message}`);
}
async function text(id) { return page.locator(`#${id}`).textContent(); }
async function fillDate(year, month, day) {
  await page.locator('#year').fill(String(year));
  await page.locator('#month').selectOption(String(month));
  await page.locator('#day').fill(String(day));
}

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.locator('#be-year').filter({ hasText: /\d{4}/ }).waitFor();
  const today = await page.evaluate(() => ({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }));
  check(await text('be-year') === String(today.year + 543), '預設顯示裝置今天的佛曆年份');

  await fillDate(2026, 2, 16);
  check(await text('zodiac') === '蛇年', '日期輸入後自動換算春節前生肖');
  await page.locator('input[value="roc"]').check();
  check(await page.locator('#year').inputValue() === '115', '西元切民國保留同一天');
  await page.locator('[data-language="th"]').click();
  check(await text('zodiac') === 'ปีมะเส็ง', '泰文切換同步更新生肖');
  check(await page.locator('html').getAttribute('lang') === 'th', '泰文模式使用正確網頁語言');
  await fillDate('๑๑๕', 2, '๑๗');
  check(await text('zodiac') === 'ปีมะเมีย', '泰文數字輸入與春節當日生肖正確');
  check(await text('thai-date') === 'วันอังคารที่ 17 กุมภาพันธ์ พ.ศ. 2569', '泰文完整日期與星期正確');

  await page.locator('#day').fill('30');
  check(await page.locator('#form-error').isVisible(), '無效日期顯示錯誤');
  check(await page.locator('#result-content').isHidden(), '無效日期隱藏舊結果與複製按鈕');
  await page.locator('[data-language="zh"]').click();
  check((await text('form-error')).includes('28'), '語言切換同步翻譯日期錯誤');
  await page.locator('.primary-button').click();
  check(await page.locator('#day').evaluate((element) => element === document.activeElement), '送出無效日期聚焦待修正欄位');
  await fillDate(113, 2, 29);
  check(await text('be-year') === '2567' && await text('weekday') === '星期四', '民國閏年日期正確');
  await page.locator('input[value="ce"]').check();
  check(await page.locator('#year').inputValue() === '2024', '民國切回西元保留閏日');

  await fillDate(2026, 1, 1);
  await page.locator('#zodiac-rule').selectOption('solar');
  check(await text('zodiac') === '馬年', '切換年份對照會使用 1 月 1 日邊界');
  await page.locator('#copy-button').click();
  await page.waitForFunction(() => document.querySelector('#copy-status').textContent.includes('已複製'));
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  check(clipboard.includes('2569 年 1 月 1 日') && clipboard.includes('西元年份'), '實際剪貼簿包含日期與生肖規則');

  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async () => { throw new Error('denied'); } },
  }));
  await page.locator('#copy-button').click();
  await page.locator('#manual-copy').waitFor();
  check((await page.locator('#copy-text').inputValue()).includes('2569'), '複製權限被拒時提供手動選取文字');
  await fillDate(2026, 9, 5);
  check(await page.locator('#manual-copy').isHidden(), '日期變更清除舊的手動複製結果');

  await fillDate(1911, 1, 1);
  check((await text('roc-result')).includes('民國前 1 年'), '1911 年顯示民國前一年');
  check(await page.locator('#historical-note').isVisible(), '1941 年以前顯示舊制紀年提示');
  await page.locator('input[value="roc"]').check();
  check(await page.locator('#year').inputValue() === '' && await page.locator('#result-content').isHidden(), '早於民國元年的日期不被轉成零年');
  await page.locator('#today-button').click();
  check(await page.locator('#year').inputValue() === String(today.year - 1911), '民國模式帶入今天正確');
  await page.locator('input[value="ce"]').check();
  await fillDate(2026, 9, 5);
  await page.locator('#zodiac-rule').selectOption('lunar');
  await page.locator('[data-language="th"]').click();
  await page.reload({ waitUntil: 'networkidle' });
  check(await page.locator('html').getAttribute('lang') === 'th', '重新開啟保留語言偏好');
  const storage = await page.evaluate(() => Object.entries(localStorage));
  check(storage.length === 1 && storage[0][0] === 'wandee-language', '僅儲存語言偏好，沒有儲存日期');

  for (const language of ['zh', 'th']) {
    await page.locator(`[data-language="${language}"]`).click();
    await fillDate(2026, 11, 30);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const overflow = await page.evaluate(() => {
        const panel = document.querySelector('.result-panel').getBoundingClientRect();
        const date = document.querySelector('#be-month-day').getBoundingClientRect();
        return document.documentElement.scrollWidth > innerWidth || date.right > panel.right - 5;
      });
      check(!overflow, `${language} 版面在 ${width}px 無水平溢出或日期裁切`);
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: `${outputDirectory}/${language}-${width}.png`, fullPage: true });
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.locator('[data-language="zh"]').click();
  await fillDate(2026, 9, 5);
  const missingTranslations = await page.locator('[data-i18n]').evaluateAll((elements) => elements.filter((element) => !element.textContent || element.textContent === 'undefined').length);
  check(missingTranslations === 0, '所有介面翻譯鍵都有文字');
  await page.keyboard.press('ControlOrMeta+Home');
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press('Tab');
  const focusedTag = await page.evaluate(() => document.activeElement.tagName);
  check(['A', 'BUTTON', 'INPUT', 'SELECT', 'SUMMARY'].includes(focusedTag), '主要控制項可由鍵盤進入');
  check(pageErrors.length === 0, `瀏覽器沒有 JavaScript 錯誤：${JSON.stringify(pageErrors)}`);
  check(failedResponses.length === 0, `所有頁面資源載入成功：${JSON.stringify(failedResponses)}`);

  for (const timezoneId of ['America/Los_Angeles', 'Asia/Bangkok']) {
    const zoneContext = await browser.newContext({ timezoneId, locale: 'th-TH' });
    const zonePage = await zoneContext.newPage();
    await zonePage.goto(baseUrl);
    await zonePage.locator('#year').fill('2026');
    await zonePage.locator('#month').selectOption('2');
    await zonePage.locator('#day').fill('17');
    check(await zonePage.locator('#thai-date').textContent() === 'วันอังคารที่ 17 กุมภาพันธ์ พ.ศ. 2569', `${timezoneId} 時區的星期與春節日期不漂移，泰文瀏覽器預設泰文`);
    await zoneContext.close();
  }
  console.log(`\n${checks} 項瀏覽器驗證通過；截圖：${outputDirectory}`);
} finally {
  await browser.close();
}
