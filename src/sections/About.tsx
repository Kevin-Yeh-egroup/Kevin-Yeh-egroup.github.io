import { profile } from '../data/profile'

export function About() {
  const { title, lead, paragraphs, motto, mottoLabel } = profile.about
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title">{title}</h2>
        <p className="about-lead">{lead}</p>
        <div className="about-grid">
          <div className="about-body">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <figure className="motto">
            <blockquote>
              <p>{motto}</p>
            </blockquote>
            <figcaption>{mottoLabel}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
