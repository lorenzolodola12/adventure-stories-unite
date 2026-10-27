import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import qr from '../donation-qr-code.png'
import { IBAN, EMAIL, SPONSORS } from '../lib/content'
import { useLang } from '../lib/i18n'
import Words, { plain } from './Words'
import Photo from './Photo'
import Arrow from './Arrow'

// Intestazione delle sottopagine: etichetta, titolo grande, intro, foto opzionale intera.
export function PageHeader({ label, title, intro, photo, photoAlt, children }: { label: string; title: string; intro?: string | string[]; photo?: string; photoAlt?: string; children?: ReactNode }) {
  const paras = intro === undefined ? [] : Array.isArray(intro) ? intro : [intro]
  return (
    <header className="pt-32 md:pt-44">
      <div className="wrap">
        <p className="label muted rv">{label}</p>
        <Words as="h1" text={title} className="h1 mt-5 md:mt-6 max-w-[14ch]" />
        {paras.length > 0 && (
          <div className="grid md:grid-cols-12 mt-10 md:mt-14">
            <div className="md:col-start-6 md:col-span-7">
              <p className="lead rv" style={{ ['--d' as string]: 2 }}>{paras[0]}</p>
              {paras.slice(1).map((para, i) => <p key={i} className="mt-6 text-[18px] md:text-[19px] leading-relaxed rv" style={{ ['--d' as string]: 3 + i }}>{para}</p>)}
            </div>
          </div>
        )}
        {children}
      </div>
      {photo && (
        <div className="wrap mt-16 md:mt-24">
          <Photo name={photo} alt={photoAlt ?? plain(title)} eager wipe sizes="(min-width: 1440px) 1360px, 96vw" frame />
        </div>
      )}
    </header>
  )
}

export function SectionLabel({ n, children, className = '' }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {n && <span className="label num" style={{ color: 'var(--accent)' }}>{n}</span>}
      <span className="label muted rv">{children}</span>
      <span className="rule flex-1" />
    </div>
  )
}

export function Facts({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid sm:grid-cols-3 border-t border-[var(--line)]">
      {items.map((f, i) => (
        <div key={f.k} className="rv py-6 sm:pr-6 border-b sm:border-b-0 border-[var(--line)] sm:[&:not(:first-child)]:pl-6 sm:[&:not(:first-child)]:border-l" style={{ ['--d' as string]: i }}>
          <dt className="label muted">{f.k}</dt>
          <dd className="h3 mt-3">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ContactBand({ text }: { text: string }) {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--accent)', color: 'var(--night)' }}>
      <div className="wrap py-24 md:py-36 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <Words text={text} className="h2 max-w-[18ch]" />
        <a href={`mailto:${EMAIL}`} className="btn self-start md:self-auto rv" style={{ background: 'var(--night)', color: 'var(--snow)' }}>{t.common.write}<Arrow /></a>
      </div>
    </section>
  )
}

export function IbanCard({ dark = false }: { dark?: boolean }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(IBAN.replace(/\s/g, '')); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { /* clipboard non disponibile */ }
  }
  const line = dark ? 'rgba(238,234,226,0.16)' : 'rgba(21,19,16,0.14)'
  return (
    <div className="rv rounded-2xl p-6 md:p-8" style={{ border: `1px solid ${line}`, background: dark ? 'rgba(238,234,226,0.04)' : 'var(--bg-2)' }}>
      <p className="label muted">{t.home.support.iban}</p>
      <p className="num mt-3 text-[1.35rem] md:text-[1.65rem] leading-snug tracking-wide break-words" style={{ fontFeatureSettings: '"tnum" 1' }}>{IBAN}</p>
      <p className="muted text-[15px] mt-1">{t.home.support.holder}</p>
      <button onClick={copy} className={`btn mt-6 h-12 ${dark ? 'btn-paper' : 'btn-ink'}`} aria-live="polite">
        {copied ? t.common.copied : t.common.copy}
        {copied ? <span aria-hidden="true">✓</span> : <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.3" /></svg>}
      </button>
      <div className="flex items-center gap-5 mt-8 pt-6" style={{ borderTop: `1px solid ${line}` }}>
        <img src={qr} alt="QR bonifico Adventurabile APS" width={104} height={104} className="w-[104px] h-[104px] rounded-lg bg-white p-2 flex-shrink-0" />
        <p className="muted text-[15px] leading-snug">{t.home.support.qr}</p>
      </div>
    </div>
  )
}

export function Sponsors() {
  const { t } = useLang()
  const row = [...SPONSORS, ...SPONSORS, ...SPONSORS]
  return (
    <section className="overflow-hidden py-12 md:py-16" style={{ background: 'var(--accent)', color: '#0e100c' }} aria-label={t.home.sponsors}>
      <div className="wrap mb-6"><p className="label">{t.home.sponsors}</p></div>
      <div className="marquee" style={{ ['--speed' as string]: '38s' }}>
        {[0, 1].map(k => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {row.map((s, i) => (
              <span key={`${k}-${i}`} className="font-serif whitespace-nowrap px-6 md:px-10 flex items-center gap-12 md:gap-20" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', lineHeight: 1 }}>
                {s}<span aria-hidden="true" className="text-[0.5em]">✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="inline-flex items-center gap-3 text-[16px] font-medium group"><span className="ulink">{children}</span><Arrow /></Link>
}
