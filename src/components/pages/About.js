import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import '../styles/landing-page.css';

import logo from "../../assets/logos/logo.png";
import youngpic from "../../assets/images/youngpic.JPG";
import uni from "../../assets/images/uni.jpg";
import statsmoc from "../../assets/images/stats-moc-full.JPEG";
import icons from "../../assets/images/figma-icons.png"


export default function About () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    // routing functions 
    const navigateAboutUs = () => navigate('/about', { replace: false });
    const navigateAuth = () => navigate('/auth/2', { replace: false });
    const navigateLandingPage = () => navigate('/', { replace: false });
    const navigatePayments = () => navigate('/payments', { replace: false });

    return (
        <div className="lp-wrapper">
            <div className={"lp-nav-wrapper lp-scrolled"}>
                <button className="lp-nav-left" onClick={navigateLandingPage}>
                    <img src={logo} alt="logo" className="lp-nav-logo" />
                </button>
                <div className="lp-nav-right">
                    <button className="lp-nav-btn" onClick={navigateLandingPage}>Info</button>
                    <button className="lp-nav-btn" onClick={navigatePayments}>Get Started</button>
                    <button className="lp-nav-btn-primary" onClick={navigateAuth}>Log In</button>
                </div>
            </div>
            <div className="about-block1">
                <h1 className="about-block1-title">About Us - The BrickLogCA Journey</h1>
            </div>
            <div className="lp-block-2">
                <div className="lp-block2-content-wrapper">
                    <h2 className="lp-block2-title-about">The Inspiration Behind It</h2>
                    <p className="lp-block2-text-about">
                        I'm Jaren, the creator of BrickLogCA, and this is me playing with one of the many LEGO® sets that just became 
                        spare parts in a box over the years. After an entire summer of rebuilding all of my childhood LEGO® sets in 2023,
                        I wanted a platform where I could track all of my sets in one place, know which were missing pieces and see 
                        all of the cool stats like my total piece count in one place. 
                    </p>
                </div>
                <div className="lp-block2-img-wrapper">
                    <img src={youngpic} alt="LEGO Boxes" className="lp-block2-img" />
                </div>
            </div>
            <div className="lp-block-2 lp-reverse-display">
                <div className="lp-block2-content-wrapper">
                    <h2 className="lp-block2-title-about right-align">Bringing the Vision to Life</h2>
                    <p className="lp-block2-text-about right-align">
                        After my final semester of university, I wanted to dig my teeth into the world of computer science, and I 
                        figured there was no better way than to make this dream project a reality. It took careful planning, several
                        setbacks and scrapped attempts, but challenges are meant to be overcome, and the feeling of seeing everything
                        come together has been incredibly rewarding.
                    </p>
                </div>
                <div className="lp-block2-img-wrapper">
                    <img src={uni} alt="LEGO Boxes" className="lp-block2-img" />
                </div>
            </div>
            <div className="lp-block-2">
                <div className="lp-block2-content-wrapper">
                    <h2 className="lp-block2-title-about">Learning Througout</h2>
                    <p className="lp-block2-text-about">
                    This journey has been more than just coding and development; it's been about embracing new skills and pushing 
                    creative boundaries. One of the most unexpected yet rewarding aspects of this project has been photography. 
                    Since I wanted the site to have a personalized touch, I took most of the images myself with the help of some 
                    friends who you will see around the site, learning how to capture LEGO® related stills in the best lighting and 
                    framing, and learning photo editing software to make them pop.
                    On top of that, I could build my own LEGO® sets like this one here and use my own creations on the site!
                    </p>
                </div>
                <div className="lp-block2-img-wrapper">
                    <img src={statsmoc} alt="LEGO Boxes" className="lp-block2-img" />
                </div>
            </div>
            <div className="lp-block-2 lp-reverse-display">
                <div className="lp-block2-content-wrapper">
                    <h2 className="lp-block2-title-about right-align">A Career Kickstarter</h2>
                    <p className="lp-block2-text-about right-align">
                        What better way to start my career in computer science than with a passion project that I hold so dear? It 
                        has given me so much practical experience with all aspects of software development, and using other 
                        enterprise-grade tools such as Figma where I designed all of my custom icons and Canva for my logos. 
                        When I finally land my first IT job, I am sure this project will have set me up to flourish.
                    </p>
                </div>
                <div className="lp-block2-img-wrapper">
                    <img src={icons} alt="LEGO Boxes" className="lp-block2-img" />
                </div>
            </div>
            <h3 className="about-thank-you">
                Thanks to Bella, Kaiya and Zion for the photoshoots, to my mom for the constant encouragement, and most of all to 
                each person who finds use of the platform!
            </h3>
            <div className="about-block3-wrapper">
                <button className="about-cta-secondary" onClick={navigateLandingPage}>Back</button>
                <button className="about-cta" onClick={navigatePayments}>Get Started</button>
            </div>
            <div className="lp-footer">
                <h3 className="lp-footer-text">
                    LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this site
                </h3>
                <div className="lp-footer-top-wrapper">
                    <button className="lp-footer-btn" onClick={navigateAboutUs}>About Us</button>
                    <div className="lp-footer-a-wrapper">
                        <a 
                            href="https://www.instagram.com/bricklogca/" 
                            className="lp-footer-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} className='lp-icon-footer' size='2x' />
                        </a>
                        <a 
                            href="https://medium.com/@jarenworme/how-i-made-my-first-full-stack-web-application-575c125d1d38" 
                            className="lp-footer-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faMedium} className='lp-icon-footer' size='2x' />
                        </a>
                    </div>
                </div>
                <h3 className="lp-footer-text">Thank you to Rebrickable for their LEGO® database</h3>
                <h3 className="lp-footer-copyright-text">version 1.3.1</h3>
                <h3 className="lp-footer-copyright-text">email us at bricklogca@gmail.com</h3>
                <h3 className="lp-footer-copyright-text">&copy; 2024 Jaren Worme</h3>
            </div>
        </div>
    );
}
