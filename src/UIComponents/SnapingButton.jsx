import React, { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web';
import './style.iconbtn.css'


function getThresholdValue(value) {
    const limit = 10;
    if (value > limit) {
        value = limit + (value - limit) * 0.5;
    } else if (value < -limit) {
        value = -limit + (value + limit) * 0.5;
    }
    return value;
}

function handleMovement(movement, axis) {
    switch (movement) {
        case 'horizontal': axis.y = 0
            return;
        case 'vertical': axis.x = 0
            return;
        case 'forward': {
            axis.y = 0
            if (axis.x > 0) axis.x = 0;
            return;
        }
        case 'backward': {
            axis.y = 0
            if (axis.x < 0) axis.x = 0;
            return;
        }
        case 'up': {
            x = 0
            if (axis.y < 0) axis.y = 0
            return
        }
        case 'down': {
            x = 0
            if (axis.y > 0) axis.y = 0;
            break
        }
    }
}

export default function SnapingButton(
    {
        children,
        className,
        name = '',
        movement = 'full',
        href,
        //  = 'full',
        ...props
    }) {

    const iconButtonRef = useRef()
    const iconWrapper = useRef()
    const psudoClassName = `icon_wrapper--${name}`
    const [style, api] = useSpring(() => ({ x: 0, y: 0 }))

    useEffect(() => {
        let box = iconButtonRef.current.getBoundingClientRect()

        iconButtonRef.current.onmousemove = (e) => {
            const width = box.width
            const height = box.height

            let axis = {
                x: (width / 2) - e.offsetX,
                y: (height / 2) - e.offsetY
            }

            handleMovement(movement, axis)

            let x = getThresholdValue(axis.x)
            let y = getThresholdValue(axis.y)

            api.start({ to: { x: -x, y: -y }, config: { friction: 26 } })
        }
        iconButtonRef.current.onmouseleave = () => {
            api.start({ to: { x: 0, y: 0 }, config: { friction: 15 } })
        }
    }, [])


    return (
        <a href={href} >
            <div ref={iconButtonRef} className={className} {...props}>
                <animated.div ref={iconWrapper} style={style} className={`icon_wrapper ${psudoClassName}`}>
                    {children}
                </animated.div>
            </div>
        </a>
    )
}
