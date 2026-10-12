import { useEffect, useRef, useState } from "react"

/**
 * Minimalist, Neat, and Clean 3D Magnetic Cursor
 * Subtle, luxury, zero visual noise or loud colors.
 */
export default function Cursor3DManager() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!isFinePointer) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      const target = e.target
      const isInteractive = target && (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor]") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".surface-card") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      )

      setHovered(Boolean(isInteractive))
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [visible])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Subtle, Clean Outer Magnetic Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900/30 transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform ${
          hovered
            ? "w-11 h-11 bg-slate-900/5 border-slate-900/50 scale-110"
            : "w-8 h-8 bg-transparent"
        }`}
      />

      {/* 2. Precision Minimalist Center Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 transition-[width,height,background-color] duration-150 will-change-transform ${
          hovered ? "w-1.5 h-1.5 bg-indigo-600" : "w-1.5 h-1.5"
        }`}
      />
    </div>
  )
}
