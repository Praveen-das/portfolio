import React, { useEffect, useState } from 'react'
import './header.css'
import SnapingButton from '../../UIComponents/SnapingButton'

export default function Header() {
  const [navActive, setNavActive] = useState(false)

  useEffect(() => {
    if (navActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [navActive])
  console.log(navActive);
  return (
    <>
      <header id='header'>
        <a href='/#' id='logo'>p.dev</a>
        <div id='navbar'>
          <SnapingButton href='#about' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">ABOUT</label></SnapingButton>
          <SnapingButton href='#skills' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">SKILLS</label></SnapingButton>
          <SnapingButton href='#works' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">PROJECTS</label></SnapingButton>
          <SnapingButton href='#contactme' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">CONTACT ME</label></SnapingButton>
        </div>
      </header>
      <header id='header_mobile'>
        <div id="backdrop" onClick={() => setNavActive(false)} className={`${navActive ? 'active' : ''}`}></div>
        {/* ///////////////////////////////////////////////////// */}
        <a onClick={() => setNavActive(false)} href='/#' id='logo'>p.dev</a>
        <div className={`drawer ${navActive ? 'active' : ''}`}>
          <div className={`hamberger ${navActive ? 'active' : ''}`} onClick={() => setNavActive(s => !s)}>
            <span />
            <span />
            <span />
          </div>
          <div className="items">
            <a onClick={() => setNavActive(false)} href='#about' className='h5' htmlFor="">ABOUT</a>
            <a onClick={() => setNavActive(false)} href='#skills' className='h5' htmlFor="">SKILLS</a>
            <a onClick={() => setNavActive(false)} href='#works' className='h5' htmlFor="">WORKS</a>
            <a onClick={() => setNavActive(false)} href='#contactme' className='h5' htmlFor="">CONTACT ME</a>
          </div>
        </div>
      </header>
    </>
  )
}
