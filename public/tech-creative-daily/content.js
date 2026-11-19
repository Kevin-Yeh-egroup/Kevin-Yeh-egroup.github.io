// 已確認公開的期刊、可用素材與做法。草稿保存在網站專案之外。
const SRC={
  images:{name:'OpenAI 發布公告',url:'https://openai.com/index/introducing-images-2-6/',date:'11 月 4 日'},
  suno:{name:'Suno 發布公告',url:'https://suno.com/blog/introducing-visuals',date:'11 月 17 日'},
  disney:{name:'迪士尼動畫工作室的分鏡流程',url:'https://www.disneyanimation.com/process/story/',date:'製作流程說明'},
};

export const ISSUES={
  creative:{id:'creative',code:'TD-2026-11-19-C',date:'2026-11-19',kind:'創作',label:'試刊',edition:1,checkedAt:'2026-11-19',short:'15 秒動畫',read:'約 5 分鐘',
    title:'一段 15 秒的動畫，能把活動流程講清楚嗎？',
    deck:'活動頁明明寫了報名後要做什麼，讀者卻可能找不到。這一期用一個假想頁面，看看一張圖、十幾秒的動畫和一支短片，各自能幫上什麼忙。',
    one:'先用簡單畫面確認讀者看得懂，再決定要做圖卡、動圖還是影片。',
    secs:[['sec-news','最近的變化','兩個工具更新，讓人更容易先試一小段畫面。'],['sec-expert','專家的做法','動畫團隊怎麼用草圖決定觀眾先看哪裡。'],['sec-ai','AI 的參謀建議','圖卡、動圖、影片，依讀者卡住的地方選。'],['sec-practice','15 分鐘練習','畫三格，拿給一個人看。'],['sec-keep','帶走什麼','可重用的順序、來源與使用前的提醒。']],
    body:bodyCreative,
    storyboard:true
  }
};

