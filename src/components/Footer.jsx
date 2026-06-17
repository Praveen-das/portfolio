import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer({ lenisRef }) {
  const scrollToTop = () => {
    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="section footer-section">
      <div className="footer-content">
        <div className="footer-title-container">
          <motion.div 
            className="footer-circle"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
          <h2 className="footer-title display-font">
            <span className="thanks-text">THANKS FOR</span><br />
            <span className="exploring-text">EXPLORING</span>
          </h2>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© 2024 AMIR HAQUE</p>
        <p className="back-to-top" onClick={scrollToTop}>
          BACK TO TOP <span className="arrow"></span>
        </p>
      </div>
    </footer>
  );
}
