import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from "./components/AboutMe/About"
import { motion, useMotionValue, useSpring } from 'framer-motion'
import SideNav from './components/SideNav/SideNav';
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Contact from './components/ContactMe/Contact'

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
      // Determine current cursor size based on variant
      let size = cursorSize;
      if (cursorVariant === 'text') size = 150;
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [x, y, cursorVariant])

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
      <SideNav />
      <header>
        <Navbar />
      </header>
      <main>
        <section id="hero">
          <Hero onHoverEnter={textEnter} onHoverLeave={textLeave} />
        </section>
        <section id="about">
          <About onHoverEnter={textEnter} onHoverLeave={textLeave} />
        </section>
        <section id="experience">
          <Experience onHoverEnter={textEnter} onHoverLeave={textLeave} />
        </section>
        <section id="projects">
          <Projects onHoverEnter={textEnter} onHoverLeave={textLeave} />
        </section>
        <section id="contact">
          <Contact onHoverEnter={textEnter} onHoverLeave={textLeave} />
        </section>
      </main>
    </>
  )
}

export default App
