import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// The .reveal sections animate natively via `animation-timeline: view()`,
// which today is Chromium-only — Safari and Firefox ignore it, so on iOS
// (every browser there uses the Safari engine) nothing moved at all.
//
// This drives the same animation with IntersectionObserver wherever the
// native timeline is missing.
//
// The starting styles are deliberately gated behind a `js-reveal` class that
// this component adds, so a browser that never runs this code cannot end up
// with permanently invisible sections. Fail visible, never fail blank.
function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const native =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("animation-timeline: view()")
    if (native) return

    // Motion sensitivity wins: leave everything static and visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("IntersectionObserver" in window)) return

    const root = document.documentElement
    root.classList.add("js-reveal")

    const nodes = document.querySelectorAll(".reveal")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("revealed")
          io.unobserve(entry.target) // one-way; do not re-hide on scroll up
        })
      },
      // start the transition slightly before the section is fully on screen
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    )

    nodes.forEach((n) => {
      // Anything already on screen at mount should not animate in late.
      const box = n.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) {
        n.classList.add("revealed")
      } else {
        io.observe(n)
      }
    })

    return () => io.disconnect()
  }, [pathname])

  return null
}

export default ScrollReveal
