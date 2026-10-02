import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Realistic 3D Architecture & Skill Topology Graph
// Nodes represent core engineering primitives connected by active data pipelines

const networkNodes = [
  { name: "TypeScript", pos: [0, 0, 0], color: 0x3178c6, size: 0.35, primary: true },
  { name: "React 19", pos: [-1.8, 1.2, 0.4], color: 0x61dafb, size: 0.25 },
  { name: "Next.js SSR", pos: [-2.4, -0.6, -0.3], color: 0xffffff, size: 0.22 },
  { name: "Node.js API", pos: [1.6, 1.4, -0.5], color: 0x5fa04e, size: 0.28 },
  { name: "Go Engine", pos: [2.2, -0.8, 0.6], color: 0x00add8, size: 0.26 },
  { name: "PostgreSQL", pos: [0.8, -1.8, -0.7], color: 0x336791, size: 0.24 },
  { name: "Docker", pos: [-0.9, -1.9, 0.8], color: 0x2496ed, size: 0.23 },
  { name: "Kubernetes", pos: [2.6, 0.6, 0.3], color: 0x326ce5, size: 0.22 },
  { name: "Rust Core", pos: [-1.4, 2.2, -0.8], color: 0xf74c00, size: 0.24 },
  { name: "LLM / RAG", pos: [0.2, 2.3, 0.7], color: 0xa855f7, size: 0.25 },
]

// Connections between engineering components
const networkEdges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [3, 4], [3, 5], [4, 7], [6, 7],
  [6, 5], [8, 0], [9, 3], [9, 0], [1, 9]
]

function ThreeWelcomeCanvas() {
  const containerRef = useRef(null)
  const [activeNode, setActiveNode] = useState(networkNodes[0].name)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const width = container.clientWidth || 450
    const height = container.clientHeight || 380

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 8.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2)
    topLight.position.set(5, 10, 7)
    scene.add(topLight)

    const blueBackLight = new THREE.PointLight(0x38bdf8, 2, 20)
    blueBackLight.position.set(-5, -3, 3)
    scene.add(blueBackLight)

    const violetBackLight = new THREE.PointLight(0x8b5cf6, 2, 20)
    violetBackLight.position.set(5, 3, -3)
    scene.add(violetBackLight)

    const graphGroup = new THREE.Group()
    scene.add(graphGroup)

    // 1. Create Nodes
    const sphereGeo = new THREE.SphereGeometry(1, 24, 24)
    const nodeMeshes = []

    networkNodes.forEach((n) => {
      const mat = new THREE.MeshStandardMaterial({
        color: n.color,
        roughness: 0.2,
        metalness: 0.6,
        emissive: n.color,
        emissiveIntensity: n.primary ? 0.6 : 0.25,
      })
      const mesh = new THREE.Mesh(sphereGeo, mat)
      mesh.scale.set(n.size, n.size, n.size)
      mesh.position.set(...n.pos)
      graphGroup.add(mesh)
      nodeMeshes.push(mesh)
    })

    // 2. Create Glowing Edge Pipelines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.5,
    })

    networkEdges.forEach(([fromIdx, toIdx]) => {
      const p1 = new THREE.Vector3(...networkNodes[fromIdx].pos)
      const p2 = new THREE.Vector3(...networkNodes[toIdx].pos)
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2])
      const line = new THREE.Line(geo, lineMat)
      graphGroup.add(line)
    })

    // 3. Subtle Orbit Ring (Architecture Horizon)
    const horizonGeo = new THREE.RingGeometry(3.6, 3.63, 64)
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    })
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat)
    horizonMesh.rotation.x = Math.PI / 2.3
    graphGroup.add(horizonMesh)

    // 4. Subtle Background Grid Particles
    const particleCount = 120
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12
      particlePos[i + 1] = (Math.random() - 0.5) * 8
      particlePos[i + 2] = (Math.random() - 0.5) * 6
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x64748b,
      transparent: true,
      opacity: 0.4,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    graphGroup.add(particles)

    // Interactive Mouse Rotation
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    container.addEventListener("pointermove", onPointerMove)

    // Animation Loop
    let animationId
    let clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth dampening
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Constant architectural rotation + mouse tilt
      graphGroup.rotation.y = t * 0.12 + targetX * 0.7
      graphGroup.rotation.x = Math.sin(t * 0.1) * 0.08 + targetY * 0.5

      // Breathing scale on central node
      const centerScale = networkNodes[0].size * (1 + Math.sin(t * 2) * 0.06)
      nodeMeshes[0].scale.set(centerScale, centerScale, centerScale)

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
      container.removeEventListener("pointermove", onPointerMove)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      sphereGeo.dispose()
      lineMat.dispose()
      horizonGeo.dispose()
      horizonMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#090d16]/80 border border-white/[0.06]">
      {/* Three.js Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Realistic Technical Telemetry Overlay */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none font-mono text-[10px]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-slate-400 font-semibold tracking-wider uppercase">GRAPH: TOPOLOGICAL KNOWLEDGE MESH</span>
      </div>

      <div className="absolute top-3.5 right-4 pointer-events-none font-mono text-[10px] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
        10 NODES · 15 EDGES
      </div>

      {/* Floating Milestone Pointers */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <div className="flex items-center gap-2 text-slate-400 bg-[#070b14]/80 px-3 py-1 rounded-lg border border-white/[0.06] backdrop-blur-md">
          <span className="text-sky-400">●</span>
          <span>Interactive 3D dependency model</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <span>Click &amp; drag to inspect topology</span>
        </div>
      </div>
    </div>
  )
}

export default ThreeWelcomeCanvas
