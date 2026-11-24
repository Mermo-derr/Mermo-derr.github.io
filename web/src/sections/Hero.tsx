import { useI18n } from '../i18n'

const tapeText = 'Creative Developer ✦ Web ✦ Motion ✦ 創造 ✦ '

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-14">
      {/* Fila de anotaciones superior */}
      <div className="label border-ink/20 mx-auto flex w-full max-w-6xl justify-between border-b px-6 py-3">
        <span>
          Portfolio <span className="text-red">(作品集)</span>
        </span>
        <span className="hidden sm:inline">S 34°36′ · W 58°22′ — Buenos Aires</span>
        <span>2026</span>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="label text-red mb-6">(アラン・メルモリア)</p>
          <h1 aria-label="Alan Mermolia" className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-9xl">
            <span aria-hidden="true">Alan</span>
            <br />
            <span aria-hidden="true">
              Merm
              {/* La "O" como sol rojo, guiño a la referencia */}
              <span className="border-red relative mx-[0.04em] inline-block size-[0.72em] translate-y-[0.02em] rounded-full border-[0.12em] align-baseline">
                <span className="bg-red absolute inset-[30%] rounded-full" />
              </span>
              lia
            </span>
          </h1>
          <p className="label mt-8 text-base font-bold">{t.hero.role}</p>
          <p className="text-ink-soft mt-3 max-w-xl text-lg leading-relaxed">{t.hero.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-5">
            <a href="#projects" className="btn-ink">
              {t.hero.ctaProjects} <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn-line">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        {/* Columna negra con kanji vertical + sello */}
        <div aria-hidden="true" className="relative hidden h-full max-h-[520px] md:block">
          <div className="bg-ink text-paper flex h-full w-24 flex-col items-center justify-between py-8">
            <span className="vertical-jp text-3xl font-extrabold">創造的開発者</span>
            <span className="text-red font-display text-xl">日本</span>
          </div>
          <span className="hanko absolute -bottom-6 -left-12 rotate-[-8deg] text-2xl">
            <span className="vertical-jp tracking-normal">アラン</span>
          </span>
        </div>
      </div>

      {/* Cinta negra diagonal con texto repetido (se animará en la Fase 3) */}
      <div aria-hidden="true" className="tape -mx-8 mb-10 -rotate-2">
        {tapeText.repeat(8)}
      </div>
    </section>
  )
}
