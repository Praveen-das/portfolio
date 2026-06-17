import { motion } from "framer-motion";
import { childVariants } from "../lib/framer";

export default function LetsCreate() {
  return (
    <motion.span 
      variants={childVariants} 
      style={{ display: "block" }}
    >
      LET'S CREATE
    </motion.span>
  );
}
