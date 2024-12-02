import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  const navigate = useNavigate();
  const navigateLandingPage = () => navigate('/', { replace: false });

  // State for email/password login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Google login
  const signInGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/test", { replace: false });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Email/password login
  const signInEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authInfo = {
        userID: userCredential.user.uid,
        name: userCredential.user.email,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/test", { replace: false });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Email/password registration
  const registerWithEmailPassword = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authInfo = {
        userID: userCredential.user.uid,
        name: userCredential.user.email,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/test", { replace: false });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="lpblock1">
        <h1 className="title">auth</h1>

        {/* Google login */}
        <h2>Log in with Google</h2>
        <button onClick={signInGoogle}>Login with Google</button>

        {/* Email/password login */}
        <h2>{isRegistering ? "Register" : "Log in"} with Email</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={isRegistering ? registerWithEmailPassword : signInEmailPassword}>
          {isRegistering ? "Register" : "Login"}
        </button>

        {/* Toggle between login and registration */}
        <p>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Log in" : "Register"}
          </button>
        </p>
      </div>
      <h1 className="title">auth</h1>
      <h1 className="title">auth</h1>
      <h1 className="title">auth</h1>
      <button className="p404-button" onClick={navigateLandingPage}>Return to LEGOLog</button>

    </div>
  );
}
