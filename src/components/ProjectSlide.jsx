import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import { slideEase, revealEase, containerVariants, childVariants, viewport } from "../lib/framer";
import ProgressiveBlur from "./ProgressiveBlur";
import "./ProjectSlide.css";

export default function ProjectSlide({ project, onClose }) {
  const wrapperRef = useRef(null);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useLenis({ wrapperRef: scrollRef, contentRef, enabled: mounted });

  // Force re-render after mount so scrollRef is populated for IO
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!project) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="project-slide-backdrop"
      />

      {/* Fake Red Slide for wiping effect */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%", transition: { duration: 0.7, delay: 0, ease: slideEase } }}
        transition={{ duration: 0.7, ease: slideEase }}
        className="project-slide-panel-fake"
      />

      {/* Real slide */}
      <motion.div
        ref={wrapperRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%", transition: { duration: 0.7, delay: 0, ease: slideEase } }}
        transition={{ duration: 0.7, delay: 0.2, ease: slideEase }}
        className="project-slide-panel"
        data-lenis-prevent
      >
        <ProgressiveBlur side="top" height="120px" zIndex={100} />

        <div ref={scrollRef} className="project-slide-inner">
          <div ref={contentRef}>
            {/* Hero Image Section */}
            <section className="project-slide-hero">
              <motion.div
                className="project-slide-image-container"
                initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.05, filter: "blur(8px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.5, ease: revealEase }}
              >
                <img src={project.image} alt={project.title} />
              </motion.div>
            </section>

            {/* Content Section Below */}
            <section className="project-slide-content">
              {/* Left: Metadata — parent is clean for IO, children animate */}
              <motion.div
                key={`metadata-${mounted}`}
                className="project-metadata"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport(scrollRef)}
              >
                <motion.div className="metadata-item" variants={childVariants}>
                  <span
                    className="display-font metadata-value"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}
                  >
                    {project.title}
                  </span>
                </motion.div>

                <motion.div className="metadata-item" variants={childVariants}>
                  <span className="sub-font metadata-label">Role / Category</span>
                  <span className="sub-font metadata-value">{project.category}</span>
                </motion.div>

                <motion.div className="metadata-item" variants={childVariants}>
                  <span className="sub-font metadata-label">Technologies</span>
                  <div className="tech-pills">
                    {project.techStack?.map((tech, index) => (
                      <span key={index} className="sub-font tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Description & CTA — same pattern */}
              <motion.div
                key={`description-${mounted}`}
                className="project-description-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport(scrollRef)}
              >
                <motion.p className="project-description-text" variants={childVariants}>
                  {project.description}
                </motion.p>

                <motion.div style={{ marginTop: "2rem" }} variants={childVariants}>
                  <a
                    href={project.link || "#"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    className="project-action-block"
                  >
                    <span className="action-text sub-font" data-text="VISIT NOW">
                      VISIT NOW
                    </span>
                    <span className="action-arrow">
                      <div className="arrow-icon-wrapper">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-primary"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-secondary"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
}
