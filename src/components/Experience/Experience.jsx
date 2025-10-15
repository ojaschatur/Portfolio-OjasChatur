import React, { useEffect, useState } from 'react'
import "./experience.css"
import img from "../../assets/1-Happy.png"
import { motion } from 'framer-motion'

const leftExp = {
  title: 'Software Engineering Intern',
  date: 'June 2025 – August 2025',
  company: 'ConnectWise LLP',
  location: 'Mumbai, Maharashtra',
  bullets: [
    'Built Cassandra schema achieving 0.034 ms write latency for 700+ companies and 50k users.',
    'Improved query speed by 62.5% via Go routine parallelism and O(n) vs O(n²) comparison logic.',
    'Implemented Kafka pipelines handling 1M+ messages/day with optimized partitioning.',
    'Delivered REST APIs with under 400 ms responses and JWT security for real-time backup insights.'
  ],
  techStack: 'Go, Cassandra, Kafka'
}
const rightExp = {
  title: 'Analytics Intern',
  date: 'Dec 2024 – Jan 2025',
  company: 'Adani Electricity',
  location: 'Mumbai, Maharashtra',
  bullets: [
    'Deployed GitLab CI/CD on Google Cloud’s Vertex AI Workbench for reproducible MLOps infrastructure.',
    'Designed end-to-end AI pipelines automating data preprocessing, model training, and deployment.',
    'Learned and applied MLOps best practices: version control, pipeline, lifecycle.',
    'Integrated models into production workflows, improving prediction latency by 40%.'
  ],
  techStack: 'GCP, Python, GitLab'
}

const expVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
}

const Experience = ({ onHoverEnter, onHoverLeave }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('experience');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Show if at least 40% of the section is in the viewport
      const threshold = 0.4;
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      setVisible(visibleHeight / rect.height > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <motion.div
      className='experience'
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: visible ? 0.18 : 0 }}
    >
      <motion.h1 className='experience-title' onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>Experience</motion.h1>
      <div className="exp-timeline">
        <motion.div
          className="exp-card left"
          variants={expVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ marginRight: '2.5rem' }}
        >
          <div className="exp-card-header">
            <h2>{rightExp.title}</h2>
            <span className="exp-techstack">{rightExp.techStack}</span>
          </div>
          <span className="exp-date">{rightExp.date}</span>
          <div className="exp-company">{rightExp.company} <span className="exp-location">{rightExp.location}</span></div>
          <ul>
            {rightExp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </motion.div>
        <div className="center-line"></div>
        <motion.div
          className="exp-card right"
          variants={expVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ marginLeft: '2.5rem' }}
        >
          <div className="exp-card-header">
            <h2>{leftExp.title}</h2>
            <span className="exp-techstack">{leftExp.techStack}</span>
          </div>
          <span className="exp-date">{leftExp.date}</span>
          <div className="exp-company">{leftExp.company} <span className="exp-location">{leftExp.location}</span></div>
          <ul>
            {leftExp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Experience