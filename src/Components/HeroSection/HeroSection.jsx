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
                translateY: 0,
                transition: {
                    duration: 2,
                },
            },
        },
        hero_desc = {
            hidden: { opacity: 0, translateY: 50 },
            visible: {
                opacity: 1,
                translateY: 0,
                transition: {
                    duration: 2,
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
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    duration: 2
                },
            }
        };

    const text = 'build everything on the web, from how it looks to how it works.'
    let words = text.split(' ')

    return (
        <section id='#/'>
            <motion.div
                initial='hidden'
                animate='visible'
                className='hero_content'
            >
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
                        id='hero_desc'
                        htmlFor="hero_desc"
                    >
                        {
                            words.map((word, key) => (
                                <motion.label key={key} className='fractions' data-word={word} variants={fractions}>
                                    {word}
                                </motion.label>
                            ))
                        }
                    </motion.div>
                    <motion.div
                        variants={hero_desc}
                        id='hero_desc'
                        className='absolute'
                        htmlFor="hero_desc"
                    >
                        {
                            words.map((word, key) => (
                                <motion.label key={key} className='fractions wireframe' data-word={word} variants={fractions_wireframe}>
                                    {word}
                                </motion.label>
                            ))
                        }
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
