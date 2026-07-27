import { useEffect, useRef, useState } from "react"

// Vanta CLOUDS2 drags in three.js (~624KB), so it is imported dynamically and
// only once the browser is idle — it must never sit in front of first paint.
// Runs on phones as well as desktop; cost is controlled by rendering fewer
// pixels rather than by switching the effect off.
//
// Append ?bgdebug=1 to any URL to see, on the device itself, whether the
// effect started and why not if it did not. There is no other way to find
// out from a phone that has no console attached.
function VantaBackground() {
  const el = useRef(null)
  const effect = useRef(null)
  const [status, setStatus] = useState("init")

  const debug =
    typeof window !== "undefined" && window.location.search.includes("bgdebug")

  useEffect(() => {
    const note = (s) => {
      window.__bgStatus = s
      setStatus(s)
    }

    if (!window.WebGLRenderingContext) return note("no-webgl-support")
    // Motion sensitivity is a hard stop, not a performance trade-off.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return note("skipped: prefers-reduced-motion is ON")
    }

    let cancelled = false
    // requestIdleCallback can be starved indefinitely — a page opened in a
    // background tab may never see an idle period at all, and the effect
    // would then simply never load. The timeout makes it fire regardless.
    const idle = window.requestIdleCallback
      ? (fn) => window.requestIdleCallback(fn, { timeout: 2000 })
      : (fn) => setTimeout(fn, 300)

    note("waiting-for-idle")

    const handle = idle(async () => {
      try {
        note("loading-chunks")
        // vanta ships UMD bundles with no ES export — importing registers the
        // effect on window.VANTA as a side effect, so read it from there.
        const [, THREE] = await Promise.all([
          import("vanta/dist/vanta.clouds2.min"),
          import("three"),
        ])
        // the effect may have unmounted while the chunks were downloading
        if (cancelled || !el.current) return

        const CLOUDS2 = window.VANTA && window.VANTA.CLOUDS2
        if (!CLOUDS2) return note("vanta-missing")

        // This shader is fragment-bound: frame rate tracks the number of
        // pixels shaded, nothing else. Vanta sets the renderer to
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
        // The canvas is fixed and full-viewport so it renders constantly,
        // behind every section — budget the fragment count outright rather
        // than trusting a fixed ratio.
        const cssW = window.innerWidth
        const cssH = window.innerHeight
        const budget = small ? 0.5e6 : 1.4e6 // device pixels
        const cap = small ? 1 : Math.min(dpr, 1.5)
        // never above the cap, never below 0.5 or the gradient turns to mush
        const targetRatio = Math.max(
          0.5,
          Math.min(cap, Math.sqrt(budget / (cssW * cssH)))
        )

        effect.current = CLOUDS2({
          el: el.current,
          THREE,
          mouseControls: true,
          touchControls: false, // dragging the sky should not fight scroll
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

        const c = el.current.querySelector("canvas")
        note(
          c
            ? `running ${c.width}x${c.height} dpr${dpr} ratio${targetRatio.toFixed(2)}`
            : "started-but-no-canvas"
        )
      } catch (e) {
        note("error: " + String(e && e.message).slice(0, 80))
      }
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

  return (
    <>
      {/* Fixed to the viewport rather than sized to a section: the clouds sit
          behind the entire site, and the renderer only ever covers one screen
          no matter how long the page is. z-0 (not negative) because Safari
          traps negative z-index behind opaque backgrounds. */}
      <div ref={el} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />
      {debug && (
        <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-black/85 text-[#7CFC98] font-mono text-[11px] p-2 leading-snug pointer-events-none">
          bg: {status}
          <br />
          dpr {typeof window !== "undefined" ? window.devicePixelRatio : "?"} · vw{" "}
          {typeof window !== "undefined" ? window.innerWidth : "?"} · reduced-motion{" "}
          {typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "ON"
            : "off"}
        </div>
      )}
    </>
  )
}

export default VantaBackground
