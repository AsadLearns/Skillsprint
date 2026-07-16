import React from 'react'

export default function Logo({ size = 'w-8 h-8' }) {
  return (
    <svg className={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer dynamic learning loop */}
      <circle cx="12" cy="12" r="10" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Lightning speed vector */}
      <path
        d="M14.5 3.5L6 13.5H12.5L10 20.5L18.5 10.5H12L14.5 3.5Z"
        fill="#34d399"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
