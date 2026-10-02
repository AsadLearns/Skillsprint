// Clean, official SVG brand marks for authentic developer tools and languages

export function ReactIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function PythonIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M11.91 2c-5.18 0-4.85 2.25-4.85 2.25l.01 2.33h4.94v.7H5.06S2 6.92 2 12.15c0 5.22 2.68 5.04 2.68 5.04h1.6v-2.25s-.09-2.68 2.64-2.68h4.54s2.54.04 2.54-2.48V4.48S16.48 2 11.91 2zm-2.7 1.45a.94.94 0 1 1 0 1.88.94.94 0 0 1 0-1.88z" fill="#387eb8"/>
      <path d="M12.09 22c5.18 0 4.85-2.25 4.85-2.25l-.01-2.33H12v-.7h6.94S22 17.08 22 11.85c0-5.22-2.68-5.04-2.68-5.04h-1.6v2.25s.09 2.68-2.64 2.68h-4.54s-2.54-.04-2.54 2.48v4.3s-.42 2.48 4.15 2.48zm2.7-1.45a.94.94 0 1 1 0-1.88.94.94 0 0 1 0 1.88z" fill="#ffe052"/>
    </svg>
  )
}

export function TypeScriptIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#3178c6"/>
      <path d="M11.75 14.5c-.2.9-.8 1.5-1.7 1.8-1 .4-2.4.4-3.5-.2-.7-.4-1.2-1-1.4-1.8l1.8-.7c.1.5.4.8.7 1 .5.3 1.2.3 1.7.1.4-.1.7-.4.8-.8.1-.5-.1-.9-.7-1.2-.6-.3-1.4-.6-2.1-.9-.8-.4-1.4-.8-1.7-1.4-.3-.6-.3-1.4 0-2.1.4-.8 1-1.3 1.8-1.6 1-.3 2.1-.3 3.1 0 .8.3 1.4.8 1.7 1.5l-1.7.9c-.2-.4-.5-.7-.9-.8-.4-.2-1-.2-1.4 0-.4.1-.7.4-.8.7-.1.3 0 .7.4.9.4.2 1 .4 1.7.7.8.3 1.5.8 1.9 1.3.4.6.5 1.2.3 1.7zm10.25-6.5h-7.6v2.2h2.7v7.8h2.3v-7.8h2.6V8z" fill="#ffffff"/>
    </svg>
  )
}

export function RustIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="#000000" stroke="#f74c00" strokeWidth="1.5"/>
      <path d="M12 4l1.5 2.5h3l-.5 3 2.5 1.5-1.5 2.5 1.5 2.5-2.5 1.5.5 3h-3L12 20l-1.5-2.5h-3l.5-3-2.5-1.5 1.5-2.5-1.5-2.5 2.5-1.5-.5-3h3L12 4z" fill="#f74c00"/>
      <circle cx="12" cy="12" r="4.5" fill="#000000"/>
      <text x="12" y="14" fontSize="6" fontWeight="900" textAnchor="middle" fill="#ffffff" fontFamily="monospace">R</text>
    </svg>
  )
}

export function GoIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#00add8"/>
      <path d="M6 14.5c0-1.8 1.2-3.2 3.1-3.2 1.1 0 1.9.4 2.4 1l-1 1c-.3-.4-.8-.7-1.4-.7-1 0-1.7.8-1.7 1.9s.7 1.9 1.7 1.9c.7 0 1.2-.3 1.5-.8h-1.5v-1.3h2.8v2.6c-.6.9-1.6 1.4-2.8 1.4-2 0-3.1-1.5-3.1-3.8zm8.6-3.2c1.9 0 3.4 1.4 3.4 3.3 0 1.9-1.5 3.3-3.4 3.3-1.9 0-3.4-1.4-3.4-3.3 0-1.9 1.5-3.3 3.4-3.3zm0 5.1c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8-1.8.8-1.8 1.8.8 1.8 1.8 1.8z" fill="#ffffff"/>
    </svg>
  )
}

export function DockerIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm6 6h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm18.5 1.5c-.3-.2-1.3-.3-2.1.2-.5-1.5-1.8-2.5-3.4-2.7V11H2c-.4 2.5 1 5.3 3.5 6.7 3.5 2 8.7 1.7 12.3-.3 2.7-1.5 4.2-3.8 4.7-4.9z" fill="#2496ed"/>
    </svg>
  )
}

export function NodeIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2zm0 2.2L5.5 8.4v7.2L12 19.4l6.5-3.8V8.4L12 4.2zm-.8 4.6h1.6v2.2c.5-.7 1.2-1.1 2-1.1 1.5 0 2.2 1 2.2 2.6v3.7h-1.6v-3.4c0-.9-.3-1.4-1.2-1.4-.7 0-1.3.5-1.4 1.3v3.5h-1.6V8.8z" fill="#5fa04e"/>
    </svg>
  )
}

export function PostgresIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7 3 3.5 6 3.5 10.5c0 3 1.8 5.7 4.6 7v3.5h2.2v-2.2c.6.1 1.1.2 1.7.2 4.5 0 8.5-3.5 8.5-8.5C20.5 6 17 3 12 3zm0 2c3.9 0 6.5 2.3 6.5 5.5 0 3.7-3 6.5-6.5 6.5-.5 0-1-.1-1.5-.2l-.6-.2v2.4H8.5V16l-.8-.5C5.8 14.3 4.5 12.5 4.5 10.5 4.5 7.3 7.1 5 12 5z" fill="#336791"/>
    </svg>
  )
}

export function KubernetesIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="#326ce5"/>
      <path d="M12 6l4.5 2.5v5L12 16l-4.5-2.5v-5L12 6zm0 1.8L9 9.5v3l3 1.7 3-1.7v-3L12 7.8z" fill="#ffffff"/>
    </svg>
  )
}

export function AiModelIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" className="stroke-accent-400" />
      <path d="M9 9h6v6H9z" className="fill-accent-500/20 stroke-cyber-400" />
      <path d="M9 3v3m6-3v3m-6 12v3m6-3v3m-9-9h3m12 0h3m-15 6h3m12 0h3" strokeLinecap="round" className="stroke-slate-500" />
    </svg>
  )
}
