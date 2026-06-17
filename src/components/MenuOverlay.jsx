import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { slideEase, revealEase } from "../lib/framer";
import "./MenuOverlay.css";

const menuItems = [
  { title: "ABOUT", id: "#about" },
  { title: "WORKS", id: "#projects" },
  { title: "CONTACT", id: "#contact" },
  { title: "RESUME", id: "/resume.pdf", isDownload: true },
];

const containerVariants = {
  hidden: {
    transition: {
      delayChildren: 0.4, // Small delay before children start appearing
    },
  },
  visible: {
    transition: {
      delayChildren: 0.4, // Small delay before children start appearing
      staggerChildren: 0.15, // Slightly slower ripple
    },
  },
};

const childVariants = {
  hidden: {
    clipPath: "inset(100% -0.5rem 0 -0.5rem)",
    opacity: 0,
    y: 40,
    delay: 0.4,
  },
  visible: {
    clipPath: "inset(0% -0.5rem 0% -0.5rem)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: revealEase }, // Reduced speed
  },
};

export default function MenuOverlay({ isOpen, onClose, lenis, setSelectedProject }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Black wipe for opening effect — hidden instantly on close */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.7, delay: 0.2, ease: slideEase } }}
            transition={{ duration: 0.5, ease: slideEase }}
            className="menu-overlay-fake"
          />

          <motion.div
            className="menu-overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.5, delay: 0, ease: slideEase } }}
            transition={{ duration: 0.7, delay: 0.2, ease: slideEase }}
          >
            <div className="menu-body">
              <motion.div
                className="menu-links"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="menu-item display-font"
                    variants={childVariants}
                    onClick={() => {
                      if (item.isDownload) return;
                      const target = item.id;
                      onClose();
                      setSelectedProject(null);
                      // Defer scroll so lenis restarts after menu close state propagates
                      requestAnimationFrame(() => {
                        if (lenis) {
                          lenis.start();
                          lenis.scrollTo(target);
                        }
                      });
                    }}
                  >
                    <span className="menu-item-title" data-text={item.title}>
                      {item.isDownload ? (
                        <a
                          href={item.id}
                          download
                          style={{ color: "inherit", textDecoration: "none" }}
                          onClick={onClose}
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
