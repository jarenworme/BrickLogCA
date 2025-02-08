import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPieces } from "../../hooks/useFetchPieces";
import "../styles/user-pieces.css"


export default function UserPieces () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);  

    const { pieces, loadingPieces, fetchPieces } = useFetchPieces();

    useEffect(() => {
        if (!fetchCalled.current && pieces.length === 0) {
            fetchPieces();
            fetchCalled.current = true;
        }
    }, [fetchPieces, pieces.length]);
    
    const navigateSets = () => navigate('/userSets', { replace: false });
    const navigateSetDetails = (ID) => navigate(`/setDetails/${ID}`, { replace: false });

    


    return (
        <div className="up-wrapper">
            <h1 className="up-title">Your Missing Pieces</h1>
            <h3 className="up-subtitle">to add a missing piece, view the set it belongs to</h3>
            <hr className="up-top-divider" />
            <div className="up-pieces-wrapper">
                {pieces.map(piece => (
                    <div key={piece.id} className="up-piece">
                        <div className="up-img-wrapper">
                            <img 
                                src={piece.set_image} 
                                alt="set display" 
                                className="up-img" 
                                onError={(e) => {
                                e.target.style.display = "none"; // Hide the failed image
                                const parent = e.target.parentNode; // Access the parent node
                                const fallback = document.createElement("div"); // Create a fallback element
                                fallback.className = "up-no-image-message";
                                fallback.innerText = "No image available";
                                parent.appendChild(fallback); // Append fallback to the wrapper
                                }}
                            />
                        </div>
                        <div className="up-piece-content-wrapper">
                            <hr className="up-divider" />
                        </div>
                        <div className="up-piece-title-wrapper">
                            <h2 className="up-piece-title">{piece.color} {piece.name} ({piece.quantity})</h2>
                        </div>
                        <div className="up-piece-bottom-wrapper">
                            <button className="up-piece-btn" onClick={() => navigateSetDetails(piece.setID)}>Go to Set</button>
                        </div>
                    </div>
                ))}
            </div>
            {pieces.length === 0 && <button className="up-no-piece-btn" onClick={navigateSets}>view your sets</button>}
        </div>
    );
}
