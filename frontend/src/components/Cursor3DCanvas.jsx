import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Cursor3DCanvas
 * Immersive, cursor-responsive 3D WebGL animation inspired by high-end
 * automotive design websites (Q-Refinish).
 * Renders a metallic holographic core with dual cinematic spotlights
 * (amber/gold & electric cyan) and responsive floating particles that fluidly
 * track the user's cursor across 3D space with inertia damping.
 */
export default function Cursor3DCanvas({ className = "absolute inset-0 pointer-events-none" }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || 120

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)

    // WebGL Renderer with antialiasing and transparency
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      container.appendChild(renderer.domElement)
    } catch (e) {
      console.warn("WebGL not supported for Cursor3DCanvas:", e)
      return
    }

    // Cinematic Automotive Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2)
    scene.add(ambientLight)

    // Spotlight 1: Warm Amber / Gold (Automotive Headlight tone)
    const amberLight = new THREE.PointLight(0xf59e0b, 3.5, 25)
    amberLight.position.set(4, 2, 4)
    scene.add(amberLight)

    // Spotlight 2: Electric Cyan / Ice Blue
    const cyanLight = new THREE.PointLight(0x06b6d4, 3.2, 25)
    cyanLight.position.set(-4, -2, 4)
    scene.add(cyanLight)

    // Spotlight 3: Neon Violet / Purple Accent
    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 20)
    purpleLight.position.set(0, 4, -2)
    scene.add(purpleLight)

    // Dynamic Cursor Tracking Light (follows mouse)
    const cursorLight = new THREE.PointLight(0x38bdf8, 4, 15)
    cursorLight.position.set(0, 0, 3)
    scene.add(cursorLight)

    // 3D Object Group
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // 1. Sleek Metallic Torus Knot (Automotive Turbine Core)
    const knotGeo = new THREE.TorusKnotGeometry(1.05, 0.28, 128, 32, 2, 3)
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.18,
      wireframe: false,
      envMapIntensity: 1.5,
    })
    const knotMesh = new THREE.Mesh(knotGeo, knotMat)
    knotMesh.position.set(0, 0, 0)
    knotMesh.scale.set(0.85, 0.85, 0.85)
    coreGroup.add(knotMesh)

    // Wireframe Outer Holographic Ring (High-tech HUD layer)
    const wireGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    })
    const wireRing = new THREE.Mesh(wireGeo, wireMat)
    wireRing.rotation.x = Math.PI / 2.8
    coreGroup.add(wireRing)

    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 100)
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
    })
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat)
    outerRing.rotation.y = Math.PI / 3.2
    coreGroup.add(outerRing)

    // 2. Interactive Cursor Reactive Particles (Atmospheric stardust)
    const particleCount = 140
    const particlePositions = new Float32Array(particleCount * 3)
    const particleScales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16
      particlePositions[i + 1] = (Math.random() - 0.5) * 6
      particlePositions[i + 2] = (Math.random() - 0.5) * 8
      particleScales[i / 3] = Math.random() * 0.05 + 0.02
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Mouse Tracking with Inertia Damping
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const onMouseMove = (e) => {
      // Normalize mouse to [-1, 1] relative to window
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1

      targetRotationY = mouseX * 1.6
      targetRotationX = -mouseY * 1.2

      // Position cursor light in 3D coordinates
      cursorLight.position.x = mouseX * 5
      cursorLight.position.y = mouseY * 2.5
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })

    // Resize Handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || 120
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    // 60FPS Animation Loop
    let animId
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth inertia damping rotation
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.06 + 0.005
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.06
      coreGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.15

      // Floating gentle bobbing
      coreGroup.position.y = Math.sin(elapsed * 1.2) * 0.12
      coreGroup.position.x = Math.cos(elapsed * 0.8) * 0.08

      // Rings differential spin
      wireRing.rotation.z += 0.01
      outerRing.rotation.z -= 0.008

      // Particles gentle drift
      particles.rotation.y += 0.0008
      particles.rotation.x = Math.sin(elapsed * 0.3) * 0.05

      // Light pulsing
      amberLight.intensity = 3.2 + Math.sin(elapsed * 2.5) * 0.6
      cyanLight.intensity = 3.0 + Math.cos(elapsed * 2.1) * 0.5

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
        renderer.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    />
  )
}
