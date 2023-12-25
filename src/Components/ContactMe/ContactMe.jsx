import SnapingButton from '../../UIComponents/SnapingButton'
import GithubLogo from '../../assets/icons/github.svg?react'
import LinkedInLogo from '../../assets/icons/linkedin.svg?react'
import InstagramLogo from '../../assets/icons/instagram.svg?react'
import FacebookLogo from '../../assets/icons/facebook.svg?react'

import './contactMe.css'

import React from 'react'

export default function ContactMe() {
    return (
        <section className='dark' id='contactme'>
            <div className="contactMe">
                <label className='title' htmlFor="contact_me_title">CONTACT ME</label>
                <div className="contents">
                    <label
                        className='h6'
                        htmlFor="send me a mail"
                        
                    >
                        JUST SEND ME A <a href='mailto:praveendask97@gmail.com'>MAIL</a>
                    </label>
                    <div className="links h5">
                        <SnapingButton className='icon_button'>
                            <GithubLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton className='icon_button'>
                            <LinkedInLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton className='icon_button'>
                            <InstagramLogo width={25} height={25} />
                        </SnapingButton>
                        <SnapingButton className='icon_button'>
                            <FacebookLogo width={25} height={25} />
                        </SnapingButton>
                    </div>
                    <div className='personal_details h5'>
                        <label htmlFor="Email">Email: praveendask97@gmail.com</label>
                        <label htmlFor="Phone">Phone: +918848990353</label>
                        <a className='resume' href='../../assets/icons/facebook.svg' download htmlFor="Download Resume">Download Resume</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
