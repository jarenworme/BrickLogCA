import React from "react";
import { Navigate } from "react-router-dom";


// file to redirect a user trying to access a protected page without being logged in
export default function ProtectedRoute({ children }) {
    // Get auth state from local storage
    const auth = JSON.parse(localStorage.getItem("auth"));

    // renders children (wrapped component in routes) if user is authenticated and redirects to auth if not
    return auth?.isAuth ? children : <Navigate to="/auth" replace />;
}
