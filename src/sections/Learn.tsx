import { T } from '../components/Todo'
import { profile } from '../data/profile'
import { filled, visible } from '../lib/todo'

export function Learn() {
  const { title, subtitle, intro, vibe, path, taughtTitle, taught, resourcesTitle, resources } = profile.learn
  const shownPath = path.filter(visible)
  const shownTaught = taught.filter((row) => visible(row.who))

  return (
    <section id="learn" className="section learn" aria-labelledby="learn-title">
      <div className="wrap">
        <h2 id="learn-title">{title}</h2>
        <p className="section-sub">{subtitle}</p>

        <div className="learn-grid">
          <div className="learn-intro">
            <p>{intro}</p>
            <ol className="path" aria-label="我的學習路線">
              {shownPath.map((step, i) => (
                <li key={i}>
                  <T value={step} />
                </li>
              ))}
            </ol>
          </div>
          <aside className="sticky-note" aria-labelledby="vibe-term">
            <p id="vibe-term" className="note-term">
              {vibe.term}
            </p>
            <p className="note-def">{vibe.definition}</p>
          </aside>
        </div>

        {shownTaught.length > 0 && (
          <div className="learn-block">
            <h3>{taughtTitle}</h3>
            <ul className="taught-list">
              {shownTaught.map((row, i) => (
                <li key={i}>
                  <span className="taught-who">
                    <T value={row.who} />
                  </span>
                  <span className="taught-topic">{row.topic}</span>
                  <span className="taught-meta">
                    {visible(row.how) && <T value={row.how} />}
                    {visible(row.when) && <T value={row.when} />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="learn-block">
          <h3>{resourcesTitle}</h3>
          <ul className="resource-list">
            {resources.map((item) => (
              <li key={item.name} className="resource">
                <p className="resource-name">
                  {filled(item.href) ? (
                    <a href={item.href} target="_blank" rel="noopener">
                      {item.name}
                      <span className="sr-only">（另開分頁）</span>
                    </a>
                  ) : (
                    item.name
                  )}
                </p>
                <p className="resource-desc">{item.desc}</p>
                <p className="resource-status">{item.status}</p>
                {item.href !== undefined && !filled(item.href) && <T value={item.href} />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