function bodyCreative({ S, P, T, N, H, compare, board, srcTable, endBlock }){
  return S('sec-news','發生了什麼','來自官方公告','最近的變化',
    P('p-images',`<h3>11 月 4 日｜讓圖片動起來</h3><p>OpenAI 發表 Images 2.6，加入循環播放的動圖，用的是一種${T('gif','可做成動圖的圖片格式（GIF）','t-gif-1')}，並展示用簡單草圖發展角色動作。這讓草圖也能拿來試看動起來的效果。</p>`,N(SRC.images))+
    P('p-suno',`<h3>11 月 17 日｜做歌的工具開始處理畫面</h3><p>Suno 推出 Visuals，可以從一首歌做出最長 15 秒的起始片段，再編輯或延長，也能做歌詞影片。影像使用的點數與歌曲點數分開。</p>`,N(SRC.suno))+
    `<p class="lim">兩個更新都讓創作者更容易先試一小段畫面。第一個適合看一個動作說不說得清楚，第二個適合試音樂和畫面配起來的節奏。工具選擇取決於觀眾要理解的事，以及作品想帶給觀眾的感受。</p>`)+
  S('sec-expert','專家方法','來自創作團隊的公開說明','專家的做法',
    P('p-disney',`<p>華特迪士尼動畫工作室的故事團隊會先依劇本畫小草圖，逐步修整，再用${T('storyboard','先排畫面順序的草圖（分鏡）','t-sb-1')}討論情緒、節奏和畫面焦點。</p>`,N(SRC.disney))+
    `<p class="lead lim">可以借用的是：先用簡單畫面決定「觀眾要先看到哪裡、接著要理解什麼」。</p><p class="lim">這個階段用紙筆或現有截圖就做得到。</p>`)+
  S('sec-ai','AI 建議','','AI 的參謀建議',
    `<div class="aibox"><p class="ailabel">這段是 Codex 的應用建議。效果要讓讀者試過才知道。</p>
    <p>假設目標是讓第一次報名的人，知道<strong>去哪裡看時間、地點和準備事項</strong>。三種做法各有用途。</p>${compare()}
    <p>Codex 建議先用圖卡試。如果讀者能找到按鈕，卻還是不知道點下去會看到什麼，再用動畫補中間那一步。音樂適合帶出情緒或提示轉場，把關鍵資訊留在畫面和字幕上。</p></div>`)+
  S('sec-practice','動手','用紙筆就能做','15 分鐘練習',
    `<p class="lim">在紙上畫三格，也可以用投影片或三張截圖代替。每格只講一件事。</p><figure class="plate">${board(true)}</figure>
    <p class="lim">把三格給一位不熟悉頁面的人看，先不解說，問對方：</p><ol class="ask lim"><li>下一步會點哪裡？</li><li>點完會看到什麼？</li></ol>
    <p class="lim">如果答不出來，先修對方卡住的那一格。改成動圖或影片時，再用手機關掉聲音看一次。</p>
    <div class="btns"><a class="btn btn-p" data-testid="open-template" href="${H('/toolkit/m-01',{from:'#/issue/creative?at=sec-practice'})}">打開分鏡模板</a><a class="btn btn-s" href="${H('/toolkit',{task:'anim',open:'h-01'})}">看完整做法</a></div>`)+
  S('sec-keep','帶走','','帶走什麼',
    `<div class="call lim"><b>用在正式網站前</b><p>上面兩款工具目前只用來理解創作趨勢。分鏡可以用紙筆或原本的投影片先試。若之後要把截圖、照片或錄音交給外部服務，先確認專案允許使用該服務及上傳這些資料。若只想讓畫面標出下一步，也可以用網站原有的圖示與簡單動畫達成。</p></div>
    <p class="lim"><strong>下次可以留下什麼？</strong>把三格分鏡和字幕存起來。換成課程、工具介紹或步驟教學時，可以沿用「我遇到什麼 → 我做了什麼 → 畫面有什麼改變」的順序。若另做了圖片、影片或音樂，保留原檔、來源和公開使用條件，方便下次選用。</p>
    <h3>來源與採用狀態</h3>${srcTable([[SRC.images,'官方公告，試刊查核 2026-11-19','僅供參考，不提供下載'],[SRC.suno,'官方公告，試刊查核 2026-11-19','僅供參考，不提供下載'],[SRC.disney,'工作室官網，試刊查核 2026-11-19','只借方法，不使用其素材']])}
    ${endBlock('三格分鏡模板可以直接改字幕，下次介紹功能時再拿出來用。','<a class="btn btn-p" href="#/toolkit/m-01">拿走分鏡模板</a><a class="btn btn-s" href="#/archive">看往期</a>')}`);
}

