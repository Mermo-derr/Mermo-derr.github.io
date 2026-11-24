import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

const links = ['about', 'skills', 'projects', 'motion', 'contact'] as const

// Barra negra superior: la "varilla" de arriba del pergamino.
// En móvil, los enlaces se despliegan como una tira de papel bajo la varilla.
export function Nav() {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <nav className="bg-ink text-paper fixed inset-x-0 top-0 z-50 shadow-[0_4px_0_0_var(--color-paper-dark)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Alan Mermolia">
          <span aria-hidden="true" className="bg-red grid size-7 place-items-center rounded-full font-display text-sm font-extrabold">A</span>
          <span className="label hidden sm:inline">Mermolia</span>
        </a>
        <ul className="label ml-auto hidden gap-6 md:flex">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="text-paper/70 hover:text-paper transition-colors">
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          title={t.nav.langLabel}
          className="label border-paper/30 hover:border-paper ml-auto border px-3 py-1 md:ml-0"
        >
          <span className={lang === 'es' ? 'text-paper' : 'text-paper/50'}>ES</span>
          <span className="text-paper/50"> / </span>
          <span className={lang === 'en' ? 'text-paper' : 'text-paper/50'}>EN</span>
          <span className="sr-only"> — {t.nav.langLabel}</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label -mr-2 flex h-10 items-center gap-2 px-2 md:hidden"
        >
          {t.nav.menu}
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span className={`bg-paper absolute inset-x-0 top-0 h-0.5 transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`bg-paper absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
      {open && (
        <ul id="mobile-menu" className="bg-paper text-ink border-ink border-b md:hidden">
          {links.map((id, i) => (
            <li key={id} className={i > 0 ? 'border-ink/15 border-t' : ''}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="font-display flex items-baseline gap-4 px-6 py-3 text-xl font-extrabold uppercase"
              >
                <span className="label text-red">{String(i + 1).padStart(2, '0')}</span>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
