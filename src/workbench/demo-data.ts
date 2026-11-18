// 公開示範專用。所有專案、日期、文字、工時與金額均為虛構。
type DemoTask = {
  id: string
  date: string
  day: string
  title: string
  hours: number
  status: 'done' | 'doing'
  summary: string
  detail: string
  next: string
}

export const demoWeek = {
  project: '河岸社區春季市集提案',
  dates: '2026/3/9（一）– 3/13（五）',
  reportNote: '目前還在等帳篷租金報價。',
  tasks: [
    {
      id: 'interviews', date: '2026-03-09', day: '3/9 一', title: '訪談三位攤主', hours: 2.5, status: 'done',
      summary: '訪談三位攤主，確認遮雨與電源兩項需求',
      detail: '攤主最在意下雨怎麼辦、現場有沒有插座。已整理成一頁需求清單。',
      next: '把需求清單放進提案附件',
    },
    {
      id: 'venues', date: '2026-03-10', day: '3/10 二', title: '比較兩個場地', hours: 2, status: 'done',
      summary: '比較河岸廣場與活動中心，建議選河岸廣場',
      detail: '河岸廣場人潮多，活動中心有屋頂。建議選河岸廣場，另外準備雨天備案。',
      next: '向里辦公處詢問借用流程',
    },
    {
      id: 'budget', date: '2026-03-11', day: '3/11 三', title: '預算初稿', hours: 3, status: 'doing',
      summary: '預算初稿完成八成，總額暫估 48,000 元',
      detail: '帳篷租金還在等報價，其餘項目已填入。',
      next: '收到報價後補齊並定稿',
    },
    {
      id: 'volunteers', date: '2026-03-12', day: '3/12 四', title: '志工招募表單', hours: 1.5, status: 'done',
      summary: '志工招募表單草稿完成',
      detail: '分成場佈、引導、收拾三個時段，可以只報一段。',
      next: '請兩位鄰居試填',
    },
    {
      id: 'outline', date: '2026-03-13', day: '3/13 五', title: '提案簡報大綱', hours: 2, status: 'doing',
      summary: '提案簡報大綱排出六頁架構',
      detail: '還缺預算頁與雨天備案頁的內容。',
      next: '等預算定稿後填入',
    },
  ] satisfies DemoTask[],
  next: ['補齊帳篷報價，預算定稿', '請兩位鄰居試填志工表單', '完成提案簡報並約里長說明'],
}
