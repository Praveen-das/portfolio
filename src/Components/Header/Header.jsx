import React from 'react'
import './header.css'
import SnapingButton from '../../UIComponents/SnapingButton'

export default function Header() {
  return (
    <header>
      <label id='logo'>p.dev</label>
      <div id='navbar'>
        <SnapingButton href='#1' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">ABOUT</label></SnapingButton>
        <SnapingButton href='#2' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">SKILLS</label></SnapingButton>
        <SnapingButton href='#3' movement='forward' className='nav_item--wrapper' ><label className='nav_items' htmlFor="">PROJECTS</label></SnapingButton>
      </div>
    </header>
  )
}
