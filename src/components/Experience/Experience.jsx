import React from 'react'
import "./experience.css"
import img from "../../assets/1-Happy.png"

const Experience = () => {
  return (
    <div className='experience'>
      <div className="exp-content">
        <h1>Experience</h1>
        <p>
          Here is a quick summary of my professional and project experience.<br/>
          <ul>
            <li>Interned at <b>Awesome Startup</b> as a Frontend Developer (React, 2024)</li>
            <li>Worked on <b>AI Chatbot</b> project using Python and OpenAI API</li>
            <li>Contributed to <b>Open Source</b> projects on GitHub</li>
            <li>Built several full-stack apps with React, Node.js, and MongoDB</li>
          </ul>
        </p>
      </div>
      <img src={img} alt="Happy" className="exp-img" />
    </div>
  )
}

export default Experience