import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const slides = [
  {
    id: 1,
    tabLabel: "First slide",
    sectionNum: "Section 1",
    tag: "01 // ALPINE AI INGESTION",
    title: "Natural Language to Architecture",
    desc: "Type any objective — from full-stack websites to data-safe MLOps pipelines. Our compiler analyzes constraints and constructs an exact 4-week execution blueprint.",
    cta: "Start with AI Prompt →",
    route: "/builder",
    theme: "emerald",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    bgGradient: "from-sky-900/60 via-slate-900/70 to-emerald-950/80",
    canvasScene: "mountains"
  },
  {
    id: 2,
    tabLabel: "Second slide",
    sectionNum: "Section 2",
    tag: "02 // FULL-STACK COMPILER",
    title: "React 19, FastAPI & Docker Pipeline",
    desc: "Autonomous synthesis of component hierarchies, REST & WebSocket routes, PostgreSQL migrations, and multi-stage container orchestration manifests.",
    cta: "Explore Web Roadmaps →",
    route: "/roadmap",
    theme: "cyan",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    bgGradient: "from-indigo-950/70 via-slate-900/70 to-cyan-950/80",
    canvasScene: "matrix"
  },
  {
    id: 3,
    tabLabel: "Third slide",
    sectionNum: "Section 3",
    tag: "03 // ZERO-TRUST DATA SAFETY",
    title: "Military-Grade MLOps & Backup Vault",
    desc: "Automated AES-256-GCM encryption at rest, TLS 1.3 mTLS, immutable WORM storage checkpoints, and dual-region WAL Point-in-Time recovery.",
    cta: "Inspect Security Matrix →",
    route: "/builder",
    theme: "amber",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    bgGradient: "from-slate-950/70 via-amber-950/50 to-slate-950/80",
    canvasScene: "shield"
  },
  {
    id: 4,
    tabLabel: "Fourth slide",
    sectionNum: "Section 4",
    tag: "04 // RUNTIME SANDBOX LAB",
    title: "Sandboxed Execution Containers",
    desc: "Live in-browser microservice environments with automated test suites, memory leak analyzers, and real-time terminal output.",
    cta: "Launch Interactive Terminal →",
    route: "/dashboard",
    theme: "violet",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    bgGradient: "from-violet-950/70 via-slate-900/70 to-fuchsia-950/70",
    canvasScene: "fiber"
  },
  {
    id: 5,
    tabLabel: "Fifth slide",
    sectionNum: "Section 5",
    tag: "05 // VERIFIED CERTIFICATION",
    title: "Tamper-Proof Proof of Mastery",
    desc: "Validate milestone recall with AI scenario quizzes. Pass with 60%+ accuracy to unlock cryptographically verified digital credentials.",
    cta: "Claim Your Certificate →",
    route: "/quiz",
    theme: "gold",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    bgGradient: "from-amber-950/60 via-slate-900/70 to-yellow-900/70",
    canvasScene: "aurora"
  }
]

const colorThemes = [
  { id: "dark", label: "Obsidian Dark", dotClass: "bg-slate-950 border-2 border-white", overlay: "bg-slate-950/70" },
  { id: "light", label: "Pure Bright", dotClass: "bg-white border-2 border-slate-300", overlay: "bg-white/30 backdrop-blur-[2px]" },
  { id: "amber", label: "Sunset Amber", dotClass: "bg-amber-400 border-2 border-white", overlay: "bg-amber-950/50" },
  { id: "purple", label: "Cyber Purple", dotClass: "bg-fuchsia-500 border-2 border-white", overlay: "bg-indigo-950/60" },
  { id: "cyan", label: "Azure Ocean", dotClass: "bg-cyan-400 border-2 border-white", overlay: "bg-cyan-950/60" }
]

const scrollEffects = [
  { id: "stack", label: "Stack Effect", icon: "⚡", desc: "Cards slide and layer over each other like physical deck cards" },
  { id: "parallax", label: "Parallax Effect", icon: "🌊", desc: "Background moves at a different speed than foreground titles" },
  { id: "text-reveal", label: "Text Reveal on Scroll", icon: "✨", desc: "Typography wipes into view with luminous mask animations" },
  { id: "3d-flip", label: "3D Perspective Flip", icon: "📐", desc: "Section rotates along 3D spatial depth axis on scroll entry" }
]

