import { Chars } from '../fx/Chars'

type Props = { n: string; title: string; kanji: string; reading: string }

// Encabezado de sección estilo pergamino: número en círculo rojo, título en
// Mincho, lectura japonesa entre paréntesis y kanji decorativo a la derecha.
// Las partes data-part las anima useReveal.
export function SectionTitle({ n, title, kanji, reading }: Props) {
  return (
    <header data-reveal="header" className="relative mb-12 flex items-end gap-4 pb-4">
      <span data-part="num" className="num-circle shrink-0">
        {n}
      </span>
      <h2 data-part="title" className="font-display text-[clamp(1.75rem,8.5vw,2.25rem)] font-extrabold tracking-tight uppercase sm:text-4xl md:text-6xl">
        {title}
      </h2>
      <span className="label text-red hidden pb-2 sm:inline">({reading})</span>
      <span data-part="kanji" aria-hidden="true" className="font-display text-ink/15 ml-auto hidden text-5xl font-extrabold md:block">
        <Chars text={kanji} />
      </span>
      <span data-part="line" aria-hidden="true" className="bg-ink absolute inset-x-0 bottom-0 h-px" />
    </header>
  )
}
