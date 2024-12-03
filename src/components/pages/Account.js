import React from "react";
import { useNavigate } from "react-router-dom";

export default function Account () {
    const navigate = useNavigate();
    const routeLogin = () => navigate('/auth', { replace: false });

        return (
            <div>
                <h1>account</h1>
            </div>
        )
}
