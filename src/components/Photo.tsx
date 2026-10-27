import type { CSSProperties } from 'react'
import { frameNo, getPhoto } from '../lib/photos'

interface Props {
  name: string
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  eager?: boolean
  wipe?: boolean
  delay?: number
  style?: CSSProperties
  cover?: boolean // solo per sfondi: riempie il contenitore
  frame?: boolean // crocini di taglio + numero di fotogramma
  caption?: string
}

// Foto sempre nelle proporzioni originali (width/height reali), WebP responsive.
export default function Photo({ name, alt, sizes = '100vw', className = '', imgClassName = '', eager, wipe, delay = 0, style, cover, frame, caption }: Props) {
  const p = getPhoto(name)
  const img = (
    <picture>
      {Object.entries(p.sources).map(([type, srcset]) => <source key={type} type={`image/${type}`} srcSet={srcset} sizes={sizes} />)}
      <img
        src={p.img.src} width={p.img.w} height={p.img.h} alt={alt}
        loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'}
        className={`${cover ? 'w-full h-full object-cover' : 'w-full h-auto'} ${imgClassName}`}
      />
    </picture>
  )
  const body = wipe
    ? <div className="wipe" style={{ ['--d' as string]: delay }}>{img}</div>
    : img
  if (!frame) return <div className={`${className}`} style={style}>{body}</div>
  return (
    <figure className={`m-0 ${className}`} style={style}>
      <div className="relative">{body}<span className="marks" aria-hidden="true" /></div>
      <figcaption className="frame-no"><span>{frameNo(name)}</span>{caption && <span>{caption}</span>}</figcaption>
    </figure>
  )
}

export function ratio(name: string) {
  const p = getPhoto(name)
  return p.img.w / p.img.h
}
