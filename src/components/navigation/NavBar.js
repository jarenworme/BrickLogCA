import { useNavigate } from "react-router-dom";


export default function NavBar () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    const navigateHome = () => navigate('/', { replace: false });
    const navigateAccount = () => navigate('/account', { replace: false });
    const navigateBrowseSets = () => navigate('/browseSets', { replace: false });
    const navigateUserSets = () => navigate('/userSets', { replace: false });
    


    return (
        <div className="outer-container">
            <button onClick={navigateHome}>Back</button>
        </div>
    );
}
