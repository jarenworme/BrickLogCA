import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPiece } from "../../hooks/useAddPiece";
import { useFetchSet } from "../../hooks/useFetchSet";


export default function AddCustomPiece () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);    


    // variable to hold the user-entered piece name
    const [name, setName] = useState("");

    // variable to hold the user-entered color
    const [color, setColor] = useState("");

    // variable to hold the user-entered number of missing pieces for the set
    const [quantity, setQuantity] = useState(1);
    // variable to hold conditionally rendered error message for invalid missing pieces amount
    const [quantityError, setQuantityError] = useState("");
    
    
    
    const routeHome = () => navigate('/', { replace: false });
    const routeSetDetails = () => navigate(`/setDetails/${setID}`, { replace: false });

    const { setID } = useParams();

    const { set, loading, error, fetchSet } = useFetchSet(setID);

    const { addPiece } = useAddPiece();

    useEffect(() => {
        if (!fetchCalled.current) {
            fetchSet(setID);
            fetchCalled.current = true;
        }
    }, [fetchSet]);

    // validation function to ensure a correct missing piece quantity in a valid range
    const validatePieceNum = (value) => {
        let maxMissing = set.num_parts - set.missing_parts - 1;

        // gives an error for 0 or less pieces, or too many pieces for the set
        if(parseInt(value) < 1){
            setQuantityError('Please enter a valid amount of pieces');
        } else if (parseInt(value) > maxMissing) {
            setQuantityError('Quantity exceeds set piece count');
        } else {
            setQuantityError('');
        }
    }

    const handleAddPiece = async () => {
        let tempSetNum = set.set_num;
        if(set.theme_id === "MOC") {
            tempSetNum = `MOC${set.set_num}`;
        }
        const pieceData = {
            setID,
            set_num: tempSetNum,
            set_name: set.name,
            name,
            color,
            quantity,  
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
            <h1>Add a missing piece to your {set.name}</h1>
            <form className="add-form" onSubmit={handleAddPiece}>
                <label>Name</label>
                <input className="add-field-input" type="text" value={name} placeholder="example: 2x4 flat brick" onChange={(e) => setName(e.target.value)} />
                <label>Color</label>
                <input className="add-field-input" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                <label>Quantity</label>
                <input 
                    className="add-field-input" 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setQuantity(newValue); 
                        validatePieceNum(newValue);
                    }} 
                />
                { quantityError && (<p className="add-field-error">{quantityError}</p>) }
                <button className="add-submit-btn" type="submit" disabled={name.length === 0 || color.length === 0 || quantityError.length > 0}>Add Piece</button>
                <button className="add-cancel-btn" type="button" onClick={routeSetDetails}>Cancel</button>
            </form>
        </div>
    );
}
