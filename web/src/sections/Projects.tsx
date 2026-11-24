import { projects } from '../data'
import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

export function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="03" title={t.projects.title} kanji="作品" reading="さくひん" />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.id} data-reveal="item" className="group border-ink bg-paper flex flex-col border p-3">
            {/* Anotación superior de la tarjeta */}
            <div className="label mb-2 flex justify-between">
              <span>{String(i + 1).padStart(2, '0')} / P{i + 1}</span>
              {p.wip ? <span className="text-red">({t.projects.wip})</span> : <span aria-hidden="true">◎</span>}
            </div>
            <div className="border-ink bg-paper-dark relative aspect-video overflow-hidden border">
              {p.image ? (
                <img
                  src={p.image}
                  srcSet={`${p.image.replace('.webp', '-640.webp')} 640w, ${p.image} 1280w`}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover object-top grayscale-[35%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              ) : (
                <div className="grid size-full place-items-center">
                  <span className="font-display text-ink/25 text-5xl font-extrabold">{p.name.slice(0, 2)}</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
              <h3 className="font-display text-2xl font-extrabold uppercase">{p.name}</h3>
              <p className="text-ink-soft mt-2 flex-1 leading-relaxed">{t.projects.items[p.id]}</p>
              <p className="label text-red mt-4">{p.stack.join(' / ')}</p>
              <div className="border-ink/20 mt-4 flex gap-5 border-t pt-3 text-sm font-bold uppercase">
                {p.site && (
                  <a href={p.site} target="_blank" rel="noreferrer" className="hover:text-red" aria-label={`${t.projects.site}: ${p.name} (${t.projects.newTab})`}>
                    {t.projects.site} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="hover:text-red" aria-label={`${t.projects.code}: ${p.name} (${t.projects.newTab})`}>
                    {t.projects.code} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
