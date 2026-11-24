import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { es, type Dict } from './es'
import { en } from './en'

export type Lang = 'es' | 'en'

const dicts: Record<Lang, Dict> = { es, en }
const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const I18nContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void } | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = dicts[lang]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  return <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
