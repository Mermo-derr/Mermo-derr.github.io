import { useEffect, useState, type RefObject } from 'react'

// true cuando el elemento está cerca del viewport (y ya no vuelve a false).
// Sirve para no descargar pósters de video hasta que hacen falta.
export function useNear(ref: RefObject<Element | null>, margin = '600px') {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin, near])
  return near
}
