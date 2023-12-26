import React, { useEffect } from 'react'
import { easeIn, motion, } from 'framer-motion'
import './hero.css'

export default function HeroSection() {
    let FROM = 'inset(0 100% 0 0)'
    let TO = 'inset(0 0% 0 0)'
    let
        hero_name = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration: 2,
                },
            },
        },

        hero_desc = {
            visible: {
                transition: {
                    delay: 0.2,
                    delayChildren: 0.2,
                    staggerChildren: 0.05,
                },
            },
        }
        , fractions = {
            hidden: {
                "--clip": FROM,
                opacity: 0,
            },
            visible: {
                "--clip": TO,
                opacity: 1,
                transition: {
                    duration: 1,
                },
            }
        }
        , fractions_wireframe = {
            hidden: {
                "--clip": FROM,
                opacity: 0,
            },
            visible: {
                "--clip": TO,
                opacity: 1,
                transition: {
                    duration: 0.8,
                },
            }
        };

    const text = 'build everything on the web, from how it looks to how it works.'
    let words = text.split(' ')

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
            animate='visible'
            id='#/'
        >
            <div className='hero_content'>
                <motion.label
                    variants={hero_name}
                    className='hero_name'
                    htmlFor="hero_name"
                >
                    PRAVEEN DAS
                </motion.label>
                <div className="desc_wrapper">
                    <motion.div
                        variants={hero_desc}
                        initial='hidden'
                        animate='visible'
                        id='hero_desc'
                        htmlFor="hero_desc"
                    >
                        {
                            words.map((word, key) => (
                                <motion.div key={key} style={{ position: 'relative' }}>
                                    <motion.label variants={fractions} className='fractions' >{word}</motion.label>
                                    <motion.label variants={fractions_wireframe} className='fractions absolute wireframe'>{word}</motion.label>
                                </motion.div>
                            ))
                        }
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
