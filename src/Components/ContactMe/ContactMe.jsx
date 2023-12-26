import SnapingButton from '../../UIComponents/SnapingButton'
import GithubLogo from '../../assets/icons/github.svg?react'
import LinkedInLogo from '../../assets/icons/linkedin.svg?react'
import InstagramLogo from '../../assets/icons/instagram.svg?react'
import FacebookLogo from '../../assets/icons/facebook.svg?react'
import { motion } from 'framer-motion'

import './contactMe.css'

import React from 'react'

export default function ContactMe() {
    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.2 } }
    }
    return (
        <section
            className='dark gutter' id='contactme'
        >
            <motion.div
                initial='hidden'
                whileInView='visible'
                variants={container}
                className="contactMe"
            >
                <label className='title' htmlFor="contact_me_title">CONTACT ME</label>
                <div className="contents">
                    <label
                        className='h6'
                        htmlFor="send me a mail"

                    >
                        JUST SEND ME A <a href='mailto:praveendask97@gmail.com'>MAIL</a>
                    </label>
                    <div className="links h5">
                        <SnapingButton onClick={() => window.open('https://github.com/Praveen-das')} className='icon_button'>
                            <GithubLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton onClick={() => window.open('https://www.linkedin.com/in/praveen-das-625631136/')} className='icon_button'>
                            <LinkedInLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton onClick={() => window.open('https://www.instagram.com/_praveendas_/')} className='icon_button'>
                            <InstagramLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton onClick={() => window.open('https://www.facebook.com/praveen.das.94651/')} className='icon_button'>
                            <FacebookLogo width={25} height={25} />
                        </SnapingButton>
                    </div>
                    <div className='personal_details h5'>
                        <label htmlFor="Email">Email: praveendask97@gmail.com</label>
                        <label htmlFor="Phone">Phone: +918848990353</label>
                        <a className='resume' href='../../assets/icons/facebook.svg' download htmlFor="Download Resume">Download Resume</a>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
