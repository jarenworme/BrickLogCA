import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../styles/landing-page.css';

export default function LandingPage () {
    const navigate = useNavigate();
    const routeLogin = () => navigate('/auth', { replace: false });

        return (
            <div>
                <div className="lpblock1">
                    <h3 className="title">Legolog is redeveloping using a different backend framework. You can still create an account and view our home page at the moment. Thank you for your patience!</h3>
                    <button className="lp-cta" onClick={routeLogin}>sign in or register here</button>
                </div>
            </div>
        )
}
