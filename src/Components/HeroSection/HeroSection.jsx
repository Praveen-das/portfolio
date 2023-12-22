import React from 'react'
import './hero.css'
import Linkedin from '../../assets/icons/linkedin.svg?react'
import Facebook from '../../assets/icons/facebook.svg?react'
import Instagram from '../../assets/icons/instagram.svg?react'
import Github from '../../assets/icons/github.svg?react'
import Mail from '../../assets/icons/mail.svg?react'
import SnapingButton from '../../UIComponents/SnapingButton'

const links = {
    github: 'https://github.com/Praveen-das',
    linkedin: 'https://www.linkedin.com/in/praveen-das-625631136/',
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
    mail: 'mailto:praveendask97@gmail.com',
}

export default function HeroSection() {
    const handleSocialMediaLink = (item) => {
        window.open(links[item])
    }

    return (
        <section>
            <div className='hero_content'>
                <label className='hero_name' htmlFor="hero_name">PRAVEEN DAS</label>
                <div id='hero_desc' htmlFor="hero_desc">
                    build everything<br/>
                    on the web,<br/>
                    from how it looks<br/>
                    to how it works.
                </div>
                {/* <label className='what_i_do' htmlFor="hero_name">I code and design cool web stuffs.</label> */}
                {/* <p htmlFor="about">I am a passionate and versatile Full Stack Developer with a keen interest in crafting innovative solutions to complex problems. My journey in the world of technology began with a fascination for creating and shaping digital experiences. Over the years, I have honed my skills to become a proficient and resourceful developer.</p> */}
                {/* <div className='social'>
                    <SnapingButton className='icon_button' name='github' onClick={() => handleSocialMediaLink('github')}>
                        <Github height={20} width={20} />
                    </SnapingButton>
                    <SnapingButton className='icon_button' name='linkedin' onClick={() => handleSocialMediaLink('linkedin')}>
                        <Linkedin height={18} width={18} />
                    </SnapingButton>
                    <SnapingButton className='icon_button' name='mail' onClick={() => handleSocialMediaLink('mail')}>
                        <Mail height={22} width={22} />
                    </SnapingButton>
                </div> */}
            </div>
        </section>
    )
}
