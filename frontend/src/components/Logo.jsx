import React from 'react'

export default function Logo({ size = 'w-8 h-8' }) {
  return (
    <svg className={`${size} drop-shadow-[0_4px_12px_rgba(139,92,246,0.35)] hover:scale-110 transition-transform duration-300`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      {/* Outer dynamic learning loop */}
      <circle cx="12" cy="12" r="10" stroke="url(#logo-grad-primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      {/* Sleek gradient lightning speed vector */}
      <path 
        d="M14.5 3.5L6 13.5H12.5L10 20.5L18.5 10.5H12L14.5 3.5Z" 
        fill="url(#logo-grad-primary)" 
        stroke="#ffffff" 
        strokeWidth="0.75" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  )
}
