import { useEffect, useRef, useState } from 'react'

// Cursore personalizzato: un punto che segue il mouse e si allarga con un'etichetta
// sugli elementi con data-cursor="…". Solo con mouse, mai su touch.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      setLabel(target?.dataset.cursor ?? '')
    }
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={ref} className={`cursor ${label ? 'big' : ''}`} aria-hidden="true">
      <div className="cursor-dot"><span>{label}</span></div>
    </div>
  )
}
