import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../styles/landing-page.css';

export default function LandingPage () {

    const navigate = useNavigate();
    const routeLogin = () => navigate('/auth', { replace: false });

        return (
            <div>
                <div className="lpblock1">
                    <h1 className="title">Hello World</h1>
                    <button onClick={routeLogin}>login</button>
                </div>
                <div className="lpblock2">
                    <h1 className="title">Hello World</h1>
                    <button onClick={routeLogin}>login</button>
                </div>
            </div>
        )
}
