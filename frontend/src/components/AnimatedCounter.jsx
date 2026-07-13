import { useEffect, useState } from 'react'

export default function AnimatedCounter({ value, duration = 1000, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp = null
    const target = Number(value) || 0
    if (target === 0) {
      setCount(0)
      return
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      
      // Ease out quad formula: f(t) = t * (2 - t)
      const easeProgress = progress * (2 - progress)
      
      setCount(Math.floor(easeProgress * target))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    window.requestAnimationFrame(step)
  }, [value, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
