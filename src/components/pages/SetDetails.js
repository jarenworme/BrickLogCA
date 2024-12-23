import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSet } from "../../hooks/useFetchSet";
import { useFetchSetPieces } from "../../hooks/useFetchSetPieces";
import { useChangePieceQuantity } from "../../hooks/useChangePieceQuantity";
import { useDeletePiece } from "../../hooks/useDeletePiece";
// import { useEditSet } from "../../hooks/useEditSet";
import '../styles/set-details.css';


export default function SetDetails () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);    


    // const { editSet } = useEditSet();

    // const handleEdit = () => {
    //     editSet("U3uY0ENyk3lE0A0ONUJz", {
    //         setName: "Updated set",
    //         pieceCount: 120,
    //     });
    // };

    const { setID } = useParams();

    const navigateHome = () => navigate('/home', { replace: false });
    const navigateAddPiece = () => navigate(`/addCustomPiece/${setID}`, { replace: false });

    const { set, loading, error, fetchSet } = useFetchSet();

    const { pieces, loadingPieces, fetchPieces } = useFetchSetPieces();

    const { changePieceQuantity } = useChangePieceQuantity();

    const { deletePiece, loadingDelete, errorDelete } = useDeletePiece();

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
                    <p className="sd-text">{set.theme_id === "MOC" ? "MOC" : "Set"} Number: {set.set_num}</p>
                    <p className="sd-text">Year: {set.year}</p>
                    <p className="sd-text">Number of Parts: {set.num_parts - set.missing_parts}/{set.num_parts}</p>
                    <button>Edit Set</button>
                </div>
            </div>
            <div className="sd-piece-card">
                {pieces.map(piece => (
                    <div key={piece.id} className="">
                        <div className="sd-piece-text-wrapper">
                            <p className="sd-piece-text">#{piece.set_num}</p>
                            <p className="sd-piece-text">{piece.name}</p>
                            <p className="sd-piece-text">{piece.quantity}</p>
                        </div>
                        <button onClick={() => handleChangePieceQuantity(piece.id, "down")} disabled={piece.quantity === 1}>minus</button>                        
                        <button className="sd-increment-btn" onClick={() => handleChangePieceQuantity(piece.id, "up")} disabled={set.missing_parts  >= set.num_parts}>plus</button>
                        <button onClick={() => handleDeletePiece(piece.id, piece.quantity)}>delete</button> 
                    </div>
                ))}
                <button onClick={navigateAddPiece}>Add a Missing Piece</button>
            </div>            
            <button onClick={navigateHome}>Back</button>
        </div>
    );
}
