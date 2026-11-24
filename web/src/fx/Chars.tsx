// Separa un texto en <span> por carácter para animarlo con stagger
// (kanji verticales, sellos). El texto completo queda para lectores de pantalla.
export function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="inline-block">
          {c}
        </span>
      ))}
    </>
  )
}
