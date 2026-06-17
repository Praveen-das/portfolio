import { motion } from "framer-motion";
import { childVariants } from "../lib/framer";

export default function SomethingGreat() {
  return (
    <motion.span variants={childVariants} style={{ display: "block", marginTop: "1rem" }}>
      SOMETHING GREAT
    </motion.span>
  );
}
