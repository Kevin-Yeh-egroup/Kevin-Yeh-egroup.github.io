export const weekly2026w47 = {
  id: 'weekly-2026-w47',
  code: 'TW-2026-W47',
  date: '2026-11-19',
  period: '2026/11/16–11/22',
  kind: '創作',
  label: '週刊',
  edition: 4,
  checkedAt: '2026-11-19',
  short: 'Pika Enact 與角色走位',
  read: '約 4 分鐘',
  keywords: 'Pika Enact AI 影片 動畫 角色走位 blocking 分鏡',
  title: "影片還在播，可以請主角往右走嗎？",
  deck: "你請 AI 做一支活動預告。場地有了，人物也出現了，偏偏主角一進門就站住。你看著畫面，心裡想的其實只有一句話：「再往右邊那張桌子走幾步就好了。」這句話，能不能在影片播到一半就說？\n",
  one: '先想觀眾看完要知道什麼，再請 AI 排出那幾個動作。',
  secs: [
    ["sec-news","這週的新知｜Pika Enact","AI 一邊做接下來的畫面，一邊接收新的指示。"],
    ["sec-think","想想看｜你一進門，會往哪裡走？","同一個鏡頭，換個走法就多交代一件事。"],
    ["sec-expert","先想觀眾要看懂哪一步","先想觀眾要看懂哪一步。"],
    ["sec-ai","想做成短片時，這段可以直接交給 AI","讓 AI 幫你把想法變成三格分鏡。"],
    ["sec-use","用在專案前","採用前查底層模型、素材與使用條件。"],
  ],
  body: ({ S, copyBox }) =>
    S("sec-news", '', '', "這週的新知｜Pika Enact", `
      <p class="lim">Pika 在 11 月 18 日展示了一個叫 <strong>Pika Enact</strong> 的研究預覽。AI 會一小段一小段地接著做畫面和聲音。畫面還在跑，你可以拖動人物或道具、用文字或語音給演出指示，也可以改鏡頭的位置。和角色排練過後，還能請 AI 從頭做出一段連續的演出。目前一般使用者還不能試用，我們看到的是 Pika 的展示。<a class="lnk" href="https://pika.art/blog/pika-enact" target="_blank" rel="noopener noreferrer">Pika 官方公告</a>
</p>
    `) +
    S("sec-think", '', '', "想想看｜你一進門，會往哪裡走？", `
      <p class="lim">假設你是第一次來參加工作坊，正在手機上看一支靜音短片。畫面右邊有張桌子，左邊有人在聊天。主角推門進來，在門口站住。光看這幾秒，你知道要往哪裡報到嗎？</p>
      <p class="lim">把同一個鏡頭重播一次。桌子沒挪，鏡頭也沒動。這回主角進門後停了一下，接著朝右邊的桌子走去。你可能會順著他的動作看過去。他多走的這幾步，就把「進門後可以去哪裡」演給你看了。</p>
      <p class="lim">拍片時，安排角色站哪裡、怎麼走、在哪裡停，叫做<strong>角色走位（blocking）</strong>。如果桌子旁邊還有一個人招手，觀眾也可能以為主角只是去打招呼。讓主角走過去，再加一個接過名牌的動作，就更容易看懂那裡在報到。
</p>
    `) +
    S("sec-expert", '', '', "先想觀眾要看懂哪一步", `
      <p class="lim">華特迪士尼動畫工作室的故事團隊會先畫小草圖，推敲人物安排、畫面和節奏，再把草圖畫清楚。這週的消息讓我想到，即使之後可以邊播邊改，也要先決定自己想把哪一件事講清楚。<a class="lnk" href="https://www.disneyanimation.com/process/story/" target="_blank" rel="noopener noreferrer">迪士尼動畫工作室的分鏡流程</a></p>
      <p class="lim">介紹網站功能也能這樣想。如果觀眾看完得知道怎麼下載報表，畫面就跟著游標找到「下載」，再讓他看一眼點完會出現什麼。先把這段意思交給 AI，畫面和字幕可以請它提案。
</p>
    `) +
    S("sec-ai", '', '', "想做成短片時，這段可以直接交給 AI", `
      ${copyBox("weekly-video-command", "幫我規劃一個五秒的工作坊開場。我要第一次來的人即使關掉聲音，也看得出進門後要先去報到。用虛構的會場和人物。鏡頭固定，主角從畫面左側進門，停一下，走向右側的報到桌，最後接過名牌。先給我三格分鏡，寫出每格的人物位置和動作，再附一句可選字幕。等我確認分鏡，如果你能做影片，就照這版做一段靜音短片。如果你只能提供文字，就給我一段可貼到影片生成工具的指令。")}
      <p class="lim">看到分鏡時，先問自己「光看動作，我知道要去哪裡嗎？」如果還有點猜不出來，可以請 AI 只改最後一個動作，再看一次。
</p>
    `) +
    S("sec-use", '', '', "用在專案前", `
      <p class="lim">Pika 說 Enact 用的是 H3 Flex，而 H3 Flex 是用 <strong>MiniMax H3</strong> 再訓練出來的。MiniMax 的港交所公告列有在上海的主要營業地點。專案若限制這類底層模型，可以借用走位和分鏡的方法。Pika 的一般服務隱私政策也提到，個資可能在其他國家處理或儲存，包含美國。至於 Enact 研究預覽會把素材存在哪裡、輸出能不能公開使用，仍待確認。<a class="lnk" href="https://pika.art/blog/pika-h3-flex" target="_blank" rel="noopener noreferrer">H3 Flex 官方說明</a> <a class="lnk" href="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0826/2026082601955.pdf" target="_blank" rel="noopener noreferrer">MiniMax 港交所公告</a> <a class="lnk" href="https://pika.art/privacy-policy" target="_blank" rel="noopener noreferrer">Pika 隱私政策</a></p>
    `),
}
