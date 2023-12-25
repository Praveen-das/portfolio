import React from 'react'
import './about.css'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function About({ style }) {
    let FROM = 'inset(0 0 100% 0)'
    let TO = 'inset(0% 0% 0% 0)'

    const container = {
        visible: {
            transition: {
                duration: 0.5,
                delayChildren: 0.2,
                staggerChildren: 0.03
            }
        }
    }

    const items = {
        hidden: { clipPath: FROM, opacity: 0, translateY: 50 },
        visible: {
            clipPath: TO,
            opacity: 1,
            translateY: 0,
            transition: {
                duration: 0.5,
            },
        }
    }

    const items_wireframe = {
        hidden: {
            clipPath: FROM,
            translateY: 50
        },
        visible: {
            clipPath: TO,
            translateY: 0,
            transition: {
                duration: 0.5,
            },
        }
    }

    let about = `I am a Full Stack Developer. I love turning ideas into awesome web applications. While I can handle design, my real passion is in coding – building the nuts
    and bolts of websites to make them work smoothly.`

    about = about.split(' ')

    return (
        <div id="about">
            <motion.section
                initial='hidden'
                whileInView='visible'
                variants={container}
                className='dark gutter'
            // id='about'
            >
                <div className="about">
                    <label className='title' htmlFor="">ABOUT ME</label>
                    <div className="about_wrapper">
                        {
                            about?.map((letter, key) => (
                                <div variants={items} key={key}>
                                    <motion.div variants={items} className='h6' htmlFor="">{letter}</motion.div>
                                    <motion.div variants={items_wireframe} className='h6 absolute wireframe' htmlFor="">{letter}</motion.div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </motion.section>
        </div>
    )
}
