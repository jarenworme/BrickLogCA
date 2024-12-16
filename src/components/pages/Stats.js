import React, { useEffect, useRef } from "react";
import { useGetStatistics } from "../../hooks/useGetStatistics";


export default function Stats () {
    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);
    
    // extract all variables from get statistics hook
    const {
        userCreationDate,
        userTier,
        oldestSet,
        firstSet,
        firstSetDate,
        topPiecesSet,
        loading,
        fetchStats,
        totalSets,
        totalPieces,
        popTheme,
        popThemeAmount,
        popYear,
        popYearAmount
    } = useGetStatistics();

    // call fetch stats to get all stat variables populated on mount
    useEffect(() => {
        if (!fetchCalled.current && oldestSet.length === 0) {
            fetchStats();
            fetchCalled.current = true;
        }
    }, [fetchStats, oldestSet.length]);

    // only load loading component when loading is true
    if(loading) return <div className="loading-full-screen"><div className="loading-img" /></div>;


    return (
        <div className="stats-wrapper">
            <div className="stats-title-wrapper">
                <h1 className="stats-title">Your LEGO Statistics</h1>
            </div>
            <div className="stats-bottom-wrapper">
                <div className="stats-set-wrapper">
                    <div className="stats-set">
                        <h2 className="stats-set-title">Most Pieces</h2>
                        <img 
                                src={topPiecesSet.img_url} 
                                alt="set display" 
                                className="sets-img" 
                                onError={(e) => {
                                e.target.style.display = "none";
                                const parent = e.target.parentNode; 
                                const fallback = document.createElement("div");
                                fallback.className = "stats-no-image-message";
                                fallback.innerText = "No image available";
                                parent.appendChild(fallback);
                                }}
                            />
                            <h3 className="stats-set-name">{topPiecesSet.name}</h3>
                            <p className="stats-set-text">{topPiecesSet.num_parts}</p>
                    </div>
                    <div className="stats-set">
                        <h2 className="stats-set-title">First Added</h2>
                        <img 
                                src={firstSet.img_url} 
                                alt="set display" 
                                className="sets-img" 
                                onError={(e) => {
                                e.target.style.display = "none";
                                const parent = e.target.parentNode;
                                const fallback = document.createElement("div");
                                fallback.className = "stats-no-image-message";
                                fallback.innerText = "No image available";
                                parent.appendChild(fallback);
                                }}
                            />
                            <h3 className="stats-set-name">{firstSet.name}</h3>
                            <p className="stats-set-text">{firstSetDate}</p>
                    </div>
                    <div className="stats-set">
                        <h2 className="stats-set-title">Oldest Set</h2>
                        <img 
                                src={oldestSet.img_url} 
                                alt="set display" 
                                className="sets-img" 
                                onError={(e) => {
                                e.target.style.display = "none";
                                const parent = e.target.parentNode;
                                const fallback = document.createElement("div");
                                fallback.className = "stats-no-image-message";
                                fallback.innerText = "No image available";
                                parent.appendChild(fallback);
                                }}
                            />
                            <h3 className="stats-set-name">{oldestSet.name}</h3>
                            <p className="stats-set-text">{oldestSet.year}</p>
                    </div>
                    <div className="stats-set">
                        <h2 className="stats-set-title">Oldest Minifigure</h2>
                            <p className="stats-set-text">n/a</p>
                    </div>
                </div>
                <div className="stats-content-wrapper">
                    <h2 className="stats-content-title">Account Created On: {userCreationDate}</h2>
                    <h2 className="stats-content-title">Current Tier: {userTier}</h2>
                    <h2 className="stats-content-title">Total Sets Logged: {totalSets}</h2>
                    <h2 className="stats-content-title">Total Pieces: {totalPieces}</h2>
                    <h2 className="stats-content-title">Total Missing Pieces: n/a</h2>
                    <h2 className="stats-content-title">Total Minifigures: n/a</h2>
                    <h2 className="stats-content-title">Most Popular Theme: {popTheme} ({popThemeAmount})</h2>
                    <button className="stats-content-btn">View Pie Chart</button>
                    <h2 className="stats-content-title">Most Popular Year: {popYear} ({popYearAmount})</h2>
                    <button className="stats-content-btn">View Pie Chart</button>
                </div>
            </div>
        </div>
    );
}
