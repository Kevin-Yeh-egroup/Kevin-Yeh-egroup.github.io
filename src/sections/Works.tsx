import { T } from '../components/Todo'
import { profile } from '../data/profile'
import { filled, visible } from '../lib/todo'

export function Works() {
  const { title, items, upcoming } = profile.works
  return (
    <section id="works" className="section works" aria-labelledby="works-title">
      <div className="wrap">
        <h2 id="works-title">{title}</h2>
        <div className="works-grid">
          {items.map((work) => (
            <article key={work.name} className="work">
              <h3 className="work-name">
                {filled(work.href) ? (
                  <a href={work.href} target="_blank" rel="noopener">
                    {work.name}
                    <span className="sr-only">（另開分頁）</span>
                  </a>
                ) : (
                  work.name
                )}
              </h3>
              {work.since && <p className="work-since">{work.since}</p>}
              <p className="work-line">{work.line}</p>
              <p className="work-from">{work.from}</p>
              {visible(work.role) && (
                <p className="work-role">
                  我負責：
                  <T value={work.role} />
                </p>
              )}
              {work.href !== undefined && !filled(work.href) && <T value={work.href} />}
              {work.award && (
                <p className="work-award">
                  <a href={work.award.href} target="_blank" rel="noopener">
                    {work.award.text}
                    <span className="sr-only">（另開分頁）</span>
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
        <p className="upcoming">
          <span className="upcoming-label">{upcoming.label}</span>
          {upcoming.name}：{upcoming.line}
        </p>
      </div>
    </section>
  )
}
