import React from 'react'
import './hero.css'
import heroImg from "../../assets/love.png"
import { motion } from 'framer-motion'
import StarBackground from './StarBackground'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

// accept handlers from parent to trigger cursor variant
const Hero = ({ onHoverEnter, onHoverLeave }) => {
  return (
    <motion.section className='hero' variants={container} initial="hidden" animate="visible" style={{ position: 'relative' }}>
        {/* canvas background */}
        <StarBackground />

        <motion.img 
            className="heroImg" 
            src={heroImg} alt="Hero" 
            variants={item}
            transition={{duration: 0.6}}
            style={{ position: 'relative', zIndex: 2 }}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            />
        <motion.h1 
          className='name' 
          variants={item}
          style={{ position: 'relative', zIndex: 3, color: '#fff' }}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >Ojas Chatur!</motion.h1>
    </motion.section>
  )
}

export default Hero