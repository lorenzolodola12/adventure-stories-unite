import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SELECTOR = '.rv, .words, .wipe, .rule'

// Osserva tutti gli elementi animabili e aggiunge `in` quando entrano nello schermo.
// Si riattiva a ogni cambio pagina e quando il DOM cambia (es. lingua, gallerie).
export function useRevealAll() {
  const { pathname } = useLocation()
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 })
    const scan = () => document.querySelectorAll(SELECTOR).forEach(el => { if (!el.classList.contains('in')) io.observe(el) })
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('root')!, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [pathname])
}

// Parallasse leggera: elementi con data-speed si spostano rispetto al centro dello schermo.
export function useParallax() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-speed]').forEach(el => {
        const r = el.parentElement!.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) return
        const speed = parseFloat(el.dataset.speed || '0')
        const offset = (r.top + r.height / 2 - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [pathname])
}

// Riproduce un video solo quando è visibile.
export function playInView(video: HTMLVideoElement | null) {
  if (!video) return () => {}
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) video.play().catch(() => {}); else video.pause() }, { rootMargin: '150px' })
  io.observe(video)
  return () => io.disconnect()
}
