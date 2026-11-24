import { Chars } from '../fx/Chars'
import { skills } from '../data'
import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

export function Skills() {
  const { t } = useI18n()
  // Desarrollo en papel con borde; Diseño en tinta negra, como los paneles de la referencia.
  const blocks: { title: string; kanji: string; groups: Record<string, readonly string[]>; dark: boolean }[] = [
    { title: t.skills.dev, kanji: '開発', groups: skills.dev, dark: false },
    { title: t.skills.design, kanji: '意匠', groups: skills.design, dark: true },
  ]

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="02" title={t.skills.title} kanji="技術" reading="ぎじゅつ" />
      <div className="grid gap-8 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} data-reveal="item" className={`border-ink relative border p-8 ${b.dark ? 'bg-ink text-paper' : ''}`}>
            <div className="mb-8 flex items-start justify-between">
              <h3 className="font-display text-3xl font-extrabold uppercase">{b.title}</h3>
              <span aria-hidden="true" data-reveal="kanji" className="vertical-jp text-red text-2xl font-extrabold">
                <Chars text={b.kanji} />
              </span>
            </div>
            <div className="space-y-6">
              {Object.entries(b.groups).map(([key, items]) => (
                <div key={key}>
                  <h4 className="label text-red mb-2">({t.skills.groups[key as keyof typeof t.skills.groups]})</h4>
                  <p className="text-lg leading-relaxed">
                    {items.map((s, i) => (
                      <span key={s}>
                        {s}
                        {i < items.length - 1 && <span className="text-red"> / </span>}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
