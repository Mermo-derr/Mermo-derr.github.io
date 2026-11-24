import { useI18n } from '../i18n'

const links = ['about', 'skills', 'projects', 'motion', 'contact'] as const

// Barra negra superior: la "varilla" de arriba del pergamino.
export function Nav() {
  const { t, lang, setLang } = useI18n()

  return (
    <nav className="bg-ink text-paper fixed inset-x-0 top-0 z-50 shadow-[0_4px_0_0_var(--color-paper-dark)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Alan Mermolia">
          <span className="bg-red grid size-7 place-items-center rounded-full font-display text-sm font-extrabold">A</span>
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
          aria-label={t.nav.langLabel}
          className="label border-paper/30 hover:border-paper ml-auto border px-3 py-1 md:ml-0"
        >
          <span className={lang === 'es' ? 'text-paper' : 'text-paper/40'}>ES</span>
          <span className="text-paper/40"> / </span>
          <span className={lang === 'en' ? 'text-paper' : 'text-paper/40'}>EN</span>
        </button>
      </div>
    </nav>
  )
}
