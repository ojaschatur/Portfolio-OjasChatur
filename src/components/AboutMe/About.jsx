import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/1-Happy.png'
import img2 from '../../assets/2-Luaghing.png'
import img3 from '../../assets/11-Party.png'
import img4 from '../../assets/5-Heart-Eye.png'
import img5 from '../../assets/6-Sleeping.png'
import img6 from '../../assets/7-Mind-blowing.png'
import "./about.css"

const images = [img1, img2, img3, img4, img5, img6];

const imageParallax = [
  { x: 30, y: 30 },
  { x: 30, y: 30 },
  { x: 30, y: 30 },
  { x: 30, y: 30 },
  { x: 30, y: 30 },
  { x: 30, y: 30 },
];

const About = () => {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section className="about-section" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="main">
        <div className="content">
          <motion.div
            className="bgtext"
            animate={{
              x: (mouse.x - 0.5) * 25,
              y: (mouse.y - 0.5) * 15,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <span>About</span> Me
          </motion.div>

          <motion.div
            className="about-content"
            animate={{
              x: (mouse.x - 0.5) * 25,
              y: (mouse.y - 0.5) * 13,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <p>
              I'm <span>Ojas Chatur</span>, currently a final year <span>Electronics and Computer Engineering</span> student at KJ Somaiya School of Engineering, Mumbai. I’m actively honing my skills in full stack development with ReactJS and Golang, while also exploring the potential of machine learning. I love building AI-powered solutions and crafting impactful products that bridge engineering principles with real-world challenges.
            </p>
          </motion.div>
        </div>

        <div className="imgs">
          {images.map((img, i) => (
            <motion.img
              key={i}
              className={`img${i + 1}`}
              src={img}
              alt=""
              animate={{
                x: (mouse.x - 0.5) * imageParallax[i].x,
                y: (mouse.y - 0.5) * imageParallax[i].y,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;