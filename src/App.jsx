import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Hero from './components/Hero/Hero'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function App() {

  const cursorSize = 32
  const [cursorVariant, setCursorVariant] = useState('default')

  // motion values for performant pointer-following
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // smooth the motion with springs
  const springX = useSpring(x, { stiffness: 600, damping: 50 })
  const springY = useSpring(y, { stiffness: 600, damping: 50 })

  useEffect(() => {
    const onMouseMove = (e) => {
      // subtract half the cursor size so the element is centered on the pointer
      x.set(e.clientX - cursorSize / 2)
      y.set(e.clientY - cursorSize / 2)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [x, y])

  const variants = {
    default: {
      width: cursorSize,
      height: cursorSize
    },
    text: {
      width: 150,
      height: 150,
      backgroundColor: "white",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant('text')
  const textLeave = () => setCursorVariant('default')

  return (
    <>
      <motion.div
        className='cursor'
        style={{ x: springX, y: springY }}
        variants={variants}
        animate={cursorVariant}
      />
      <header>
        <Navbar />
      </header>
      <main>
        <Hero onHoverEnter={textEnter} onHoverLeave={textLeave} />
        <section>Services</section>
        <section>Project1</section>
        <section>Project2</section>
        <section>Project3</section>
        <section>Contact</section>
      </main>
    </>
  )
}

export default App