export default function FullPageScrollShowcase() {
  const [currentSlide, setCurrentSlide] = useState(2) // Default to Slide 3 (Section 3 as in user screenshot!)
  const [activeEffect, setActiveEffect] = useState("stack") // stack, parallax, text-reveal, 3d-flip
  const [activeColor, setActiveColor] = useState("dark")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollDelta, setScrollDelta] = useState(0)

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const lastScrollTime = useRef(0)
  const navigate = useNavigate()

  // Change slide with transition lock to prevent skipping
  const goToSlide = (idx) => {
    if (idx === currentSlide || isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((idx + slides.length) % slides.length)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

  // Wheel listener inside the preview container for real fullPage scroll behavior
  const handleWheel = (e) => {
    const now = Date.now()
    if (now - lastScrollTime.current < 650) return // Throttle scroll transitions

    if (Math.abs(e.deltaY) > 30) {
      lastScrollTime.current = now
      setScrollDelta(e.deltaY)
      if (e.deltaY > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Keyboard navigation (arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isFullscreen])

  // Canvas visual motion background (Eagle Mountain Horizon / Matrix / Security Shield / Server Streams / Golden Aurora)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)

    let t = 0
    // Eagle flight position
    let eagleX = width * 0.4
    let eagleY = height * 0.45

    const render = () => {
      t += 0.02
      ctx.clearRect(0, 0, width, height)

      const scene = slides[currentSlide].canvasScene

      if (scene === "mountains") {
        // Dramatic Mountain Landscape with soaring eagle
        // Sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height)
        skyGrad.addColorStop(0, "#0c1a2e")
        skyGrad.addColorStop(0.5, "#1e3a5f")
        skyGrad.addColorStop(0.85, "#4a6b82")
        skyGrad.addColorStop(1, "#8fa9b9")
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, width, height)

        // Distant mist sun
        ctx.save()
        const sunGrad = ctx.createRadialGradient(width * 0.7, height * 0.35, 10, width * 0.7, height * 0.35, 200)
        sunGrad.addColorStop(0, "rgba(255, 250, 230, 0.4)")
        sunGrad.addColorStop(0.5, "rgba(255, 230, 180, 0.15)")
        sunGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = sunGrad
        ctx.beginPath()
        ctx.arc(width * 0.7, height * 0.35, 200, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Distant mountains (Layer 1)
        ctx.fillStyle = "#20344b"
        ctx.beginPath()
        ctx.moveTo(0, height * 0.6)
        ctx.lineTo(width * 0.25, height * 0.4)
        ctx.lineTo(width * 0.5, height * 0.55)
        ctx.lineTo(width * 0.75, height * 0.38)
        ctx.lineTo(width, height * 0.52)
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.fill()

        // Mid-ground mountains (Layer 2)
        ctx.fillStyle = "#162739"
        ctx.beginPath()
        ctx.moveTo(0, height * 0.7)
        ctx.lineTo(width * 0.3, height * 0.52)
        ctx.lineTo(width * 0.6, height * 0.65)
        ctx.lineTo(width * 0.85, height * 0.48)
        ctx.lineTo(width, height * 0.65)
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.fill()

        // Foreground jagged rock ridge (Layer 3)
        ctx.fillStyle = "#0c1825"
        ctx.beginPath()
        ctx.moveTo(0, height * 0.78)
        ctx.lineTo(width * 0.2, height * 0.68)
        ctx.lineTo(width * 0.42, height * 0.62)
        ctx.lineTo(width * 0.55, height * 0.8)
        ctx.lineTo(width * 0.9, height * 0.72)
        ctx.lineTo(width, height * 0.85)
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.fill()

        // Soaring Eagle Silhouette (smooth cinematic flight)
        eagleX = width * 0.4 + Math.sin(t * 0.8) * (width * 0.12)
        eagleY = height * 0.46 + Math.cos(t * 1.2) * 22
        const wingSpan = 28 + Math.sin(t * 3) * 6

        ctx.save()
        ctx.translate(eagleX, eagleY)
        ctx.fillStyle = "#0a131e"
        ctx.beginPath()
        // Eagle body & head
        ctx.ellipse(0, 0, 8, 4, -0.1, 0, Math.PI * 2)
        ctx.fill()
        // Left wing
        ctx.beginPath()
        ctx.moveTo(-4, 0)
        ctx.quadraticCurveTo(-wingSpan * 0.5, -wingSpan * 0.7, -wingSpan, -wingSpan * 0.4)
        ctx.quadraticCurveTo(-wingSpan * 0.5, -wingSpan * 0.2, 0, 2)
        ctx.fill()
        // Right wing
        ctx.beginPath()
        ctx.moveTo(4, 0)
        ctx.quadraticCurveTo(wingSpan * 0.5, -wingSpan * 0.7, wingSpan, -wingSpan * 0.4)
        ctx.quadraticCurveTo(wingSpan * 0.5, -wingSpan * 0.2, 0, 2)
        ctx.fill()
        ctx.restore()

      } else if (scene === "matrix") {
        // High-tech neural grid matrix
        ctx.fillStyle = "#070c18"
        ctx.fillRect(0, 0, width, height)

        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)"
        ctx.lineWidth = 1
        const gridSize = 45
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }

        // Floating digital nodes
        for (let i = 0; i < 24; i++) {
          const px = ((i * 123 + t * 40) % (width + 60)) - 30
          const py = ((i * 77 + Math.sin(t + i) * 50) % (height + 40))
          ctx.fillStyle = i % 2 === 0 ? "rgba(6, 182, 212, 0.6)" : "rgba(99, 102, 241, 0.6)"
          ctx.beginPath()
          ctx.arc(px, py, (i % 3) + 2, 0, Math.PI * 2)
          ctx.fill()
        }

      } else if (scene === "shield") {
        // High-Security Data Vault Shield
        ctx.fillStyle = "#080c14"
        ctx.fillRect(0, 0, width, height)

        const cx = width * 0.5
        const cy = height * 0.5
        const radius = Math.min(width, height) * 0.28

        // Concentric security radar rings
        for (let r = 1; r <= 3; r++) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 + (Math.sin(t * 2 + r) * 0.08)})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(cx, cy, radius * (r / 3), 0, Math.PI * 2)
          ctx.stroke()
        }

        // Rotating cryptographic segments
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(t * 0.4)
        ctx.strokeStyle = "rgba(245, 158, 11, 0.4)"
        ctx.lineWidth = 2
        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          ctx.arc(0, 0, radius, (i * Math.PI) / 3, (i * Math.PI) / 3 + 0.35)
          ctx.stroke()
        }
        ctx.restore()

      } else if (scene === "fiber") {
        // High-speed fiber-optic data highway
        ctx.fillStyle = "#090915"
        ctx.fillRect(0, 0, width, height)

        const lines = 12
        for (let l = 0; l < lines; l++) {
          const y = (height / lines) * l + Math.sin(t + l) * 15
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 + Math.sin(t * 2 + l) * 0.1})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.bezierCurveTo(width * 0.3, y - 40, width * 0.7, y + 40, width, y)
          ctx.stroke()
        }

      } else {
        // Cosmic Aurora Summit
        const aurGrad = ctx.createLinearGradient(0, 0, width, height)
        aurGrad.addColorStop(0, "#0c0d1e")
        aurGrad.addColorStop(0.5, "#2a183d")
        aurGrad.addColorStop(1, "#10091a")
        ctx.fillStyle = aurGrad
        ctx.fillRect(0, 0, width, height)

        // Golden glowing summit aura
        for (let i = 0; i < 30; i++) {
          const sx = (i * 97 + t * 15) % width
          const sy = (i * 53) % height
          ctx.fillStyle = "rgba(251, 191, 36, 0.4)"
          ctx.beginPath()
          ctx.arc(sx, sy, (i % 2) + 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [currentSlide])

  const slide = slides[currentSlide]
  const themeSetting = colorThemes.find((c) => c.id === activeColor) || colorThemes[0]

  return (
    <section id="fullpage-scroll-effects" className="py-20 px-4 md:px-8 bg-slate-50 border-t border-slate-200 relative select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Header matching fullPage.js format */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            fullPage.js Scroll Effects Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight font-heading mb-2">
            Scroll or click the navigation to see the <span className="gradient-text">selected scroll effect</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Interactive multi-layered video canvas. Experience physical card stacking, parallax depth, and text reveals as you scroll.
          </p>
        </div>

        {/* Master Showcase Frame */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          className={`relative rounded-3xl border border-slate-300 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-500 ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : "w-full"
          }`}
        >
          {/* Top Slide Navigation Tabs (First slide, Second slide, Third slide, etc.) */}
          <div className="relative z-30 p-3 md:p-4 bg-slate-950/60 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-xs font-bold text-slate-400 ml-2 hidden sm:inline">scroll-effects.preview</span>
            </div>

            {/* Slide Pill Tabs */}
            <div className="flex items-center gap-1.5 md:gap-2 mx-auto">
              {slides.map((s, idx) => {
                const isActive = currentSlide === idx
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`px-3 md:px-5 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-slate-700/90 text-white shadow-md border border-white/20 scale-105"
                        : "bg-white/[0.08] hover:bg-white/[0.16] text-slate-300 border border-white/[0.06]"
                    }`}
                  >
                    {s.tabLabel}
                  </button>
                )
              })}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-xs font-mono font-bold text-slate-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.16] px-3 py-1.5 rounded-lg border border-white/[0.1] transition cursor-pointer shrink-0"
            >
              {isFullscreen ? "✕ Exit" : "⛶ Fullscreen"}
            </button>
          </div>

          {/* Main Cinematic Video Stage */}
          <div className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] overflow-hidden flex items-center justify-center">
            
            {/* Background Procedural Visual Motion Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                activeEffect === "parallax" ? "scale-105" : ""
              }`}
            />

            {/* Optional Ambient Video Loop Overlay */}
            <video
              src={slide.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
            />

            {/* Dynamic Atmosphere / Color Swatch Tint */}
            <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${themeSetting.overlay}`} />

            {/* Layered Slide Content with Active Scroll Animation */}
            <div
              key={currentSlide}
              className={`relative z-20 text-center px-6 max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-500 ${
                activeEffect === "stack"
                  ? "animate-slide-up"
                  : activeEffect === "3d-flip"
                  ? "animate-flip-in"
                  : activeEffect === "text-reveal"
                  ? "animate-fadeIn"
                  : "animate-scale-up"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
                <span>{slide.tag}</span>
              </div>

              {/* Huge Iconic Section Display Title (Matching < Section 3 > in image) */}
              <div className="flex items-center justify-center gap-4 md:gap-6 my-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center text-3xl md:text-5xl font-light hover:scale-110 active:scale-95 transition cursor-pointer backdrop-blur-sm"
                >
                  ‹
                </button>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] font-heading select-none">
                  {slide.sectionNum}
                </h1>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center text-3xl md:text-5xl font-light hover:scale-110 active:scale-95 transition cursor-pointer backdrop-blur-sm"
                >
                  ›
                </button>
              </div>

              <h3 className="text-lg md:text-2xl font-bold text-white/95 mt-2 mb-3 tracking-tight font-heading drop-shadow-md">
                {slide.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-200/90 leading-relaxed font-medium max-w-xl mb-6 drop-shadow">
                {slide.desc}
              </p>

              {/* Action Button: Learn more -> */}
              <button
                onClick={() => navigate(slide.route)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs md:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{slide.cta}</span>
              </button>
            </div>

            {/* Left Big Ghost Navigation Arrow */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-20 rounded-2xl bg-black/20 hover:bg-black/50 text-white/70 hover:text-white flex items-center justify-center text-4xl font-light backdrop-blur-xs transition cursor-pointer hidden md:flex"
            >
              ‹
            </button>

            {/* Right Big Ghost Navigation Arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-20 rounded-2xl bg-black/20 hover:bg-black/50 text-white/70 hover:text-white flex items-center justify-center text-4xl font-light backdrop-blur-xs transition cursor-pointer hidden md:flex"
            >
              ›
            </button>

            {/* Bottom Indicator Dots (Matching dot pagination in image) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === i
                      ? "w-6 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Bottom Right "Background Color" Palette Swatches (Directly matching screenshot!) */}
            <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
              <span className="text-[11px] font-mono text-slate-300 font-semibold select-none mr-1">
                Background Color
              </span>
              {colorThemes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveColor(c.id)}
                  title={c.label}
                  className={`w-5 h-5 rounded-full transition-transform hover:scale-125 cursor-pointer ${c.dotClass} ${
                    activeColor === c.id ? "ring-2 ring-indigo-400 scale-110" : ""
                  }`}
                />
              ))}
            </div>

            {/* Scroll Mouse Helper Badge */}
            <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-300/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-1.5 h-2 border border-slate-300 rounded-full animate-bounce inline-block" />
              <span>Scroll down or use wheel ▾</span>
            </div>
          </div>

          {/* Bottom Controls / Effect Switcher Bar (Matching fullPage.js footer controls) */}
          <div className="p-4 md:p-5 bg-slate-900 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                Current effect: <strong className="text-indigo-400 uppercase tracking-wider">{activeEffect}</strong>
              </span>
              <button
                onClick={() => goToSlide((currentSlide + 1) % slides.length)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
              >
                Next Slide →
              </button>
            </div>

            {/* Effect Mode Selector Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {scrollEffects.map((eff) => {
                const isSelected = activeEffect === eff.id
                return (
                  <button
                    key={eff.id}
                    onClick={() => setActiveEffect(eff.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-slate-700 text-white border border-white/30 shadow-sm"
                        : "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.06]"
                    }`}
                  >
                    <span>{eff.icon}</span>
                    <span>{eff.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                ACTIVE
              </span>
              <span>Slide {currentSlide + 1} / {slides.length}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
