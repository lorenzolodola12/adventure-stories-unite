import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { FIVE_X_MILLE_ACTIVE } from '../lib/content'
import { playInView } from '../lib/motion'
import { getPhoto } from '../lib/photos'
import Words, { WordParts, parseWords, plain } from '../components/Words'
import Photo from '../components/Photo'
import Arrow from '../components/Arrow'
import Gallery from '../components/Gallery'
import { IbanCard, SectionLabel, Sponsors, TextLink } from '../components/Blocks'

const ARCHIVE = [
  'nature-deer-sunrise', 'ski-instructor', 'nature-ibex-rocks', 'group-hike', 'nature-larches', 'triride-forest',
  'ski-together', 'nature-peak-clouds', 'nature-chamois', 'triride-hill', 'ski-turn', 'nature-frost',
  'nature-eagle', 'canoe-lake', 'nature-fox-snow', 'ski-fog', 'nature-forest-deer', 'triride-bw',
  'nature-ibex-sunset', 'group-guide', 'nature-trunks', 'ski-speed', 'nature-misty-forest', 'van',
  'ski-lift', 'triride-workshop', 'event-sponsor', 'ski-landscape',
]

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Activities />
      <People />
      <Film />
      <Education />
      <Archive />
      <Sponsors />
      <Support />
    </>
  )
}