export const TASKS=[['intro','介紹功能'],['anim','做動畫'],['video','拍教學短片'],['sound','加音樂或聲音']];
export const TYPES=['素材','做法','參考'];
/* check = 來源查核；adopt = 採用審查，兩者刻意分開 */
export const KIT=[
  {id:'m-01',type:'素材',title:'三格分鏡模板',sum:'可以直接改字幕，下載後用紙筆或投影片畫。',tasks:['intro','anim','video'],issue:'creative',at:'sec-practice',kw:'分鏡 storyboard 模板 下載 三格',
   check:'本站原創，不含第三方素材',adopt:'可自由使用、修改與分享，不需標註來源'},
  {id:'h-01',type:'做法',title:'用三格分鏡把一個功能講清楚',sum:'每格只講一件事，15 分鐘內可以試完。',tasks:['intro','anim','video'],issue:'creative',at:'sec-practice',kw:'分鏡 步驟 字幕 動圖',
   check:'整理自創作試刊的練習',adopt:'可直接試，效果要讓讀者試過才知道',
   how:{fit:'讀者找得到頁面，卻不知道下一步會發生什麼。',steps:['在紙上畫三格，也可以用投影片或三張截圖代替。','依序放：我遇到什麼、我做了什麼、畫面有什麼改變。','每格配一句字幕，只講一件事。','拿給不熟悉頁面的人看，先不解說。'],done:'對方答得出「下一步會點哪裡」和「點完會看到什麼」。',limit:'這是應用建議，還沒有實測數據。改成動圖或影片時，再用手機關掉聲音看一次。'}},
  {id:'h-02',type:'做法',title:'圖卡、動圖、影片怎麼選',sum:'依讀者卡住的地方，選投入最小的做法。',tasks:['intro','anim','video'],issue:'creative',at:'sec-ai',kw:'比較 圖卡 動圖 影片 旁白',
   check:'整理自創作試刊的 AI 參謀建議',adopt:'AI 建議，需自行驗證',
   how:{fit:'要說明一個操作，不確定該做到多完整。',steps:['先做一張標註圖卡，看讀者找不找得到按鈕。','找得到但不知道按下去會怎樣，用三幕動圖補中間那一步。','步驟多或常出錯，才做有旁白的影片。'],done:'讀者不用問人就能完成下一步。',limit:'音樂適合帶情緒或提示轉場，關鍵資訊留在畫面和字幕上。'}},
  {id:'r-01',type:'參考',title:'OpenAI Images 2.6 的循環動圖',sum:'可以用草圖發展角色動作，適合看動作說不說得清楚。',tasks:['anim'],issue:'creative',at:'p-images',kw:'gif 動圖 草圖 工具',src:SRC.images,
   check:'來源為官方公告，試刊查核 2026-11-19',adopt:'僅供參考。授權與供應鏈待確認，不提供下載'},
  {id:'r-02',type:'參考',title:'Suno Visuals 的 15 秒起始片段',sum:'從一首歌做出畫面片段，適合試音樂和畫面的節奏。',tasks:['anim','sound'],issue:'creative',at:'p-suno',kw:'音樂 歌詞影片 工具',src:SRC.suno,
   check:'來源為官方公告，試刊查核 2026-11-19',adopt:'僅供參考。授權與供應鏈待確認，不提供下載'},
  {id:'r-03',type:'參考',title:'迪士尼動畫工作室的分鏡流程',sum:'先畫小草圖，再用分鏡討論情緒、節奏和焦點。',tasks:['intro','anim','video'],issue:'creative',at:'sec-expert',kw:'分鏡 專家 故事',src:SRC.disney,
   check:'來源為工作室官網，試刊查核 2026-11-19',adopt:'只借方法，不使用其素材'}
];
export const WAYS=[
  {id:'card',name:'一張標註圖卡',opt:'只要找到按鈕',when:'讀者只要找到一個按鈕就能繼續',cost:1,costT:'低，一張畫面加一句話'},
  {id:'gif',name:'15 秒三幕動圖',opt:'想知道按下去會怎樣',when:'讀者想知道按下去之後畫面會怎麼變',cost:2,costT:'中，處理順序、字幕和播放節奏'},
  {id:'video',name:'有旁白的操作影片',opt:'步驟多或常出錯',when:'需要交代多個步驟或常見錯誤',cost:3,costT:'較高，另外錄製、剪輯和做字幕'}
];
export const FRAMES=[
  {t:'0–4 秒',l:'0%',w:'26.67%',scene:'報名完成頁',cap:'報名完成，接下來要準備什麼？'},
  {t:'4–9 秒',l:'26.67%',w:'33.33%',scene:'標出「查看活動流程」',cap:'選「查看活動流程」'},
  {t:'9–15 秒',l:'60%',w:'40%',scene:'顯示時間、地點、準備事項',cap:'活動資訊都在這裡'}
];

