import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
import "./about.css"

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
];

const emojiLayers = [
    {strength: 0.04, blur: 8, z: 1},
    {strength: 0.025, blur: 3, z: 2},
    {strength: 0.012, blur: 0, z: 3},
]

const About = () => {
  return (
    <section className="about-section">
        <div className="main">
            <div className="grid">
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
                <div className="gridline"></div>
            </div>

            <div className="bgtext">
                OJAS CHATUR
            </div>

            <div className="logo">
                <img src={img1} alt="" />
            </div>

            <div className="imgs">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
                <img src={img3} alt="" />
                <img src={img4} alt="" />
            </div>
        </div>
    </section>
  )
}

export default About