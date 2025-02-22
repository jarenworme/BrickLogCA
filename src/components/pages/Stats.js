import React, { useEffect, useRef } from "react";
import { useGetStatistics } from "../../hooks/useGetStatistics";
import "../styles/stats.css"

import pinIcon from "../../assets/icons/pin.svg";
import pinBlue from "../../assets/icons/pin-blue.svg";
import pinGreen from "../../assets/icons/pin-green.svg";
import pinRed from "../../assets/icons/pin-red.svg";
import pinYellow from "../../assets/icons/pin-yellow.svg";


export default function Stats () {
    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);
    
    // extract all variables from get statistics hook
    const {
        userCreationDate,
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
        popYearAmount,
        numMOCs,
        numMissingPieces
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
            <div className="stats-set-wrapper">
                <div className="stats-set">
                    <div className="stats-pin-icon-wrapper">
                        <img src={pinRed} alt="LEGO Piece" className="stats-pin-icon"/>
                    </div>
                    <h2 className="stats-set-title">Most Pieces</h2>
                    <div className="stats-img-wrapper">
                        <img 
                            src={topPiecesSet.img_url} 
                            alt="set display" 
                            className="stats-img" 
                            onError={(e) => {
                            e.target.style.display = "none";
                            const parent = e.target.parentNode; 
                            const fallback = document.createElement("div");
                            fallback.className = "stats-no-image-message";
                            fallback.innerText = "No image available";
                            parent.appendChild(fallback);
                            }}
                        />
                    </div>
                    <h3 className="stats-set-name">{topPiecesSet.name}</h3>
                    <p className="stats-set-text">{topPiecesSet.num_parts} pieces</p>
                </div>
                <div className="stats-set">
                    <div className="stats-pin-icon-wrapper">
                        <img src={pinBlue} alt="LEGO Piece" className="stats-pin-icon"/>
                    </div>
                    <h2 className="stats-set-title">First Added</h2>
                    <div className="stats-img-wrapper">
                        <img 
                            src={firstSet.img_url} 
                            alt="set display" 
                            className="stats-img" 
                            onError={(e) => {
                            e.target.style.display = "none";
                            const parent = e.target.parentNode;
                            const fallback = document.createElement("div");
                            fallback.className = "stats-no-image-message";
                            fallback.innerText = "No image available";
                            parent.appendChild(fallback);
                            }}
                        />
                    </div>
                    <h3 className="stats-set-name">{firstSet.name}</h3>
                    <p className="stats-set-text">{firstSetDate}</p>
                </div>
                <div className="stats-set">
                    <div className="stats-pin-icon-wrapper">
                        <img src={pinGreen} alt="LEGO Piece" className="stats-pin-icon"/>
                    </div>
                    <h2 className="stats-set-title">Oldest Set</h2>
                    <div className="stats-img-wrapper">
                        <img 
                            src={oldestSet.img_url} 
                            alt="set display" 
                            className="stats-img" 
                            onError={(e) => {
                            e.target.style.display = "none";
                            const parent = e.target.parentNode;
                            const fallback = document.createElement("div");
                            fallback.className = "stats-no-image-message";
                            fallback.innerText = "No image available";
                            parent.appendChild(fallback);
                            }}
                        />
                    </div>
                    <h3 className="stats-set-name">{oldestSet.name}</h3>
                    <p className="stats-set-text">{oldestSet.year}</p>
                </div>
            </div>
            <div className="stats-content-wrapper">
                <div className="stats-title-wrapper">
                    <div className="stats-pin-icon-wrapper">
                        <img src={pinRed} alt="LEGO Piece" className="stats-pin-icon"/>
                    </div>
                    <h1 className="stats-title">Your LEGO Statistics</h1>
                    <div className="stats-pin-icon-wrapper">
                        <img src={pinYellow} alt="LEGO Piece" className="stats-pin-icon"/>
                    </div>
                </div>
                <h4 className="stats-content-text">Account Created On: {userCreationDate}</h4>
                <h4 className="stats-content-text">Total Sets Logged: {totalSets}</h4>
                <h4 className="stats-content-text">Total MOCS: {numMOCs}</h4>
                <h4 className="stats-content-text">Total Pieces: {totalPieces}</h4>
                <h4 className="stats-content-text">Total Missing Pieces: {numMissingPieces}</h4>
                <h4 className="stats-content-text">Total Minifigures: n/a</h4>
                <h4 className="stats-content-text">Most Popular Theme: {popTheme} ({popThemeAmount})</h4>
                <h4 className="stats-content-text">Most Popular Release Year: {popYear} ({popYearAmount})</h4>
            </div>
        </div>
    );
}
