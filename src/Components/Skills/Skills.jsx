import React from 'react'
import './skills.css'
import { motion } from 'framer-motion'

const collection = {
    Frontend: [
        "Reactjs",
        "Zustand",
        "MaterialUI",
    ],
    Backend: [
        "Nextjs",
        "Nodejs",
        "Expressjs",
        "Postgresql",
        "Prisma",
        "Firebase",
        "JWT",
        "SocketIO",
    ],
    Languages: [
        "HTML5",
        "CSS",
        "JavaScript",
        "TypeScript",
    ],
    Tools: [
        "Git",
        "ChromeDevTools",
        "Figma",
    ],
    "Interests": [
        "DevOps",
        "ThreeJs",
        "Blender",
        "Rust",
        "WASM"
    ]
}

function Skills() {
    let FROM = 'inset(0 100% 0 0)'
    let TO = 'inset(0 0% 0% 0)'

    const container = {
        visible: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        }
    }

    const title = {
        hidden: {
            clipPath: FROM,
            opacity: 0,
        },
        visible: {
            clipPath: TO,
            opacity: 1,
            transition: {
                duration: 1,
            },
        }
    }

    const title_wireframe = {
        hidden: {
            clipPath: FROM,
            opacity: 0,
        },
        visible: {
            clipPath: TO,
            opacity: 1,
            transition: {
                duration: 0.75
            },
        }
    }

    const skill_wrapper = {
        visible: {
            transition: {
                delayChildren: 0.8,
                // staggerChildren: 0.1,
            },
        }
    }

    const skill_variant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section
            id='skills'
            className='gutter-top'
        >
            <div className="skills_wrapper">
                <label className='title' htmlFor="">SKILLS</label>
                <motion.div

                    id="expertise"
                >
                    {
                        Object.entries(collection).map(([area, skills]) => (
                            <motion.div
                                key={area}
                                variants={container}
                                initial='hidden'
                                whileInView='visible'
                                className="skills"
                            >
                                <div className="skill_area--wrapper">
                                    <div className='characters'>
                                        <motion.label variants={title} className='skill_area h6' htmlFor="">{area}</motion.label>
                                        <motion.label variants={title_wireframe} className='skill_area h6 absolute wireframe' htmlFor="">{area}</motion.label>
                                    </div>
                                </div>
                                <motion.div variants={skill_wrapper} className="skill_wrapper">
                                    {
                                        skills.map((skill, i) => (
                                            <motion.label
                                                variants={skill_variant}
                                                className='h5'
                                                key={skill}
                                                htmlFor="skill"
                                            >
                                                {skill}
                                                {skills.length === i + 1 ? '' : ','}
                                            </motion.label>
                                        ))
                                    }
                                </motion.div>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
