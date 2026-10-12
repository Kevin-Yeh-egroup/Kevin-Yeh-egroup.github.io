import { T } from '../components/Todo'
import { profile } from '../data/profile'
import { visible } from '../lib/todo'

export function Timeline() {
  const { title, rows, certificatesTitle, certificates, awardsTitle, awards } = profile.timeline
  return (
    <section id="timeline" className="section timeline-section" aria-labelledby="timeline-title">
      <div className="wrap">
        <h2 id="timeline-title">{title}</h2>
        <ol className="timeline">
          {rows.map((row) => {
            const did = row.did.filter(visible)
            return (
              <li key={`${row.org}-${row.title}`} className="tl-row">
                <p className="tl-period">{visible(row.period) && <T value={row.period} />}</p>
                <div>
                  <p className="tl-title">
                    {row.title}
                    <span className="tl-org">{row.org}</span>
                  </p>
                  {did.length > 0 && (
                    <p className="tl-did">
                      {did.map((item, i) => (
                        <span key={i} className="tl-did-item">
                          <T value={item} />
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="tl-extras">
          <div>
            <h3>{certificatesTitle}</h3>
            <ul className="chips">
              {certificates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{awardsTitle}</h3>
            <ul className="awards">
              {awards.map((award) => (
                <li key={award.text}>
                  <span className="tl-period">{award.date}</span>
                  <a href={award.href} target="_blank" rel="noopener">
                    {award.text}
                    <span className="sr-only">（另開分頁）</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
