import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { EMAIL, FIVE_X_MILLE_ACTIVE, IBAN } from '../lib/content'
import Photo from '../components/Photo'
import Arrow from '../components/Arrow'
import { IbanCard, PageHeader, SectionLabel, Sponsors } from '../components/Blocks'

export function Donate() {
  const { t } = useLang()
  const d = t.donate
  const rows = [
    { k: d.holderK, v: d.holderV },
    { k: d.ibanK, v: IBAN },
    { k: d.reasonK, v: d.reasonV },
  ]
  return (
    <>
      <PageHeader label={d.label} title={d.title} intro={d.intro} photo="group-guide" photoAlt="Gruppo sulla neve con una guida" />
      <section className="py-20 md:py-32">
        <div className="wrap grid md:grid-cols-12 gap-16 md:gap-6 items-start">
          <div className="md:col-span-6">
            <SectionLabel>{d.bank}</SectionLabel>
            <dl className="mt-8">
              {rows.map(r => (
                <div key={r.k} className="rv grid grid-cols-[1fr_2fr] gap-4 py-5 border-b border-[var(--line)]">
                  <dt className="muted">{r.k}</dt>
                  <dd className="num text-[18px] break-words">{r.v}</dd>
                </div>
              ))}
            </dl>
            <p className="muted mt-6 text-[15px] rv">{d.cf}</p>
          </div>
          <div className="md:col-start-8 md:col-span-5"><IbanCard /></div>
        </div>
      </section>
      <section className="pb-24 md:pb-36">
        <div className={`wrap grid gap-6 ${FIVE_X_MILLE_ACTIVE ? 'md:grid-cols-2' : ''}`}>
          <a href={`mailto:${EMAIL}`} className="rv group rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[260px]" style={{ background: 'var(--accent)', color: 'var(--night)' }}>
            <div>
              <p className="label muted">{d.companies}</p>
              <p className="h3 mt-4 max-w-sm">{d.companiesBody}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-3"><span className="ulink">{EMAIL}</span><Arrow /></span>
          </a>
          {FIVE_X_MILLE_ACTIVE && <Link to="/sostienici/5x1000" className="rv group rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[260px]" style={{ background: 'var(--bg-2)', ['--d' as string]: 1 }}>
            <div>
              <p className="label muted">{t.five.status}</p>
              <p className="h3 mt-4">{t.five.title}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-3"><span className="ulink">{t.common.discover}</span><Arrow /></span>
          </Link>}
        </div>
      </section>
      <Sponsors />
    </>
  )
}

export function FiveXMille() {
  const { t } = useLang()
  const f = t.five
  return (
    <>
      <PageHeader label={f.label} title={f.title} />
      <section className="py-20 md:py-32">
        <div className="wrap grid md:grid-cols-12 gap-12 md:gap-6 items-center">
          <div className="md:col-span-6 rv rounded-2xl p-8 md:p-12" style={{ background: 'var(--bg-2)' }}>
            <p className="label flex items-center gap-3"><span className="relative flex w-2.5 h-2.5"><span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-60" /><span className="relative w-2.5 h-2.5 rounded-full bg-[var(--accent)]" /></span>{f.status}</p>
            <p className="lead mt-6">{f.body}</p>
            <Link to="/sostienici/dona" className="btn btn-ink mt-10">{t.nav.donate}<Arrow /></Link>
          </div>
          <Photo name="nature-peak-clouds" alt="" wipe className="md:col-start-8 md:col-span-5" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  const { t } = useLang()
  return (
    <section className="min-h-[80svh] flex items-end pb-24 pt-40">
      <div className="wrap">
        <p className="label muted">404</p>
        <h1 className="display mt-6">{t.notFound.title}</h1>
        <p className="lead mt-6 muted">{t.notFound.body}</p>
        <Link to="/" className="btn btn-ink mt-10">{t.common.back}<Arrow /></Link>
      </div>
    </section>
  )
}
