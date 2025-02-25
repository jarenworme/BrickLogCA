import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useGetUserMetadata } from "../../hooks/useGetUserMetedata";
import { useGetOnlineStatistics } from "../../hooks/useGetOnlineStatistics";
import { useGetCommunityPosts } from "../../hooks/useGetCommunityPosts";
import { useGetMOCs } from "../../hooks/useGetCommunityMOCs";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useDeleteCommunityPost } from "../../hooks/useDeleteCommunityPost";
import "../styles/loading.css"
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
    
    // routing functions
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
        loadingUser
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

    const {
        userID
    } = useGetUserInfo();

    const {
        deletePost,
        loadingDelete
    } = useDeleteCommunityPost();

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

    const handleDeletePost = (postID) => {
        deletePost(postID);
        getCommunityPosts();
    }

    return (
        <div className="com-wrapper">
            <div className="com-tab-bar">
                <div className="com-tab-btn-wrapper">
                    <button 
                        className={inPostTab ? "com-tab-btn com-tab-active" : "com-tab-btn"}
                        onClick={handleVoiceClick} 
                        disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                    >
                        Community Voice
                    </button>
                    <hr className={inPostTab ? "com-tab-underline com-tab-underline-active" : "com-tab-underline"} />
                </div>
                <div className="com-tab-btn-wrapper">
                    <button 
                        className={inStatsTab ? "com-tab-btn com-tab-active" : "com-tab-btn"}
                        onClick={handleStatsClick}
                        disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                    >
                        Global Stats
                    </button>
                    <hr className={inStatsTab ? "com-tab-underline com-tab-underline-active" : "com-tab-underline"} />
                </div>
                <div className="com-tab-btn-wrapper">
                    <button 
                        className={inMOCTab ? "com-tab-btn com-tab-active" : "com-tab-btn"}
                        onClick={handleMOCsClick} 
                        disabled={loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs}
                    >
                        Newest MOCs
                    </button>
                    <hr className={inMOCTab ? "com-tab-underline com-tab-underline-active" : "com-tab-underline"} />
                </div>
            </div>
            { (loadingUser || isLoadingComStats || isLoadingComPosts || isLoadingComMOCs) 
                ?
                (
                    <div className="com-bottom-wrapper-row">
                        <div className="loading-community"><div className="loading-img" /></div>
                    </div>
                )
                :
                (
                <>
                    { inPostTab && 
                        <div className="com-bottom-wrapper-col">
                            { comPosts.map(post => (
                                <div key={post.id} className="com-post-wrapper">
                                    <div className="com-post-top-wrapper">
                                        <img src={post.userImg || blankProfileImage} alt="Profile Pic" className="com-post-img" />
                                        <h3 className="com-posts-username">{post.username}</h3>
                                    </div>
                                    <hr className="com-posts-divider" />
                                    <p className="com-posts-text">{post.content}</p>
                                    { post.userID === userID &&
                                        <div className="com-post-delete-wrapper">
                                            <FontAwesomeIcon 
                                                icon={faTrashCan} 
                                                onClick={() => {handleDeletePost(post.id)}} 
                                                className="com-trash-icon" 
                                                size="xl"
                                            />
                                        </div>
                                    }
                                </div>
                            ))}
                            { tier >= 1 && <button className="com-posts-btn" onClick={routeAdd}>Add a Post</button> }
                        </div>
                    }
                    { inStatsTab && 
                        <div className="com-bottom-wrapper-row">
                            <div className="com-stats-card-small">
                                <div className="com-pin-icon-wrapper">
                                    <img src={pinGreen} alt="LEGO Piece" className="com-pin-icon"/>
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
                                    <div className="com-pin-icon-wrapper">
                                        <img src={pinRed} alt="LEGO Piece" className="com-pin-icon"/>
                                    </div>
                                    <div className="com-pin-icon-wrapper">
                                        <img src={pinBlue} alt="LEGO Piece" className="com-pin-icon"/>
                                    </div>
                                </div>
                                <h3 className="com-stats-card-text">Total Users: {totalUsers}</h3>
                                <h3 className="com-stats-card-text">Brick Enthusiasts: {totalTier3Users}</h3>
                                <h3 className="com-stats-card-text">First Set Logged: {firstSet}</h3>
                                <h3 className="com-stats-card-text">Last Set Logged: {lastSet}</h3>
                                <h3 className="com-stats-card-text">Total Sets Logged: {totalSets}</h3>
                                <h3 className="com-stats-card-text">MOCs Logged: {totalMOCs}</h3>
                                <h3 className="com-stats-card-text">Minifigures Logged: n/a</h3>
                                <h3 className="com-stats-card-text">Missing Pieces Logged: {totalMissingPieces}</h3>
                                <h3 className="com-stats-card-text">Most Popular Theme: {popTheme} ({popThemeAmount})</h3>
                                <h3 className="com-stats-card-text">Sets in Archive: {totalGlobalSets}</h3>

                            </div>
                            <div className="com-stats-card-small">
                                <div className="com-pin-icon-wrapper">
                                    <img src={pinYellow} alt="LEGO Piece" className="com-pin-icon"/>
                                </div>
                                <h2 className="com-stats-card-small-title">Most Logged Set</h2>
                                <div className="com-stats-card-small-img-wrapper">
                                    <img src={popSetImgUrl} alt="Most Logged Set" className="com-stats-card-small-img" />
                                </div>
                                <h3 className="com-stats-card-text">#{popSetNum} {popSetName}</h3>
                                <h3 className="com-stats-card-text">{popSetAmount} logs</h3>
                            </div>
                        </div>
                    }
                    { inMOCTab && 
                        <div className="com-bottom-wrapper-moc">
                            { comMOCs.map(MOC => (
                                <div key={MOC.id} className="com-post-wrapper">
                                    <div className="com-post-top-wrapper">
                                        <img src={MOC.userImg || blankProfileImage} alt="Profile Pic" className="com-post-img" />
                                        <h3 className="com-posts-username">{MOC.username} - {MOC.name}</h3>
                                    </div>
                                    <hr className="com-posts-divider" />
                                    <div className="com-moc-img-wrapper">
                                        <img 
                                            src={MOC.img_url} 
                                            alt="set display" 
                                            className="com-moc-img" 
                                            onError={(e) => {
                                                e.target.style.display = "none"; // Hide the failed image
                                                const parent = e.target.parentNode; // Access the parent node
                                                const fallback = document.createElement("div"); // Create a fallback element
                                                fallback.className = "sets-no-image-message";
                                                fallback.innerText = "No image available";
                                                parent.appendChild(fallback); // Append fallback to the wrapper
                                            }}
                                        />
                                    </div>
                                    <div className="com-moc-content-wrapper">
                                        <hr className="com-posts-divider" />
                                        <div className="com-moc-text-wrapper">
                                            <div className="com-moc-text-icon-group">
                                                <div className="com-piece-icon-wrapper">
                                                    <img src={pieceIcon} alt="LEGO Piece" className="com-piece-icon"/>
                                                </div>
                                                <p className="com-moc-details-text">{MOC.num_parts}</p>
                                            </div>
                                            <div className="com-moc-text-icon-group">
                                                <FontAwesomeIcon icon={faCalendarDays} className="com-cal-icon" size="sm"/>
                                                <p className="com-moc-details-text">{MOC.year}</p>
                                            </div>
                                            { MOC.missing_parts === 0 
                                                ?
                                                <div>
                                                    <p className="com-moc-details-text">complete!</p>
                                                </div>
                                                :
                                                <div>
                                                    <p className="com-moc-details-text">missing {MOC.missing_parts} pieces</p>
                                                </div>
                                            }
                                        </div>
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
