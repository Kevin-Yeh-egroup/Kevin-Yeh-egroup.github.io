import { useId, useState } from 'react'
import { LifeIcon, UiIcon } from '../components/Icons'
import { GrowingSprout } from '../components/LogoMark'
import { SegPanel, Segmented } from '../components/Segmented'
import { Sheet } from '../components/Sheet'
import { T } from '../components/Todo'
import { profile, type LifeEvent, type Text } from '../data/profile'
import { useOpenSheet } from '../lib/sheet'
import { visible } from '../lib/todo'

const ym = (v: string) => {
  const [y, m] = v.split('-')
  return m ? `${y}/${Number(m)}` : y
}

function period(e: LifeEvent): Text {
  if (e.period) return e.period
  const s = e.start ? ym(e.start) : ''
  const end = e.end === 'now' ? '現在' : e.end ? ym(e.end) : ''
  return end ? `${s}–${end}` : s
}

const year = (e: LifeEvent) => e.start?.slice(0, 4) ?? ''

// 我走過的路：六個節點連成一條線，點節點才看細節；完整經歷收在最後的按鈕裡
export function Journey() {
  const { journey } = profile
  const nodes = journey.events.filter((e) => e.node)
  const openHistory = useOpenSheet('history')
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="journey-title">{journey.title}</h2>
        </header>
        <div className="path">
          {journey.chapters.map((c, ci) => (
            <div key={c.id} className={`chapter chapter-${c.id}`}>
              <p className="chapter-head">
                <span className="chapter-no">0{ci + 1}</span>
                <span className="chapter-name">{c.name}</span>
                <span className="chapter-line">{c.line}</span>
              </p>
              <ol className="nodes">
                {nodes
                  .filter((n) => n.chapter === c.id)
                  .map((n) => (
                    <Node key={n.id} e={n} />
                  ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="journey-foot">
          <button type="button" className="button-quiet" onClick={openHistory}>
            {journey.more}
            <UiIcon name="arrow" size={18} />
          </button>
        </div>
      </div>
      {nodes.map((n) => (
        <EventSheet key={n.id} e={n} />
      ))}
      <HistorySheet />
    </section>
  )
}

function Node({ e }: { e: LifeEvent }) {
  const openIt = useOpenSheet('event-' + e.id)
  return (
    <li className={`node node-${e.id}`} data-morph-root>
      <button type="button" className="node-btn" onClick={openIt} aria-label={`${year(e)} ${e.short}，看更多`}>
        <span className="node-icon" data-morph>
          {e.icon === 'sprout' ? <GrowingSprout className="sprout-scroll" /> : <LifeIcon kind={e.icon} size={56} />}
        </span>
        <span className="node-year">{year(e)}</span>
        <span className="node-label">{e.short}</span>
      </button>
    </li>
  )
}

function EventSheet({ e }: { e: LifeEvent }) {
  const p = period(e)
  return (
    <Sheet id={'event-' + e.id} label={e.short}>
      <div className={`sheet-media sheet-art art-${e.chapter}`} data-morph-target>
        {e.icon === 'sprout' ? <GrowingSprout className="sprout-grow sheet-sprout" /> : <LifeIcon kind={e.icon} size={150} />}
      </div>
      <div className="sheet-body">
        <p className="sheet-kicker">
          {visible(p) ? (
            <span>
              <T value={p} />
            </span>
          ) : null}
          <span className="dot-sep">{e.org}</span>
          <span className="dot-sep">{e.title}</span>
        </p>
        <h2 className="sheet-title">{e.short}</h2>
        {e.story ? <p className="sheet-lead">{e.story}</p> : null}
        <ul className="did">
          {e.did.filter(visible).map((d, i) => (
            <li key={i}>
              <T value={d} />
            </li>
          ))}
        </ul>
        {e.note ? (
          <p className="sheet-note">
            <span className="yolk-dot" aria-hidden="true" />
            {e.note}
          </p>
        ) : null}
      </div>
    </Sheet>
  )
}

type HistoryTab = 'events' | 'about' | 'certs'

function HistorySheet() {
  const { journey, about, history, motto } = profile
  const [tab, setTab] = useState<HistoryTab>('events')
  const idBase = useId()
  const events = [...journey.events].sort((a, b) => (b.start ?? '0').localeCompare(a.start ?? '0'))
  return (
    <Sheet id="history" label={history.title} className="sheet-tall">
      <div className="sheet-body">
        <h2 className="sheet-title">{history.title}</h2>
        <Segmented
          items={[
            { id: 'events', label: history.tabs.events },
            { id: 'about', label: history.tabs.about },
            { id: 'certs', label: history.tabs.certs },
          ]}
          value={tab}
          onChange={setTab}
          label={history.title}
          idBase={idBase}
        />
        <SegPanel idBase={idBase} id="events" show={tab === 'events'}>
          <ol className="history">
            {events.map((e) => (
                <li key={e.id}>
                  <span className="history-icon">
                    <LifeIcon kind={e.icon} size={36} />
                  </span>
                  <div>
                    {visible(period(e)) ? (
                      <p className="history-period">
                        <T value={period(e)} />
                      </p>
                    ) : null}
                    <p className="history-title">
                      {e.org}
                      <span>{e.title}</span>
                    </p>
                    <ul className="did">
                      {e.did.filter(visible).map((d, i) => (
                        <li key={i}>
                          <T value={d} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
          </ol>
        </SegPanel>
        <SegPanel idBase={idBase} id="about" show={tab === 'about'}>
          <p className="about-lead">{about.lead}</p>
          {about.paragraphs.map((p) => (
            <p key={p} className="about-p">
              {p}
            </p>
          ))}
          <blockquote className="about-motto">
            <p>{motto.full}</p>
            <footer>{motto.label}</footer>
          </blockquote>
        </SegPanel>
        <SegPanel idBase={idBase} id="certs" show={tab === 'certs'}>
          <ul className="chips chips-lg">
            {history.certificates.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {history.awards.map((a) => (
            <a key={a.text} className="award-row" href={a.href} target="_blank" rel="noopener">
              <span className="award-icon">
                <UiIcon name="award" />
              </span>
              <span>
                <span className="award-date">{a.date}</span>
                {a.text}
              </span>
              <UiIcon name="external" size={16} />
            </a>
          ))}
        </SegPanel>
      </div>
    </Sheet>
  )
}
