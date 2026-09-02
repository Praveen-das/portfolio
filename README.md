# 🌌 Praveen Das — Creative Developer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-portfolio--ozp4.vercel.app-black?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-ozp4.vercel.app/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![WebGL](https://img.shields.io/badge/WebGL-GLSL_Shaders-990000?style=for-the-badge&logo=opengl&logoColor=white)](https://www.khronos.org/webgl/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

<br />

**A high-performance, dark-aesthetic personal portfolio and creative engineering showcase built with React 18, custom WebGL GLSL shaders, Framer Motion, Lenis smooth scrolling, and Zustand.**

[Explore Live Demo](https://portfolio-ozp4.vercel.app/) · [Report Bug](https://github.com/Praveen-das/portfolio/issues) · [Request Feature](https://github.com/Praveen-das/portfolio/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features & Creative Engineering](#-key-features--creative-engineering)
- [Tech Stack](#-tech-stack)
- [Featured Projects Showcased](#-featured-projects-showcased)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Design System & Typography](#-design-system--typography)
- [Performance & Optimization](#-performance--optimization)
- [Connect & Contact](#-connect--contact)
- [License](#-license)

---

## 🔭 Overview

This repository hosts the source code for the personal portfolio of **Praveen Das**, Full Stack Developer & Creative Technologist. Designed with an editorial brutalist layout, fluid physics-based interactions, and low-level WebGL graphics, the portfolio bridges visual storytelling with robust full-stack software engineering.

---

## ✨ Key Features & Creative Engineering

- 🎨 **Raw GLSL WebGL Background Shaders:**
  - Custom vertex and fragment shaders ([`CanvasBackground.jsx`](file:///c:/Users/pvn/Desktop/portfolio/src/components/CanvasBackground.jsx)) handling multi-texture blending, motion-blur wipe transitions, and mouse velocity tracking.
  - Ghost trails with physics-driven spring chain interpolation and chromatic aberration (RGB displacement).
- 🌊 **Inertial Smooth Scrolling:**
  - Integrated Lenis ([`useLenis.js`](file:///c:/Users/pvn/Desktop/portfolio/src/hooks/useLenis.js)) synchronized with scroll-locked modals and interactive navigation.
- 🎭 **Scroll-Driven Micro-Animations:**
  - Framer Motion scroll progress hooks (`useScroll`, `useTransform`) orchestrating dual-direction typography slides, progressive blurs, and depth-of-field masking.
- ⚡ **Lightweight Global State Management:**
  - Decentralized Zustand store ([`usePortfolioStore.js`](file:///c:/Users/pvn/Desktop/portfolio/src/stores/usePortfolioStore.js)) with granular selector subscriptions to prevent unnecessary component re-renders.
- 📱 **Interactive Project Modals:**
  - Responsive full-screen slide overlays ([`ProjectSlide.jsx`](file:///c:/Users/pvn/Desktop/portfolio/src/components/ProjectSlide.jsx)) with body scroll locking, deep project metadata, live demos, and tech stack tags.
- 🎯 **Custom Cursor & Micro-Interactions:**
  - Dynamic spring-based custom cursor ([`CustomPointer.jsx`](file:///c:/Users/pvn/Desktop/portfolio/src/components/CustomPointer.jsx)) with contextual state transforms on interactive targets.
- 📺 **Tactile Film Grain Overlay:**
  - Canvas-driven animated noise texture ([`NoiseOverlay.jsx`](file:///c:/Users/pvn/Desktop/portfolio/src/components/NoiseOverlay.jsx)) and top/bottom progressive multi-stop backdrop filters.

---

## 🛠 Tech Stack

### Core Framework & UI

- **[React 18](https://react.dev/)** — Component architecture and virtual DOM rendering.
- **[Vite 8](https://vitejs.dev/)** — Next-generation frontend tooling and ultra-fast Hot Module Replacement (HMR).
- **[Vanilla CSS & CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS)** — Tailored design tokens, glassmorphic filters, and layout control.

### Graphics, Animation & Physics

- **[WebGL & GLSL](https://www.khronos.org/webgl/)** — GPU-accelerated shader pipeline for background transitions and echo trails.
- **[Three.js](https://threejs.org/)** / **[@react-three/fiber](https://r3f.docs.pmnd.rs/)** / **[@react-three/drei](https://github.com/pmndrs/drei)** — 3D scene scaffolding and canvas helpers.
- **[Framer Motion 10](https://www.framer.com/motion/)** — Complex spring physics, scroll-linked parallax, and staggered reveals.
- **[@studio-freight/lenis](https://github.com/darkroomengineering/lenis)** — Smooth, inertia-based viewport scrolling.

### State & Utilities

- **[Zustand 5](https://zustand-demo.pmnd.rs/)** — Atomic, hook-based state management.
- **[Simplex Noise](https://github.com/jwagner/simplex-noise.js)** — Procedural texture calculation.


---

## 🌟 Featured Projects Showcased

| Project                                              | Category                    | Tech Stack                                                                        | Live Demo                                             |
| :--------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **[VIREL](https://client-black-one.vercel.app/)**    | Digital Product / Discovery | React, TypeScript, TailwindCSS, Express, PostgreSQL, Redis, OlaMaps               | [Launch App ↗](https://client-black-one.vercel.app/)  |
| **[CHATVIA](https://chatapp-web-alpha.vercel.app/)** | Real-time Communication     | React, TypeScript, TailwindCSS, Express, Socket.io, Redis, Kafka, MongoDB, Docker | [Launch App ↗](https://chatapp-web-alpha.vercel.app/) |
| **[ARTWORLD](https://artworld-nine.vercel.app/)**    | Marketplace & Gallery       | Next.js, TypeScript, Material UI, Express, Stripe, PostgreSQL                     | [Launch App ↗](https://artworld-nine.vercel.app/)     |

---

## 🚀 Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
- **[npm](https://www.npmjs.com/)** or **[pnpm](https://pnpm.io/)** / **[yarn](https://yarnpkg.com/)**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Praveen-das/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the local development server with HMR:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or network host IP).

### Production Build

Create an optimized, minified production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

---

## 🎨 Design System & Typography

- **Display & Hero Typography:** `Bebas Neue` (Google Fonts) — Bold, high-impact condensed grotesque.
- **Body & Subtitles:** `Inter` (300, 400, 500, 600, 700) — Precision geometric sans-serif.
- **Palette:**
  - Primary Background: `#000000` / `#0a0a0a`
  - Accent / Contrast: `#ffffff` / `#e5e5e5`
  - Surface Overlays: Glassmorphism (`backdrop-filter: blur(...)`) with muted rgba borders.

---

## ⚡ Performance & Optimization

- **GPU Offloading:** Shader calculations executed on the GPU via standard WebGL pipeline without heavy runtime overhead.
- **Lazy Asset Loading:** Project images and heavy assets leverage native `loading="lazy"` and `decoding="async"`.
- **Smart Render Loop:** WebGL animation frame loops automatically disconnect and clean up WebGL buffers, textures, and event listeners on unmount.
- **Fine-Grained Subscriptions:** Zustand atomic selectors mitigate re-render churn during continuous scroll frames.

---

## 📬 Connect & Contact

- **Portfolio:** [portfolio-ozp4.vercel.app](https://portfolio-ozp4.vercel.app/)
- **GitHub:** [@Praveen-das](https://github.com/Praveen-das)
- **LinkedIn:** [Praveen Das](https://www.linkedin.com/in/praveen-das-k)
- **Instagram:** [@\_praveen_das](https://www.instagram.com/_praveen_das/)
- **Email:** [praveendask97@gmail.com](mailto:praveendask97@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
