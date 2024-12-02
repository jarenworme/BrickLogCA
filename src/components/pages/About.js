import { useNavigate } from "react-router-dom";


export default function About () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    const routeHome = () => navigate('/', { replace: false });


    return (
        <div className="outer-container">
            <button onClick={routeHome}>Back</button>
        </div>
    );
}
