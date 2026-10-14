import { useId, useState } from 'react'
import { UiIcon } from '../components/Icons'
import { Picture } from '../components/Picture'
import { Segmented } from '../components/Segmented'
import { Sheet } from '../components/Sheet'
import { T } from '../components/Todo'
import { profile, type Work, type WorkView } from '../data/profile'
import { useOpenSheet } from '../lib/sheet'
import { filled, visible } from '../lib/todo'

// 作品：第一層只有名字、一句話和真實畫面；點開才看細節、切換畫面、連結
export function Works() {
  const { works } = profile
  const [map, familyfin, workbench] = works.items
  return (
    <section id="works" className="section works" aria-labelledby="works-title">
      <div className="wrap">
        <header className="section-head">
          <h2 id="works-title">{works.title}</h2>
          <p className="section-hint">{works.hint}</p>
        </header>
        <div className="bento">
          <WorkTile work={map} size="lg" badge="7,794 個村里" />
          <WorkTile work={familyfin} size="md" award />
          {workbench ? <WorkTile work={workbench} size="wide" badge="示範版可以直接試用" /> : null}
        </div>
      </div>
      {works.items.map((w) => (
        <WorkSheet key={w.id} work={w} />
      ))}
    </section>
  )
}

// 一張畫面，加上圓角外框和陰影，像放在桌上的螢幕
function Shot({ view, className, sizes }: { view: WorkView; className: string; sizes: string }) {
  return (
    <span className={`shot ${className}`}>
      <Picture base={view.image} widths={view.widths} sizes={sizes} alt="" width={view.width} height={view.height} />
    </span>
  )
}

// 第三張以後的作品用橫跨兩欄的寬卡：電腦版字在左、畫面在右
const BACK_SIZES = { lg: '(max-width: 959px) 88vw, 640px', md: '(max-width: 959px) 88vw, 420px', wide: '(max-width: 959px) 88vw, 640px' }

function WorkTile({ work, size, badge, award }: { work: Work; size: 'lg' | 'md' | 'wide'; badge?: string; award?: boolean }) {
  const openIt = useOpenSheet('work-' + work.id)
  const back = work.views?.[0]
  const front = work.views?.find((v) => v.id === work.tileFront)
  return (
    <article className={`tile tile-${size}`} data-morph-root>
      <div className="tile-copy">
        {work.since || work.status ? <span className="tile-kicker">{work.since ?? work.status}</span> : null}
        <h3>{work.name}</h3>
        <p>{work.short}</p>
        {badge || (award && work.award) ? (
          <p className="tile-chips">
            {badge ? <span className="tile-badge">{badge}</span> : null}
            {award && work.award ? (
              <span className="tile-award">
                <UiIcon name="award" size={16} />
                專案獲獎
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
      <div className="tile-media" data-morph>
        {back ? <Shot view={back} className="shot-back" sizes={BACK_SIZES[size]} /> : null}
        {front ? <Shot view={front} className="shot-front" sizes="(max-width: 959px) 56vw, 380px" /> : null}
      </div>
      <button type="button" className="tile-hit" onClick={openIt} aria-label={`看${work.name}的介紹`}>
        <span className="tile-plus" aria-hidden="true">
          <UiIcon name="plus" />
        </span>
      </button>
    </article>
  )
}

function WorkSheet({ work }: { work: Work }) {
  const views = work.views ?? []
  const [view, setView] = useState(views[0]?.id ?? '')
  const idBase = useId()
  return (
    <Sheet id={'work-' + work.id} label={work.name}>
      <div className="sheet-media" data-morph-target>
        {views.map((v) => (
          <div
            key={v.id}
            role={views.length > 1 ? 'tabpanel' : undefined}
            id={`${idBase}-${v.id}-panel`}
            aria-labelledby={views.length > 1 ? `${idBase}-${v.id}-tab` : undefined}
            aria-hidden={v.id !== view}
            className={`view ${v.id === view ? 'is-on' : ''}`}
          >
            <Picture base={v.image} widths={v.widths} sizes="(max-width: 719px) 100vw, 880px" alt={v.alt} width={v.width} height={v.height} />
          </div>
        ))}
      </div>
      <div className="sheet-body">
        {views.length > 1 ? (
          <Segmented items={views.map((v) => ({ id: v.id, label: v.label }))} value={view} onChange={setView} label="切換畫面" idBase={idBase} size="sm" />
        ) : null}
        {work.since || work.status ? <p className="sheet-kicker">{work.since ?? work.status}</p> : null}
        <h2 className="sheet-title">{work.name}</h2>
        <p className="sheet-lead">{work.line}</p>
        {work.chips ? (
          <ul className="chips" aria-label="包含的工具">
            {work.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        ) : null}
        {work.facts ? (
          <dl className="facts">
            {work.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.value}
                  {f.source?.href ? (
                    <a className="fact-source" href={f.source.href} target="_blank" rel="noopener">
                      出處
                    </a>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {work.award ? (
          <a className="award-row" href={work.award.href} target="_blank" rel="noopener">
            <span className="award-icon">
              <UiIcon name="award" />
            </span>
            <span>{work.award.text}</span>
            <UiIcon name="external" size={16} />
          </a>
        ) : null}
        {visible(work.role) ? (
          <p className="sheet-role">
            <span>我負責的部分</span>
            <T value={work.role} />
          </p>
        ) : null}
        {filled(work.href) ? (
          <a className="button-primary" href={work.href} target="_blank" rel="noopener">
            {work.hrefLabel ?? '打開網站'}
            <UiIcon name="external" size={18} />
          </a>
        ) : null}
      </div>
    </Sheet>
  )
}
