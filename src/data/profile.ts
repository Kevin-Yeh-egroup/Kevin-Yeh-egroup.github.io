// 網站上所有文字、數字、圖片設定都在這個檔案。要改內容，只改這裡就好，版面會自動跟著更新。
// 還沒確定的地方用 todo('…') 標記：預覽版會顯示成「待補」，正式網站會自動隱藏。
// 執行 npm run todo 可以列出所有還沒補的項目。

export type Todo = { todo: string }
export type Text = string | Todo

export const todo = (what: string): Todo => ({ todo: what })
export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'object' && value !== null && 'todo' in value

// 每個數字都要寫出處；沒有出處的數字不能放上網站
export type Source = { label: string; href?: string }
export type Metric = {
  id: string
  value: number
  display: string
  unit: string
  label: string
  source: Source
  // 點了之後去哪裡：#區塊 或 sheet:面板代號
  target: string
  // 進到畫面時數字從 0 跑上來（年份這類數字不要跑）
  count?: boolean
  // 數字旁邊的小圖示
  icon?: 'award'
}

export type Chapter = 'learn' | 'apply' | 'teach'
export type IconKind = 'cap' | 'shield' | 'laptop' | 'egg' | 'book' | 'heart' | 'people' | 'sprout' | 'chat' | 'map' | 'mic'

// 經歷只寫一次：「我走過的路」、點開的面板、「完整經歷」都從這裡產生
export type LifeEvent = {
  id: string
  start?: string
  end?: string | 'now'
  period?: Text
  chapter: Chapter
  icon: IconKind
  short: string
  title: string
  org: string
  story?: string
  note?: string
  did: Text[]
  node?: boolean
}

export type WorkView = { id: string; label: string; image: string; alt: string; width: number; height: number; widths?: number[] }
export type Work = {
  id: string
  name: string
  short: string
  line: string
  since?: string
  status?: string
  chips?: string[]
  views?: WorkView[]
  facts?: { label: string; value: string; source?: Source }[]
  award?: { text: string; href: string }
  href?: Text
  hrefLabel?: string
  role: Text
  // 作品卡片上疊在前面的第二張畫面（views 裡的 id）
  tileFront?: string
}

// 接下來：工作的四個步驟、證據、想做的事
// visual：說明卡下方的小圖（chips 一排標籤、reply 回覆的樣子、proof 證據時間線、flow 一直改下去的流程）
export type NextStep = {
  id: string
  name: string
  short: string
  text: string
  icon: IconKind
  visual: { kind: 'chips' | 'reply' | 'proof' | 'flow'; title: string; items: string[] }
}
export type NextGoal = { id: string; name: string; line: string; icon: IconKind; target?: string }

export type Teaching = { who: Text; topic: string; how: Text; when: Text }
export type Resource = { name: string; desc: string; status: string; href?: Text }
export type ContactLink = { label: string; href: Text }

const PHOTO = {
  jpg: 'images/kevin-it-matters-2025-1200.jpg',
  webp800: 'images/kevin-it-matters-2025-800.webp',
  webp1200: 'images/kevin-it-matters-2025-1200.webp',
  width: 1200,
  height: 900,
  alt: '葉先博穿著深藍色西裝，在 2025 IT Matters Awards 頒獎典禮背板前拿著獎座',
}

