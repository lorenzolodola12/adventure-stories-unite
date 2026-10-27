import { Link } from 'react-router-dom'
import logo from '../logo.png'
import { useLang } from '../lib/i18n'
import { EMAIL, LINKS, SPONSORS } from '../lib/content'

export default function Footer() {
  const { t } = useLang()
  const explore = [
    { label: t.nav.story, to: '/chi-siamo/storia' },
    { label: t.nav.mission, to: '/chi-siamo/missione' },
    { label: t.nav.team, to: '/chi-siamo/team' },
    { label: t.nav.ski, to: '/lavoro/sport/sci' },
    { label: t.nav.canoe, to: '/lavoro/sport/canoa' },
    { label: t.nav.hiking, to: '/lavoro/sport/escursioni' },
    { label: t.nav.education, to: '/lavoro/educazione' },
    { label: t.nav.events, to: '/lavoro/eventi' },
    { label: t.nav.donate, to: '/sostienici/dona' },
    { label: t.nav.transparency, to: '/chi-siamo/trasparenza' },
  ]

  return (
    <footer className="dark" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap pt-24 md:pt-32 pb-10">
        <p className="display" style={{ fontSize: 'clamp(3.4rem, 13.4vw, 15rem)' }}>
          Adventur<span className="ser">abile</span><span style={{ color: 'var(--accent)' }}>.</span>
        </p>

        <div className="mt-16 md:mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src={logo} alt="" width={56} height={56} className="w-14 h-14 invert mb-6" />
            <p className="max-w-sm text-[18px] leading-relaxed">{t.footer.about}</p>
            <p className="muted mt-4 text-[15px]">{t.footer.aboutSub}</p>
          </div>
          <div className="md:col-span-5">
            <p className="label muted mb-5">{t.footer.explore}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {explore.map(l => <li key={l.to}><Link to={l.to} className="hover:text-[var(--accent)] transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label muted mb-5">{t.footer.contact}</p>
            <ul className="flex flex-col gap-3">
              <li><a href={`mailto:${EMAIL}`} className="ulink">{EMAIL}</a></li>
              <li><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">Instagram</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a></li>
            </ul>
            <p className="label muted mt-10 mb-3">{t.home.sponsors}</p>
            <p>{SPONSORS.join(' · ')}</p>
          </div>
        </div>

        <div className="mt-20 pt-8 flex flex-col md:flex-row md:justify-between gap-3 text-[13px] muted" style={{ borderTop: '1px solid var(--line)' }}>
          <p>{t.footer.legal}</p>
          <p>© {new Date().getFullYear()} Adventurabile APS</p>
        </div>
      </div>
    </footer>
  )
}
