import { LogoMark } from './components/LogoMark'
import { profile } from './data/profile'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Learn } from './sections/Learn'
import { Timeline } from './sections/Timeline'
import { Works } from './sections/Works'

const year = new Date().getFullYear()

const navItems = [
  { href: '#journey', label: profile.journey.nav },
  { href: '#learn', label: profile.learn.nav },
  { href: '#works', label: profile.works.nav },
  { href: '#about', label: profile.about.nav },
  { href: '#contact', label: profile.contact.nav },
]

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        跳到主要內容
      </a>
      <header id="top" className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top">
            <LogoMark className="brand-mark" />
            <span>
              {profile.name} {profile.nameEn}
            </span>
          </a>
          <nav className="nav" aria-label="主要選單">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Journey />
        <Learn />
        <Works />
        <About />
        <Timeline />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <p>
            © {year} {profile.name} {profile.nameEn}
          </p>
          <p>{profile.footer}</p>
        </div>
      </footer>
    </>
  )
}
