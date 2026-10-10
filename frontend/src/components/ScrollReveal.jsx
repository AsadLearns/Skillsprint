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
    // Fail-safe: ensure elements are never permanently invisible
    const makeVisible = () => {
      const nodes = document.querySelectorAll(".reveal")
      nodes.forEach((n) => {
        const box = n.getBoundingClientRect()
        // If within or near the viewport, or if scroll position is 0, reveal immediately
        if (box.top < window.innerHeight * 1.2 || window.scrollY === 0) {
          n.classList.add("revealed")
        }
      })
    }

    // Run immediately and after paint
    makeVisible()
    const timer = setTimeout(makeVisible, 50)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((n) => n.classList.add("revealed"))
      return () => clearTimeout(timer)
    }

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((n) => n.classList.add("revealed"))
      return () => clearTimeout(timer)
    }

    const root = document.documentElement
    root.classList.add("js-reveal")

    const nodes = document.querySelectorAll(".reveal")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("revealed")
          io.unobserve(entry.target)
        })
      },
      { rootMargin: "50px 0px 50px 0px", threshold: 0.01 }
    )

    nodes.forEach((n) => {
      const box = n.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) {
        n.classList.add("revealed")
      } else {
        io.observe(n)
      }
    })

    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [pathname])

  return null
}

export default ScrollReveal
