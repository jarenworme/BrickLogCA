import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";


export default function ChangePlan () {
    const navigate = useNavigate();
    const routeBack = () => navigate('/account', { replace: false });

    return (
        <div className="account-wrapper">
            <h1 className="account-change-plan-text">
                We are not offering paid services currently. If you are enjoying our platform and want to increase your subscription 
                tier, dm us on Instagram and we'll upgrade you for free!
            </h1>
            <a href="https://www.instagram.com/bricklogca/">bricklogca</a>
            <button className="account-btn" onClick={routeBack}>Back</button>
        </div>
    )
}
