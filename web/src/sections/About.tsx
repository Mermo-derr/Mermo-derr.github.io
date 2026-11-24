import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="01" title={t.about.title} kanji="自己紹介" reading="じこしょうかい" />
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug font-bold' : 'text-ink-soft'}>
              {p}
            </p>
          ))}
        </div>
        <dl className="border-ink divide-ink/20 divide-y border">
          {t.about.facts.map((f) => (
            <div key={f.label} className="px-5 py-4">
              <dt className="label text-red">({f.label})</dt>
              <dd className="font-display mt-1 text-xl font-bold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
