import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from './gsap'
import { Chars } from './Chars'
import { useI18n } from '../i18n'

const SEEN_KEY = 'introSeen'

function shouldPlay() {
  return !sessionStorage.getItem(SEEN_KEY) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Intro: un pergamino que se desenrolla desde el centro, kanji que bajan trazo
// a trazo, golpe de sello y el telón que sube. Una vez por sesión; "Saltar"
// la termina al instante. Llama a onReveal cuando la página empieza a verse.
export function Intro({ onReveal }: { onReveal: () => void }) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [play] = useState(shouldPlay)
  const [gone, setGone] = useState(!play)

  useEffect(() => {
    if (!play) onReveal()
  }, [play, onReveal])

  // Bloquea el scroll solo mientras la intro está en pantalla
  useEffect(() => {
    if (gone) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [gone])

  useGSAP(
    () => {
      if (!play) return
      const unroll = { duration: 1, ease: 'expo.inOut' }
      tl.current = gsap
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
        .call(onReveal, [], 2.25)
        .to(ref.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 2.2)
    },
    { scope: ref },
  )

  if (gone) return null

  return (
    <div ref={ref} className="bg-ink fixed inset-0 z-[100] grid place-items-center">
      <div aria-hidden="true" className="relative h-[78vh] w-[min(86vw,440px)]">
        <div data-intro="paper" className="bg-paper absolute inset-x-0 inset-y-3 flex flex-col items-center justify-between py-12">
          <span data-intro="kanji" className="vertical-jp text-ink text-4xl font-extrabold md:text-5xl">
            <Chars text="創造的開発者" />
          </span>
          <span data-intro="name" className="label text-ink">
            Alan Mermolia <span className="text-red">✦</span> Creative Developer
          </span>
          <span data-intro="stamp" className="hanko absolute bottom-24 left-8 rotate-[-8deg] text-2xl">
            <span className="vertical-jp tracking-normal">アラン</span>
          </span>
        </div>
        {/* Varillas del pergamino */}
        <div data-intro="rod-top" className="absolute -inset-x-5 top-0 h-5 rounded-full bg-[#5A3E2B] shadow-[inset_0_-4px_0_rgb(0_0_0/0.35)]" />
        <div data-intro="rod-bottom" className="absolute -inset-x-5 bottom-0 h-5 rounded-full bg-[#5A3E2B] shadow-[inset_0_-4px_0_rgb(0_0_0/0.35)]" />
      </div>
      <button
        type="button"
        onClick={() => tl.current?.progress(1)}
        className="label text-paper/70 hover:text-paper absolute right-6 bottom-6 border border-current px-4 py-2"
      >
        {t.intro.skip} →
      </button>
    </div>
  )
}