function Hero() {
  const { t } = useLang()
  const h = t.home.hero
  const section = useRef<HTMLElement>(null)
  const [p, setP] = useState(0)

  // avanzamento dello scroll dentro la hero (0 → 1)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setP(1); return }
    let raf = 0
    const tick = () => {
      raf = 0
      const el = section.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setP(Math.min(1, Math.max(0, -r.top / total)))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const ease = (x: number) => 1 - Math.pow(1 - x, 3)
  const zoom = 1 + Math.pow(Math.min(1, p / 0.6), 2.4) * 7          // le lettere si allargano
  const mask = 1 - ease(Math.min(1, Math.max(0, (p - 0.25) / 0.35)))   // la maschera nera sparisce
  const copy = ease(Math.min(1, Math.max(0, (p - 0.55) / 0.3)))       // il titolo entra

  return (
    <section ref={section} className="relative on-photo" style={{ height: '260svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline poster="/videos/hero-poster.jpg">
          <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* il video si vede solo dentro le lettere: nero × video = nero, bianco × video = video */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#000', mixBlendMode: 'multiply', opacity: mask }} aria-hidden="true">
          <span className="font-[family-name:var(--font-display)] uppercase text-white leading-none whitespace-nowrap select-none"
            style={{ fontSize: '16.4vw', letterSpacing: '-0.01em', transform: `scale(${zoom})`, transformOrigin: '50% 52%', willChange: 'transform' }}>
            Adventurabile
          </span>
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ opacity: copy, background: 'linear-gradient(180deg, rgba(14,16,12,0.35) 0%, rgba(14,16,12,0) 35%, rgba(14,16,12,0.2) 60%, rgba(14,16,12,0.88) 100%)' }} />

        {/* etichette tecniche agli angoli, come un mirino */}
        <div className="absolute inset-x-0 top-24 md:top-28 wrap flex justify-between label pointer-events-none" style={{ color: 'rgba(236,235,227,0.75)', opacity: 1 - copy * 0.6 }}>
          <span>{h.kicker}</span><span className="hidden md:inline">REC ●</span>
        </div>
        <div className="absolute inset-x-0 bottom-8 wrap flex justify-center label pointer-events-none" style={{ color: 'rgba(236,235,227,0.75)', opacity: 1 - Math.min(1, p * 4) }}>
          <span className="flex flex-col items-center gap-3">{h.scroll}<span className="block w-px h-10 bg-current animate-pulse" /></span>
        </div>

        <div className="absolute inset-x-0 bottom-0 wrap pb-10 md:pb-14" style={{ opacity: copy, transform: `translateY(${(1 - copy) * 40}px)`, pointerEvents: copy > 0.5 ? 'auto' : 'none' }}>
          <h1 className="display max-w-[12ch]" aria-label={plain(h.title)}>
            {parseWords(h.title).map(({ parts }, i) => <span key={i}><WordParts parts={parts} />{' '}</span>)}
          </h1>
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="max-w-md text-[17px] md:text-[19px] leading-relaxed" style={{ color: 'rgba(236,235,227,0.9)' }}>{h.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/chi-siamo/storia" className="btn btn-accent">{h.ctaAbout}<Arrow /></Link>
              <Link to="/sostienici/dona" className="btn btn-line" style={{ color: 'var(--snow)' }}>{h.ctaSupport}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  const { t } = useLang()
  const s = t.home.intro
  return (
    <section className="py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="01">{s.label}</SectionLabel>
        <Words text={s.lead} className="display mt-10 md:mt-14 max-w-[15ch]" />
        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-6 items-start">
          <div className="md:col-span-6">
            <Photo name="triride-path" alt="Carrozzina con Triride su un sentiero di montagna" wipe frame sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="md:col-start-8 md:col-span-5 md:pt-10">
            {s.body.map((para, i) => <p key={i} className={`text-[18px] md:text-[19px] leading-relaxed rv ${i ? 'mt-6' : ''}`} style={{ ['--d' as string]: i }}>{para}</p>)}
            <p className="lead mt-10 rv" style={{ ['--d' as string]: 1 }}>{s.body2}</p>
            <div className="mt-10 rv" style={{ ['--d' as string]: 2 }}><TextLink to="/chi-siamo/storia">{t.common.readStory}</TextLink></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Activities() {
  const { t } = useLang()
  const a = t.home.activities
  const [hover, setHover] = useState<number | null>(null)
  const preview = useRef<HTMLDivElement>(null)

  // anteprima che segue il mouse (solo desktop)
  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      cx += (x - cx) * 0.14; cy += (y - cy) * 0.14
      if (preview.current) preview.current.style.transform = `translate3d(${cx + 28}px, ${cy - 140}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="light py-24 md:py-36">
      <div className="wrap">
        <SectionLabel n="02">{a.label}</SectionLabel>
        <Words text={a.title} className="h1 mt-10 md:mt-14" />
        <ul className="mt-14 md:mt-20 border-t border-[var(--line)]" onPointerLeave={() => setHover(null)}>
          {a.items.map((item, i) => (
            <li key={item.key} className="border-b border-[var(--line)]">
              <Link
                to={item.to}
                onPointerEnter={() => setHover(i)}
                data-cursor={t.common.discover}
                className="group grid md:grid-cols-12 gap-6 md:gap-6 py-8 md:py-12 items-center"
              >
                <span className="md:col-span-1 label num" style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                {/* su mobile la foto sta nella riga */}
                <Photo name={item.photo} alt={item.title} wipe className="md:hidden" sizes="100vw" />
                <span className="md:col-span-6 font-serif leading-none transition-transform duration-700 group-hover:translate-x-3" style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)' }}>{item.title}</span>
                <span className="md:col-span-4 text-[17px] leading-relaxed muted">{item.body}</span>
                <span className="hidden md:flex md:col-span-1 justify-end"><span className="w-14 h-14 rounded-full border border-[var(--line)] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0e100c] group-hover:text-[#ecebe3]"><Arrow /></span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div ref={preview} className="hidden md:block fixed left-0 top-0 z-30 pointer-events-none" aria-hidden="true">
        {a.items.map((item, i) => {
          const p = getPhoto(item.photo)
          return (
            <img key={item.key} src={p.img.src} width={p.img.w} height={p.img.h} alt="" loading="lazy"
              className="absolute left-0 top-0 w-[360px] h-auto shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-500"
              style={{ opacity: hover === i ? 1 : 0, transform: hover === i ? 'scale(1) rotate(-2deg)' : 'scale(.85) rotate(0deg)' }} />
          )
        })}
      </div>
    </section>
  )
}

function People() {
  const { t } = useLang()
  const [lorenzo, fabio] = t.athletes
  return (
    <section className="py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="03">{t.home.people.label}</SectionLabel>
        <div className="mt-10 md:mt-14 flex items-end justify-between gap-6">
          <div>
            <Words text={t.home.people.title} className="h1" />
            <p className="lead mt-4 muted rv">{t.home.people.sub}</p>
          </div>
          <div className="hidden md:block rv"><TextLink to="/chi-siamo/team">{t.common.team}</TextLink></div>
        </div>
        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-16 md:gap-6">
          <article className="md:col-span-5">
            <Photo name={lorenzo.photo} alt={lorenzo.name} wipe frame sizes="(min-width: 768px) 40vw, 100vw" />
            <h3 className="h2 mt-6 rv">{lorenzo.name}</h3>
            <p className="mt-4 text-[17px] leading-relaxed max-w-md rv">{lorenzo.body}</p>
          </article>
          <article className="md:col-start-7 md:col-span-6 md:mt-[28%]" data-speed="-0.05">
            <Photo name={fabio.photo} alt={fabio.name} wipe delay={1} frame sizes="(min-width: 768px) 50vw, 100vw" />
            <h3 className="h2 mt-6 rv">{fabio.name}</h3>
            <p className="mt-4 text-[17px] leading-relaxed max-w-md rv">{fabio.body}</p>
          </article>
        </div>
        <div className="md:hidden mt-14"><TextLink to="/chi-siamo/team">{t.common.team}</TextLink></div>
      </div>
    </section>
  )
}

// Il trailer inizia con ~20s di nero (citazione + logo): come sfondo muto partiamo dalle riprese.
const START_AT = 22

function Film() {
  const { t } = useLang()
  const f = t.home.film
  const P = f.player
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [watch, setWatch] = useState(false)     // modalità film: audio + player
  const watchRef = useRef(false)
  const [idle, setIdle] = useState(false)       // dopo 3s senza movimenti spariscono titoli e comandi
  const idleTimer = useRef<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const [full, setFull] = useState(false)
  useEffect(() => playInView(video.current), [])

  const armIdle = () => {
    window.clearTimeout(idleTimer.current)
    if (watchRef.current) idleTimer.current = window.setTimeout(() => setIdle(true), 3000)
  }
  const wake = () => { setIdle(false); armIdle() }
  const hidden = watch && idle
  useEffect(() => {
    document.documentElement.toggleAttribute('data-hide-cursor', hidden)
    return () => document.documentElement.removeAttribute('data-hide-cursor')
  }, [hidden])
  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === section.current)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const startWatching = () => {
    const v = video.current
    if (!v) return
    watchRef.current = true
    setWatch(true)
    v.muted = false; v.volume = volume; setMuted(false)
    v.currentTime = 0 // con l'audio il trailer riparte dall'inizio
    v.play().catch(() => {})
    wake()
  }
  const stopWatching = () => {
    const v = video.current
    watchRef.current = false
    setWatch(false); setIdle(false)
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    if (v) { v.muted = true; v.currentTime = START_AT; v.play().catch(() => {}) }
  }
  const togglePlay = () => { const v = video.current; if (!v) return; if (v.paused) v.play().catch(() => {}); else v.pause(); wake() }
  const skip = (d: number) => { const v = video.current; if (!v) return; v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d)); wake() }
  const toggleMute = () => { const v = video.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); wake() }
  const changeVolume = (x: number) => { const v = video.current; if (!v) return; v.volume = x; v.muted = x === 0; setVolume(x); setMuted(x === 0); wake() }
  const seek = (x: number) => { const v = video.current; if (!v) return; v.currentTime = x; setTime(x); wake() }
  const toggleFull = () => {
    const sec = section.current as (HTMLElement & { webkitRequestFullscreen?: () => void }) | null
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (document.fullscreenElement) { document.exitFullscreen().catch(() => {}); return }
    if (sec?.requestFullscreen) sec.requestFullscreen().catch(() => {})
    else if (sec?.webkitRequestFullscreen) sec.webkitRequestFullscreen()
    else v?.webkitEnterFullscreen?.() // iPhone: player nativo
    wake()
  }
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  const iconBtn = 'w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/15'

  return (
    <section ref={section} className="relative dark on-photo overflow-hidden bg-black" style={{ height: full ? '100vh' : 'clamp(620px, 100svh, 1100px)', cursor: hidden ? 'none' : undefined }}
      onPointerMove={() => { if (watch) wake() }} onPointerDown={() => { if (watch) wake() }}>
      <video
        ref={video} className={`absolute inset-0 w-full h-full ${full ? 'object-contain' : 'object-cover'}`} muted playsInline preload="none" poster="/videos/trailer-poster.jpg"
        onLoadedMetadata={e => { setDur(e.currentTarget.duration); if (!watchRef.current) e.currentTarget.currentTime = START_AT }}
        onTimeUpdate={e => { const v = e.currentTarget; setTime(v.currentTime); if (!watchRef.current && v.currentTime < START_AT - 1) v.currentTime = START_AT }}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={e => { if (watchRef.current) stopWatching(); else { e.currentTarget.currentTime = START_AT; e.currentTarget.play().catch(() => {}) } }}
        onClick={() => { if (watch) togglePlay() }}
      >
        <source src="/videos/trailer-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/videos/trailer.mp4" type="video/mp4" />
      </video>

      {/* titoli: pieni a video muto, si ritirano in modalità film */}
      <div className="absolute inset-0 transition-opacity duration-1000 pointer-events-none" style={{ opacity: watch ? 0 : 1, background: 'linear-gradient(180deg, rgba(21,19,16,0.55) 0%, rgba(21,19,16,0.05) 35%, rgba(21,19,16,0.15) 60%, rgba(21,19,16,0.9) 100%)' }} />
      <div className="relative h-full wrap flex flex-col justify-between py-24 md:py-28 transition-opacity duration-1000" style={{ opacity: watch ? 0 : 1, pointerEvents: watch ? 'none' : undefined }}>
        <SectionLabel n="04">{f.label}</SectionLabel>
        <div>
          <Words text={f.title} className="display italic" />
          <p className="font-serif mt-2 text-[1.8rem] md:text-[2.6rem] rv" style={{ color: 'rgba(238,234,226,0.8)' }}>{f.sub}</p>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <button onClick={startWatching} data-cursor={t.common.watch} className="btn btn-paper self-start rv">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg>
              {f.unmute}
            </button>
            <p className="muted rv">{f.note}</p>
          </div>
        </div>
      </div>

      {/* player: compare in modalità film, si nasconde con l'inattività */}
      {watch && (
        <div className="absolute inset-x-0 bottom-0 transition-opacity duration-700" style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto', background: 'linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0))' }}>
          <div className="wrap pb-5 md:pb-7 pt-16 text-white">
            <input type="range" min={0} max={dur || 0} step={0.1} value={time} onChange={e => seek(Number(e.target.value))} aria-label={P.seek}
              className="w-full h-1 cursor-pointer accent-[var(--accent)]" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 md:gap-2">
                <button onClick={togglePlay} aria-label={playing ? P.pause : P.play} className={iconBtn}>
                  {playing
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg>}
                </button>
                <button onClick={() => skip(-15)} aria-label={P.back} className={`${iconBtn} label text-[10px]`}>−15</button>
                <button onClick={() => skip(15)} aria-label={P.fwd} className={`${iconBtn} label text-[10px]`}>+15</button>
                <button onClick={toggleMute} aria-label={muted ? P.unmute : P.mute} className={iconBtn}>
                  {muted || volume === 0
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="m23 9-6 6M17 9l6 6" /></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>}
                </button>
                <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} onChange={e => changeVolume(Number(e.target.value))} aria-label={P.volume}
                  className="hidden md:block w-24 h-1 cursor-pointer accent-[var(--accent)]" />
                <span className="label text-[11px] ml-2 num whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.8)' }}>{fmt(time)} / {fmt(dur)}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <button onClick={toggleFull} aria-label={full ? P.exitFull : P.full} className={iconBtn}>
                  {full
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>}
                </button>
                <button onClick={stopWatching} aria-label={P.close} className={iconBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Education() {
  const { t } = useLang()
  const e = t.home.education
  return (
    <section className="light py-24 md:py-40 overflow-hidden">
      <div className="wrap grid md:grid-cols-12 gap-14 md:gap-6 items-center">
        <div className="md:col-span-5">
          <SectionLabel n="05">{e.label}</SectionLabel>
          <Words text={e.title} className="h1 mt-10" />
          <p className="mt-8 text-[19px] leading-relaxed max-w-md rv">{e.body}</p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 rv">
            <TextLink to="/lavoro/educazione">{e.ctaEdu}</TextLink>
            <TextLink to="/lavoro/eventi">{e.ctaEvents}</TextLink>
          </div>
        </div>
        <div className="md:col-start-7 md:col-span-6 relative">
          <Photo name="school-gym" alt="Incontro con una classe in palestra" wipe className="md:w-[82%] md:ml-auto" sizes="(min-width: 768px) 45vw, 100vw" />
          <div className="w-[70%] md:w-[58%] -mt-16 md:-mt-28 relative"><div data-speed="-0.08"><Photo name="talk-stage" alt="Lorenzo durante un intervento sul palco" wipe delay={2} className="shadow-[0_30px_70px_rgba(0,0,0,0.25)]" sizes="(min-width: 768px) 30vw, 70vw" /></div></div>
        </div>
      </div>
    </section>
  )
}

function Archive() {
  const { t } = useLang()
  return (
    <section className="pb-24 md:pb-40">
      <div className="wrap">
        <SectionLabel n="06">{t.home.archive.label}</SectionLabel>
        <div className="mt-10 md:mt-14 mb-12 md:mb-16 flex items-end justify-between gap-6">
          <Words text={t.home.archive.title} className="h1 italic" />
          <span className="label muted num pb-3 rv">{ARCHIVE.length} {t.common.photos}</span>
        </div>
        <Gallery names={ARCHIVE} />
      </div>
    </section>
  )
}

function Support() {
  const { t } = useLang()
  const s = t.home.support
  return (
    <section className="dark">
      <div className="wrap py-24 md:py-40 grid md:grid-cols-12 gap-14 md:gap-6 items-end">
        <div className="md:col-span-6">
          <SectionLabel n="07">{s.label}</SectionLabel>
          <Words text={s.title} className="display mt-10 max-w-[9ch]" />
          <p className="mt-8 text-[19px] leading-relaxed max-w-md muted rv">{s.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rv">
            <Link to="/sostienici/dona" className="btn btn-paper">{s.cta}<Arrow /></Link>
            {FIVE_X_MILLE_ACTIVE && <Link to="/sostienici/5x1000" className="ulink muted">{s.five}</Link>}
          </div>
        </div>
        <div className="md:col-start-8 md:col-span-5"><IbanCard dark /></div>
      </div>
    </section>
  )
}
