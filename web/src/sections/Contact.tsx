import { contact } from '../data'
import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

export function Contact() {
  const { t } = useI18n()
  const links = [
    { label: 'Email', href: `mailto:${contact.email}`, text: contact.email },
    { label: 'LinkedIn', href: contact.linkedin, text: 'in/alan-mermolia' },
    { label: 'GitHub', href: contact.github, text: 'Mermo-derr' },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="05" title={t.contact.title} kanji="連絡" reading="れんらく" />
      <div className="grid items-start gap-10 md:grid-cols-[1fr_2fr]">
        <div className="relative">
          <p className="font-display text-2xl leading-snug font-bold">{t.contact.text}</p>
          <span aria-hidden="true" className="hanko mt-8 rotate-[6deg] text-xl">
            <span className="vertical-jp tracking-normal">連絡</span>
          </span>
        </div>
        <ul className="border-ink divide-ink border-y">
          {links.map((l, i) => (
            <li key={l.label} className={i > 0 ? 'border-ink/20 border-t' : ''}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group hover:bg-ink hover:text-paper flex items-baseline justify-between gap-4 px-2 py-5 transition-colors"
              >
                <span className="font-display text-3xl font-extrabold uppercase">{l.label}</span>
                <span className="label group-hover:text-paper text-ink-soft break-all">{l.text} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
