import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useGetUserSubscriptionTier } from "../../hooks/useGetUserSubscriptionTier";
import "../styles/account.css";

import profilePic from "../../assets/icons/usericon.svg";


export default function Account () {
    const navigate = useNavigate();
    const routeChangePassword = () => navigate('/changePassword', { replace: false });
    const routeEditProfile = () => navigate('/editProfile', { replace: false });
    const routeChangePlan = () => navigate('/changePlan', { replace: false });

    const { tier, display, profilePicURL } = useGetUserSubscriptionTier();

    const signout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate('/', { replace: false });
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="account-wrapper">
            <div className="account-profile-img-wrapper">
                <img src={profilePicURL || profilePic} alt="Profile" className="account-profile-img" />
            </div>
            <h2 className="account-text-xl">{display}</h2>
            <h3 className="account-text-large">tier {tier}</h3>
            <hr className="account-divider" />
            <button className="account-btn" onClick={routeEditProfile}>Edit Profile</button>
            <button className="account-btn" onClick={routeChangePassword}>Change Password</button>
            <button className="account-btn" onClick={routeChangePlan}>Edit Subscription</button>
            <button className="account-btn-secondary" onClick={signout}>Sign Out</button>
        </div>
    )
}
