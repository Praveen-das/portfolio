import { useEffect, useRef } from 'react';
import './pointer.css'
import { useSpring, animated } from '@react-spring/web';

const testForCollision = (elm1, elm2) => {
  if (!(elm1.right < elm2.left ||
    elm1.left > elm2.right ||
    elm1.bottom < elm2.top ||
    elm1.top > elm2.bottom))
    return true;
  return false
}




export default function Pointer() {
  const pointer = useRef()
  const [style, api] = useSpring(() => ({
    top: 0,
    left: 0,
    config: {
      friction: 30
    }
  }))


  useEffect(() => {
    var mousePosition = { x: 0, y: 0 };
    window.onmousemove = (e) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY

      const x = mousePosition.x
      const y = mousePosition.y

      api.start({ left: x, top: y })


      // pointer.current.style.left = x + 'px'
      // pointer.current.style.top = y + 'px'
    }

    // let hero_name = document.getElementById('hero_name')
    let logo = document.getElementById('logo')
    let desc_wrapper = document.getElementsByClassName('desc_wrapper')
    let skills = document.getElementsByClassName('skills')
    let about_wrapper = document.getElementsByClassName('about_wrapper')
    let icon_button = document.getElementsByClassName('icon_button')
    let nav_items = document.getElementsByClassName('nav_item--wrapper')
    let project = document.getElementsByClassName('project')


    let expandingLinks = [
      logo,
      ...icon_button,
      ...nav_items,
      ...project
    ]

    let wireframeItems = [
      ...about_wrapper,
      ...skills,
      ...desc_wrapper,
    ]

    expandingLinks.forEach(item => {
      let SCALE_FROM = 1
      let SCALE_TO = 5

      if (item.className === 'project') {
        SCALE_TO = 15
      } else {
        SCALE_TO = 5
      }

      item.onmouseenter = () => {
        pointer.current.style.scale = SCALE_TO
      }
      
      item.onpointerleave = () => {
        pointer.current.style.scale = SCALE_FROM
      }
    })

    let timer

    wireframeItems.forEach(item => {
      let SCALE_FROM = 1
      let SCALE_TO = 30

      if (item.className === 'skills') {
        SCALE_TO = 20
      } else {
        SCALE_TO = 30
      }

      item.onmouseenter = () => {
        pointer.current.style.scale = SCALE_TO
        if (timer) clearTimeout(timer)
        pointer.current.classList.add('invert')
      }

      item.onmouseleave = () => {
        pointer.current.style.scale = SCALE_FROM
        timer = setTimeout(() => {
          pointer.current.classList.remove('invert')
        }, 200)
      }
    })
  }, [])

  return (<animated.div style={style} ref={pointer} id="pointer" />);
}
