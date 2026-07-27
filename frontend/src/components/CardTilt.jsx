import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const MAX_POINTER_DEG = 7 // beyond this the text visibly skews
const MAX_SCROLL_DEG = 5

// Makes .surface-card elements read as solid panels catching light rather
// than flat rectangles, on every device:
//
//   pointer devices — the card tilts toward the cursor
//   touch devices   — there is no cursor, so the tilt is driven by where the
//                     card sits in the viewport as you scroll
//
// Both paths set the same --rx/--ry variables; the transform itself lives in
// CSS, so a card nothing is driving simply stays flat.
function CardTilt() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cards = () => document.querySelectorAll(".surface-card")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    // ---- pointer devices -------------------------------------------------
    if (fine) {
      let active = null

      const reset = (card) => {
        card.classList.remove("tilting")
        card.style.removeProperty("--rx")
        card.style.removeProperty("--ry")
      }

      const onMove = (e) => {
        const card = e.target.closest && e.target.closest(".surface-card")
        if (card !== active) {
          if (active) reset(active)
          active = card
          if (card) card.classList.add("tilting")
        }
        if (!card) return

        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5 // -0.5 .. 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        // pointer above centre tilts the top away, so rotateX takes -Y
        card.style.setProperty("--rx", `${(-py * MAX_POINTER_DEG).toFixed(2)}deg`)
        card.style.setProperty("--ry", `${(px * MAX_POINTER_DEG).toFixed(2)}deg`)
      }

      const onLeave = () => {
        if (active) reset(active)
        active = null
      }

      document.addEventListener("pointermove", onMove, { passive: true })
      document.addEventListener("pointerleave", onLeave)
      window.addEventListener("blur", onLeave)
      return () => {
        document.removeEventListener("pointermove", onMove)
        document.removeEventListener("pointerleave", onLeave)
        window.removeEventListener("blur", onLeave)
        if (active) reset(active)
      }
    }

    // ---- touch devices ---------------------------------------------------
    // Only cards actually on screen are updated, so the scroll handler stays
    // O(visible) rather than walking every card on the page.
    const visible = new Set()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            visible.add(e.target)
            e.target.classList.add("tilting")
          } else {
            visible.delete(e.target)
            e.target.classList.remove("tilting")
            e.target.style.removeProperty("--rx")
          }
        })
      },
      { threshold: 0 }
    )
    cards().forEach((c) => io.observe(c))

    let ticking = false
    const update = () => {
      ticking = false
      const mid = window.innerHeight / 2
      visible.forEach((card) => {
        const r = card.getBoundingClientRect()
        // -1 above the fold centre .. +1 below it
        const t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - mid) / mid))
        card.style.setProperty("--rx", `${(-t * MAX_SCROLL_DEG).toFixed(2)}deg`)
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      io.disconnect()
      cards().forEach((c) => {
        c.classList.remove("tilting")
        c.style.removeProperty("--rx")
      })
    }
    // re-bind per route: cards mount and unmount with the page
  }, [pathname])

  return null
}

export default CardTilt
