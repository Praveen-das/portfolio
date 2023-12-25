import React, { useState } from 'react'
import './header.css'
import SnapingButton from '../../UIComponents/SnapingButton'

export default function Header() {
  const [navActive, setNavActive] = useState(false)
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
        <div id="navbar" className={`${navActive ? 'navbar--active' : ''}`}>
          <div className={`nav_icon ${navActive ? 'nav_icon--active' : ''}`} onClick={() => setNavActive(s => !s)}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="backdrop" className={`${navActive ? 'backdrop--active' : ''}`}></div>
        <a href='/#' id='logo'>p.dev</a>
      </header>
    </>
  )
}
