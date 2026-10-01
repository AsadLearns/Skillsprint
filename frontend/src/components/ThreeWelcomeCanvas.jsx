import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

function ThreeWelcomeCanvas() {
  const containerRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [activeMode, setActiveMode] = useState("neural") // neural, geometric, rings

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const width = container.clientWidth || 450
    const height = container.clientHeight || 380
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 7

    // WebGL Renderer with antialiasing and alpha for transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 2.5, 50)
    pointLightViolet.position.set(5, 5, 5)
    scene.add(pointLightViolet)

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 2.5, 50)
    pointLightCyan.position.set(-5, -5, 5)
    scene.add(pointLightCyan)

    // Main Group for rotating core
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Inner Glowing Wireframe Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.6,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    mainGroup.add(coreMesh)

    // 2. Inner Solid Semi-transparent Core
    const innerGeo = new THREE.IcosahedronGeometry(1.1, 0)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    mainGroup.add(innerMesh)

    // 3. Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.02, 16, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.7 })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    mainGroup.add(ring1)

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 100)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    mainGroup.add(ring2)

    const ring3Geo = new THREE.TorusGeometry(3.1, 0.015, 16, 100)
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.z = Math.PI / 6
    mainGroup.add(ring3)

    // 4. Particle Cloud (Floating Knowledge Nodes)
    const particlesCount = 90
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat)
    mainGroup.add(particlesMesh)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    container.addEventListener("pointermove", handlePointerMove)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Rotations
      mainGroup.rotation.y = elapsedTime * 0.25 + targetX * 0.8
      mainGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.8

      ring1.rotation.z = elapsedTime * 0.4
      ring2.rotation.x = -elapsedTime * 0.3
      ring3.rotation.y = elapsedTime * 0.35

      // Subtle pulse
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.04
      coreMesh.scale.set(scale, scale, scale)

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      container.removeEventListener("pointermove", handlePointerMove)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      coreGeo.dispose()
      coreMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      ring3Geo.dispose()
      ring3Mat.dispose()
      particlesGeo.dispose()
      particlesMat.dispose()
      renderer.dispose()
    }
  }, [activeMode])

  return (
    <div
      className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Holographic Telemetry Badges in 3D Space */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1324]/80 border border-cyber-500/30 text-cyber-300 font-mono text-[10px] font-bold backdrop-blur-md shadow-glow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse"></span>
          <span>3D KNOWLEDGE CORE ACTIVE</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1324]/80 border border-accent-500/30 text-accent-300 font-mono text-[10px] font-bold backdrop-blur-md">
          <span>⚡ INTERACTIVE HOLOGRAM</span>
        </div>
      </div>

      {/* Orbiting Satellite Pills */}
      <div className="absolute -top-3 right-6 animate-float hidden sm:block pointer-events-none">
        <div className="px-3 py-1 rounded-xl bg-[#0c1324]/90 border border-white/[0.1] text-xs font-mono font-semibold text-slate-300 shadow-xl backdrop-blur-xl flex items-center gap-1.5">
          <span className="text-emerald-400">✓</span> AI Roadmap Synthesis
        </div>
      </div>

      <div className="absolute -bottom-3 left-6 animate-float animation-delay-300 hidden sm:block pointer-events-none">
        <div className="px-3 py-1 rounded-xl bg-[#0c1324]/90 border border-white/[0.1] text-xs font-mono font-semibold text-slate-300 shadow-xl backdrop-blur-xl flex items-center gap-1.5">
          <span className="text-accent-400">🧠</span> Automated Milestone Quizzes
        </div>
      </div>
    </div>
  )
}

export default ThreeWelcomeCanvas
