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
    "Interested in": [
        "DevOps",
        "ThreeJs",
        "Blender",
        "Rust",
        "WASM"
    ]
}

function Skills({ style }) {
    return (
        <section
            id='2'
            className='gutter'
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        >
            <div className="skills_wrapper">
                <label className='title' htmlFor="">SKILLS</label>
                <div id="expertise">
                    {
                        Object.entries(collection).map(([area, skills]) => (
                            <div
                                key={area}
                                className="skills"
                            >
                                <label className='area_of_expertise h6' htmlFor="">{area}</label>
                                <div className="skill_wrapper">
                                    {
                                        skills.map((skill, i) => (
                                            <label className='h5' key={skill} htmlFor="skill">
                                                {skill}
                                                {skills.length === i + 1 ? '' : ','}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Skills