export const profile = {
  name: '葉先博',
  nameEn: 'Kevin',
  tags: '財金 × 社工 × AI',
  headline: ['我會的，', '你也可以會。'],
  oneLiner: '沒寫過一行程式，也能用 AI 做出幫人的工具。',
  photo: PHOTO,

  video: {
    label: '2 分鐘看完我的故事',
    wide: 'video/kevin-intro-16x9.mp4',
    tall: 'video/kevin-intro-9x16.mp4',
    poster: 'video/kevin-intro-poster-1280.webp',
    posterSmall: 'video/kevin-intro-poster-640.webp',
    posterTall: 'video/kevin-intro-poster-tall.webp',
    alt: '介紹影片封面：深色背景上寫著「我沒寫過一行程式。到今天也是。」',
  },

  metrics: [
    {
      id: 'code',
      value: 0,
      display: '0',
      unit: '行',
      label: '親手寫的程式碼',
      source: { label: '葉先博本人' },
      target: '#learn',
    },
    {
      id: 'villages',
      value: 7794,
      display: '7,794',
      unit: '個村里',
      label: '貧窮地圖看得到的範圍',
      source: { label: '台灣貧窮地圖', href: 'https://www.familyfinhealth.com/taiwan-poverty-map' },
      target: 'sheet:work-map',
      count: true,
    },
    {
      id: 'award',
      value: 2025,
      display: '2025',
      unit: '',
      label: '專案獲 IT Matters 社會影響力獎',
      source: { label: 'IT Matters 獲獎報導', href: 'https://www.familyfinhealth.com/news/1' },
      target: 'sheet:work-familyfin',
      icon: 'award',
    },
  ] satisfies Metric[],

  works: {
    nav: '作品',
    title: '做出來的東西',
    hint: '點開看看',
    items: [
      {
        id: 'map',
        name: '台灣貧窮地圖',
        short: '看見各地的處境，找到附近可以問的人',
        line: '查詢村里低收入與中低收入人口的分布，也找附近的福利資源。',
        since: '2026/9 起',
        views: [
          { id: '3d', label: '立體', image: 'images/works/map-3d', alt: '台灣貧窮地圖的立體模式：深色底上，台灣各村里依數值高低長成柱狀', width: 1600, height: 900 },
          { id: '2d', label: '全台', image: 'images/works/map-2d', alt: '台灣貧窮地圖的全台平面圖：各村里依數值上色，右邊是先從熟悉的地方開始的列表', width: 1600, height: 900 },
          { id: 'near', label: '找資源', image: 'images/works/map-hualien-welfare', alt: '台灣貧窮地圖拉近到花蓮市，地圖上標出附近的社福據點', width: 1600, height: 900 },
        ],
        facts: [
          { label: '涵蓋範圍', value: '22 縣市、368 鄉鎮市區、7,794 個村里（含離島）', source: { label: '台灣貧窮地圖', href: 'https://www.familyfinhealth.com/taiwan-poverty-map' } },
          { label: '上線', value: '2026 年 9 月' },
        ],
        href: 'https://www.familyfinhealth.com/taiwan-poverty-map',
        hrefLabel: '打開台灣貧窮地圖',
        role: todo('我負責的部分'),
        tileFront: 'near',
      },
      {
        id: 'familyfin',
        name: '好理家在網站經營',
        short: '財務問卷、保險資訊、社工時間軸',
        line: '把財務問卷、保險資訊、社工時間軸這些工具做進好理家在網站，讓家庭和社工都用得上。',
        chips: ['財務問卷', '保險資訊', '社工時間軸'],
        views: [
          { id: 'home', label: '首頁', image: 'images/works/home-hero', alt: '好理家在財務健檢網首頁：先把生活裡的財務壓力，整理成可以開始的下一步', width: 1600, height: 900 },
          { id: 'quiz', label: '財務檢測', image: 'images/works/quiz-landing', alt: '好理家在的財務韌性檢測：10 題、約 3 到 5 分鐘、不用輸入金額', width: 1600, height: 900 },
          { id: 'award', label: '頒獎典禮', image: 'images/kevin-it-matters-2025', alt: PHOTO.alt, width: 1200, height: 900, widths: [800, 1200] },
        ],
        award: {
          text: '專案獲 2025 IT Matters「AI Selected 社會影響力獎」',
          href: 'https://www.familyfinhealth.com/news/1',
        },
        href: 'https://www.familyfinhealth.com/',
        hrefLabel: '打開好理家在',
        role: todo('我負責的部分'),
      },
      {
        id: 'accounting',
        name: '台灣會計互動課程',
        short: '零基礎也能懂借貸',
        line: '零基礎也能懂借貸的互動課程。',
        status: '即將公開',
        role: todo('我負責的部分'),
      },
    ] satisfies Work[],
  },

  journey: {
    nav: '走過的路',
    title: '不只自己學會，也要大家都會。',
    chapters: [
      { id: 'learn', name: '學會', years: '2010–2016', line: '把錢的事學起來' },
      { id: 'apply', name: '用上', years: '2016–2022', line: '把方法用在現場' },
      { id: 'teach', name: '教會', years: '2022–現在', line: '讓大家都會' },
    ] satisfies { id: Chapter; name: string; years: string; line: string }[],
    more: '看完整經歷',
    events: [
      {
        id: 'finance',
        start: '2010-09',
        end: '2014-06',
        chapter: 'learn',
        icon: 'cap',
        short: '讀財金',
        title: '財務金融學士',
        org: '元智大學',
        story: '把錢的事學起來。',
        did: ['雙主修財務金融與行銷學程，輔修領導學程'],
        node: true,
      },
      {
        id: 'insurance',
        start: '2013-02',
        end: '2016-03',
        chapter: 'learn',
        icon: 'shield',
        short: '保險業務',
        title: '業務專員',
        org: '中國人壽',
        story: '每天跟人談錢的事。',
        did: ['電話約訪、商品銷售、客戶溝通'],
        node: true,
      },
      {
        id: 'software',
        start: '2016-04',
        end: '2020-08',
        chapter: 'apply',
        icon: 'laptop',
        short: '保單健診軟體',
        title: '業務主任',
        org: '商智資訊',
        story: '推廣保單健診軟體，帶業務夥伴、教客戶用系統。',
        did: ['保單健診軟體推廣、客戶教育訓練、帶夥伴開發業務'],
        node: true,
      },
      {
        id: 'breakfast',
        start: '2020-11',
        end: '2022-04',
        chapter: 'apply',
        icon: 'egg',
        short: '回花蓮顧早餐店',
        title: '儲備幹部、店長',
        org: '花蓮滿點早餐',
        story: '2020 年回到花蓮，幫家裡顧早餐店。',
        note: '這個網站的蛋黃色，就是從這裡來的。',
        did: ['協助家裡經營', todo('營收成長近 50%：確認期間與比較基準後再放')],
        node: true,
      },
      {
        id: 'study',
        period: todo('期間'),
        chapter: 'apply',
        icon: 'book',
        short: '修社工學分',
        title: '社工學分班',
        org: '國立空中大學',
        did: ['進修助人工作的專業'],
      },
      {
        id: 'social-work',
        start: '2022-05',
        end: 'now',
        chapter: 'teach',
        icon: 'heart',
        short: '做社工',
        title: '社工助理',
        org: '馴錢師財商顧問',
        story: '陪家庭把錢的事理清楚。',
        did: ['個案管理、資源連結、課務安排、研習與活動'],
        node: true,
      },
      {
        id: 'rotaract',
        start: '2024',
        end: '2025',
        chapter: 'teach',
        icon: 'people',
        short: '扶青社社長',
        title: '2024–25 年度社長',
        org: '國際扶輪 3490 地區三角湧扶青社',
        did: [todo('任內做過的事')],
      },
      {
        id: 'ai',
        start: '2024-06',
        end: 'now',
        chapter: 'teach',
        icon: 'sprout',
        short: '學 AI',
        title: 'AI、vibe coding、Codex',
        org: '自學、工作中實作',
        story: '從零開始學 AI，用說的請 AI 做工具，也帶夥伴一起學。',
        did: ['用 AI 做工具，帶夥伴一起學'],
        node: true,
      },
    ] satisfies LifeEvent[],
  },

  // 來源：葉先博在 2026 年 10 月月會分享的未來展望與規劃
  next: {
    title: '成為找到關鍵問題的 FDE。',
    line: '走進現場聽懂真正的需要，用 AI 很快做出來，讓大家馬上看到、馬上回饋。',
    center: { value: '1 週', label: '從需求到原型' },
    fde: {
      button: 'FDE 是什麼？',
      term: 'Forward Deployed Engineer',
      title: '走進現場的工程師',
      text: '走進使用者的現場，聽懂真正的需要、結合手邊的資源，直接把解法做出來，再跟著回饋一起改。',
      reflection: '九月開始，我用這種方式和服務對象、合作夥伴一起做事。一開始常常只先做到最基本的需求；接下來要更深入，找到大家真正想要的，才能真的幫上忙。',
    },
    stepsLabel: '工作的四個步驟',
    steps: [
      {
        id: 'listen',
        name: '聽懂',
        short: '走進現場找痛點',
        icon: 'people',
        text: '不只做到最基本的需求。先了解每個關係人的痛點和想做的事，再找出現有的資源和幫得上忙的方法。',
        visual: { kind: 'chips', title: '要聽懂的人', items: ['服務對象', '社工', '合作夥伴', '願意出力的人'] },
      },
      {
        id: 'reply',
        name: '回覆',
        short: '很快說清楚怎麼做',
        icon: 'chat',
        text: '有 AI 同事一起工作，收到需求後很快就回覆對方：預計怎麼做、什麼時候好。',
        visual: { kind: 'reply', title: '收到需求，先回覆這兩件事', items: ['預計怎麼做', '預計什麼時候好'] },
      },
      {
        id: 'prototype',
        name: '原型',
        short: '一週做出來',
        icon: 'laptop',
        text: '新的 NPO 夥伴，收集完需求後一週內做出原型，直接用畫面討論要做什麼。',
        visual: { kind: 'proof', title: '', items: [] },
      },
      {
        id: 'feedback',
        name: '回饋',
        short: '馬上改、記錄成效',
        icon: 'sprout',
        text: '每個解法都讓夥伴可以直接回饋；收到就改，記錄成效，再告訴大家目前的成果。',
        visual: { kind: 'flow', title: '一直改下去', items: ['夥伴回饋', '馬上改', '記錄成效', '告訴大家成果'] },
      },
    ] satisfies NextStep[],
    proof: {
      title: '一個社福團體：從聽需求到上線，不到一個月',
      points: [
        { when: '9/7', what: '聽需求：會議錄音、Excel 表格' },
        { when: '一週內', what: '做出可以操作的示範網站' },
        { when: '9 月底', what: '正式上線' },
        { when: '10/1', what: '交付正式測試網站' },
      ],
      source: { label: '葉先博，2026 年 10 月月會' },
    },
    goalsTitle: '接下來想做的事',
    goals: [
      { id: 'familyfin', name: '好理家在', icon: 'heart', line: '讓助人者更好用、更願意用，也讓願意出力的人看得見、幫得上', target: 'sheet:work-familyfin' },
      { id: 'map', name: '台灣貧窮地圖', icon: 'map', line: '和更多 NPO 合作，把各地的資源放上地圖', target: 'sheet:work-map' },
      { id: 'voice', name: '社工的錄音', icon: 'mic', line: '錄音轉成文字後自動整理進個案資料，之後讓更多 NPO 也能用' },
    ] satisfies NextGoal[],
  },

  motto: {
    label: '我的座右銘',
    big: '沒有解決不了的問題，',
    rest: '如果有，代表沒有堅持到找出有效的方法。',
    full: '沒有解決不了的問題，如果有，代表沒有堅持到找出有效的方法。沒有不能合作的對象，不論外部還內部，如果有，代表雙方還有事情還沒做到位。',
  },

  learn: {
    nav: '一起學',
    title: '一起學',
    subtitle: '一個人會不算會，大家都會才算。',
    demo: {
      you: '幫我做一個財務健檢問卷',
      ai: '好，這是第一版：',
      result: '財務健檢問卷',
      steps: ['你用說的', 'AI 寫程式', '工具做出來'],
      caption: '這就是 vibe coding：用說的告訴 AI 你要什麼，讓它幫你寫程式，做出網頁和工具。',
      replay: '再看一次',
    },
    tabs: { path: '學習路線', taught: '教過誰', resources: '學習資源' },
    path: ['2024/6 開始學 AI', todo('第一個用 AI 做出來的東西'), '現在用 Codex 做工具、帶夥伴'] satisfies Text[],
    taught: [
      { who: '社工夥伴', topic: '用 AI 協助社工工作', how: todo('形式'), when: todo('時間或次數') },
      { who: '工讀夥伴', topic: 'Codex 入門與實戰', how: todo('形式'), when: '進行中' },
      { who: todo('對象'), topic: 'vibe coding 入門', how: todo('形式'), when: todo('時間或次數') },
    ] satisfies Teaching[],
    resources: [
      { name: 'Codex 行政工作實驗課', desc: '90 分鐘入門實作課：用安全的範例練習整理資料、檢查缺漏、產出草稿', status: '已上線', href: 'https://course-ops-automation-requirements.vercel.app/' },
      { name: 'VLC 轉 MP3 教學', desc: '給沒有 IT 背景的人：7 個步驟把錄影轉成 MP3', status: '已上線', href: 'https://vlc-recording-to-mp3-guide.vercel.app/' },
      { name: '台灣會計互動課程', desc: '零基礎也能懂借貸的互動課程', status: '已上線', href: todo('會計課程網址') },
    ] satisfies Resource[],
    cta: '我也想學',
  },

  about: {
    title: '關於我',
    lead: '從保單健診到家庭財務健檢，我一直在幫人看懂自己的錢。',
    paragraphs: [
      '我是葉先博，大家叫我 Kevin。元智大學財金系畢業，做過保險業務，也在保單健診軟體公司帶業務夥伴、教客戶用系統。',
      '2020 年我回花蓮幫家裡顧早餐店。2022 年加入馴錢師，開始做社工，陪家庭把錢的事理清楚。',
      '2024 年 6 月開始學 AI，現在用 vibe coding 和 Codex 做工具，也帶身邊的夥伴一起學。工作之外，我擔任過國際扶輪 3490 地區三角湧扶青社 2024–25 年度社長。',
    ],
  },

  history: {
    title: '完整經歷',
    tabs: { events: '經歷', about: '關於我', certs: '證照與獎項' },
    certificates: ['人身保險業務員', '外幣收付之非投資型人身保險', 'GEPT 全民英檢中級', 'TOEIC 730'],
    awards: [
      {
        date: '2025/12',
        text: '馴錢師的「好理家在–財務健檢網」獲 2025 IT Matters「AI Selected 社會影響力獎」',
        href: 'https://www.familyfinhealth.com/news/1',
      },
    ],
  },

  contact: {
    nav: '聯絡',
    title: '換你了。',
    line: '想學 AI、想一起做工具，或只是想聊聊，都歡迎來找我。',
    links: [
      { label: 'LinkedIn', href: todo('LinkedIn 網址') },
      { label: 'Email', href: todo('要公開的信箱') },
      { label: 'GitHub', href: 'https://github.com/Kevin-Yeh-egroup' },
    ] satisfies ContactLink[],
  },

  footer: '這個網站也是用 vibe coding 做出來的。',
}

export type Profile = typeof profile
