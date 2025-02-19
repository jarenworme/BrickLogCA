import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import '../styles/landing-page.css';

import logo from "../../assets/logos/logo.png";


export default function Payments () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions 
    const navigateAboutUs = () => navigate('/about', { replace: false });
    const navigateAuth = () => navigate('/auth/2', { replace: false });
    const navigateAuthRegister = () => navigate('/auth/1', { replace: false });
    const navigateLandingPage = () => navigate('/', { replace: false });


    return (
        <div className="payments-wrapper">
            <div className="lp-nav-wrapper lp-scrolled">
                <button className="lp-nav-left" onClick={navigateLandingPage}>
                    <img src={logo} alt="logo" className="lp-nav-logo" />
                </button>
                <div className="lp-nav-right">
                    <button className="lp-nav-btn" onClick={navigateAboutUs}>About Us</button>
                    <button className="lp-nav-btn" onClick={navigateLandingPage}>Info</button>
                    <button className="lp-nav-btn-primary" onClick={navigateAuth}>Log In</button>
                </div>
            </div>
            <div className="lp-block-3">
                <div className="lp-tier-card">
                    <h3 className="lp-tier-title">Brick Starter</h3>
                    <p className="lp-tier-subtitle">Everything you need to get started</p>
                    <div className="lp-tier-span-wrapper">
                        <span className="lp-tier-span-large">Free</span>
                    </div>
                    <button className="lp-tier-btn lp-tier-btn-active" onClick={navigateAuthRegister}>Get Started</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Log Up To 15 Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Wishlist</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Custom Profile Picture</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Custom Community Posts</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
                <div className="lp-tier-card">
                    <h3 className="lp-tier-title">Avid Collector</h3>
                    <p className="lp-tier-subtitle">Level up with additional features.</p>
                    <div className="lp-tier-span-wrapper">
                        <span className="lp-tier-span-small">US$ </span>
                        <span className="lp-tier-span-large">1.99</span>
                        <span className="lp-tier-span-small">/mo*</span>
                    </div>
                    <button className="lp-tier-btn">Coming Soon</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Log Up To 30 Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Wishlist</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Custom Profile Picture</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Custom Community Posts</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' />
                        <p className="lp-tier-text lp-greyed">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
                <div className="lp-tier-card">
                    <h3 className="lp-tier-title">Brick Enthusiast</h3>
                    <p className="lp-tier-subtitle">The Ultimate experience.</p>
                    <div className="lp-tier-span-wrapper">
                        <span className="lp-tier-span-small">US$ </span>
                        <span className="lp-tier-span-large">4.99</span>
                        <span className="lp-tier-span-small">/mo*</span>
                    </div>
                    <button className="lp-tier-btn">Coming Soon</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Log Unlimited Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Wishlist</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Custom Profile Picture</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Custom Community Posts</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' />
                        <p className="lp-tier-text">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
                <h4 className="lp-block3-subtext">
                    * please note that we do not and will not accept payments. These prices are for resume project display purposes 
                    only and BrickLogCA is completely free to use. If you reach a maximum number of sets, email us and we will upgrade 
                    your plan.
                </h4>
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
                <h3 className="lp-footer-copyright-text">&copy; 2024 Jaren Worme</h3>
            </div>
        </div>
    );
}
