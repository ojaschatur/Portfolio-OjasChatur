import React, { useState, useEffect } from 'react'
import './hero.css'
import img1 from '../../assets/1-Happy.png'
import img2 from '../../assets/2-Luaghing.png'
import img3 from '../../assets/4-Crying.png'
import img4 from '../../assets/5-Heart-Eye.png'
import img5 from '../../assets/6-Sleeping.png'
import img6 from '../../assets/7-Mind-blowing.png'
import img7 from '../../assets/8-Star-Eye.png'
import img8 from '../../assets/9-Lovely.png'
import img9 from '../../assets/10-Kiss.png'
import img10 from '../../assets/11-Party.png'
import img11 from '../../assets/12-Angry.png'
import img12 from '../../assets/13-Triumph.png'
import img13 from '../../assets/15-Grinning.png'
import img14 from '../../assets/18-Shocked.png'
import img15 from '../../assets/19-Rolling-Eyes.png'
import img16 from '../../assets/20-Like.png'
import img17 from '../../assets/25-Mouth-Covering.png'
import img18 from '../../assets/26-Crossing-Finger.png'
import img19 from '../../assets/27-Shit.png'
import img20 from '../../assets/28-Thinking.png'
const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
]
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
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx(idx => (idx + 1) % images.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <motion.section className='hero' variants={container} initial="hidden" animate="visible" style={{ position: 'relative' }}>
        {/* canvas background */}
        <StarBackground />
        <motion.img 
            className="heroImg" 
            src={images[imgIdx]} alt="Hero" 
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
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <motion.div
            className="scroll-for-more"
            initial={{ y: 0 }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              userSelect: 'none',
              background: 'none',
              boxShadow: 'none',
              marginBottom: '18px',
              pointerEvents: 'none',
            }}
          >
            <span style={{ display: 'block', fontWeight: 500 }}>Scroll for more</span>
          </motion.div>
        </div>
    </motion.section>
    </>
    
  )
}

export default Hero