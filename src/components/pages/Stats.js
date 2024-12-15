import { useNavigate } from "react-router-dom";


export default function Stats () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    const routeHome = () => navigate('/', { replace: false });


    return (
        <div className="stats-wrapper">
            <div className="stats-title-wrapper">
                <h1 className="stats-title">Your LEGO Statistics</h1>
            </div>
            <div className="stats-set-wrapper"></div>
            <div className="stats-content-wrapper">
                <h2 className="stats-content-title"></h2>
            </div>
        </div>
    );
}
