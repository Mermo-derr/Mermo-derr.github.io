import { useEffect, useRef } from 'react'
import { Chars } from '../fx/Chars'
import { clips, reel, type Clip } from '../data'
import { useI18n } from '../i18n'
import { SectionTitle } from './SectionTitle'

// Clip en bucle y sin sonido. Con puntero: se reproduce al pasar el cursor.
// En pantallas táctiles: mientras está visible. Con reduce-motion: solo al pasar el cursor.
function ClipCard({ clip, n }: { clip: Clip; n: number }) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    const touch = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!v || !touch || reduced) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.6,
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const play = () => video.current?.play().catch(() => {})
  const stop = () => {
    const v = video.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <li data-reveal="item" className="group border-ink bg-paper border p-2" onMouseEnter={play} onMouseLeave={stop}>
      <div className={`bg-ink relative overflow-hidden ${clip.vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster={`/video/${clip.file}.webp`}
          aria-label={`${clip.title} — ${clip.kind}`}
          className="size-full object-cover grayscale-[40%] transition duration-500 group-hover:grayscale-0"
        >
          <source src={`/video/${clip.file}.webm`} type="video/webm" />
          <source src={`/video/${clip.file}.mp4`} type="video/mp4" />
        </video>
        <span aria-hidden="true" className="label bg-paper text-ink absolute top-2 left-2 px-1.5 py-0.5">
          {String(n).padStart(2, '0')}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2 px-1 pt-2">
        <span className="font-display text-sm font-bold">{clip.title}</span>
        <span className="label text-red text-[0.65rem]">({clip.kind})</span>
      </div>
    </li>
  )
}

export function Motion() {
  const { t } = useI18n()
  const horizontal = clips.filter((c) => !c.vertical)
  const vertical = clips.filter((c) => c.vertical)

  return (
    <section id="motion" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle n="04" title={t.motion.title} kanji="映像" reading="えいぞう" />
      <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
        <div aria-hidden="true" className="bg-ink text-paper hidden w-20 items-center justify-center py-6 lg:flex">
          <span data-reveal="kanji" className="vertical-jp text-2xl font-extrabold">
            <Chars text="動きと映像" />
          </span>
        </div>
        <div>
          {/* Reel: pantalla negra dentro del pergamino */}
          <div data-reveal="item" className="bg-ink text-paper mb-14 p-3">
            <div className="label mb-3 flex justify-between px-1">
              <span>
                {t.motion.reel} <span className="text-red">(リール)</span>
              </span>
              <span className="text-paper/60 hidden sm:inline">{reel.tools}</span>
              <span>{reel.duration}</span>
            </div>
            <video controls preload="none" playsInline poster={`/video/${reel.file}-poster.webp`} className="aspect-video w-full bg-black">
              <source src={`/video/${reel.file}.mp4`} type="video/mp4" />
            </video>
          </div>

          <h3 className="label text-red mb-4">({t.motion.clips})</h3>
          {/* Horizontales en grilla; si hay verticales (9:16), van en una columna al lado */}
          <div className={`grid items-start gap-4 ${vertical.length ? 'lg:grid-cols-[2fr_1fr]' : ''}`}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {horizontal.map((c) => (
                <ClipCard key={c.file} clip={c} n={clips.indexOf(c) + 1} />
              ))}
            </ul>
            {vertical.length > 0 && (
              <ul className="grid grid-cols-2 gap-4">
                {vertical.map((c) => (
                  <ClipCard key={c.file} clip={c} n={clips.indexOf(c) + 1} />
                ))}
              </ul>
            )}
          </div>
          <p className="label text-ink-soft mt-4">
            <span className="[@media(hover:none)]:hidden">{t.motion.hint}</span>
            <span className="hidden [@media(hover:none)]:inline">{t.motion.hintTouch}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
