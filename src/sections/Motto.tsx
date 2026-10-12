import { profile } from '../data/profile'

// 座右銘：整條深色帶，只放一句大字
export function Motto() {
  const { motto } = profile
  return (
    <section className="motto" aria-label={motto.label}>
      <div className="wrap motto-inner">
        <p className="motto-label">{motto.label}</p>
        <p className="motto-big">
          <span className="motto-quote" aria-hidden="true">
            “
          </span>
          {motto.big}
        </p>
        <p className="motto-rest">{motto.rest}</p>
      </div>
    </section>
  )
}
