import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import "../styles/account.css"

export default function Account () {
    const navigate = useNavigate();
    const routeHome = () => navigate('/home', { replace: false });

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
                <h1>account</h1>
                <button onClick={routeHome}>back</button>
                <button onClick={signout}>Sign Out</button>
            </div>
        )
}
