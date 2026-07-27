import { useEffect, useRef } from "react"

// Vanta CLOUDS2 drags in three.js (~624KB), so it is imported dynamically and
// only once the browser is idle — it must never sit in front of first paint.
// Runs on phones as well as desktop; cost is controlled by rendering fewer
// pixels rather than by switching the effect off.
function VantaBackground() {
  const el = useRef(null)
  const effect = useRef(null)

  useEffect(() => {
    // Motion sensitivity is a hard stop, not a performance trade-off.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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

      // This shader is fragment-bound: frame rate tracks the number of pixels
      // shaded, nothing else. Vanta sets the renderer to
      //   pixelRatio = devicePixelRatio / scale
      // so `scale` is a DIVISOR — values below 1 render *more* pixels, not
      // fewer. Left at 0.5 on a 2x phone that works out to a 4x buffer: a
      // 375x1080 hero became 1500x4320 (6.5MP) and ran at ~5fps.
      //
      // So solve for the ratio we actually want and pass that instead.
      // vanta's own scaleMobile is not usable here because it keys off
      // user-agent sniffing rather than viewport width.
      const dpr = window.devicePixelRatio || 1
      const small = window.matchMedia("(max-width: 767px)").matches
      // 1.0 on phones, and never above 1.5 on desktop — beyond that a soft
      // cloud gradient gains nothing visible for a quadratic cost.
      const targetRatio = small ? 1 : Math.min(dpr, 1.5)

      effect.current = CLOUDS2({
        el: el.current,
        THREE,
        mouseControls: true,
        touchControls: false, // dragging the sky should not fight page scroll
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: dpr / targetRatio,
        scaleMobile: dpr / targetRatio,
        // Blue sky, white light — the stock palette, matched by the site's
        // accent scale so the clouds and the UI agree.
        backgroundColor: 0x0b1220,
        skyColor: 0x5ca6ca,
        cloudColor: 0x334d80,
        lightColor: 0xffffff,
        speed: 1,
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
