import { UiIcon } from '../components/Icons'
import { T } from '../components/Todo'
import { profile } from '../data/profile'
import { filled, visible } from '../lib/todo'

const STEM = 'M50 90 L50 54'
const LEAF = 'M52 52 C51.3 30.9 66.6 14.7 86 16 C88.4 35.3 73.1 51.5 52 52 Z'
const SPROUT = 'M48 54 C32.1 54.3 19.5 42.6 20 28 C34.5 26.4 47.1 38.1 48 54 Z'

// 換你了：大新芽把黃色的芽傳給下一個盆子（捲動時沿著虛線飛過去）
export function Contact() {
  const { contact } = profile
  const links = contact.links.filter((l) => visible(l.href))
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <svg className="relay" viewBox="0 0 360 170" aria-hidden="true" focusable="false">
          <path className="relay-path" d="M70 60 C120 -20 230 -10 263 96" />
          <g transform="translate(40 18) scale(1.3)">
            <path className="relay-stem" d={STEM} />
            <path className="relay-leaf" d={LEAF} />
            <path className="relay-bud" d={SPROUT} />
          </g>
          <g className="relay-seed">
            <path d="M0 0 C-6 -2 -10 -8 -10 -14 C-4 -14 0 -8 0 0 Z" className="relay-bud" />
          </g>
          <g transform="translate(232 104)">
            <path className="relay-pot" d="M0 0 H62 L54 52 H8 Z" />
            <rect className="relay-pot-rim" x="-6" y="-8" width="74" height="14" rx="7" />
            <text className="relay-you" x="31" y="36">你</text>
          </g>
        </svg>
        <h2 id="contact-title">{contact.title}</h2>
        <p className="contact-line">{contact.line}</p>
        <ul className="contact-links">
          {links.map((l) => (
            <li key={l.label}>
              {filled(l.href) ? (
                <a className="pill-link" href={l.href} target="_blank" rel="noopener">
                  {l.label}
                  <UiIcon name="external" size={16} />
                </a>
              ) : (
                <span className="pill-link is-todo">
                  {l.label}
                  <T value={l.href} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
