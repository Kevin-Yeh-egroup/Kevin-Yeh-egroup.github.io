import { useLayoutEffect, useRef, type MouseEvent } from 'react'
import { UiIcon } from '../components/Icons'

export type DailyIssue = { id: string; date: string; read: string; title: string; one: string }

const daily = './tech-creative-daily/'
const doors = [
  { route: 'toolkit', prompt: '正要做東西，找能直接用的', label: '素材與做法' },
  { route: 'glossary', prompt: '遇到看不懂的詞', label: '白話詞庫' },
  { route: 'archive', prompt: '想看之前的內容', label: '往期' },
]

function formatDate(date: string) {
  const weekday = '日一二三四五六'[new Date(`${date}T00:00:00Z`).getUTCDay()]
  return `${date.split('-').map(Number).join('/')}（週${weekday}）`
}

function keepReturnAnchor(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  // 從首頁直接捲到這裡的讀者，按上一頁也能回到有日報錨點的網址。
  if (window.location.hash !== '#weekly') window.history.replaceState(window.history.state, '', '#weekly')
}

export function Weekly({ issue }: { issue: DailyIssue | null }) {
  const section = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    // 從日報頁尾直接開首頁時，瀏覽器可能在 React 掛載前先找過錨點。
    if (window.location.hash === '#weekly') section.current?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <section ref={section} className="weekly" id="weekly" aria-labelledby="weekly-title">
      <div className="wrap weekly-grid">
        <div>
          <p className="weekly-band">
            <b>寫給沒有 IT 背景的人</b>
            {issue && <span>最新一期 <time dateTime={issue.date}>{formatDate(issue.date)}</time>・{issue.read}</span>}
          </p>
          <h2 id="weekly-title">科技與創作日報</h2>
          {issue && (
            <div className="weekly-latest">
              <p className="weekly-kicker">最新一期</p>
              <h3>{issue.title}</h3>
              <p>{issue.one}</p>
            </div>
          )}
          <p className="weekly-copy">用白話讀科技、設計與創作。一期大約 5 分鐘，讀完能帶走一個做法。</p>
          <a className="button-primary weekly-cta" href={issue ? `${daily}#/issue/${issue.id}` : daily} onClick={keepReturnAnchor}>
            {issue ? '讀最新一期' : '到日報首頁'}
            <UiIcon name="arrow" size={18} />
          </a>
        </div>
        <div>
          <p className="weekly-doors-label" id="weekly-doors-label">或依你現在想做的事</p>
          <ul className="weekly-doors" aria-labelledby="weekly-doors-label">
            {doors.map(({ route, prompt, label }) => (
              <li key={route}>
                <a className="weekly-door" href={`${daily}#/${route}`} onClick={keepReturnAnchor}>
                  <span><b>{prompt}</b><span className="weekly-door-label">{label}</span></span>
                  <UiIcon name="arrow" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <p className="weekly-foot">在同一個分頁打開，按上一頁就回到這裡。</p>
        </div>
      </div>
    </section>
  )
}
