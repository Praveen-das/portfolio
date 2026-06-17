import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { Leva } from "leva";
import CanvasBackground from "./components/CanvasBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MenuOverlay from "./components/MenuOverlay";
import NoiseOverlay from "./components/NoiseOverlay";
import ProgressiveBlur from "./components/ProgressiveBlur";
import CustomPointer from "./components/CustomPointer";
import { usePortfolioStore } from "./stores/usePortfolioStore";
import { useLenis } from "./hooks/useLenis";
import { containerVariants, childVariants } from "./lib/framer";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const sequenceTrackRef = useRef(null);
  const aboutRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading, setSelectedProject } = usePortfolioStore();

  const lenisRef = useLenis({ enabled: !isMenuOpen && !isLoading });

  const { scrollYProgress } = useScroll({
    target: sequenceTrackRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.header className="header" initial="hidden" animate="visible" variants={childVariants}>
        <div
          className="header-logo sub-font"
          data-text="PRAVEEN"
          onClick={() => {
            setSelectedProject(null);
            lenisRef.current?.scrollTo(0);
            if (isMenuOpen) setIsMenuOpen(false);
          }}
        >
          PRAVEEN
        </div>
        <nav className="header-nav sub-font">
          <a
            href="#about"
            data-text="ABOUT"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProject(null);
              lenisRef.current?.scrollTo("#about");
            }}
          >
            ABOUT
          </a>
          <a
            href="#projects"
            data-text="WORKS"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProject(null);
              lenisRef.current?.scrollTo("#projects");
            }}
          >
            WORKS
          </a>
          <a
            href="#contact"
            data-text="CONTACT"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProject(null);
              lenisRef.current?.scrollTo("#contact");
            }}
          >
            CONTACT
          </a>
          <a href="/resume.pdf" data-text="RESUME" download>
            RESUME
          </a>
        </nav>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <div className="close-x"></div>
          ) : (
            <div className="dot-grid">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>
      </motion.header>

      <div className="app-container">
        {/* <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence> */}
        <Leva hidden />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lenis={lenisRef.current}
        setSelectedProject={setSelectedProject}
      />

      <main>
        <div className="canvas-zone">
          <div ref={sequenceTrackRef} className="sequence-track-marker" />
          <CanvasBackground scrollYProgress={scrollYProgress} aboutProgress={aboutProgress} />

          <Hero />

          <div
            style={{
              height: "30vh",
              backgroundColor: "var(--bg-primary)",
              mixBlendMode: "lighten",
            }}
          />

          <div ref={aboutRef} id="about">
            <About />
          </div>
          <div id="projects">
            <Projects />
          </div>
        </div>

        <Contact />
        <CustomPointer />
        <NoiseOverlay />
        <ProgressiveBlur side="top" />
        <ProgressiveBlur side="bottom" />
      </main>
    </div>
    </>
  );
}

export default App;
