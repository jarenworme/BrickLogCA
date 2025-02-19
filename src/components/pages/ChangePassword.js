import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../hooks/useChangePassword";
import "../styles/account.css";


export default function ChangePassword() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const routeAccount = () => navigate('/account', { replace: false });

    // state variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // hook data
    const { changePassword } = useChangePassword();

    // function to handle password change logic
    const handlePasswordChange = () => {
        const hasNumber = /\d/;
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        if (!hasNumber.test(newPassword)) {
            alert ("Password must include at least one number.");
            return;
        }
        changePassword(currentPassword, newPassword);
        setCurrentPassword(""); // Clear input fields
        setNewPassword("");
    };

    return (
        <div className="account-wrapper">
            <h1 className="account-title">Change Password</h1>
            <input
                className="account-text-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
            />
            <input
                className="account-text-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button className="account-btn-secondary" onClick={handlePasswordChange}>Update Password</button>
            <button className="account-btn" onClick={routeAccount}>Back</button>
        </div>
    );
}
