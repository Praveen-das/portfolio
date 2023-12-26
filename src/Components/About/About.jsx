import React from 'react'
import {  motion } from 'framer-motion'

import './about.css'

export default function About() {

    const container = {
        visible: {
            transition: {
                duration: 0.5,
                delayChildren: 0.2,
            }
        }
    }

    const items = {
        hidden: { opacity: 0, translateY: 50 },
        visible: {
            opacity: 1,
            translateY: 0,
            transition: {
                duration: 1,
            },
        }
    }

    let about = `I am a Full Stack Developer. I love turning ideas into awesome web applications. While I can handle design, my real passion is in coding, building the nuts and bolts of websites to make them work smoothly.`

    return (
        <section id='about' className='dark gutter' >
            <div className="about">
                <label className='title' htmlFor="">ABOUT ME</label>
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    variants={container}
                    className="about_wrapper"
                >
                    <motion.div variants={items} className='h6 about_me' htmlFor="">{about}</motion.div>
                    <motion.div variants={items} className='h6 absolute wireframe' htmlFor="">{about}</motion.div>
                </motion.div>
            </div>
        </section>
    )
}
