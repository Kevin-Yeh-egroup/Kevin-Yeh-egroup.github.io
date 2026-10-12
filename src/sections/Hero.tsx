import { profile } from '../data/profile'

export function Hero() {
  const { name, nameEn, tags, headline, subtitle, ctas, photo } = profile
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="hero-name">
            <strong>
              {name} {nameEn}
            </strong>
            <span>{tags}</span>
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line">{headline[0]}</span>
            <span className="hero-line">{headline[1]}</span>
          </h1>
          <p className="hero-sub">{subtitle}</p>
          <div className="hero-actions">
            {ctas.map((cta, i) => (
              <a key={cta.href} className={i === 0 ? 'button button-primary' : 'button button-quiet'} href={cta.href}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>
        <figure className="hero-photo">
          <picture>
            <source
              type="image/webp"
              srcSet={`${photo.webp800} 800w, ${photo.webp1200} 1200w`}
              sizes="(min-width: 861px) 44vw, 100vw"
            />
            <img
              src={photo.jpg}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              fetchPriority="high"
            />
          </picture>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
