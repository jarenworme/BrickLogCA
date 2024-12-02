import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    // Get auth state from local storage
    const auth = JSON.parse(localStorage.getItem("auth"));

    // renders children (wrapped component in routes) if user is authenticated and redirects to auth if not
    return auth?.isAuth ? children : <Navigate to="/auth" replace />;
}
