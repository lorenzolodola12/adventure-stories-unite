import { useCallback, useEffect, useRef, useState } from 'react'
import { frameNo, getPhoto } from '../lib/photos'
import { useLang } from '../lib/i18n'

// Galleria "giustificata": ogni foto mantiene le sue proporzioni originali,
// le righe si allineano ai bordi. Clic = visualizzatore a schermo intero.
export default function Gallery({ names, rowHeight = 250 }: { names: string[]; rowHeight?: number }) {
  const { t } = useLang()
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-3 after:content-[''] after:grow-[999]" style={{ ['--rh' as string]: `${rowHeight}px` }}>
        {names.map((n, i) => {
          const p = getPhoto(n)
          const r = p.img.w / p.img.h
          return (
            <button
              key={n}
              type="button"
              onClick={() => setActive(i)}
              data-cursor={t.common.open}
              className="rv relative overflow-hidden bg-[var(--bg-2)] group"
              style={{ flexGrow: r, flexBasis: `calc(var(--rh) * ${r} * var(--k, 1))`, aspectRatio: `${p.img.w} / ${p.img.h}`, ['--d' as string]: i % 4 }}
              aria-label={`${t.common.open} ${i + 1}`}
            >
              <picture>
                {Object.entries(p.sources).map(([type, srcset]) => <source key={type} type={`image/${type}`} srcSet={srcset} sizes="(min-width: 768px) 40vw, 90vw" />)}
                <img src={p.img.src} width={p.img.w} height={p.img.h} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
              </picture>
              <span className="absolute left-2 bottom-1.5 label text-[10px] text-white mix-blend-difference opacity-80 pointer-events-none">{frameNo(n)}</span>
            </button>
          )
        })}
      </div>
      {active !== null && <Lightbox names={names} index={active} onChange={setActive} onClose={() => setActive(null)} />}
    </>
  )
}

function Lightbox({ names, index, onChange, onClose }: { names: string[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const { t } = useLang()
  const touch = useRef<number | null>(null)
  const prev = useCallback(() => onChange((index - 1 + names.length) % names.length), [index, names.length, onChange])
  const next = useCallback(() => onChange((index + 1) % names.length), [index, names.length, onChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose, prev, next])

  const p = getPhoto(names[index])
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center page-in"
      style={{ background: 'rgba(12,11,9,0.97)' }}
      onClick={onClose}
      onTouchStart={e => { touch.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) { if (dx > 0) prev(); else next() }
        touch.current = null
      }}
      role="dialog" aria-modal="true"
    >
      <picture key={names[index]} onClick={e => e.stopPropagation()} className="page-in">
        {Object.entries(p.sources).map(([type, srcset]) => <source key={type} type={`image/${type}`} srcSet={srcset} sizes="92vw" />)}
        <img src={p.img.src} width={p.img.w} height={p.img.h} alt="" className="max-w-[94vw] max-h-[86vh] w-auto h-auto object-contain" />
      </picture>
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-5 md:p-8 text-[#ecebe3]">
        <span className="label num">{String(index + 1).padStart(2, '0')} / {String(names.length).padStart(2, '0')}</span>
        <button onClick={onClose} className="label hover:text-[var(--accent)]">{t.nav.close} ✕</button>
      </div>
      <button onClick={e => { e.stopPropagation(); prev() }} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[var(--line-strong)] text-[#ecebe3] items-center justify-center hover:bg-[#ecebe3] hover:text-[#0e100c] transition-colors" aria-label="Precedente">←</button>
      <button onClick={e => { e.stopPropagation(); next() }} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[var(--line-strong)] text-[#ecebe3] items-center justify-center hover:bg-[#ecebe3] hover:text-[#0e100c] transition-colors" aria-label="Successiva">→</button>
    </div>
  )
}
