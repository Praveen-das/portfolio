export const framer_defaults = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { delay: 0.2 } },
};

// Punchy ease-out for slide/wipe animations (panels, overlays)
export const slideEase = [0.23, 1, 0.32, 1];

// Softer, organic ease-out for reveal animations (curtain rise, text)
export const revealEase = [0.16, 1, 0.3, 1];

// Parent container variant — only handles IO detection + stagger
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25, // Small delay before children start appearing
      staggerChildren: 0.15, // Slightly slower ripple
    },
  },
};

// Child variant — handles the actual curtain rise animation
export const childVariants = {
  hidden: {
    clipPath: "inset(100% -0.5rem 0 -0.5rem)",
    opacity: 0,
    y: 60,
  },
  visible: {
    clipPath: "inset(0% -0.5rem 0% -0.5rem)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: revealEase }, // Reduced speed
  },
};

// Viewport config helper
export const viewport = (root, { once = false, margin = "-50px" } = {}) => ({
  once,
  margin,
  root,
});
