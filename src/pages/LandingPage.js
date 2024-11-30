import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../styles/landingPage.css'

export default function LandingPage () {

    const navigate = useNavigate();
    const routeLogin = () => navigate('/Login', { replace: false });

        return (
            <div>
                <h1 className="lpblock1">Hello World</h1>
                <button onClick={routeLogin}>login</button>
            </div>
        )
}
