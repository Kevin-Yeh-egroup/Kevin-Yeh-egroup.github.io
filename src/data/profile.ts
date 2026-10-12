// 網站上所有文字都在這個檔案。要改內容，只改這裡就好，版面會自動跟著更新。
// 還沒確定的地方用 todo('…') 標記：預覽版會顯示成「待補」，正式網站會自動隱藏。
// 執行 npm run todo 可以列出所有還沒補的項目。

export type Todo = { todo: string }
export type Text = string | Todo

export const todo = (what: string): Todo => ({ todo: what })
export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'object' && value !== null && 'todo' in value

export type Station = { name: string; org?: string; years: string }
export type Chapter = {
  no: string
  name: string
  years: string
  line: string
  current?: boolean
  stations: Station[]
}
export type Teaching = { who: Text; how: Text; topic: string; when: Text }
export type Resource = { name: string; desc: string; status: string; href?: Text }
export type Work = {
  name: string
  since?: string
  line: string
  from: string
  role: Text
  href?: Text
  award?: { text: string; href: string }
}
export type TimelineRow = { period: Text; org: string; title: string; did: Text[] }
export type ContactLink = { label: string; href: Text }

export const profile = {
  name: '葉先博',
  nameEn: 'Kevin',
  tags: '財金 × 社工 × AI',
  headline: ['我會的，', '你也可以會。'],
  subtitle:
    '從保險、早餐店到社工現場，我一直在找有效的方法。2024 年開始學 AI，現在用 vibe coding 和 Codex 做工具，也把方法教給每個想學的人。',
  ctas: [
    { label: '看我走過的路', href: '#journey' },
    { label: '一起學', href: '#learn' },
  ],
  photo: {
    jpg: 'images/kevin-it-matters-2025-1200.jpg',
    webp800: 'images/kevin-it-matters-2025-800.webp',
    webp1200: 'images/kevin-it-matters-2025-1200.webp',
    width: 1200,
    height: 900,
    alt: '葉先博穿著深藍色西裝，在 2025 IT Matters Awards 頒獎典禮背板前拿著獎座',
    caption: '2025 IT Matters Awards 頒獎典禮',
  },

  journey: {
    nav: '我走過的路',
    title: '不只自己學會，也要大家都會。',
    chapters: [
      {
        no: '01',
        name: '學會',
        years: '2010–2016',
        line: '把錢的事學起來',
        stations: [
          { name: '財金系', org: '元智大學', years: '2010–2014' },
          { name: '保險業務', org: '中國人壽', years: '2013–2016' },
        ],
      },
      {
        no: '02',
        name: '用上',
        years: '2016–2022',
        line: '把方法用在現場',
        stations: [
          { name: '保單健診軟體業務', org: '商智資訊', years: '2016–2020' },
          { name: '回家顧早餐店', org: '花蓮', years: '2020–2022' },
        ],
      },
      {
        no: '03',
        name: '教會',
        years: '2022–現在',
        line: '讓大家都會',
        current: true,
        stations: [
          { name: '社工', org: '馴錢師', years: '2022 起' },
          { name: '三角湧扶青社社長', org: '國際扶輪 3490 地區', years: '2024–2025' },
          { name: '學 AI、教 vibe coding', years: '2024/6 起' },
        ],
      },
    ] satisfies Chapter[],
  },

  learn: {
    nav: '一起學',
    title: '一起學',
    subtitle: '一個人會不算會，大家都會才算。',
    intro:
      '2024 年 6 月，我從零開始學 AI。我不是工程師出身，一路都是邊做邊學，所以知道新手會卡在哪裡。',
    vibe: {
      term: 'vibe coding 是什麼？',
      definition: '用說的告訴 AI 你要什麼，讓它幫你寫程式，做出網頁和工具。',
    },
    path: ['2024/6 開始學 AI', todo('第一個用 AI 做出來的東西'), '現在用 Codex 做工具、帶夥伴'] satisfies Text[],
    taughtTitle: '我教過的',
    taught: [
      { who: '社工夥伴', how: todo('形式'), topic: '用 AI 協助社工工作', when: todo('時間或次數') },
      { who: '工讀夥伴', how: todo('形式'), topic: 'Codex 入門與實戰', when: '進行中' },
      { who: todo('對象'), how: todo('形式'), topic: 'vibe coding 入門', when: todo('時間或次數') },
    ] satisfies Teaching[],
    resourcesTitle: '可以直接拿去用',
    resources: [
      {
        name: 'Codex 真實案例學習站',
        desc: '用真實的 Codex 操作案例做成的學習網站。',
        status: '已上線',
        href: todo('連結（確認能公開）'),
      },
      {
        name: 'VLC 轉 MP3 教學',
        desc: '一步一步的圖文教學，照著做就會。',
        status: '已上線',
        href: todo('連結（確認能公開）'),
      },
      {
        name: '台灣會計互動課程',
        desc: '零基礎也能懂借貸的互動課程。',
        status: '即將公開',
      },
    ] satisfies Resource[],
  },

  works: {
    nav: '作品',
    title: '作品',
    items: [
      {
        name: '好理家在網站經營',
        line: '把財務問卷、保險資訊、社工時間軸這些工具做進好理家在網站，讓家庭和社工都用得上。',
        from: '從保險業務、保單健診、社工這幾站長出來',
        role: todo('我負責的部分'),
        href: 'https://www.familyfinhealth.com/',
        award: {
          text: '專案獲 2025 IT Matters「AI Selected 社會影響力獎」',
          href: 'https://www.familyfinhealth.com/news/1',
        },
      },
      {
        name: '台灣貧窮地圖',
        since: '2026/9 起',
        line: '用地圖看各地的貧窮資料，附方法說明和功能導覽。',
        from: '從社工現場長出來',
        role: todo('我負責的部分'),
        href: todo('導覽頁連結'),
      },
    ] satisfies Work[],
    upcoming: { label: '即將公開', name: '台灣會計互動課程', line: '零基礎也能懂借貸的互動課程。' },
  },

  about: {
    nav: '關於我',
    title: '關於我',
    lead: '從保單健診到家庭財務健檢，我一直在幫人看懂自己的錢。',
    paragraphs: [
      '我是葉先博，大家叫我 Kevin。元智大學財金系畢業，做過保險業務，也在保單健診軟體公司帶業務夥伴、教客戶用系統。',
      '2020 年我回花蓮幫家裡顧早餐店。2022 年加入馴錢師，開始做社工，陪家庭把錢的事理清楚。',
      '2024 年 6 月開始學 AI，現在用 vibe coding 和 Codex 做工具，也帶身邊的夥伴一起學。工作之外，我擔任過國際扶輪 3490 地區三角湧扶青社 2024–25 年度社長。',
    ],
    motto:
      '沒有解決不了的問題，如果有，代表沒有堅持到找出有效的方法。沒有不能合作的對象，不論外部還內部，如果有，代表雙方還有事情還沒做到位。',
    mottoLabel: '我的座右銘',
  },

  timeline: {
    title: '經歷與證照',
    rows: [
      { period: '2024/6–現在', org: '自學、工作中實作', title: 'AI、vibe coding、Codex', did: ['用 AI 做工具，帶夥伴一起學'] },
      { period: '2024–2025', org: '國際扶輪 3490 地區三角湧扶青社', title: '社長', did: [todo('任內做過的事')] },
      { period: '2022/5–現在', org: '馴錢師財商顧問', title: '社工助理', did: ['個案管理、資源連結、課務安排、研習與活動'] },
      { period: todo('期間'), org: '國立空中大學', title: '社工學分班', did: ['進修助人工作的專業'] },
      {
        period: '2020/11–2022/4',
        org: '花蓮滿點早餐',
        title: '儲備幹部、店長',
        did: ['協助家裡經營', todo('營收成長近 50%：確認期間與比較基準後再放')],
      },
      { period: '2016/4–2020/8', org: '商智資訊', title: '業務主任', did: ['保單健診軟體推廣、客戶教育訓練、帶夥伴開發業務'] },
      { period: '2013/2–2016/3', org: '中國人壽', title: '業務專員', did: ['電話約訪、商品銷售、客戶溝通'] },
      { period: '2010/9–2014/6', org: '元智大學', title: '財務金融學士', did: ['雙主修財務金融與行銷學程，輔修領導學程'] },
    ] satisfies TimelineRow[],
    certificatesTitle: '證照',
    certificates: ['人身保險業務員', '外幣收付之非投資型人身保險', 'GEPT 全民英檢中級', 'TOEIC 730'],
    awardsTitle: '獎項',
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
    title: '想學 AI、想一起做工具，或只是想聊聊，都歡迎來找我。',
    links: [
      { label: 'LinkedIn', href: todo('LinkedIn 網址') },
      { label: 'Email', href: todo('要公開的信箱') },
      { label: 'GitHub', href: 'https://github.com/Kevin-Yeh-egroup' },
    ] satisfies ContactLink[],
  },

  footer: '這個網站也是用 vibe coding 做出來的。',
}
