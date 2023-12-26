import React from 'react'
import './works.css'
import { motion } from 'framer-motion'

const collection = {
    Artworld: {
        desc: "Ecommerce application",
        link: ''
    },
    ChatSphere: {
        desc: 'Scalable Chat Application',
        link: ''
    },
    "Disneyplus": {
        desc: 'A cloned version of Disney+ Hotstar',
        link: ''
    },
    // Visualizer: {
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi deserunt quos ducimus illo, ipsa recusandae possimus.',
    //     link: ''
    // },

}

export default function Works() {
    let FROM = 'inset(0 0 100% 0)'
    let TO = 'inset(0 0% 0% 0)'

    const container = {
        visible: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.5,
            },
        }
    }

    const item = {
        hidden: {
            clipPath: FROM,
            opacity: 0,
            translateY: 50,
        },
        visible: {
            clipPath: TO,
            opacity: 1,
            translateY: 0,
            transition: {
                duration: 0.5,
            },
        }
    }

    const sub_item = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
            },
        }
    }

    return (
        <section id='works' className='gutter' >
            <div

                className="projects_wrapper"
            >
                <label className='title' htmlFor="FEATURED PROJECTS">FEATURED PROJECTS</label>
                <div id="projects">
                    {
                        Object.entries(collection).map(([area, { desc, link }]) => (
                            <motion.div
                                initial='hidden'
                                whileInView='visible'
                                variants={container}
                                key={area} className="project"
                            >
                                <motion.label variants={item} key={area} id='hero_desc' className='project_title' htmlFor="">{area}</motion.label>
                                <motion.label variants={sub_item} className='h5' htmlFor="">{desc}</motion.label>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

