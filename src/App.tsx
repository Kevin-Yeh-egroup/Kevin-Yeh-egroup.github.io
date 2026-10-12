import { LogoMark } from './components/LogoMark'
import { NavLinks } from './components/NavLinks'
import { SheetProvider } from './components/Sheet'
import { profile } from './data/profile'
import { useActiveSection } from './lib/motion'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Learn } from './sections/Learn'
import { Motto } from './sections/Motto'
import { Works } from './sections/Works'

const year = new Date().getFullYear()

const navItems = [
  { id: 'works', label: profile.works.nav },
  { id: 'journey', label: profile.journey.nav },
  { id: 'learn', label: profile.learn.nav },
  { id: 'contact', label: profile.contact.nav },
]

export default function App() {
  const active = useActiveSection(navItems.map((n) => n.id))
  return (
    <SheetProvider>
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
          <NavLinks items={navItems} active={active} className="nav" label="主要選單" />
        </div>
      </header>
      <main id="main">
        <Hero />
        <Works />
        <Journey />
        <Motto />
        <Learn />
        <Contact />
      </main>
      <NavLinks items={navItems} active={active} className="dock" label="快速前往" />
      <footer className="site-footer">
        <div className="wrap">
          <LogoMark className="footer-mark" />
          <p>{profile.footer}</p>
          <p className="footer-copy">
            © {year} {profile.name} {profile.nameEn}
          </p>
        </div>
      </footer>
    </SheetProvider>
  )
}
