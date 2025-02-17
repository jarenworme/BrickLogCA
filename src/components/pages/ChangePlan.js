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
                tier, shoot us an email at jarenworme@gmail.com and we'll upgrade you for free!
            </h1>
            <button className="account-btn" onClick={routeBack}>Back</button>
        </div>
    )
}
