import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { containerVariants, childVariants } from "../lib/framer";
import "./Hero.css";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.section
      className="section hero-section"
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-content">
        <motion.h1 className="hero-title hero-font" variants={childVariants}>
          <span style={{ display: "inline-block" }}>DEVELOPER</span>
          <span className="spacer" style={{ display: "inline-block" }}></span>
          <span style={{ display: "inline-block" }}>DESIGNER</span>
        </motion.h1>
      </div>

      {/* Liquid smear WebGL canvas — lives inside the hero, fully self-contained */}
      {/* <HeroCanvas heroRef={heroRef} /> */}

      <div className="hero-bottom sub-font">
        <motion.div className="hero-role" variants={childVariants}>
          <p>CRAFTING DIGITAL EXPERIENCES</p>
        </motion.div>

        <motion.div className="hero-scroll" variants={childVariants}>
          <p>
            SCROLL TO EXPLORE <span className="red-dot"></span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
