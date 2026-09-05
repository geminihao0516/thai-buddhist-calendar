# 好日子 วันดี · 中泰佛曆換算

輸入西元或民國日期，自動換算泰國佛曆、星期及生肖。繁體中文／泰文介面，適用電腦與手機。

เว็บไซต์แปลงวันที่จาก ค.ศ. หรือปีไต้หวัน (ROC) เป็น พ.ศ. พร้อมวันในสัปดาห์และปีนักษัตรจีน รองรับภาษาจีนตัวเต็มและภาษาไทย

網站：[好日子 วันดี](https://geminihao0516.github.io/thai-buddhist-calendar/)

## 功能與換算規則

- 西元：1901–2100 年；民國：1–189 年，即西元 1912–2100 年。
- 現行泰國佛曆＝西元＋543；民國轉西元＝民國＋1911。月份、日與公曆相同。
- 1941 年以前以現行佛曆回推，介面與複製內容都會提示；不聲稱重建泰國舊制官方紀年。
- 星期以輸入的日曆日期計算；使用 UTC 固定日期，避免瀏覽器時區造成跨日。「今天」使用裝置日期。
- 生肖預設以農曆正月初一換年。使用瀏覽器 `Intl` 的 Chinese calendar `relatedYear`，再對照十二生肖；不使用立春或泰國傳統換年法。
- 可切換「西元 1 月 1 日」作單純年份生肖對照，畫面與複製內容會標示選用規則。
- 支援半形、全形及泰文數字。無效日期會提示並隱藏舊結果，避免誤認已成功換算。
- 繁中／泰文切換會同步更新表單、日期、星期、生肖、說明、錯誤及複製內容；泰文瀏覽器初次預設泰文。
- 複製結果可直接貼給朋友。剪貼簿權限不允許時提供手動選取文字。
- 日期不送往伺服器，也不保存在網址或儲存空間。`localStorage` 只保存語言偏好；無追蹤碼、外部字型或第三方執行期請求。

## 本機使用

純 HTML、CSS、JavaScript ES modules，無需安裝產品相依套件或建置。

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

開啟 `http://127.0.0.1:4173/`。ES modules 應以 HTTP 開啟，不使用 `file://`。

核心測試需要 Node.js 20 或更新版本：

```sh
node --test calendar.test.mjs
node --check app.mjs
node --check locales.mjs
```

瀏覽器測試使用 Playwright 和本機 Chrome；開啟上述伺服器後執行：

```sh
node browser.test.mjs
```

若 Playwright 位於共用環境，可用 `PLAYWRIGHT_MODULE` 指定其 `index.mjs` 或 `index.js` 絕對路徑。`TEST_URL` 可改測線上網站；`SCREENSHOT_DIR` 可指定截圖位置，預設 `/tmp/thai-calendar-verification`。

## GitHub Pages

專用 repository：`geminihao0516/thai-buddhist-calendar`。

Pages 來源設定為 `main` 分支、`/(root)`。`.nojekyll` 讓檔案以靜態資源提供，所有資源使用相對路徑，支援 repository 子路徑。不需要 API 金鑰、後端服務或自訂 Actions workflow。

## 檔案

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 語意化版面與表單 |
| `styles.css` | 米白／深紅配色、手機排版、鍵盤焦點樣式 |
| `calendar.mjs` | 日期驗證與曆法計算 |
| `locales.mjs` | 中泰翻譯與結果格式 |
| `app.mjs` | 表單、語言、即時換算與剪貼簿互動 |
| `calendar.test.mjs` | 曆法、閏年、春節邊界與翻譯一致性測試 |
| `browser.test.mjs` | Chrome 互動、剪貼簿、時區與手機版面驗證 |

## 參考資料與相容性

- [Oracle：Supported Calendars — Thai Buddhist Calendar](https://docs.oracle.com/javase/8/docs/technotes/guides/intl/calendar.doc.html)
- [香港天文台：十二生肖](https://www.hko.gov.hk/tc/gts/time/12animals.htm)
- [香港天文台：公曆與農曆對照表](https://www.hko.gov.hk/tc/gts/time/conversion.htm)
- [香港天文台：2026 年 2 月月曆](https://www.hko.gov.hk/en/gts/astron2026/files/2026cal02.pdf)，2026 年 2 月 17 日為農曆正月初一、星期二，生肖由蛇轉馬。
- [MDN：Intl.DateTimeFormat.formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)，農曆年的 `relatedYear` 格式。

需啟用 JavaScript 的現代瀏覽器。缺少 Chinese calendar／`relatedYear` 支援時，佛曆與星期仍可計算；農曆生肖會顯示明確提示，可改用西元年份對照。未附完整離線農曆資料表，農曆結果依瀏覽器內建 ICU 資料。
