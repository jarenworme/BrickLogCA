import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/not-found-page.css'

import image404 from "../../assets/images/lego-404.jpeg";


export default function NotFoundPage() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateLandingPage = () => navigate('/', { replace: false });

    return (
        <div className="p404-wrapper">
            <div className="p404-image-wrapper">
                <img src={image404} alt="404 error" className="p404-image"  />
            </div>
            <p className="p404-text">The page you're looking for doesn't exist.</p>
            <button className="p404-button" onClick={navigateLandingPage}>Return to LEGOLog</button>
        </div>
    );
}
