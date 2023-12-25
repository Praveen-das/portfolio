import React from 'react'
import './header.css'
import SnapingButton from '../../UIComponents/SnapingButton'

export default function Header() {
  return (
    <header id='header'>
      <a href='/#' id='logo'>p.dev</a>
      <div id='navbar'>
        <SnapingButton href='#about' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">ABOUT</label></SnapingButton>
        <SnapingButton href='#skills' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">SKILLS</label></SnapingButton>
        <SnapingButton href='#works' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">PROJECTS</label></SnapingButton>
        <SnapingButton href='#contactme' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">CONTACT ME</label></SnapingButton>
      </div>
    </header>
  )
}
