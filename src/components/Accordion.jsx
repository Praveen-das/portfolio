import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { childVariants } from "../lib/framer";

// Emil Kowalski inspired easing and spring physics
const springTransition = { type: "spring", bounce: 0, duration: 0.4 };
const opacityTransition = { duration: 0.2, ease: [0.23, 1, 0.32, 1] }; // Strong ease-out

export default function Accordion({ items }) {
  const [activeId, setActiveId] = useState(null);

  // When active, only show the active item; otherwise show all
  const visibleItems = activeId
    ? items.filter((item) => item.id === activeId)
    : items;

  return (
    <div className="about-roles">
      <AnimatePresence mode="popLayout" initial={false}>
        {visibleItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              layout
              key={item.id}
              variants={childVariants}
              className={`role-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveId(isActive ? null : item.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: springTransition,
                opacity: opacityTransition
              }}
              style={{ cursor: "pointer", transformOrigin: "top" }}
            >
              <div className="role-header">
                <span className="role-title sub-font">{item.title}</span>
                <span className="role-num sub-font">{isActive ? "—" : item.num}</span>
              </div>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      height: springTransition,
                      opacity: opacityTransition 
                    }}
                    className="role-details"
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ paddingTop: "2rem" }}>
                      <p className="sub-font" style={{ fontSize: "1rem", lineHeight: "1.6", color: "#ffffff", letterSpacing: "0.05em" }}>
                        {item.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
