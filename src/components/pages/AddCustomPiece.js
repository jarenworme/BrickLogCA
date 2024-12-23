import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPiece } from "../../hooks/useAddPiece";
import { useFetchSet } from "../../hooks/useFetchSet";


export default function AddCustomPiece () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);    
    
    
    
    const routeHome = () => navigate('/', { replace: false });

    const { setID } = useParams();

    const { set, loading, error, fetchSet } = useFetchSet(setID);

    const { addPiece } = useAddPiece();

    useEffect(() => {
        if (!fetchCalled.current) {
            fetchSet(setID);
            fetchCalled.current = true;
        }
    }, [fetchSet]);

    const handleAddPiece = async () => {
        let tempSetNum = set.set_num;
        if(set.theme_id === "MOC") {
            tempSetNum = `MOC${set.set_num}`;
        }
        const pieceData = {
            setID,
            set_num: tempSetNum,
            set_name: set.name,
            name: "test", // Replace with dynamic input
            color: "red", // Replace with dynamic input
            quantity: 3,  // Replace with dynamic input
            missing_parts: set.missing_parts,
        };

        try {
            await addPiece(pieceData);
            navigate(`/setDetails/${setID}`, { replace: false });
        } catch (err) {
            console.error("Error adding piece:", err);
        }
    }

    if (loading) return <div className="loading-full-screen"><div className="loading-img" /></div>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!set) return <p style={{marginTop: 100 + "px"}}>No set found.</p>;


    return (
        <div className="outer-container">
            <h1>add piece</h1>
            <h1>spacer text</h1>
            <h1>{set.name}</h1>
            <button onClick={handleAddPiece}>Add</button>
        </div>
    );
}
