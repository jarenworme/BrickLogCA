import {useRoutes} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About";
import AddCustomPiece from "../pages/AddCustomPiece";
import AddCustomSet from "../pages/AddCustomSet";
import Auth from "../pages/Auth";
import BrowsePieces from "../pages/BrowsePieces";
import BrowseSets from "../pages/BrowseSets";
import EditPiece from "../pages/EditPiece";
import EditSet from "../pages/EditSet";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import OnlineStats from "../pages/OnlineStats";
import SetDetails from "../pages/SetDetails";
import Stats from "../pages/Stats";
import TestPage from "../pages/TestPage";
import UserPieces from "../pages/UserPieces";
import UserSets from "../pages/UserSets";


export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                {path: '/', element: <LandingPage />},
                {path: '/about', element: <About />},
                {path: '/addCustomPiece', element: (<ProtectedRoute><AddCustomPiece /></ProtectedRoute>)},
                {path: '/addCustomSet', element: (<ProtectedRoute><AddCustomSet /></ProtectedRoute>)},
                {path: '/auth', element: <Auth />},
                {path: '/browsePieces', element: (<ProtectedRoute><BrowsePieces /></ProtectedRoute>)},
                {path: '/browseSets', element: (<ProtectedRoute><BrowseSets /></ProtectedRoute>)},
                {path: '/editPiece', element: (<ProtectedRoute><EditPiece /></ProtectedRoute>)},
                {path: '/editSet', element: (<ProtectedRoute><EditSet /></ProtectedRoute>)},
                {path: '/home', element: (<ProtectedRoute><Home /></ProtectedRoute>)},
                {path: '/onlineStats', element: (<ProtectedRoute><OnlineStats /></ProtectedRoute>)},
                {path: '/setDetails', element: (<ProtectedRoute><SetDetails /></ProtectedRoute>)},
                {path: '/stats', element: (<ProtectedRoute><Stats /></ProtectedRoute>)},
                {path: '/test', element: (<ProtectedRoute><TestPage /></ProtectedRoute>)},
                {path: '/userPieces', element: (<ProtectedRoute><UserPieces /></ProtectedRoute>)},
                {path: '/userSets', element: (<ProtectedRoute><UserSets /></ProtectedRoute>)},
            ]
        },
    ]);
}
