import { useEffect, useRef } from "react"

// Vanta CLOUDS2 drags in three.js (~580KB), so it is imported dynamically and
// only after the browser is idle — it must never sit in front of first paint.
// Skipped entirely on small screens and under prefers-reduced-motion: a
// full-screen WebGL sim is the most expensive thing on the page, and phones
// and motion-sensitive users are exactly who should not pay for it.
function VantaBackground() {
  const el = useRef(null)
  const effect = useRef(null)

  useEffect(() => {
    const tooSmall = window.matchMedia("(max-width: 767px)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (tooSmall || reduced) return

    let cancelled = false
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300))

    const handle = idle(async () => {
      // vanta ships UMD bundles with no ES export — importing registers the
      // effect on window.VANTA as a side effect, so read it from there.
      const [, THREE] = await Promise.all([
        import("vanta/dist/vanta.clouds2.min"),
        import("three"),
      ])
      // the effect may have unmounted while the chunks were downloading
      if (cancelled || !el.current) return

      const CLOUDS2 = window.VANTA && window.VANTA.CLOUDS2
      if (!CLOUDS2) return

      effect.current = CLOUDS2({
        el: el.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        // Tuned to the warm charcoal/amber theme — the stock blue sky would
        // fight every other colour on the page.
        backgroundColor: 0x100f0d,
        skyColor: 0x1a1815,
        cloudColor: 0x2b2620,
        lightColor: 0xe5a663,
        speed: 0.7,
        texturePath: "/noise.png",
      })
    })

    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle)
      if (effect.current) {
        effect.current.destroy()
        effect.current = null
      }
    }
  }, [])

  return <div ref={el} aria-hidden="true" className="absolute inset-0 pointer-events-none" />
}

export default VantaBackground
