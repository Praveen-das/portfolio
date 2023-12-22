import React from 'react'
import './about.css'
import { useScroll, useTransform, motion } from 'framer-motion'
// import Motion from '../../UIComponents/motion'

export default function About({ style }) {

    return (
        <section className='dark gutter' id='1'>
            <div className="about">
                <label className='title' htmlFor="">ABOUT ME</label>
                <p className='h6' htmlFor="">
                    I am a Full Stack Developer(PERN). I love turning ideas into awesome web applications. 
                    While I can handle design, my real passion is in coding – building the nuts and 
                    bolts of websites to make them work smoothly.
                </p>
            </div>
        </section>
    )
}
