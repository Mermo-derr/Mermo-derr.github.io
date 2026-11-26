import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from './gsap'
import { Chars } from './Chars'
import { hasChosenLang, useI18n, type Lang } from '../i18n'

const SEEN_KEY = 'introSeen'

type Mode = 'none' | 'animate' | 'static'

// - Sin idioma elegido: la intro termina pidiendo el idioma (animada, o fija
//   con reduce-motion). El telón sube al elegir.
// - Con idioma elegido: la intro corre sola una vez por sesión (sin reduce-motion).
function initialMode(): Mode {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!hasChosenLang()) return reduced ? 'static' : 'animate'
  return !sessionStorage.getItem(SEEN_KEY) && !reduced ? 'animate' : 'none'
}

const options: { lang: Lang; name: string }[] = [
  { lang: 'es', name: 'Español' },
  { lang: 'en', name: 'English' },
]

// Intro: un pergamino que se desenrolla desde el centro, kanji que bajan trazo
// a trazo, golpe de sello y, si hace falta, la elección de idioma. Luego el
// telón sube. Llama a onReveal cuando la página empieza a verse.
export function Intro({ onReveal }: { onReveal: () => void }) {
  const { t, lang, setLang } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const preferred = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [mode] = useState(initialMode)
  const [needsChoice] = useState(() => !hasChosenLang())
  const [choosing, setChoosing] = useState(mode === 'static')
  const [gone, setGone] = useState(mode === 'none')

  useEffect(() => {
    if (mode !== 'animate') onReveal()
  }, [mode, onReveal])

  // Bloquea el scroll solo mientras la intro está en pantalla
  useEffect(() => {
    if (gone) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [gone])

  // Al llegar a la elección, el foco va al idioma detectado (Enter confirma)
  useEffect(() => {
    if (choosing) preferred.current?.focus()
  }, [choosing])

  useGSAP(
    () => {
      if (mode !== 'animate') return
      const unroll = { duration: 1, ease: 'expo.inOut' }
      const t = gsap
        .timeline({
          onComplete: () => {
            sessionStorage.setItem(SEEN_KEY, '1')
            setGone(true)
          },
        })
        .fromTo('[data-intro="paper"]', { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ...unroll })
        .fromTo('[data-intro="rod-top"]', { y: '40vh' }, { y: 0, ...unroll }, 0)
        .fromTo('[data-intro="rod-bottom"]', { y: '-40vh' }, { y: 0, ...unroll }, 0)
        .from('[data-intro="kanji"] span', { opacity: 0, y: -16, stagger: 0.07, duration: 0.35, ease: 'power2.out' }, 0.75)
        .from('[data-intro="stamp"]', { scale: 2.6, opacity: 0, rotate: -35, duration: 0.3, ease: 'power4.in' }, 1.3)
        .from('[data-intro="name"]', { opacity: 0, letterSpacing: '0.6em', duration: 0.6, ease: 'expo.out' }, 1.35)

      if (needsChoice) {
        t.from('[data-intro="choose"] > *', { opacity: 0, y: 10, stagger: 0.08, duration: 0.45, ease: 'expo.out' }, 1.6)
          .addLabel('choose', 2.05)
          .call(() => setChoosing(true), [], 'choose')
          .addPause('choose')
          .call(onReveal, [], 'choose+=0.15')
          .to(ref.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 'choose+=0.1')
      } else {
        t.call(onReveal, [], 2.25).to(ref.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 2.2)
      }
      tl.current = t
    },
    { scope: ref },
  )

  const skip = () => {
    const t = tl.current
    if (!t) return
    if (needsChoice) {
      t.pause().seek('choose')
      setChoosing(true)
    } else t.progress(1)
  }

  const choose = (l: Lang) => {
    setLang(l)
    setChoosing(false)
    if (mode === 'static') {
      sessionStorage.setItem(SEEN_KEY, '1')
      setGone(true)
    } else {
      tl.current?.play()
    }
  }

  if (gone) return null

  return (
    <div
      ref={ref}
      role={needsChoice ? 'dialog' : undefined}
      aria-modal={needsChoice || undefined}
      aria-label={needsChoice ? t.intro.choose : undefined}
      className="bg-ink fixed inset-0 z-[100] grid place-items-center"
    >
      <div className="relative h-[82vh] w-[min(86vw,440px)]">
        <div data-intro="paper" className="bg-paper absolute inset-x-0 inset-y-3 flex flex-col items-center justify-between py-10">
          <span aria-hidden="true" data-intro="kanji" className="vertical-jp text-ink text-[clamp(1.5rem,5vh,3rem)] font-extrabold">
            <Chars text="創造的開発者" />
          </span>
          <div className="flex w-full flex-col items-center gap-6 px-8">
            <span aria-hidden="true" data-intro="name" className="label text-ink text-center">
              Alan Mermolia <span className="text-red">✦</span> Creative Developer
            </span>
            {needsChoice && (
              <div data-intro="choose" className="flex w-full flex-col items-center gap-3">
                <p className="label text-red text-center text-[0.65rem]">
                  {t.intro.choose} <span aria-hidden="true" className="whitespace-nowrap">(言語)</span>
                </p>
                <div className="grid w-full grid-cols-2 gap-3">
                  {options.map((o) => (
                    <button
                      key={o.lang}
                      ref={o.lang === lang ? preferred : undefined}
                      type="button"
                      lang={o.lang}
                      onClick={() => choose(o.lang)}
                      className={`${o.lang === lang ? 'btn-ink' : 'btn-line'} justify-center`}
                    >
                      {o.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span aria-hidden="true" data-intro="stamp" className="hanko absolute top-24 left-6 rotate-[-8deg] text-2xl">
            <span className="vertical-jp tracking-normal">アラン</span>
          </span>
        </div>
        {/* Varillas del pergamino */}
        <div aria-hidden="true" data-intro="rod-top" className="absolute -inset-x-5 top-0 h-5 rounded-full bg-[#5A3E2B] shadow-[inset_0_-4px_0_rgb(0_0_0/0.35)]" />
        <div aria-hidden="true" data-intro="rod-bottom" className="absolute -inset-x-5 bottom-0 h-5 rounded-full bg-[#5A3E2B] shadow-[inset_0_-4px_0_rgb(0_0_0/0.35)]" />
      </div>
      {mode === 'animate' && !choosing && (
        <button
          type="button"
          onClick={skip}
          className="label text-paper/70 hover:text-paper absolute right-6 bottom-6 border border-current px-4 py-2"
        >
          {t.intro.skip} →
        </button>
      )}
    </div>
  )
}
