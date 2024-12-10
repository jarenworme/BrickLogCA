import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "../styles/auth.css"


export default function Auth() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // input parameters for determining if to load register or login on mount
    const { register } = useParams();

    // state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // set isRegistered based on parameters
    useEffect(() => {
        if(register === "1"){
            setIsRegistering(true);
        }
    }, [register]);

    // validation for password to contain at least 8 characters and a number
    const validatePassword = (password) => {
        const hasNumber = /\d/;
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasNumber.test(password)) {
            return "Password must include at least one number.";
        }
        return null;
    };

    // Google login
    const signInGoogle = async () => {
        try {
            setError("");
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/home", { replace: false });
        } catch (err) {
            setError("Google sign-in failed. Please try again.");
            console.error(err.message);
        }
    };

    // login / register logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setError("");

            if (isRegistering) {
                const passwordError = validatePassword(password);
                if (passwordError) return setError(passwordError);
                if (password !== confirmPassword) return setError("Passwords do not match.");

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const authInfo = { userID: userCredential.user.uid, name: userCredential.user.email, isAuth: true };
                localStorage.setItem("auth", JSON.stringify(authInfo));
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const authInfo = { userID: userCredential.user.uid, name: userCredential.user.email, isAuth: true };
                localStorage.setItem("auth", JSON.stringify(authInfo));
            }

            navigate("/home", { replace: false });
        } catch (err) {
            setError(isRegistering ? "Registration failed. Please try again." : "Login failed. Please check your credentials.");
        }
    };

    // toggle between states to register or login
    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        setError("");
    }


    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-title-wrapper">
                    <h3 className="auth-title">Welcome to</h3>
                    <div className="auth-title-span-wrapper">
                        <span className="auth-span auth-l">L</span>
                        <span className="auth-span auth-e">E</span>
                        <span className="auth-span auth-g">G</span>
                        <span className="auth-span auth-o">O</span>
                        <span className="auth-span auth-log">log</span>
                        <span className="auth-span auth-r">&#174;</span>
                    </div>
                </div>
                <div className="auth-middle-divider" />
                <div className="auth-content-wrapper">
                    {error && <p className="auth-signin-error">{error}</p>} 
                    <button className="auth-google-btn" onClick={signInGoogle}>
                        Continue with Google
                    </button>
                    <div className="auth-spacer">
                        <hr className="auth-hr" />
                        <p className="auth-text">or</p>
                        <hr className="auth-hr" />
                    </div>
                    <h2 className="auth-subtitle">{isRegistering ? "Register" : "Sign in"} with Email</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-wrapper">
                            <input className="auth-input" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="auth-input-wrapper">
                            <input className="auth-input" type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='auth-eye' size='xl' onClick={() => setShowPassword(!showPassword)}/>
                        </div>
                        {isRegistering && (
                            <div className="auth-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="auth-input"
                                    required
                                />
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className='auth-eye' size='xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                            </div>
                        )}        
                        <button type="submit" className="auth-submit-btn">{isRegistering ? "Register" : "Login"}</button>
                        <button type="button" className="auth-toggle-register" onClick={toggleRegister}>or {isRegistering ? "sign in" : "register"} here</button>
                    </form>       
                </div>
            </div>
        </div>
    );
}
