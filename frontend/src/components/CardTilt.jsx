import { useEffect } from "react"

const MAX_DEG = 7 // beyond this the text starts to visibly skew

// Tilts .surface-card elements toward the pointer, so the boxes read as solid
// panels catching light rather than flat rectangles.
//
// One delegated listener on the document rather than per-card handlers: cards
// mount and unmount with every route, and this way nothing has to be rebound.
// The transform itself is applied by CSS from the --rx/--ry variables set
// here, so cards with no pointer over them simply stay flat.
function CardTilt() {
  useEffect(() => {
    // No hover means a touch screen — there is no pointer to follow, and
    // tracking touch here would fight scrolling.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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
      // -0.5 .. 0.5 from the card's centre
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      // Pointer above centre tilts the top away from the viewer, so rotateX
      // takes the negated Y.
      card.style.setProperty("--rx", `${(-py * MAX_DEG).toFixed(2)}deg`)
      card.style.setProperty("--ry", `${(px * MAX_DEG).toFixed(2)}deg`)
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
  }, [])

  return null
}

export default CardTilt
