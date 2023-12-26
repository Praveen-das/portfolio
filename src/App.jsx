import './App.css'
import Blobs from './Components/Blobs/Blobs'
import Header from './Components/Header/Header'
import HeroSection from './Components/HeroSection/HeroSection'
import Pointer from './Components/Pointer/Pointer'
import About from './Components/About/About'
import Skills from './Components/Skills/Skills'
import Projects from './Components/Works/Works'
import Lenis from '@studio-freight/lenis'
import { useLayoutEffect, utEffect, useRef, useEffect } from 'react'
import ContactMe from './Components/ContactMe/ContactMe'


let lenis

if (window.innerWidth > 480) {
  lenis = new Lenis()
}

function animate(time) {
  lenis.raf(time)
  requestAnimationFrame(animate)
}

function App() {
  const raf = useRef()

  useEffect(() => {
    if (lenis) {
      raf.current = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(raf.current)
    }
  }, [])



  return (
    <div id='App'>
      {/* <Blobs /> */}
      <div id="blur"></div>
      <main>
        <Header />
        <Pointer />
        {/* ///////////////////////////// */}
        <HeroSection />
        <About />
        <Skills />
        <Projects />
        <ContactMe />
      </main>
    </div >
  )
}

export default App
