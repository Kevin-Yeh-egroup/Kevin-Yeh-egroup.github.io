import { profile } from '../data/profile'

export function Journey() {
  const { title, chapters } = profile.journey
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="wrap">
        <h2 id="journey-title">{title}</h2>
        <ol className="chapters">
          {chapters.map((chapter) => (
            <li key={chapter.no} className={chapter.current ? 'chapter is-current' : 'chapter'}>
              <div className="chapter-head">
                <span className="chapter-no">{chapter.no}</span>
                <h3 className="chapter-name">{chapter.name}</h3>
                {chapter.current && <span className="now-badge">現在</span>}
              </div>
              <p className="chapter-years">{chapter.years}</p>
              <p className="chapter-line">{chapter.line}</p>
              <ul className="stations">
                {chapter.stations.map((station) => (
                  <li key={station.name}>
                    <span className="station-name">{station.name}</span>
                    <span className="station-meta">
                      {station.org ? `${station.org}，${station.years}` : station.years}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
