import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpWideShort, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useGetUserMetadata } from "../../hooks/useGetUserMetedata";
import { useGetOnlineStatistics } from "../../hooks/useGetOnlineStatistics";
import { useGetCommunityPosts } from "../../hooks/useGetCommunityPosts";
import { useGetMOCs } from "../../hooks/useGetCommunityMOCs";
import "../styles/community.css"

import blankProfileImage from "../../assets/icons/usericon.svg"
import pieceIcon from "../../assets/icons/1x1-grey.svg";
import pinBlue from "../../assets/icons/pin-blue.svg";
import pinGreen from "../../assets/icons/pin-green.svg";
import pinRed from "../../assets/icons/pin-red.svg";
import pinYellow from "../../assets/icons/pin-yellow.svg";


export default function Community () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    const routeAdd = () => navigate('/addCommunityPost', { replace: false });

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);

    // state variables
    const [inStatsTab, setInStatsTab] = useState(true);
    const [inPostTab, setInPostTab] = useState(false);
    const [inMOCTab, setInMOCTab] = useState(false);

    // hook data

    const { 
        tier, 
        loadingUser, 
        error 
    } = useGetUserMetadata();

    const {
        fetchOnlineStats,
        isLoadingComStats,
        totalUsers,
        totalTier3Users,
        firstSet,
        lastSet,
        totalSets,
        totalMOCs,
        totalMissingPieces,
        popTheme,
        popThemeAmount,
        totalGlobalSets,
        mostSetsImgUrl,
        mostSetsUsername,
        mostSetsNumber,
        popSetImgUrl,
        popSetName,
        popSetNum,
        popSetAmount
    } = useGetOnlineStatistics();

    const {
        getCommunityPosts,
        isLoadingComPosts,
        comPosts
    } = useGetCommunityPosts();

    const {
        fetchMOCs,
        isLoadingComMOCs,
        comMOCs
    } = useGetMOCs();

    // call fetch stats to get all stat variables populated on mount
    useEffect(() => {
        if (!fetchCalled.current && totalSets === 0) {
            fetchOnlineStats();
            fetchCalled.current = true;
        }
    }, [fetchOnlineStats, getCommunityPosts, totalSets]);

    const handleVoiceClick = () => {
        setInStatsTab(false);
        setInMOCTab(false);
        setInPostTab(true);

        if (comPosts.length === 0) {
            getCommunityPosts();
        }
    }

    const handleStatsClick = () => {
        setInPostTab(false);
        setInMOCTab(false);
        setInStatsTab(true);

        // should never get here since the 
        if (totalSets === 0) {
            fetchOnlineStats();
        }
    }

    const handleMOCsClick = () => {
        setInPostTab(false);
        setInStatsTab(false);
        setInMOCTab(true);

        if (comMOCs.length === 0) {
            fetchMOCs();
        }
    }

    return (
        <div className="com-wrapper">
            <div className="com-title-bar">
                <h1>spacer</h1>
                <h1>bar goes here</h1>
                <button 
                    onClick={handleVoiceClick} 
                    disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                >
                    Community Voice
                </button>
                <button 
                    onClick={handleStatsClick}
                    disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                >
                    Global Stats
                </button>
                <button 
                    onClick={handleMOCsClick} 
                    disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                >
                    Newest MOCs
                    </button>
            </div>
            { (loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs) 
                ?
                (
                    <div>
                        <h1>loading</h1>
                    </div>
                )
                :
                (
                <>
                    { inPostTab && 
                        <div>
                            { comPosts.map(post => (
                                <div key={post.id} className="com-posts-wrapper">
                                    <div className="com-post-top-wrapper">
                                        <img src={post.userImg || blankProfileImage} alt="Profile Pic" className="com-post-img" />
                                        <h3 className="com-posts-username">{post.username}</h3>
                                    </div>
                                    <h4 className="com-posts-text">{post.content}</h4>
                                </div>
                            ))}
                            { tier >= 1 && <button onClick={routeAdd}>Add a Post</button> }
                        </div>
                    }
                    { inStatsTab && 
                        <div>
                            <div className="com-stats-card-small">
                                <div className="stats-pin-icon-wrapper">
                                    <img src={pinGreen} alt="LEGO Piece" className="stats-pin-icon"/>
                                </div>
                                <h2 className="com-stats-card-small-title">Most Sets Logged</h2>
                                <div className="com-stats-card-small-img-wrapper">
                                    <img src={mostSetsImgUrl || blankProfileImage} alt="Profile Pic" className="com-stats-card-small-img" />
                                </div>
                                <h3 className="com-stats-card-text">{mostSetsUsername}</h3>
                                <h3 className="com-stats-card-text">{mostSetsNumber} sets</h3>
                            </div>
                            <div className="com-stats-card">
                                <div className="com-stats-pin-wrapper">
                                    <div className="stats-pin-icon-wrapper">
                                        <img src={pinRed} alt="LEGO Piece" className="stats-pin-icon"/>
                                    </div>
                                    <div className="stats-pin-icon-wrapper">
                                        <img src={pinBlue} alt="LEGO Piece" className="stats-pin-icon"/>
                                    </div>
                                </div>
                                <h3 className="com-stats-card-text">Total Users: {totalUsers}</h3>
                                <h3 className="com-stats-card-text">Brick Enthusiasts: {totalTier3Users}</h3>
                                <h3 className="com-stats-card-text">First Set Logged: {firstSet}</h3>
                                <h3 className="com-stats-card-text">Last Set Logged: {lastSet}</h3>
                                <h3 className="com-stats-card-text">Sets Logged: {totalSets}</h3>
                                <h3 className="com-stats-card-text">MOCs Logged: {totalMOCs}</h3>
                                <h3 className="com-stats-card-text">Minifigures Logged: n/a</h3>
                                <h3 className="com-stats-card-text">Missing Pieces Logged: {totalMissingPieces}</h3>
                                <h3 className="com-stats-card-text">Most Pupular Theme: {popTheme} ({popThemeAmount})</h3>
                                <h3 className="com-stats-card-text">Sets in Archive: {totalGlobalSets}</h3>

                            </div>
                            <div className="com-stats-card-small">
                                <div className="stats-pin-icon-wrapper">
                                    <img src={pinYellow} alt="LEGO Piece" className="stats-pin-icon"/>
                                </div>
                                <h2 className="com-stats-card-small-title">Most Logged Set</h2>
                                <div className="com-stats-card-small-img-wrapper">
                                    <img src={popSetImgUrl} alt="Most Logged Set" className="com-stats-card-small-img" />
                                </div>
                                <h3 className="com-stats-card-small-text">{popSetName}</h3>
                                <h3 className="com-stats-card-small-text">{popSetAmount} logs</h3>
                            </div>
                        </div>
                    }
                    { inMOCTab && 
                        <div>
                            <h1>in mocs</h1>
                            { comMOCs.map(MOC => (
                                <div key={MOC.id} className="com-mocs-wrapper">
                                    <div className="com-post-top-wrapper">
                                        <img src={MOC.userImg || blankProfileImage} alt="Profile Pic" className="com-post-img" />
                                        <h3 className="com-posts-username">{MOC.username}</h3>
                                    </div>
                                    <img 
                                        src={MOC.img_url} 
                                        alt="set display" 
                                        className="sets-img" 
                                        onError={(e) => {
                                            e.target.style.display = "none"; // Hide the failed image
                                            const parent = e.target.parentNode; // Access the parent node
                                            const fallback = document.createElement("div"); // Create a fallback element
                                            fallback.className = "sets-no-image-message";
                                            fallback.innerText = "No image available";
                                            parent.appendChild(fallback); // Append fallback to the wrapper
                                        }}
                                    />
                                    <div className="sets-set-content-wrapper">
                                        <hr className="sets-divider" />
                                        <div className="sets-set-text-wrapper">
                                            <div className="us-set-text-icon-group">
                                                <div className="us-piece-icon-wrapper">
                                                    <img src={pieceIcon} alt="LEGO Piece" className="us-piece-icon"/>
                                                </div>
                                                <p className="us-set-text">{MOC.num_parts}</p>
                                            </div>
                                            <div className="us-set-text-icon-group">
                                                <FontAwesomeIcon icon={faCalendarDays} className="us-cal-icon" size="sm"/>
                                                <p className="us-set-text">{MOC.year}</p>
                                            </div>
                                            { MOC.missing_parts === 0 
                                                ?
                                                <div>
                                                    <p>complete!</p>
                                                </div>
                                                :
                                                <div>
                                                    <p>missing {MOC.missing_parts} pieces</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="sets-set-title-wrapper">
                                        <h2 className="sets-set-title">{MOC.name}</h2>
                                    </div>

                                </div>
                            ))}
                        </div>
                    }
                </>
                )
            }
        </div>
    );
}
