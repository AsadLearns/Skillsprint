import { useEffect, useRef, useState } from "react"

/**
 * Cursor3DManager
 * Luxury custom 3D cursor & magnetic aura inspired by MIMCO Capital
 * and high-end automotive interactive experiences (Q-Refinish).
 * - Precision center dot with neon pulse
 * - Smooth lerp-interpolated magnetic aura ring
 * - Dynamic automotive lighting spotlight (amber/cyan gradient) that illuminates elements
 * - Hover state expansion with magnetic snap effect
 * - Auto-disabled on touch devices for zero overhead
 */
export default function Cursor3DManager() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const spotlightRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only enable on fine pointer devices (mice, trackpads)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!isFinePointer) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let spotX = mouseX
    let spotY = mouseY

    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)

      // Direct placement of central dot for zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check if target or parent is interactive
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

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    // Smooth physics loop for magnetic ring and ambient spotlight
    const loop = () => {
      // Magnetic ring smooth lag
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      // Ambient spotlight smoother gentle lag
      spotX += (mouseX - spotX) * 0.08
      spotY += (mouseY - spotY) * 0.08

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotX}px, ${spotY}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [visible])

  // Don't render on SSR or unsupported screens
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Cinematic Automotive Ambient Spotlight (Amber & Cyan glow) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[90px] opacity-40 transition-transform duration-75 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(168, 85, 247, 0.1) 60%, transparent 75%)",
        }}
      />

      {/* 2. Outer Magnetic Aura Ring (MIMCO style) */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform ${
          hovered
            ? "w-14 h-14 bg-cyan-400/15 border-amber-400/80 shadow-[0_0_20px_rgba(6,182,212,0.45)] backdrop-blur-[0.5px]"
            : clicked
            ? "w-7 h-7 bg-amber-400/30 border-amber-400"
            : "w-9 h-9 bg-transparent"
        }`}
      />

      {/* 3. Center Precision Laser Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-150 will-change-transform ${
          hovered
            ? "w-2.5 h-2.5 bg-amber-400 shadow-[0_0_12px_#f59e0b]"
            : clicked
            ? "w-1.5 h-1.5 bg-cyan-300"
            : "w-2 h-2 bg-gradient-to-tr from-cyan-400 to-indigo-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        }`}
      />
    </div>
  )
}