export const GLOSSARY = [
  {
    "id": "gif",
    "term": "GIF",
    "plain": "可做成動圖的圖片格式",
    "searchTerms": [
      "動圖",
      "動畫圖片",
      "循環動畫"
    ],
    "firstUse": "可做成動圖的圖片格式（GIF）",
    "example": "把角色的三個動作做成一張循環播放的 GIF。",
    "editorNote": "GIF 也能存成靜態圖片。在分鏡文章中可稱 GIF 動圖。檔案是否會動、會不會循環，要看實際製作方式。",
    "source": {
      "title": "MDN 圖片格式指南",
      "url": "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#gif_graphics_interchange_format"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "storyboard",
    "term": "分鏡",
    "plain": "把故事或教學步驟畫成一格一格的畫面",
    "searchTerms": [
      "三格",
      "故事板",
      "storyboard",
      "畫面腳本"
    ],
    "firstUse": "用三張草圖安排畫面順序（分鏡）",
    "example": "先畫出報名完成、點開流程、看見活動資訊三格。",
    "editorNote": "可以用草圖或截圖。需要驗證的是順序和畫面焦點。",
    "source": {
      "title": "迪士尼動畫工作室的故事製作流程",
      "url": "https://www.disneyanimation.com/process/story/"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "cli",
    "term": "命令列工具（CLI）",
    "plain": "用文字指令操作軟體的工具",
    "searchTerms": [
      "命令列",
      "指令工具",
      "CLI",
      "GitHub CLI"
    ],
    "firstUse": "GitHub 的文字指令工具",
    "example": "在文字介面輸入指令，查看程式修改的處理進度。",
    "editorNote": "白話重點是用文字指令操作。教學需要實際輸入時保留指令名稱與適用版本。",
    "source": {
      "title": "GitHub CLI 手冊",
      "url": "https://cli.github.com/manual/"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "pull-request",
    "term": "Pull request（PR）",
    "plain": "把程式修改送給團隊討論與檢查的提案",
    "searchTerms": [
      "PR",
      "pull request",
      "程式修改提案",
      "合併請求"
    ],
    "firstUse": "送出程式修改提案（PR）",
    "example": "把新功能的修改送成一份 PR，等同事檢查。",
    "editorNote": "送出 PR、審查通過、合併和上線是不同狀態。",
    "source": {
      "title": "GitHub 的 PR 說明",
      "url": "https://docs.github.com/en/pull-requests/get-started/about-pull-requests"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "code-review",
    "term": "程式審查（Code review）",
    "plain": "檢查程式改了什麼、能否如預期運作的過程",
    "searchTerms": [
      "審查意見",
      "程式碼審查",
      "code review",
      "審閱程式"
    ],
    "firstUse": "請同事檢查程式修改（程式審查）",
    "example": "同事看完修改後留言，請先補一個使用情境。",
    "editorNote": "文章需要區分檢查這個動作、提交意見和正式核准。",
    "source": {
      "title": "GitHub 的程式審查說明",
      "url": "https://docs.github.com/en/pull-requests/reference/pull-request-reviews"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "preview",
    "term": "預覽功能（Preview）",
    "plain": "先提供試用的功能，開放資格或做法仍可能調整",
    "searchTerms": [
      "preview",
      "早期試用",
      "功能試用",
      "預覽"
    ],
    "firstUse": "正在開放試用的功能（預覽）",
    "example": "這項功能在預覽階段，目前需要申請存取。",
    "editorNote": "沿官方說法補上資格、版本和可能變動。有些服務的預覽資格彼此不同。",
    "source": {
      "title": "GitHub 的 Event Streams 預覽公告",
      "url": "https://github.blog/changelog/2026-11-18-wait-for-pull-request-events-with-github-cli/"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "api",
    "term": "API",
    "plain": "讓程式按約定使用另一個功能或取用資料的介面",
    "searchTerms": [
      "API",
      "程式介面",
      "應用程式介面",
      "串接"
    ],
    "firstUse": "透過程式介面（API）取得資料",
    "example": "在活動網站上用 API 查詢已報名的人數。",
    "editorNote": "需保留實際讀取或寫入的資料與權限。API 可在本機或跨服務使用。",
    "source": {
      "title": "MDN 的 API 定義",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/API"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "dependency",
    "term": "相依套件（Dependency）",
    "plain": "程式為了運作而使用的其他程式元件",
    "searchTerms": [
      "依賴",
      "間接使用的套件",
      "相依元件",
      "dependency"
    ],
    "firstUse": "程式會用到的其他套件（相依套件）",
    "example": "加入一個做動畫的套件時，它也可能帶進自己使用的套件。",
    "editorNote": "提到供應鏈時要把直接加入和間接帶入的套件都算進去。",
    "source": {
      "title": "npm 的 package-lock.json 文件",
      "url": "https://docs.npmjs.com/files/package-lock.json/"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "ai-model",
    "term": "AI 模型",
    "plain": "AI 系統裡，根據輸入產生結果的部分",
    "searchTerms": [
      "模型",
      "AI model",
      "生成模型"
    ],
    "firstUse": "負責產生內容的 AI 模型",
    "example": "同一段問題交給不同模型，可能得到不一樣的回答。",
    "editorNote": "引用比較時保留模型名稱版本、測試任務和採用條件。",
    "source": {
      "title": "NIST 的 AI 模型定義",
      "url": "https://csrc.nist.gov/glossary/term/artificial_intelligence_model"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "software-supply-chain",
    "term": "軟體供應鏈",
    "plain": "軟體交付前後涉及的供應者、元件和更新來源",
    "searchTerms": [
      "供應鏈",
      "軟體來源",
      "依賴來源",
      "software supply chain"
    ],
    "firstUse": "一起查工具及它背後用到的元件與供應者（軟體供應鏈）",
    "example": "採用動畫功能前，確認誰發布這個套件、靠哪些元件運作，以及由誰提供更新。",
    "editorNote": "雲端服務還要核對資料處理方和底層服務，以專案風險與條款決定查核深度。",
    "source": {
      "title": "美國 CISA 軟體採購與供應鏈指引",
      "url": "https://www.cisa.gov/sites/default/files/2024-07/PDM24050%20Software%20Acquisition%20Guide%20for%20Government%20Enterprise%20ConsumersV2_508c.pdf"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "non-red-supply-chain",
    "term": "非紅供應鏈",
    "plain": "依專案規範，核對供應來源和實際控制方是否受限制",
    "searchTerms": [
      "非紅",
      "供應來源審查",
      "採購限制",
      "實際控制方"
    ],
    "firstUse": "按本案的非紅供應鏈要求核對供應來源及控制方",
    "example": "委託案要求先確認影片工具、背後的雲端服務和處理資料的廠商。",
    "editorNote": "此為本日報的工作用語。採用時依該案契約、適用法規與核定條件判斷。下方是法規參考。",
    "source": {
      "title": "臺灣《資通安全管理法》第 11 條",
      "url": "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030297&flno=11"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "script",
    "term": "腳本（Script）",
    "plain": "讓電腦按寫好的步驟執行工作的程式",
    "searchTerms": [
      "script",
      "自動化腳本",
      "指令稿",
      "自動執行"
    ],
    "firstUse": "讓電腦照步驟處理的自動化程式（腳本）",
    "example": "寫一段腳本，等同事送出程式審查意見再處理下一步。",
    "editorNote": "影片腳本是拍攝前的文字規劃，其使用情境和電腦腳本不同。",
    "source": {
      "title": "GitHub 公告中的自動化腳本案例",
      "url": "https://github.blog/changelog/2026-11-18-wait-for-pull-request-events-with-github-cli/"
    },
    "checkedAt": "2026-11-19",
    "category": "tech"
  },
  {
    "id": "spacing",
    "category": "design",
    "order": 1,
    "term": "間距（Spacing）",
    "plain": "用物件、文字與區塊之間的距離整理層次",
    "searchTerms": [
      "留白",
      "內距",
      "外距",
      "分組",
      "太擠",
      "spacing"
    ],
    "firstUse": "間距，也就是用物件、文字與區塊之間的距離整理層次",
    "example": "拉近標題和摘要，與下一篇保持更大的段落間距。",
    "recognize": "同一組靠近，不同組拉開。",
    "before": "標題、摘要和下一篇文章距離都一樣。",
    "after": "拉近標題和摘要，與下一篇保持更大的段落間距。",
    "promptExample": {
      "from": "這裡看起來太擠",
      "location": "日報首頁「最新一期」的文章標題、摘要和下方列表",
      "problem": "標題和摘要屬同一篇，但看起來距離和下一組一樣。",
      "change": "依 DESIGN.md 的間距尺度，讓標題和摘要靠近，並拉開這篇與下方列表的距離。",
      "preserve": "保留導覽、文案、按鈕與區塊順序。",
      "verify": "桌機和約 390 px 手機都能看出哪段摘要屬於哪一篇，版面無橫向捲動。"
    },
    "editorNote": "4 px 網格是這套方法使用的起始尺度。專案已有尺度時沿用既有設計。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 間距",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#1-spacing"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "color",
    "category": "design",
    "order": 2,
    "term": "色彩（Color）",
    "plain": "用文字、背景和重點色表現層級或狀態",
    "searchTerms": [
      "強調色",
      "對比度",
      "重點色",
      "color"
    ],
    "firstUse": "色彩，也就是用文字、背景和重點色表現層級或狀態",
    "example": "用主色標出「讀最新一期」，其他入口維持次要層級，量測文字與背景對比。",
    "recognize": "你一眼知道哪個是主要按鈕，內文仍讀得清楚。",
    "before": "三個入口一起用高亮色，淡色文字在白底難讀。",
    "after": "用主色標出「讀最新一期」，其他入口維持次要層級，量測文字與背景對比。",
    "promptExample": {
      "from": "畫面很多地方都在搶注意力",
      "location": "日報首頁的最新一期與次要入口",
      "problem": "幾個入口使用同樣強的顏色，讀者難分辨優先入口。",
      "change": "用既有品牌色標出「讀最新一期」，把往期和詞庫放在次要層級，並量測內文文字與背景的對比。",
      "preserve": "沿用品牌配色、語意狀態及現有入口。",
      "verify": "手機首屏一眼能辨認主要入口，並附文字對比實測值與適用門檻。"
    },
    "editorNote": "WCAG 2.2 AA 的一般文字門檻是 4.5:1，大型文字是 3:1，另有例外。細邊框透明度屬作者的設計設定。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 色彩",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#2-color"
    },
    "extraSource": {
      "title": "W3C 文字對比說明",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "iconography",
    "category": "design",
    "order": 3,
    "term": "圖示（Iconography）",
    "plain": "用一致的小圖形幫讀者辨認動作或資訊",
    "searchTerms": [
      "圖標",
      "圖示線寬",
      "線條圖示",
      "icon",
      "icons"
    ],
    "firstUse": "圖示，也就是用一致的小圖形幫讀者辨認動作或資訊",
    "example": "沿用同一組搜尋與返回圖示，統一對齊，重要動作加上文字。",
    "recognize": "搜尋、返回和下載圖形的大小、線條與對齊有一致感。",
    "before": "一列是表情符號，一列是粗線圖示，標籤前後亂跳。",
    "after": "沿用同一組搜尋與返回圖示，統一對齊，重要動作加上文字。",
    "promptExample": {
      "from": "圖示看起來亂亂的",
      "location": "素材與做法列表的搜尋、返回與查看來源動作",
      "problem": "圖示大小和粗細不一，列與列的文字起點不同。",
      "change": "先沿用網站已有的圖示，統一各列圖示框、線條和文字對齊。重要動作保留文字標籤。",
      "preserve": "保留各操作所代表的意思和點擊區域。",
      "verify": "桌機及手機的列表文字起點一致，鍵盤仍可操作所有動作。"
    },
    "editorNote": "16 或 18 px 是這套方法的圖形尺寸範例，圖形大小和可點區域可各自安排。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 圖示",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#3-icons"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "ui-copy",
    "category": "design",
    "order": 4,
    "term": "介面文案（UI Copy）",
    "plain": "寫在按鈕、標題和操作提示上的字",
    "searchTerms": [
      "按鈕文案",
      "提示文字",
      "介面文字",
      "微文案",
      "copy"
    ],
    "firstUse": "介面文案，也就是寫在按鈕、標題和操作提示上的字",
    "example": "把按鈕寫成「找素材與做法」，查無結果時提供「清除搜尋」。",
    "recognize": "看得出按下去會去哪裡、出錯後還能做什麼。",
    "before": "按鈕只寫「探索更多！」，讀者猜不到內容。",
    "after": "把按鈕寫成「找素材與做法」，查無結果時提供「清除搜尋」。",
    "promptExample": {
      "from": "這幾個按鈕看不懂",
      "location": "日報首頁的素材入口、搜尋區和無結果狀態",
      "problem": "只寫「探索更多」，讀者無法預期會到哪裡。",
      "change": "把入口改成「找素材與做法」，並在沒有結果時顯示可執行的「清除搜尋」。",
      "preserve": "保留同一個入口目的與篩選邏輯。",
      "verify": "請一位沒看過網站的人說出這顆按鈕會到哪裡，並從無結果狀態回到列表。"
    },
    "editorNote": "文案要符合實際動作與結果。把功能名稱、未證實的成效和宣傳語分開核對。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 介面文案",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#4-copy"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "typography",
    "category": "design",
    "order": 5,
    "term": "字體排印（Typography）",
    "plain": "用字級、字重、行距和對齊安排閱讀順序",
    "searchTerms": [
      "字體",
      "文字層級",
      "字重",
      "行距",
      "等寬數字",
      "太擠",
      "typography"
    ],
    "firstUse": "字體排印，也就是用字級、字重、行距和對齊安排閱讀順序",
    "example": "把標題與內文拉開層級，日期用次要字級，分鏡的時間數字排整齊。",
    "recognize": "先看到標題，再看到摘要，長內文讀起來不擠。",
    "before": "標題、正文和日期都用相近大小與粗細。",
    "after": "把標題與內文拉開層級，日期用次要字級，分鏡的時間數字排整齊。",
    "promptExample": {
      "from": "文章不太好讀",
      "location": "日報文章標題、摘要、內文和投稿日",
      "problem": "目前字級和字重接近，掃讀時看不出各層級。",
      "change": "用既有字型與明確的標題、內文、附註層級調整字級和行距，繁中句子自然換行。",
      "preserve": "保留文章正文、標題與引用內容。",
      "verify": "手機可自然換行，放大文字時標題、內文和來源資訊都能讀到。"
    },
    "editorNote": "字重 400／500、等寬數字是作者的建議用法。繁中字型要依品牌與實際字形對比和可讀性取捨。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 字體排印",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#5-type"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "layout",
    "category": "design",
    "order": 6,
    "term": "版面配置（Layout）",
    "plain": "安排內容各放在哪裡，以及不同裝置怎麼排列",
    "searchTerms": [
      "版面",
      "佈局",
      "分欄",
      "手機單欄",
      "太擠",
      "layout"
    ],
    "firstUse": "版面配置，也就是安排內容各放在哪裡，以及不同裝置怎麼排列",
    "example": "桌面左右呈現標題和分鏡，手機先呈現標題與行動，再顯示三格。",
    "recognize": "桌面可以左文右圖，手機還是按自然順序讀。",
    "before": "手機把桌面三欄原樣縮小，字和按鈕擠在一起。",
    "after": "桌面左右呈現標題和分鏡，手機先呈現標題與行動，再顯示三格。",
    "promptExample": {
      "from": "手機版看起來整個很擠",
      "location": "創作試刊首頁介紹與三格分鏡",
      "problem": "桌面的多欄直接縮到手機，段落與分鏡太窄。",
      "change": "調整響應式版面，手機依標題、行動、分鏡順序排成單欄，桌機維持左文右圖。",
      "preserve": "保留既有內容、主按鈕及閱讀順序。",
      "verify": "約 390 px 手機無橫向捲動，分鏡的字幕完整可讀。"
    },
    "editorNote": "240–280 px 側欄是作者給桌面應用程式的起始參考。日報正文可用利於長文閱讀的窄欄。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 版面配置",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#6-layout"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "component-details",
    "category": "design",
    "order": 7,
    "term": "介面細節（Details）",
    "plain": "處理圓角、邊框、選取和焦點等小地方",
    "searchTerms": [
      "圓角",
      "邊框",
      "焦點外框",
      "選取狀態",
      "details"
    ],
    "firstUse": "介面細節，也就是處理圓角、邊框、選取和焦點等小地方",
    "example": "沿用卡片和按鈕各自的圓角，給選取及鍵盤焦點清楚的外框。",
    "recognize": "用鍵盤可看出目前停在哪一項，卡片和內部按鈕也有協調的輪廓。",
    "before": "卡片和標籤都做大膠囊，鍵盤焦點不明顯。",
    "after": "沿用卡片和按鈕各自的圓角，給選取及鍵盤焦點清楚的外框。",
    "promptExample": {
      "from": "選了之後看不出來",
      "location": "資料庫的詞庫分類和搜尋結果",
      "problem": "選取與鍵盤焦點太接近背景，難判斷現在在哪一項。",
      "change": "用既有元件樣式區分選取、鍵盤焦點與一般狀態，並以文字或語意提供選取資訊。",
      "preserve": "保留分類內容和原本的鍵盤操作順序。",
      "verify": "只用 Tab 與 Enter 可以找詞，且操作中始終看得出目前焦點。"
    },
    "editorNote": "內外圓角的相減公式是作者的視覺做法。互動能否辨認需另外實際檢查。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 介面細節",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#7-details"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "visuals",
    "category": "design",
    "order": 8,
    "term": "視覺素材（Visuals）",
    "plain": "用照片、插圖、截圖或圖解說明主題",
    "searchTerms": [
      "首屏主圖",
      "插圖",
      "主視覺",
      "畫面示意",
      "visuals"
    ],
    "firstUse": "視覺素材，也就是用照片、插圖、截圖或圖解說明主題",
    "example": "放三格報名畫面，讓讀者直接看到按下前和按下後的差別。",
    "recognize": "從圖就看得出這篇在討論什麼。",
    "before": "動畫試刊配一張和內容無關的發光立體圖。",
    "after": "放三格報名畫面，讓讀者直接看到按下前和按下後的差別。",
    "promptExample": {
      "from": "首圖很漂亮，但不知道這篇在講什麼",
      "location": "創作試刊首圖",
      "problem": "主圖和文章所說的活動流程沒有直接關係。",
      "change": "用原創三格分鏡呈現報名完成、查看流程、顯示活動資訊，畫面加可讀字幕。",
      "preserve": "保留品牌視覺和文章敘事順序。",
      "verify": "沒讀內文的人看完三格能說出下一步，手機也看得清楚。"
    },
    "editorNote": "先決定圖片要解決什麼理解問題，再選既有素材、原創圖或生圖。公開用前查來源和使用條件。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 視覺素材",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#8-visuals"
    },
    "checkedAt": "2026-11-19"
  },
  {
    "id": "motion",
    "category": "design",
    "order": 9,
    "term": "動態效果（Motion）",
    "plain": "用短暫變化回應操作或說明狀態改變",
    "searchTerms": [
      "動效",
      "微互動",
      "按下回饋",
      "按下有回饋",
      "過場",
      "motion"
    ],
    "firstUse": "動態效果，也就是用短暫變化回應操作或說明狀態改變",
    "example": "在按下或展開時提供短暫回饋，開啟減少動態時保留清楚的靜態狀態。",
    "recognize": "按按鈕有回饋，展開內容時知道從哪裡出現。",
    "before": "每張卡都一直漂浮，讀者很難把注意力放回內容。",
    "after": "在按下或展開時提供短暫回饋，開啟減少動態時保留清楚的靜態狀態。",
    "promptExample": {
      "from": "按下去像沒反應，畫面又一直晃",
      "location": "素材卡的展開和關閉",
      "problem": "持續移動會干擾閱讀，真正按下時反應不清楚。",
      "change": "把動態只放在按下或展開時，提供簡短回饋和可辨識的展開狀態。系統設定減少動態時呈現等價的靜態狀態。",
      "preserve": "保留卡片內容、鍵盤焦點和展開關閉操作。",
      "verify": "點按有明確狀態變化，鍵盤可操作，減少動態模式仍清楚。"
    },
    "editorNote": "長度與手法依互動目的和裝置決定。鍵盤焦點及必要訊息可從靜態畫面看出來。",
    "source": {
      "title": "Damir Sokolovsky 的 unslop 審稿說明 · 動態效果",
      "url": "https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md#9-motion"
    },
    "checkedAt": "2026-11-19"
  }
];
