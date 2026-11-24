import { clips } from '../data'
import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

// Placeholder: el reel y los clips comprimidos se agregan en la Fase 4.
export function Motion() {
  const { t } = useI18n()

  return (
    <section id="motion" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="04" title={t.motion.title} kanji="映像" reading="えいぞう" />
      <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
        <div aria-hidden="true" className="bg-ink text-paper hidden w-20 items-center justify-center py-6 lg:flex">
          <span className="vertical-jp text-2xl font-extrabold">動きと映像</span>
        </div>
        <div>
          <h3 className="label text-red mb-3">({t.motion.reel})</h3>
          <div className="border-ink bg-paper-dark relative mb-12 grid aspect-video place-items-center border">
            <span className="label">{t.motion.soon}</span>
          </div>
          <h3 className="label text-red mb-3">({t.motion.clips})</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clips.map((c, i) => (
              <li key={c.file} className="border-ink bg-paper-dark relative grid aspect-video place-items-center border">
                <span className="label absolute top-2 left-2">0{i + 1}</span>
                <span className="font-display font-bold">{c.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
