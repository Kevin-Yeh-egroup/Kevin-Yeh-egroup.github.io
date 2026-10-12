import { T } from '../components/Todo'
import { profile } from '../data/profile'
import { filled, visible } from '../lib/todo'

const toUrl = (label: string, href: string) =>
  label === 'Email' && !href.startsWith('mailto:') ? `mailto:${href}` : href

export function Contact() {
  const { title, links } = profile.contact
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title">{title}</h2>
        <ul className="contact-links">
          {links.filter((link) => visible(link.href)).map((link) => (
            <li key={link.label}>
              {filled(link.href) ? (
                <a className="button button-on-sea" href={toUrl(link.label, link.href)} target="_blank" rel="noopener">
                  {link.label}
                  <span className="sr-only">（另開分頁）</span>
                </a>
              ) : (
                <span className="contact-pending">
                  {link.label} <T value={link.href} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
