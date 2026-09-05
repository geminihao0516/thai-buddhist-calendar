export const ZODIAC_EMOJI = ['🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐐', '🐵', '🐔', '🐶', '🐷'];
export const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];
export const translations = {
  zh: {
    title: '好日子 วันดี｜中泰佛曆換算',
    skip: '跳至日期換算', brandCaption: '中泰日期換算',
    heroFirst: '同一天，', heroSecond: '換個曆法。',
    intro: '從熟悉的日期出發，輕鬆看懂泰國佛曆、星期與生肖。',
    seal: '連結每一個好日子',
    inputHeading: '輸入你的日期', inputDescription: '選擇曆法，填入年月日就會自動換算。',
    eraLegend: '輸入日期的曆法', ceTab: '西元 AD', rocTab: '民國 ROC',
    ceYear: '西元年', rocYear: '民國年', month: '月', day: '日',
    ceHint: '西元 1901–2100 年', rocHint: '民國 1–189 年', today: '帶入今天',
    zodiacRule: '生肖換年方式', lunarOption: '農曆春節（一般生肖）',
    solarOption: '西元 1 月 1 日（年份對照）',
    lunarHelp: '以農曆正月初一換生肖；一、二月出生尤其要留意。',
    solarHelp: '按西元年份對照生肖，於 1 月 1 日換年；與農曆生肖可能不同。',
    convert: '換算日期', autoNote: '輸入即換算，不必等待',
    resultHeading: '你的泰國日期', updated: '已換算', waiting: '等待輸入',
    buddhistLabel: '泰國佛曆 · พุทธศักราช', beEra: '佛曆年',
    weekdayLabel: '星期', zodiacLunar: '生肖 · 農曆春節', zodiacSolar: '生肖 · 西元年份',
    ceLabel: '西元', rocLabel: '民國', beLabel: '泰國佛曆',
    historicalNote: '此日期早於 1941 年，佛曆以現行「西元＋543」回推，不代表當時泰國官方的舊制紀年。',
    unsupportedNote: '此瀏覽器無法計算農曆生肖，請使用較新版本的瀏覽器，或改選「西元 1 月 1 日」。',
    unavailable: '暫無法計算', copy: '複製換算結果', copied: '✓ 已複製，可以貼給朋友了。',
    copyFallback: '無法自動複製，請選取以下文字後複製。',
    emptyTitle: '等待一個有效日期', emptyDescription: '填好年月日，你的泰國日期就會出現在這裡。',
    explainerHeading: '關於日期的三件小事',
    explainBeTitle: '佛曆，比西元多 543 年',
    explainBeBody: '泰國日常使用佛曆紀年，月份與日期和西元相同。例如西元 2026 年，就是佛曆 2569 年。',
    explainRocTitle: '民國，也能直接換算',
    explainRocBody: '民國年加 1911 就是西元年，再加 543 即為佛曆。例如民國 115 年＝西元 2026 年＝佛曆 2569 年。',
    explainZodiacTitle: '生肖，要留意換年那一天',
    explainZodiacBody: '預設依農曆正月初一換生肖，一、二月可能仍屬前一年的生肖。這裡提供華人生肖及泰文名稱，未採立春或泰國傳統換年法。',
    methodHeading: '換算範圍與參考資料',
    methodBody: '支援西元 1901–2100 年；民國輸入限 1–189 年（1912–2100）。佛曆統一採現行西元＋543；1941 年以前的日期會另行提示。星期依輸入的日曆日期計算，不進行時區換日；「今天」採裝置日期。',
    methodSources: '生肖以農曆年為預設，也可切換為西元年份對照。曆法與生肖資料可參考：',
    sourceZodiac: '香港天文台｜十二生肖 ↗',
    sourceCalendar: '香港天文台｜公曆與農曆對照表 ↗',
    sourceBe: 'Oracle｜泰國佛曆說明 ↗',
    privacy: '日期只在你的裝置換算，不會上傳或儲存。',
    invalidCeYear: '請輸入西元 1901 至 2100 年的整數年份。',
    invalidRocYear: '請輸入民國 1 至 189 年的整數年份。',
    invalidMonth: '請選擇 1 至 12 月。',
    invalidDay: '這個月份的日期須為 1 至 {maxDay} 日，請檢查輸入。',
    invalidMode: '請選擇有效的曆法與生肖換年方式。',
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    animals: ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'],
    animalYears: ['鼠年', '牛年', '虎年', '兔年', '龍年', '蛇年', '馬年', '羊年', '猴年', '雞年', '狗年', '豬年'],
  },
  th: {
    title: 'วันดี 好日子｜แปลงวันที่เป็น พ.ศ.',
    skip: 'ข้ามไปแปลงวันที่', brandCaption: 'แปลงวันที่ไต้หวัน–ไทย',
    heroFirst: 'วันเดียวกัน ', heroSecond: 'ต่างศักราช',
    intro: 'แปลงวันที่ที่คุ้นเคยเป็น พ.ศ. พร้อมวันในสัปดาห์และปีนักษัตรจีน',
    seal: 'เชื่อมทุกวันดี ๆ',
    inputHeading: 'ใส่วันที่ของคุณ', inputDescription: 'เลือกศักราช แล้วใส่วันที่เพื่อแปลงอัตโนมัติ',
    eraLegend: 'ศักราชของวันที่ที่กรอก', ceTab: 'ค.ศ. AD', rocTab: 'ไต้หวัน ROC',
    ceYear: 'ปี ค.ศ.', rocYear: 'ปีไต้หวัน (ROC)', month: 'เดือน', day: 'วันที่',
    ceHint: 'ค.ศ. 1901–2100', rocHint: 'ROC ปีที่ 1–189', today: 'ใช้วันนี้',
    zodiacRule: 'เกณฑ์เปลี่ยนปีนักษัตร', lunarOption: 'วันตรุษจีน (นักษัตรจีน)',
    solarOption: '1 มกราคม (ตามปี ค.ศ.)',
    lunarHelp: 'เปลี่ยนปีในวันตรุษจีน ผู้ที่เกิดเดือนมกราคมหรือกุมภาพันธ์ควรตรวจสอบเป็นพิเศษ',
    solarHelp: 'เทียบตามปี ค.ศ. โดยเปลี่ยนปีวันที่ 1 มกราคม ผลอาจต่างจากนักษัตรจีน',
    convert: 'แปลงวันที่', autoNote: 'แปลงอัตโนมัติทันทีที่กรอก',
    resultHeading: 'วันที่แบบไทยของคุณ', updated: 'แปลงแล้ว', waiting: 'รอวันที่',
    buddhistLabel: 'พุทธศักราช · BUDDHIST ERA', beEra: 'พ.ศ.',
    weekdayLabel: 'วันในสัปดาห์', zodiacLunar: 'นักษัตรจีน · ตรุษจีน', zodiacSolar: 'นักษัตร · ตามปี ค.ศ.',
    ceLabel: 'ค.ศ.', rocLabel: 'ปีไต้หวัน (ROC)', beLabel: 'พ.ศ.',
    historicalNote: 'วันที่นี้อยู่ก่อน ค.ศ. 1941 จึงคำนวณย้อนหลังด้วยสูตรปัจจุบัน ค.ศ. + 543 ไม่ใช่ศักราชตามปฏิทินราชการไทยในสมัยนั้น',
    unsupportedNote: 'เบราว์เซอร์นี้ไม่รองรับการคำนวณนักษัตรจีน โปรดใช้เบราว์เซอร์รุ่นใหม่ หรือเลือกเกณฑ์ 1 มกราคม',
    unavailable: 'ยังคำนวณไม่ได้', copy: 'คัดลอกผลการแปลง', copied: '✓ คัดลอกแล้ว พร้อมวางให้เพื่อนอ่าน',
    copyFallback: 'คัดลอกอัตโนมัติไม่ได้ โปรดเลือกและคัดลอกข้อความด้านล่าง',
    emptyTitle: 'รอวันที่ที่ถูกต้อง', emptyDescription: 'กรอกปี เดือน และวันที่ แล้วผลการแปลงจะแสดงที่นี่',
    explainerHeading: '3 เรื่องน่ารู้เกี่ยวกับวันที่',
    explainBeTitle: 'พ.ศ. มากกว่า ค.ศ. 543 ปี',
    explainBeBody: 'ประเทศไทยใช้ พ.ศ. ในชีวิตประจำวัน โดยเดือนและวันที่ตรงกับปฏิทินสากล เช่น ค.ศ. 2026 ตรงกับ พ.ศ. 2569',
    explainRocTitle: 'แปลงปีไต้หวันได้โดยตรง',
    explainRocBody: 'ปีไต้หวัน (ROC หรือหมินกั๋ว) บวก 1911 จะได้ ค.ศ. แล้วบวกอีก 543 จะได้ พ.ศ. เช่น ROC 115 = ค.ศ. 2026 = พ.ศ. 2569',
    explainZodiacTitle: 'นักษัตรขึ้นอยู่กับวันเปลี่ยนปี',
    explainZodiacBody: 'ค่าเริ่มต้นเปลี่ยนปีในวันตรุษจีน ผู้เกิดเดือนมกราคมหรือกุมภาพันธ์อาจยังอยู่ในนักษัตรปีก่อน แสดงนักษัตรจีนพร้อมชื่อไทย ไม่ใช้วันลี่ชุนหรือเกณฑ์เปลี่ยนปีแบบไทยดั้งเดิม',
    methodHeading: 'ช่วงวันที่และแหล่งอ้างอิง',
    methodBody: 'รองรับ ค.ศ. 1901–2100 และปีไต้หวัน 1–189 (ค.ศ. 1912–2100) คำนวณ พ.ศ. ด้วย ค.ศ. + 543 เสมอ โดยแจ้งเมื่อเป็นวันที่ก่อน ค.ศ. 1941 วันในสัปดาห์ยึดตามวันที่ที่กรอก ไม่แปลงเขตเวลา ส่วน “วันนี้” ใช้วันที่ของอุปกรณ์',
    methodSources: 'ค่าเริ่มต้นใช้ปีนักษัตรจีนตามวันตรุษจีน หรือเลือกเทียบตามปี ค.ศ. ได้ อ่านเพิ่มเติมได้ที่:',
    sourceZodiac: 'หอดูดาวฮ่องกง | 12 นักษัตร (ภาษาจีน) ↗',
    sourceCalendar: 'หอดูดาวฮ่องกง | ตารางปฏิทินจีน (ภาษาจีน) ↗',
    sourceBe: 'Oracle | ปฏิทินพุทธศักราช (ภาษาอังกฤษ) ↗',
    privacy: 'คำนวณบนอุปกรณ์ของคุณเท่านั้น ไม่ส่งหรือบันทึกวันที่',
    invalidCeYear: 'กรุณากรอกปี ค.ศ. เป็นจำนวนเต็มตั้งแต่ 1901 ถึง 2100',
    invalidRocYear: 'กรุณากรอกปีไต้หวัน (ROC) เป็นจำนวนเต็มตั้งแต่ 1 ถึง 189',
    invalidMonth: 'กรุณาเลือกเดือน 1 ถึง 12',
    invalidDay: 'เดือนนี้มีวันที่ 1 ถึง {maxDay} กรุณาตรวจสอบวันที่',
    invalidMode: 'กรุณาเลือกศักราชและเกณฑ์ปีนักษัตรที่ถูกต้อง',
    weekdays: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
    animals: ['หนู', 'วัว', 'เสือ', 'กระต่าย', 'มังกร', 'งู', 'ม้า', 'แพะ', 'ลิง', 'ไก่', 'สุนัข', 'หมู'],
    animalYears: ['ปีชวด', 'ปีฉลู', 'ปีขาล', 'ปีเถาะ', 'ปีมะโรง', 'ปีมะเส็ง', 'ปีมะเมีย', 'ปีมะแม', 'ปีวอก', 'ปีระกา', 'ปีจอ', 'ปีกุน'],
  },
};

