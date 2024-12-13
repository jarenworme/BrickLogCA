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
                    <button className="lp-tier-btn lp-tier-btn-active" onClick={navigateAuthRegister}>Choose Plan</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Log Up To 15 Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Minifigure Log</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Custom Picture Uploads</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
                <div className="lp-tier-card">
                    <h3 className="lp-tier-title">Avid Collector</h3>
                    <p className="lp-tier-subtitle">Level up with additional features.</p>
                    <div className="lp-tier-span-wrapper">
                        <span className="lp-tier-span-small">US$ </span>
                        <span className="lp-tier-span-large">1.99</span>
                        <span className="lp-tier-span-small">/mo</span>
                    </div>
                    <button className="lp-tier-btn">Coming Soon</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Log Up To 30 Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Minifigure Log</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Custom Picture Uploads</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faMinus} className='lp-minus' size='m' />
                        <p className="lp-tier-text lp-greyed">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
                <div className="lp-tier-card">
                    <h3 className="lp-tier-title">LEGO Enthusiast</h3>
                    <p className="lp-tier-subtitle">The Ultimate LEGOlog experience.</p>
                    <div className="lp-tier-span-wrapper">
                        <span className="lp-tier-span-small">US$ </span>
                        <span className="lp-tier-span-large">7.99</span>
                        <span className="lp-tier-span-small">/mo</span>
                    </div>
                    <button className="lp-tier-btn">Coming Soon</button>
                    <hr className="lp-tier-divider" />
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='sm' />
                        <p className="lp-tier-text">Full Database Access</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Log Unlimited Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">View Your Statistics</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Unlimited Missing Pieces</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Log Custom Sets</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Community Tab</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Minifigure Log</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Custom Picture Uploads</p>
                    </div>
                    <div className="lp-tier-feature">
                        <FontAwesomeIcon icon={faCheck} className='lp-check' size='m' />
                        <p className="lp-tier-text">Personal Agent to Order Your Missing Pieces</p>
                    </div>
                </div>
            </div>
            <div className="lp-footer">
                <h3 className="lp-footer-text">
                    Legolog is redeveloping using a different backend framework. You can still create an account and view our home page
                     at the moment. Thank you for your patience!
                </h3>
                <div className="lp-footer-top-wrapper">
                    <button className="lp-footer-btn" onClick={navigateAboutUs} disabled={true} >About Us</button>
                    <div className="lp-footer-a-wrapper">
                        <a href="https://www.instagram.com/legologca/" className="lp-footer-a" 
                            target="_blank" rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} className='lp-icon-footer' size='2x' />
                        </a>
                        <a href="https://www.instagram.com/legologca/" className="lp-footer-a" 
                            target="_blank" rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faMedium} className='lp-icon-footer' size='2x' />
                        </a>
                    </div>
                </div>
                <h3 className="lp-footer-text">LEGOlog is in no way affiliated with the LEGO Group or any of its subsidiaries.</h3>
                <h3 className="lp-footer-copyright-text">&copy; 2024 Jaren Worme</h3>
            </div>
        </div>
    );
}
