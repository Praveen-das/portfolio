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
    // let logo = document.getElementById('logo')
    let icon_button = document.getElementsByClassName('icon_button')
    let nav_items = document.getElementsByClassName('nav_item--wrapper')
    let project_title = document.getElementsByClassName('project_title')


    let hitItems = [
      // logo,
      ...icon_button,
      ...nav_items,
      ...project_title
    ]

    hitItems.forEach(item => {
      item.onpointerenter = () => {
        pointer.current.style.scale = 5
      }
      item.onpointerleave = () => {
        pointer.current.style.scale = 1
      }
    })
  }, [])

  return (<animated.div style={style} ref={pointer} id="pointer" />);
}
