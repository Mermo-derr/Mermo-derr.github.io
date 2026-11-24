type Props = { n: string; title: string; kanji: string; reading: string }

// Encabezado de sección estilo pergamino: número en círculo rojo, título en
// Mincho, lectura japonesa entre paréntesis y kanji decorativo a la derecha.
export function SectionTitle({ n, title, kanji, reading }: Props) {
  return (
    <header className="border-ink mb-12 flex items-end gap-4 border-b pb-4">
      <span className="num-circle shrink-0">{n}</span>
      <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">{title}</h2>
      <span className="label text-red hidden pb-2 sm:inline">({reading})</span>
      <span aria-hidden="true" className="font-display text-ink/15 ml-auto hidden text-5xl font-extrabold md:block">
        {kanji}
      </span>
    </header>
  )
}
