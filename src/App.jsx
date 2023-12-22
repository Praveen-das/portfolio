import './App.css'
import Blobs from './Components/Blobs/Blobs'
import Header from './Components/Header/Header'
import HeroSection from './Components/HeroSection/HeroSection'
import Pointer from './Components/Pointer/Pointer'
import About from './Components/About/About'
import Skills from './Components/Skills/Skills'
import Projects from './Components/Works/Works'
import { useScroll, useTransform } from 'framer-motion'
import Devider from './UIComponents/Divider/Divider'

function App() {
  const { scrollYProgress } = useScroll()
  const opacity1 = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.05, 0.1], [0, 1])

  return (
    <div id='App'>
      {/* <Blobs /> */}
      <div id="blur"></div>
      <main>
        <Pointer />
        <Header />
        <HeroSection />
        <About style={{ opacity: opacity1 }} />
        <Skills style={{ opacity: opacity2 }} />
        {/* <Devider /> */}
        <Projects />
      </main>

    </div >
  )
}

export default App