/** 提供日期、朗讀及複製共用文字，確保語言切換後內容一致。 */
export function formatResult(result, language) {
  const t = translations[language];
  const zh = language === 'zh';
  const { year, month, day, beYear, rocYear, weekday, zodiacIndex, rule } = result;
  const thaiDate = `${translations.th.weekdays[weekday]}ที่ ${day} ${THAI_MONTHS[month - 1]} พ.ศ. ${beYear}`;
  const date = zh ? `${year} 年 ${month} 月 ${day} 日` : `${day} ${THAI_MONTHS[month - 1]} ${year}`;
  const rocPrefix = rocYear > 0
    ? (zh ? `${rocYear} 年` : `ปีที่ ${rocYear}`)
    : (zh ? `民國前 ${1 - rocYear} 年` : `${1 - rocYear} ปีก่อนเริ่ม ROC`);
  const rocDate = zh ? `${rocPrefix} ${month} 月 ${day} 日`
    : `${day} ${THAI_MONTHS[month - 1]} · ${rocPrefix}`;
  const monthDay = zh ? `${month} 月 ${day} 日` : `${day} ${THAI_MONTHS[month - 1]}`;
  const zodiacLabel = t[rule === 'lunar' ? 'zodiacLunar' : 'zodiacSolar'];
  const zodiac = zodiacIndex === null ? t.unavailable : t.animalYears[zodiacIndex];
  const secondaryLanguage = zh ? 'th' : 'zh';
  const other = translations[secondaryLanguage];
  const zodiacSecondary = zodiacIndex === null ? '' : (zh
    ? `${other.animalYears[zodiacIndex]} · ${other.animals[zodiacIndex]}`
    : t.animals[zodiacIndex]);
  const weekdayText = t.weekdays[weekday];
  const weekdaySecondary = other.weekdays[weekday];
  const lines = [
    zh ? `${t.beLabel}：${beYear} 年 ${month} 月 ${day} 日` : thaiDate,
    ...(zh ? [thaiDate] : []),
    `${t.weekdayLabel}：${weekdayText}`,
    `${zodiacLabel}：${zodiac}${zodiacSecondary ? ` (${zodiacSecondary})` : ''}`,
    `${t.ceLabel}：${date}`,
    `${t.rocLabel}：${rocDate}`,
  ];
  if (year < 1941) lines.push(t.historicalNote);
  if (zodiacIndex === null) lines.push(t.unsupportedNote);
  return {
    thaiDate, date, rocDate, monthDay, zodiacLabel, zodiac, zodiacSecondary,
    weekdayText, weekdaySecondary, secondaryLanguage, copy: lines.join('\n'),
  };
}
