import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPiece } from "../../hooks/useAddPiece";
import { useFetchSet } from "../../hooks/useFetchSet";
import '../styles/add.css';

import image from "../../assets/images/missing-part-img-car.JPEG";


export default function AddCustomPiece () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const routeSetDetails = () => navigate(`/setDetails/${setID}`, { replace: false });

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);    

    // state variables
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState("");

    // hook data
    const { setID } = useParams();

    const { set, loading, error, fetchSet } = useFetchSet(setID);

    const { addPiece } = useAddPiece();

    // fetch set information used for error checking piece quantity and display name
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

    // function to handle adding the piece on form submission
    const handleAddPiece = async (event) => {
        event.preventDefault();

        let tempSetNum = set.set_num;
        if(set.theme_id === "MOC") {
            tempSetNum = `MOC${set.set_num}`;
        }

        const pieceData = {
            setID,
            set_num: tempSetNum,
            set_name: set.name,
            set_image: set.img_url,
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
        <div className="add-wrapper">
            <h1 className="add-title">Add a missing piece to '{set.name}'</h1>
            <h3 className="add-subtitle">Try to describe the piece as best you can</h3>
            <div className="add-content-wrapper">
                <div className="add-img-wrapper">
                    <img src={image} alt="Assembling a MOC" className="add-img"/>
                </div>
                <form className="add-form" onSubmit={handleAddPiece}>
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Name</label>
                    </div>
                    <input 
                        className="add-field-input" 
                        type="text" 
                        value={name} 
                        placeholder="example: 2x4 flat brick" 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Color</label>
                    </div>
                    <input 
                        className="add-field-input" 
                        type="text" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                    />
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Quantity</label>
                    </div>
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
                    <div className="add-btn-wrapper">
                        <button 
                            className="add-submit-btn" 
                            type="submit" 
                            disabled={name.length === 0 || color.length === 0 || quantityError.length > 0}
                        >
                            Add Piece
                        </button>
                        <button 
                            className="add-cancel-btn" 
                            type="button" 
                            onClick={routeSetDetails}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
