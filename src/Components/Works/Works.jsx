import React from 'react'
import './works.css'
import Motion from '../../UIComponents/motion'


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
    return (
        <section id='3' className='gutter-bottom' >
            <div className="projects_wrapper">
                <label className='title' htmlFor="">FEATURED PROJECTS</label>
                <div id="projects">
                    {
                        Object.entries(collection).map(([area, { desc, link }]) => (
                            <div key={area} className="project">
                                {/* <div className="project_display"></div> */}
                                <label id='hero_desc' htmlFor="">{area}</label>
                                <label className='h5' htmlFor="">{desc}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

