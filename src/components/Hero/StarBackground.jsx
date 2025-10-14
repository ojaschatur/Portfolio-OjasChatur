import React, { useRef, useEffect } from 'react'

export default function StarBackground({
  particleCount = 60,
  color = '255,255,255', // rgb components used with alpha for stars
  maxSize = 3,
  speed = 0.3,
  // new visual customization props
  gradientTop = '#38366b',
  gradientBottom = '#0f1117',
  noiseIntensity = 0.18, // global alpha applied to the tiled noise (0-1)
  noisePixelMin = 10, // minimum per-pixel alpha used when generating noise (0-255)
  noisePixelMax = 80, // maximum per-pixel alpha used when generating noise (0-255)
  noiseTileMultiplier = 1, // scales the noise tile size (higher = larger grain)
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])
  const noiseCanvasRef = useRef(null)
  const noiseOffsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const createNoiseCanvas = (w, h) => {
      // create a small noise canvas to be tiled for performance
      const base = 256
      const size = Math.max(64, Math.round(base * Math.max(1, Math.round(dpr)) * Math.max(0.25, noiseTileMultiplier)))
      const nCanvas = document.createElement('canvas')
      nCanvas.width = size
      nCanvas.height = size
      const nCtx = nCanvas.getContext('2d')

      const img = nCtx.createImageData(nCanvas.width, nCanvas.height)
      const data = img.data
      // fill with white pixels and random alpha to form grain
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
        // alpha small and varied based on props
        data[i + 3] = Math.floor(noisePixelMin + Math.random() * (noisePixelMax - noisePixelMin))
      }
      nCtx.putImageData(img, 0, 0)
      return nCanvas
    }

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // recreate noise canvas when size changes (keeps noise quality consistent)
      noiseCanvasRef.current = createNoiseCanvas(rect.width, rect.height)
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
      // draw gradient background using configurable colors
      const grad = ctx.createLinearGradient(0, 0, 0, rect.height)
      grad.addColorStop(0, gradientTop)
      grad.addColorStop(1, gradientBottom)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, rect.width, rect.height)

      // draw grain/noise as a repeating pattern
      if (noiseCanvasRef.current) {
        ctx.save()
        // subtle movement of noise for life (very slow)
        if (!prefersReduced) {
          noiseOffsetRef.current.x = (noiseOffsetRef.current.x + 0.3) % noiseCanvasRef.current.width
          noiseOffsetRef.current.y = (noiseOffsetRef.current.y + 0.12) % noiseCanvasRef.current.height
          // tile draw with offset to create smooth movement
          const nx = -noiseOffsetRef.current.x
          const ny = -noiseOffsetRef.current.y
          ctx.globalAlpha = noiseIntensity
          // draw tiled noise across canvas with integer steps to cover
          const nW = noiseCanvasRef.current.width
          const nH = noiseCanvasRef.current.height
          for (let ix = nx; ix < rect.width; ix += nW) {
            for (let iy = ny; iy < rect.height; iy += nH) {
              ctx.drawImage(noiseCanvasRef.current, ix, iy, nW, nH)
            }
          }
          ctx.globalAlpha = 1
        } else {
          // static single draw for reduced motion
          ctx.globalAlpha = noiseIntensity
          ctx.drawImage(noiseCanvasRef.current, 0, 0, rect.width, rect.height)
          ctx.globalAlpha = 1
        }
        ctx.restore()
      }

      // Draw particles (stars)
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
  }, [particleCount, color, maxSize, speed, gradientTop, gradientBottom, noiseIntensity, noisePixelMin, noisePixelMax, noiseTileMultiplier])

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
