import React, { useRef, useEffect } from 'react'

export default function StarBackground({
  particleCount = 60,
  color = '255,255,255', // rgb components used with alpha
  maxSize = 3,
  speed = 0.3,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      const rect = canvas.getBoundingClientRect()
      particlesRef.current = Array.from({ length: particleCount }).map(() => {
        const size = Math.random() * maxSize + 0.5
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        const vx = (Math.random() - 0.5) * speed
        const vy = (Math.random() - 0.5) * speed * 0.6
        const alpha = 0.2 + Math.random() * 0.8
        return { x, y, vx, vy, size, alpha }
      })
    }

    const draw = (time) => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const parts = particlesRef.current
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        // update
        p.x += p.vx
        p.y += p.vy

        // wrap around
        if (p.x < -10) p.x = rect.width + 10
        if (p.x > rect.width + 10) p.x = -10
        if (p.y < -10) p.y = rect.height + 10
        if (p.y > rect.height + 10) p.y = -10

        // draw
        ctx.beginPath()
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        g.addColorStop(0, `rgba(${color}, ${p.alpha})`)
        g.addColorStop(1, `rgba(${color}, 0)`) 
        ctx.fillStyle = g
        ctx.fillRect(p.x - p.size, p.y - p.size, (p.size * 2), (p.size * 2))
      }

      if (!prefersReduced) rafRef.current = requestAnimationFrame(draw)
    }

    // init
    resize()
    createParticles()

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      // draw once when reduced motion is preferred
      draw()
    }

    const onResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particleCount, color, maxSize, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
