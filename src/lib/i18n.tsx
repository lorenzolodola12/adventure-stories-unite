import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './content'

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Content }
const LangCtx = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem('adv-lang') as Lang) || 'it' } catch { return 'it' }
  })
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const setLang = (l: Lang) => {
    try { localStorage.setItem('adv-lang', l) } catch { /* storage non disponibile */ }
    setLangState(l)
  }
  return <LangCtx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangCtx.Provider>
}

export function useLang() {
  const c = useContext(LangCtx)
  if (!c) throw new Error('useLang fuori da LangProvider')
  return c
}
