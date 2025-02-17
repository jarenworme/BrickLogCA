import { useRoutes, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About";
import Account from "../pages/Account";
import AddCustomPiece from "../pages/AddCustomPiece";
import AddCustomSet from "../pages/AddCustomSet";
import Auth from "../pages/Auth";
import BrowsePieces from "../pages/BrowsePieces";
import BrowseSets from "../pages/BrowseSets";
import ChangePassword from "../pages/ChangePassword";
import ChangePlan from "../pages/ChangePlan";
import EditPiece from "../pages/EditPiece";
import EditProfile from "../pages/EditProfile";
import EditSet from "../pages/EditSet";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import OnlineStats from "../pages/OnlineStats";
import Payments from "../pages/Payments";
import SetDetails from "../pages/SetDetails";
import Stats from "../pages/Stats";
import UserPieces from "../pages/UserPieces";
import UserSets from "../pages/UserSets";


export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '/', element: <LandingPage /> },
                { path: '/about', element: <About /> },
                { path: '/account', element: (<ProtectedRoute><Account /></ProtectedRoute>) },
                { path: '/addCustomPiece/:setID', element: (<ProtectedRoute><AddCustomPiece /></ProtectedRoute>) },
                { path: '/addCustomSet', element: (<ProtectedRoute><AddCustomSet /></ProtectedRoute>) },
                { path: '/auth/:register', element: <Auth />},
                { path: '/browsePieces', element: (<ProtectedRoute><BrowsePieces /></ProtectedRoute>) },
                { path: '/browseSets', element: (<ProtectedRoute><BrowseSets /></ProtectedRoute>) },
                { path: '/changePassword', element: (<ProtectedRoute><ChangePassword /></ProtectedRoute>) },
                { path: '/changePlan', element: (<ProtectedRoute><ChangePlan /></ProtectedRoute>) },
                { path: '/editPiece', element: (<ProtectedRoute><EditPiece /></ProtectedRoute>) },
                { path: '/editProfile', element: (<ProtectedRoute><EditProfile /></ProtectedRoute>) },
                { path: '/editSet', element: (<ProtectedRoute><EditSet /></ProtectedRoute>) } ,
                { path: '/forgotPassword', element: <ForgotPassword /> },
                { path: '/home', element: (<ProtectedRoute><Home /></ProtectedRoute>) },
                { path: '/onlineStats', element: (<ProtectedRoute><OnlineStats /></ProtectedRoute>) },
                { path: '/phases', element: <Payments /> },
                { path: '/setDetails/:setID', element: (<ProtectedRoute><SetDetails /></ProtectedRoute>) },
                { path: '/stats', element: (<ProtectedRoute><Stats /></ProtectedRoute>) },
                { path: '/userPieces', element: (<ProtectedRoute><UserPieces /></ProtectedRoute>) },
                { path: '/userSets', element: (<ProtectedRoute><UserSets /></ProtectedRoute>) },
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" replace /> }, // Redirect to 404
            ]
        },
    ]);
}
