import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTableList, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import "../styles/nav-bar.css"

import logo from "../../assets/logos/logo.png"
import bricks from "../../assets/icons/pieces.svg";


export default function NavBar () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    // navigation functions
    const navigateHome = () => navigate('/home', { replace: false });
    const navigateAccount = () => navigate('/account', { replace: false });
    const navigateUserPieces = () => navigate('/userPieces', { replace: false });
    const navigateUserSets = () => navigate('/userSets', { replace: false });
    


    return (
        <div className='nav-bar'>
            <div className='nav-left-wrapper'>
                <button className='nav-logo-wrapper' onClick={navigateHome}>
                    <img src={logo} alt='logo' className='nav-logo' />
                </button>
            </div>
            <div className='nav-right-wrapper'>
                <button className='nav-button' onClick={navigateUserPieces} disabled={true}>
                    <p className='nav-text'>Pieces</p>
                    <div className='nav-svg-wrapper'>
                        <img src={bricks} alt='LEGO Brick' className='nav-svg' />  
                    </div>                
                </button>
                <button className='nav-button' onClick={navigateUserSets} disabled={true}>
                    <p className='nav-text'>Sets</p>
                    <FontAwesomeIcon icon={faTableList} className='nav-icon-nested' size='2x' />
                </button>
                <FontAwesomeIcon icon={faHome} className='nav-icon nav-icon-home' size='2x' onClick={navigateHome} />
                <FontAwesomeIcon icon={faCircleUser} className='nav-icon' size='2x' onClick={navigateAccount} />
            </div>
        </div>
    );
}
