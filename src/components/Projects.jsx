import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./Projects.css";

import { PROJECTS } from "../lib/constants";
import { usePortfolioStore } from "../stores/usePortfolioStore";
import ProjectSlide from "./ProjectSlide";

function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Background image slides horizontally left-to-right
  const imgX = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Project name slides horizontally right-to-left
  const titleX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <motion.div ref={cardRef} className="project-card" onClick={() => onSelect(project)} style={{ cursor: "pointer" }}>
      <div className="project-layout" style={{ position: "relative", overflow: "hidden" }}>
        <div className="project-visual" style={{ overflow: "hidden" }}>
          <motion.div
            className="image-reveal"
            style={{
              x: imgX,
              width: "130%",
              position: "absolute",
              left: "-15%",
              top: 0,
              bottom: 0,
              willChange: "transform",
            }}
          >
            <img src={project.image} alt={project.title} className="project-img" loading="lazy" decoding="async" />
            <div className="image-overlay"></div>
          </motion.div>
        </div>

        <motion.div
          style={{
            x: titleX,
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          <h3
            className="hero-font"
            style={{
              fontSize: "clamp(5rem, 15vw, 15rem)",
              color: "white",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {project.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background color is now consistently black
  const bgColor = useTransform(scrollYProgress, [0, 0.14], ["#000000", "#000000"]);

  // Title appears ONLY AFTER background is black (starts at 0.14)
  // Title appears at start, then fades and blurs as images arrive
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.25, 0.38], [0, 0, 1, 1, 0.15]);

  // Title blurs out as the first project image slides up
  // Reduced blur radius to 20px for massive performance gain over 200px
  const titleFilter = useTransform(scrollYProgress, [0.25, 0.38], ["blur(0px)", "blur(20px)"]);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <motion.section ref={containerRef} className="section projects-section" id="projects">
        <div className="projects-content">
          <motion.div
            style={{
              opacity: titleOpacity,
              filter: titleFilter,
              y: "-50%",
              width: "100%",
              left: 0,
              willChange: "opacity, filter",
            }}
            className="projects-header-group"
          >
            <h2 className="projects-title display-font" style={{ color: "white", textAlign: "center" }}>
              WORKS
            </h2>
            {/* <HeroCanvas heroRef={titleEl} /> */}
          </motion.div>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedProject && <ProjectSlide project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
