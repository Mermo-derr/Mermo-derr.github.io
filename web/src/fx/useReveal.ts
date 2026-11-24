import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './gsap'
import { motion } from '../motion'

/*
 * Animaciones de entrada de toda la página, por atributos data-*:
 *   data-hero="meta|name|text|cta|aside|tape"  timeline del hero (al terminar la intro)
 *   data-reveal="header"   encabezado de sección: línea, número sellado, título con trazo
 *     └ data-part="line|num|title|kanji"
 *   data-reveal="kanji"    kanji vertical: caracteres de arriba abajo
 *   data-reveal="stamp"    sello hanko: golpe
 *   data-reveal="item"     bloques que suben y aparecen en tandas
 * Con prefers-reduced-motion no se anima nada (todo queda visible).
 */
export function useReveal(scope: RefObject<HTMLElement | null>, ready: boolean) {
  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const ease = motion.easeIn

        // Hero
        gsap
          .timeline({ defaults: { ease, duration: 0.9 } })
          .from('[data-hero="meta"]', { opacity: 0, y: -12, duration: 0.6 })
          .from('[data-hero="name"] > span > span', { yPercent: 110, stagger: 0.12, duration: 1.1 }, 0.05)
          .from('[data-hero="text"]', { opacity: 0, y: 16, stagger: 0.08 }, 0.45)
          .from('[data-hero="cta"] > *', { opacity: 0, y: 12, stagger: 0.08, duration: 0.6 }, 0.6)
          .from('[data-hero="aside"]', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0.2)
          .from('[data-hero="tape"]', { xPercent: -30, opacity: 0, duration: 1.2 }, 0.5)
          .from('[data-hero="stamp"]', { scale: 2.4, opacity: 0, rotate: -38, duration: 0.3, ease: 'power4.in' }, 1.1)

        // Encabezados de sección
        gsap.utils.toArray<HTMLElement>('[data-reveal="header"]').forEach((h) => {
          const q = gsap.utils.selector(h)
          gsap
            .timeline({ defaults: { ease }, scrollTrigger: { trigger: h, start: 'top 85%', once: true } })
            .from(q('[data-part="line"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1.1 })
            .from(q('[data-part="num"]'), { scale: 1.8, opacity: 0, rotate: -25, duration: 0.3, ease: 'power4.in' }, 0.05)
            .from(q('[data-part="title"]'), { clipPath: 'inset(0% 100% 0% 0%)', duration: 1 }, 0.15)
            .from(q('[data-part="kanji"] span'), { opacity: 0, y: 10, stagger: 0.08, duration: 0.5 }, 0.35)
        })

        // Kanji verticales sueltos
        gsap.utils.toArray<HTMLElement>('[data-reveal="kanji"]').forEach((el) => {
          gsap.from(el.querySelectorAll('span'), {
            opacity: 0,
            y: -14,
            stagger: 0.07,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })

        // Sellos
        gsap.utils.toArray<HTMLElement>('[data-reveal="stamp"]').forEach((el) => {
          gsap.from(el, {
            scale: 2.4,
            opacity: 0,
            rotate: '-=30',
            duration: 0.3,
            ease: 'power4.in',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        // Bloques en tandas
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal="item"]')
        gsap.set(items, { opacity: 0, y: 32 })
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease }),
        })
      })

      return () => mm.revert()
    },
    { scope, dependencies: [ready] },
  )
}
