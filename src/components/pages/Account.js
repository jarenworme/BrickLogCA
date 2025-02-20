import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useGetUserMetadata} from "../../hooks/useGetUserMetedata";
import "../styles/account.css";

import profilePic from "../../assets/icons/usericon.svg";


export default function Account () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateChangePassword = () => navigate('/changePassword', { replace: false });
    const navigateEditProfile = () => navigate('/editProfile', { replace: false });
    const navigateChangePlan = () => navigate('/changePlan', { replace: false });

    // user metadata from hook call
    const { tier, display, profilePicURL } = useGetUserMetadata();

    // function to signout a user
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
            <button className="account-btn" onClick={navigateEditProfile}>Edit Profile</button>
            <button className="account-btn" onClick={navigateChangePassword}>Change Password</button>
            <button className="account-btn" onClick={navigateChangePlan}>Edit Subscription</button>
            <button className="account-btn-secondary" onClick={signout}>Sign Out</button>
        </div>
    );
};
