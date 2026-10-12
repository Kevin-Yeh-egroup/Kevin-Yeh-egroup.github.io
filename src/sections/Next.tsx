import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { LifeIcon, UiIcon } from '../components/Icons'
import { Sheet } from '../components/Sheet'
import { profile, type NextGoal, type NextStep } from '../data/profile'
import { useOpenSheet, useSheet } from '../lib/sheet'

// 接下來：成為找到關鍵問題的 FDE。
// 四個步驟圍成一圈，點哪一步就看哪一步（黃色的點會沿著圈滑過去）；FDE 的意思收在面板裡
export function Next() {
  const { next } = profile
  const steps = next.steps
  const [index, setIndex] = useState(0)
  // 黃點轉到第幾度：每次走最短的方向，所以要累計，不能直接用 index × 90
  const [turn, setTurn] = useState(0)
  const idBase = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const openFde = useOpenSheet('fde')

  const go = (to: number) => {
    const n = steps.length
    let d = (((to - index) % n) + n) % n
    if (d > n / 2) d -= n
    setTurn((t) => t + d * (360 / n))
    setIndex(to)
  }
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const to = (index + step + steps.length) % steps.length
    go(to)
    refs.current[to]?.focus()
  }
  const cur = steps[index]

  return (
    <section id="next" className="section next" aria-labelledby="next-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="next-title">{next.title}</h2>
          <button type="button" className="fde-chip" onClick={openFde}>
            <UiIcon name="plus" size={16} />
            {next.fde.button}
          </button>
          <p className="section-sub">{next.line}</p>
        </header>

        <div className="next-grid">
          <div className="loop">
            <svg className="loop-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <circle className="loop-track" cx="50" cy="50" r="38" />
              <circle className="loop-draw" cx="50" cy="50" r="38" pathLength={100} />
            </svg>
            <span className="loop-orbit" style={{ '--turn': `${turn}deg` } as CSSProperties} aria-hidden="true">
              <span className="loop-dot" />
            </span>
            <p className="loop-center">
              <span className="loop-value">{next.center.value}</span>
              <span className="loop-label">{next.center.label}</span>
            </p>
            <div className="loop-nodes" role="tablist" aria-label={next.stepsLabel} onKeyDown={onKey}>
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`${idBase}-${s.id}-tab`}
                  aria-controls={`${idBase}-panel`}
                  aria-selected={i === index}
                  tabIndex={i === index ? 0 : -1}
                  className={`loop-node loop-node-${i}`}
                  onClick={() => go(i)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div role="tabpanel" id={`${idBase}-panel`} aria-labelledby={`${idBase}-${cur.id}-tab`} className="step-card" key={cur.id}>
            <p className="step-count">
              {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </p>
            <div className="step-title">
              <span className="step-icon">
                <LifeIcon kind={cur.icon} size={44} />
              </span>
              <h3>
                {cur.name}
                <span>{cur.short}</span>
              </h3>
            </div>
            <p className="step-text">{cur.text}</p>
            <StepVisual v={cur.visual} />
          </div>
        </div>

        <div className="goals">
          <h3 className="goals-title">{next.goalsTitle}</h3>
          <ul className="goal-list">
            {next.goals.map((g) => (
              <li key={g.id}>
                <Goal g={g} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FdeSheet />
    </section>
  )
}

// 說明卡下方的小圖：讓每一步都「看得到」
function StepVisual({ v }: { v: NextStep['visual'] }) {
  if (v.kind === 'proof') return <Proof />
  return (
    <figure className={`step-visual is-${v.kind}`}>
      <figcaption>{v.title}</figcaption>
      {v.kind === 'chips' ? (
        <ul className="visual-chips">
          {v.items.map((it, i) => (
            <li key={it} style={{ '--k': i } as CSSProperties}>
              {it}
            </li>
          ))}
        </ul>
      ) : null}
      {v.kind === 'reply' ? (
        <div className="visual-reply">
          {v.items.map((it, i) => (
            <p key={it} style={{ '--k': i } as CSSProperties}>
              <span className="reply-check" aria-hidden="true">
                <UiIcon name="check" size={14} />
              </span>
              <span className="reply-label">{it}</span>
              <span className="reply-line" aria-hidden="true" />
            </p>
          ))}
        </div>
      ) : null}
      {v.kind === 'flow' ? (
        <>
          <ol className="visual-flow">
            {v.items.map((it, i) => (
              <li key={it} style={{ '--k': i } as CSSProperties}>
                {it}
              </li>
            ))}
          </ol>
          <p className="flow-again">
            <UiIcon name="replay" size={16} />
            再回到第一步
          </p>
        </>
      ) : null}
    </figure>
  )
}

// 證據：一個社福團體從聽需求到上線的時間線
function Proof() {
  const { proof } = profile.next
  return (
    <figure className="proof">
      <figcaption>{proof.title}</figcaption>
      <ol className="proof-track">
        {proof.points.map((p, i) => (
          <li key={p.when} style={{ '--k': i } as CSSProperties}>
            <span className="proof-when">{p.when}</span>
            <span className="proof-what">{p.what}</span>
          </li>
        ))}
      </ol>
      <p className="proof-source">出處：{proof.source.label}</p>
    </figure>
  )
}

// 接下來想做的事：有作品的，點了直接打開那個作品
function Goal({ g }: { g: NextGoal }) {
  const { open } = useSheet()
  const body = (
    <>
      <span className="goal-icon">
        <LifeIcon kind={g.icon} size={40} />
      </span>
      <span className="goal-text">
        <span className="goal-name">{g.name}</span>
        <span className="goal-line">{g.line}</span>
      </span>
    </>
  )
  if (!g.target) return <div className="goal">{body}</div>
  const id = g.target.replace('sheet:', '')
  return (
    <button type="button" className="goal goal-link" onClick={(e) => open(id, e.currentTarget)} aria-label={`${g.name}：${g.line}（看作品）`}>
      {body}
      <span className="goal-arrow" aria-hidden="true">
        <UiIcon name="arrow" size={18} />
      </span>
    </button>
  )
}

function FdeSheet() {
  const { fde } = profile.next
  return (
    <Sheet id="fde" label={fde.button}>
      <div className="sheet-media sheet-art art-fde">
        <span className="fde-big" aria-hidden="true">
          FDE
        </span>
      </div>
      <div className="sheet-body">
        <p className="sheet-kicker">{fde.term}</p>
        <h2 className="sheet-title">{fde.title}</h2>
        <p className="sheet-lead">{fde.text}</p>
        <blockquote className="about-motto">
          <p>{fde.reflection}</p>
          <footer>{profile.next.proof.source.label}</footer>
        </blockquote>
      </div>
    </Sheet>
  )
}
