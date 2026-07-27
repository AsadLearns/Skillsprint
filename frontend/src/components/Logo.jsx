import { useId } from 'react'

// Bolt outline, shared by the lit front face and the extruded body behind it.
const BOLT = 'M14.6 2.8L5.6 13.6H11.4L9.4 21.2L18.4 10.4H12.6L14.6 2.8Z'

// Dimensional mark: a rounded tile with a lit top edge, and a bolt extruded
// back-right so it reads as a solid object rather than a flat glyph.
// Everything is vector, so it stays crisp at 24px in the navbar and at any
// size elsewhere. IDs are per-instance — the navbar and footer both render
// this, and duplicate gradient ids would cross-wire between them.
export default function Logo({ size = 'w-8 h-8', animated = true }) {
  const uid = useId().replace(/:/g, '')
  const face = `face-${uid}`
  const tile = `tile-${uid}`
  const shine = `shine-${uid}`
  const glow = `glow-${uid}`

  return (
    <span className={`inline-block ${animated ? 'logo-3d' : ''}`}>
      <svg
        className={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SkillSprint"
      >
        <defs>
          <linearGradient id={tile} x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4b76" />
            <stop offset="1" stopColor="#101c30" />
          </linearGradient>
          <linearGradient id={face} x1="6" y1="3" x2="17" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#dff0ff" />
            <stop offset="0.45" stopColor="#5cb8fa" />
            <stop offset="1" stopColor="#2183d6" />
          </linearGradient>
          <linearGradient id={shine} x1="4" y1="3" x2="20" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* tile body + lit top edge */}
        <rect x="1.5" y="1.5" width="21" height="21" rx="6.5" fill={`url(#${tile})`} />
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="6.5"
          fill="none"
          stroke="#5cb8fa"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {/* specular sweep across the top of the tile */}
        <path d="M1.5 8.5V8a6.5 6.5 0 0 1 6.5-6.5h8A6.5 6.5 0 0 1 22.5 8v0.5Z" fill={`url(#${shine})`} />

        {/* extruded body: the same silhouette pushed back-right, stroked so the
            offset copy and the front face read as one solid mass */}
        <path
          d={BOLT}
          transform="translate(1.15 1.15)"
          fill="#12385f"
          stroke="#12385f"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* lit front face */}
        <path
          d={BOLT}
          fill={`url(#${face})`}
          stroke="#eaf6ff"
          strokeOpacity="0.85"
          strokeWidth="0.5"
          strokeLinejoin="round"
          filter={`url(#${glow})`}
        />
      </svg>
    </span>
  )
}
