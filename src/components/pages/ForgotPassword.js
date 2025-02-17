import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/auth.css"

export default function ForgotPassword () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    const routeAuth = () => navigate('/auth/2', { replace: false });

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            return;
        }

        setLoading(true);
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("A password reset email has been sent to your email address.");
        } catch (error) {
            setMessage("Error: " + error.message);
        }

        setLoading(false);
    };

    return (
        <div className="auth-wrapper">
            { message 
                ? 
                <div className="fp-card">
                    <h2 className="fp-title">Reset Your Password</h2>
                    <p className="fp-text">{message}</p>
                    <button className="fp-btn-back" onClick={routeAuth}>Back</button>
                </div>
                :
                <div className="fp-card">
                    <h2 className="fp-title">Reset Your Password</h2>
                    <input
                        className="fp-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="fp-btn" onClick={handleResetPassword} disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Email"}
                    </button>
                </div>
            }
        </div>
    );
};

