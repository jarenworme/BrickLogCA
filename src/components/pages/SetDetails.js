import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useFetchSet } from "../../hooks/useFetchSet";
import { useFetchSetPieces } from "../../hooks/useFetchSetPieces";
import { useChangePieceQuantity } from "../../hooks/useChangePieceQuantity";
import { useDeletePiece } from "../../hooks/useDeletePiece";
import '../styles/set-details.css';


export default function SetDetails () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    const navigateUserSets = () => navigate('/userSets', { replace: false });
    const navigateEditSet = () => navigate(`/editSet/${setID}`, { replace: false });
    const navigateAddPiece = () => navigate(`/addCustomPiece/${setID}`, { replace: false });
    
    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);        

    const { setID } = useParams();

    const { set, loading, error, isMissingPieces, fetchSet } = useFetchSet();

    const { pieces, loadingPieces, fetchPieces } = useFetchSetPieces();

    const { changePieceQuantity } = useChangePieceQuantity();

    const { deletePiece } = useDeletePiece();

    useEffect(() => {
        if (!fetchCalled.current && pieces.length === 0) {
            fetchSet(setID);
            fetchPieces(setID);
            fetchCalled.current = true;
        }
    }, [fetchPieces, pieces.length]);

    useEffect(() => {
        fetchSet(setID);
    }, [pieces]);

    const handleChangePieceQuantity = (pieceID, direction) => {
        changePieceQuantity(setID, pieceID, direction);
        fetchPieces(setID);
    }

    const handleDeletePiece = (pieceID, quantity) => {
        deletePiece(setID, pieceID, quantity);
        fetchPieces(setID);
    }

    // loading screen while it calculates subscription tier
    if (loading || loadingPieces) return <div className="loading-full-screen"><div className="loading-img" /></div>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!set) return <p>No set found.</p>;

    return (
        <div className="sd-wrapper">
            <div className="sd-set-card">
                <div className="sd-img-wrapper">
                    <img 
                        src={set.img_url} 
                        alt="set display" 
                        className="sd-img" 
                        onError={(e) => {
                        e.target.style.display = "none"; // Hide the failed image
                        const parent = e.target.parentNode; // Access the parent node
                        const fallback = document.createElement("div"); // Create a fallback element
                        fallback.className = "sd-no-image-message";
                        fallback.innerText = "No image available";
                        parent.appendChild(fallback); // Append fallback to the wrapper
                        }}
                    />
                </div>
                <div className="sd-set-content-wrapper">
                    <h2 className="sd-subtitle">LEGO® {set.name}</h2>
                    <p className="sd-text">{set.theme_id}</p>
                    <ul className="sd-set-info-wrapper">
                        <li className="sd-li">{set.theme_id === "MOC" ? "MOC" : "Set"} Number: {set.set_num}</li>
                        <li className="sd-li">Year Released: {set.year}</li>
                        <li className="sd-li">Number of Parts: {set.num_parts - set.missing_parts}/{set.num_parts}</li>
                    </ul>
                    {set.theme_id === "MOC" && <button className="sd-btn" onClick={navigateEditSet}>Edit Set</button>}
                </div>
            </div>
            <div className="sd-piece-card">
                {isMissingPieces && <h2 className="sd-piece-card-title">Missing Pieces</h2>}
                <ul className="sd-piece-ul">
                    {pieces.map(piece => (
                        <li key={piece.id} className="sd-piece-li">
                            <div className="sd-piece-content">
                                <p className="sd-piece-text">{piece.color} {piece.name} ({piece.quantity})</p>
                                <div className="sd-icon-wrapper">
                                    <FontAwesomeIcon 
                                        icon={faCirclePlus} 
                                        className={`sd-icon ${(set.num_parts - set.missing_parts) <= 1 ? "sd-disabled-icon" : ""}`} 
                                        size="xl" 
                                        onClick={(set.num_parts - set.missing_parts) > 1 ? () => handleChangePieceQuantity(piece.id, "up") : undefined} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={faCircleMinus} 
                                        className={`sd-icon ${piece.quantity <= 1 ? "sd-disabled-icon" : ""}`} 
                                        size="xl" 
                                        onClick={piece.quantity > 1 ? () => handleChangePieceQuantity(piece.id, "down") : undefined} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={faTrashCan} 
                                        className="sd-icon sd-icon-trash" 
                                        size="xl" 
                                        onClick={() => handleDeletePiece(piece.id, piece.quantity)} 
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="sd-btn" onClick={navigateAddPiece} disabled={(set.num_parts - set.missing_parts) <= 1}>
                    Add a Missing Piece
                </button>
            </div>  
            <div className="sd-back-btn-wrapper">       
                <button className="sd-back-btn" onClick={navigateUserSets}>Back</button>
            </div>   
        </div>
    );
}
