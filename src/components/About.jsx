import { motion } from "framer-motion";
import { containerVariants, childVariants, viewport } from "../lib/framer";
import Accordion from "./Accordion";
import "./About.css";

const roles = [
  { id: "dev", title: "DEVELOPER", num: "01", details: "Building robust, scalable web applications with modern technologies. Focusing on performance, accessibility, and clean code architectures." },
  { id: "des", title: "DESIGNER", num: "02", details: "Crafting intuitive and engaging user interfaces. Bridging the gap between aesthetics and functionality to create memorable digital experiences." },
  { id: "prob", title: "PROBLEM SOLVER", num: "03", details: "Tackling complex technical challenges with innovative solutions. Always learning, adapting to new paradigms, and optimizing workflows." },
  { id: "tech", title: "TECH ENTHUSIAST", num: "04", details: "Exploring the bleeding edge of web technologies, creative coding, WebGL, and interactive storytelling." },
];

export default function About() {
  return (
    <motion.section 
      className="section about-section" 
      id="about"
      style={{ position: "relative", overflow: "visible" }}
      initial="hidden"
      whileInView="visible"
      viewport={viewport()}
      variants={containerVariants}
    >
      <div className="about-content">
        <div className="about-left" style={{ display: "flex", flexDirection: "column" }}>
          <motion.h2 className="about-title display-font" variants={childVariants}>ABOUT</motion.h2>
          <motion.div className="about-bottom" variants={childVariants}>
            <p className="sub-font">
              MY ROLE SET <span className="plus">+</span>
            </p>
          </motion.div>
        </div>

        <Accordion items={roles} />
      </div>
    </motion.section>
  );
}

