import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth, provider } from '../config/firebase-config';
import { signInWithPopup } from "firebase/auth";

export default function Auth () {

    const navigate = useNavigate();

    const signInGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };

        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate('/test', { replace: false })
    }



        return (
            <div>
                <div className="lpblock1">
                    <h1 className="title">auth</h1>
                    <h2>log in with google</h2>
                    <button onClick={signInGoogle}>login Google</button>
                </div>
            </div>
        )
}
