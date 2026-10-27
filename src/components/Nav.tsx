import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../logo.png'
import { useLang } from '../lib/i18n'
import { FIVE_X_MILLE_ACTIVE } from '../lib/content'
import Arrow from './Arrow'

type Item = { label: string; to: string }
type Group = { label: string; to?: string; items?: Item[] }

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > (isHome ? window.innerHeight * 1.7 : 40))
      setHidden(y > 300 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const groups: Group[] = [
    { label: t.nav.about, items: [
      { label: t.nav.story, to: '/chi-siamo/storia' },
      { label: t.nav.mission, to: '/chi-siamo/missione' },
      { label: t.nav.team, to: '/chi-siamo/team' },
      { label: t.nav.transparency, to: '/chi-siamo/trasparenza' },
    ] },
    { label: t.nav.activities, items: [
      { label: t.nav.ski, to: '/lavoro/sport/sci' },
      { label: t.nav.canoe, to: '/lavoro/sport/canoa' },
      { label: t.nav.hiking, to: '/lavoro/sport/escursioni' },
    ] },
    { label: t.nav.education, to: '/lavoro/educazione' },
    { label: t.nav.events, to: '/lavoro/eventi' },
    FIVE_X_MILLE_ACTIVE
      ? { label: t.nav.support, items: [
          { label: t.nav.donate, to: '/sostienici/dona' },
          { label: t.nav.fiveXmille, to: '/sostienici/5x1000' },
        ] }
      : { label: t.nav.support, to: '/sostienici/dona' },
  ]

  const bar = scrolled && !open

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-[transform,background-color,color] duration-500"
        style={{
          transform: hidden && !open ? 'translateY(-100%)' : 'none',
          background: bar ? 'rgba(14,16,12,0.78)' : 'transparent',
          backdropFilter: bar ? 'blur(14px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: bar ? 'blur(14px) saturate(1.2)' : 'none',
          color: '#ecebe3',
          borderBottom: bar ? '1px solid rgba(236,235,227,0.1)' : '1px solid transparent',
        }}
      >
        <div className="wrap flex items-center justify-between h-[72px] md:h-[84px]">
          <Link to="/" aria-label="Adventurabile APS — home" className="flex items-center gap-3 relative z-10">
            <img src={logo} alt="" width={44} height={44} className="w-10 h-10 md:w-11 md:h-11 transition-[filter] duration-500" style={{ filter: 'invert(1)' }} />
            <span className="font-serif text-[1.45rem] leading-none tracking-tight hidden sm:block">Adventurabile</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Principale">
            {groups.map(g => g.items ? (
              <div key={g.label} className="relative group">
                <button className="px-4 py-2 text-[15px] flex items-center gap-1.5 opacity-90 hover:opacity-100" aria-haspopup="true">
                  {g.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-180"><path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                  <div className="min-w-[220px] rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.18)]" style={{ background: 'var(--night-2)', color: 'var(--snow)', border: '1px solid var(--line)' }}>
                    {g.items.map(i => (
                      <NavLink key={i.to} to={i.to} className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-[15px] transition-colors hover:bg-white/5 ${isActive ? 'text-[var(--accent)]' : ''}`}>
                        {i.label}<Arrow size={13} />
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={g.label} to={g.to!} className={({ isActive }) => `px-4 py-2 text-[15px] opacity-90 hover:opacity-100 ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`}>{g.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 relative z-10">
            <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="label w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70" aria-label="Lingua / Language">
              {lang === 'it' ? 'EN' : 'IT'}
            </button>
            <Link to="/sostienici/dona" className="btn btn-accent hidden sm:inline-flex h-11 px-5">
              {t.nav.donate}
            </Link>
            <button onClick={() => setOpen(o => !o)} className="lg:hidden h-11 px-4 rounded-full border border-current flex items-center gap-2 text-[14px]" aria-expanded={open} aria-controls="mobile-menu">
              <span className="relative w-4 h-3" aria-hidden="true">
                <span className="absolute left-0 right-0 h-px bg-current transition-all duration-300" style={{ top: open ? 6 : 1, transform: open ? 'rotate(45deg)' : 'none' }} />
                <span className="absolute left-0 right-0 h-px bg-current transition-all duration-300" style={{ top: open ? 6 : 10, transform: open ? 'rotate(-45deg)' : 'none' }} />
              </span>
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile a schermo intero */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 lg:hidden dark overflow-y-auto transition-[clip-path] duration-700"
        style={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
        aria-hidden={!open}
      >
        <div className="wrap pt-28 pb-16 flex flex-col gap-10">
          {groups.map((g, gi) => (
            <div key={g.label} style={{ opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(24px)', transition: `all .8s cubic-bezier(.16,1,.3,1) ${0.15 + gi * 0.06}s` }}>
              {g.items ? (
                <>
                  <p className="label muted mb-3">{g.label}</p>
                  <div className="flex flex-col">
                    {g.items.map(i => (
                      <Link key={i.to} to={i.to} tabIndex={open ? 0 : -1} className="font-serif text-[2.4rem] leading-[1.15] flex items-center justify-between py-1">
                        {i.label}<Arrow size={20} />
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={g.to!} tabIndex={open ? 0 : -1} className="font-serif text-[2.4rem] leading-[1.15] flex items-center justify-between">
                  {g.label}<Arrow size={20} />
                </Link>
              )}
            </div>
          ))}
          <Link to="/sostienici/dona" tabIndex={open ? 0 : -1} className="btn btn-paper self-start mt-2">{t.nav.donate}<Arrow /></Link>
        </div>
      </div>
    </>
  )
}
