import { motion } from "framer-motion";
import { containerVariants, childVariants, viewport } from "../lib/framer";
import LetsCreate from "./LetsCreate";
import SomethingGreat from "./SomethingGreat";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-container-inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport()}
        >
          <div className="contact-left">
            <motion.h2 className="contact-tag sub-font" variants={childVariants}>
              GET IN TOUCH
            </motion.h2>
            <h1 className="contact-title hero-font">
              <LetsCreate />
              <SomethingGreat />
            </h1>
          </div>

          <div className="contact-right-col">
            <motion.div className="contact-info-block" variants={childVariants}>
              <span className="info-label sub-font">FIND ME ON</span>
              <div className="social-icons">
                <a
                  href="https://github.com/Praveen-das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/praveen-das-625631136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/_praveen_das/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.a
              className="contact-action-block"
              variants={childVariants}
              href="/resume.pdf"
              download
              style={{ textDecoration: "none" }}
            >
              <span className="action-text sub-font" data-text="DOWNLOAD RESUME">
                DOWNLOAD RESUME
              </span>
              <span className="action-arrow">
                <div className="arrow-icon-wrapper download-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </span>
            </motion.a>

            <motion.div
              className="contact-action-block"
              variants={childVariants}
              onClick={() => (window.location.href = "mailto:srikantheweb@gmail.com")}
            >
              <span className="action-text sub-font" data-text="SAY HELLO">
                SAY HELLO
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
