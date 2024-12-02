import React from "react";
import { useNavigate } from "react-router-dom";
import image404 from "../../assets/lego-404.jpeg";
import '../styles/not-found-page.css'


export default function NotFoundPage() {
    // set up varaibles to navigate back to the landing page
    const navigate = useNavigate();
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
