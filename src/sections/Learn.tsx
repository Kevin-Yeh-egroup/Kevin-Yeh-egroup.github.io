import { useId, useState, type CSSProperties } from 'react'
import { UiIcon } from '../components/Icons'
import { SegPanel, Segmented } from '../components/Segmented'
import { T } from '../components/Todo'
import { profile, type Text } from '../data/profile'
import { useInView, useReducedMotion } from '../lib/motion'
import { filled, visible } from '../lib/todo'

type Tab = 'path' | 'taught' | 'resources'

// 一起學：先用三格動畫看懂 vibe coding，想知道更多再切換分頁
export function Learn() {
  const { learn } = profile
  const [tab, setTab] = useState<Tab>('path')
  const idBase = useId()
  return (
    <section id="learn" className="section learn" aria-labelledby="learn-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="learn-title">{learn.title}</h2>
          <p className="section-sub">{learn.subtitle}</p>
        </header>
        <Demo />
        <div className="learn-more">
          <Segmented
            items={[
              { id: 'path', label: learn.tabs.path },
              { id: 'taught', label: learn.tabs.taught },
              { id: 'resources', label: learn.tabs.resources },
            ]}
            value={tab}
            onChange={setTab}
            label="一起學"
            idBase={idBase}
          />
          <SegPanel idBase={idBase} id="path" show={tab === 'path'}>
            <ol className="steps">
              {learn.path.filter(visible).map((p, i) => (
                <li key={i}>
                  <span className="step-dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <T value={p} />
                </li>
              ))}
            </ol>
          </SegPanel>
          <SegPanel idBase={idBase} id="taught" show={tab === 'taught'} className="cards">
            {learn.taught
              .filter((t) => visible(t.who))
              .map((t, i) => (
                <article key={i} className="mini-card">
                  <h3>
                    <T value={t.who} />
                  </h3>
                  <p>{t.topic}</p>
                  {visible(t.when) ? (
                    <span className="status">
                      <T value={t.when} />
                    </span>
                  ) : null}
                  {visible(t.how) ? (
                    <span className="status status-soft">
                      <T value={t.how} />
                    </span>
                  ) : null}
                </article>
              ))}
          </SegPanel>
          <SegPanel idBase={idBase} id="resources" show={tab === 'resources'} className="cards">
            {learn.resources.map((r) => {
              const href: Text | undefined = r.href
              const linked = filled(href)
              const body = (
                <>
                  <h3>{r.name}</h3>
                  <p>{r.desc}</p>
                  <span className={`status ${linked ? '' : 'status-soft'}`}>{linked ? r.status : '即將公開'}</span>
                  {href && !filled(href) ? <T value={href} /> : null}
                </>
              )
              return filled(href) ? (
                <a key={r.name} className="mini-card mini-link" href={href} target="_blank" rel="noopener">
                  {body}
                  <UiIcon name="external" size={16} />
                </a>
              ) : (
                <article key={r.name} className="mini-card">
                  {body}
                </article>
              )
            })}
          </SegPanel>
        </div>
        <div className="learn-cta">
          <a className="button-primary" href="#contact">
            {learn.cta}
            <UiIcon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

// 三格動畫：你用說的 → AI 寫程式 → 工具做出來。進到畫面時播一次，可以再播
function Demo() {
  const { demo } = profile.learn
  const [ref, seen] = useInView<HTMLDivElement>('0px 0px -25% 0px')
  // 沒開「減少動態」才先把內容藏起來等著播；開了就直接顯示完成的樣子
  const armed = !useReducedMotion()
  const [round, setRound] = useState(0)
  const chars = [...demo.you].length
  return (
    <div ref={ref} className={`demo ${armed ? 'armed' : ''} ${seen ? 'play' : ''}`}>
      <div className="demo-track" key={round}>
        <div className="demo-card">
          <p className="demo-step">
            <span>1</span>
            {demo.steps[0]}
          </p>
          <div className="demo-screen demo-chat">
            <p className="bubble bubble-you d-anim" style={{ '--t': '0s' } as CSSProperties}>
              <span className="typing d-type" style={{ '--chars': chars, '--t': '0.15s' } as CSSProperties}>
                {demo.you}
              </span>
            </p>
            <p className="bubble bubble-ai d-anim" style={{ '--t': '1.05s' } as CSSProperties}>
              <span className="bubble-avatar" aria-hidden="true">
                AI
              </span>
              {demo.ai}
            </p>
          </div>
        </div>
        <span className="demo-arrow" aria-hidden="true">
          <UiIcon name="arrow" />
        </span>
        <div className="demo-card">
          <p className="demo-step">
            <span>2</span>
            {demo.steps[1]}
          </p>
          <div className="demo-screen demo-code" aria-hidden="true">
            {[78, 54, 66, 40, 72, 50].map((w, i) => (
              <span key={i} className={`code-line d-anim ${i % 3 === 1 ? 'is-key' : ''}`} style={{ '--w': `${w}%`, '--t': `${1.3 + i * 0.1}s`, '--indent': `${i % 3 === 2 ? 14 : 0}px` } as CSSProperties} />
            ))}
          </div>
        </div>
        <span className="demo-arrow" aria-hidden="true">
          <UiIcon name="arrow" />
        </span>
        <div className="demo-card">
          <p className="demo-step">
            <span>3</span>
            {demo.steps[2]}
          </p>
          <div className="demo-screen demo-page">
            <span className="page-bar d-anim" style={{ '--t': '2.05s' } as CSSProperties} />
            <span className="page-title d-anim" style={{ '--t': '2.15s' } as CSSProperties}>
              {demo.result}
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="page-row d-anim" style={{ '--t': `${2.25 + i * 0.1}s` } as CSSProperties}>
                <i className={i === 1 ? 'on' : ''} />
                <b style={{ width: `${70 - i * 14}%` }} />
              </span>
            ))}
            <span className="page-button d-anim d-pop" style={{ '--t': '2.6s' } as CSSProperties}>
              開始檢測
            </span>
          </div>
        </div>
      </div>
      <div className="demo-foot">
        <p className="demo-caption">{demo.caption}</p>
        {armed ? (
          <button type="button" className="button-text" onClick={() => setRound((r) => r + 1)}>
            <UiIcon name="replay" size={16} />
            {demo.replay}
          </button>
        ) : null}
      </div>
    </div>
  )
}
