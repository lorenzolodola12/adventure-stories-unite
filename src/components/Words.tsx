import { Fragment, type ElementType } from 'react'

// Titolo che entra parola per parola. Il testo tra *asterischi* va in corsivo serif,
// anche dentro una parola (es. "L'*esplorazione.*").
export interface WordPart { t: string; it: boolean }
export function parseWords(text: string) {
  let italic = false
  return text.split(' ').map(raw => {
    const parts: WordPart[] = []
    let buf = ''
    for (const ch of raw) {
      if (ch === '*') { if (buf) parts.push({ t: buf, it: italic }); buf = ''; italic = !italic }
      else buf += ch
    }
    if (buf) parts.push({ t: buf, it: italic })
    return { parts, w: parts.map(p => p.t).join(''), it: parts.some(p => p.it) }
  })
}

export const plain = (text: string) => text.replace(/\*/g, '')

export function WordParts({ parts }: { parts: WordPart[] }) {
  return <>{parts.map((p, i) => p.it ? <span key={i} className="ser">{p.t}</span> : <Fragment key={i}>{p.t}</Fragment>)}</>
}

export default function Words({ text, as: Tag = 'h2', className = '', delay = 0 }: { text: string; as?: ElementType; className?: string; delay?: number }) {
  const words = parseWords(text)
  return (
    <Tag className={`words ${className}`} style={{ ['--d' as string]: delay }} aria-label={plain(text)}>
      {words.map(({ parts, it }, i) => (
        <Fragment key={i}>
          <span className={`w ${it ? 'ser-w' : ''}`} aria-hidden="true"><span style={{ ['--i' as string]: i }}><WordParts parts={parts} /></span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
