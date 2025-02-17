import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSet } from "../../hooks/useFetchSet";
import { useEditSet } from "../../hooks/useEditSet";
import "../styles/add.css";
import "../styles/loading.css"

import image from "../../assets/images/assembling-moc.JPEG";

export default function EditSet() {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    const navigateSetDetails = () => navigate(`/setDetails/${setID}`, { replace: false });

    const { setID } = useParams();

    const { set, loading, error, fetchSet } = useFetchSet();

    // state variables
    const [img_url, setImg_url] = useState("");
    const [name, setName] = useState("");
    const [num_parts, setNum_parts] = useState("");
    // variable to hold conditionally rendered error message for invalid set number
    const [numPartsError, setNumPartsError] = useState("");


    // use the edit set hook
    const { editSet } = useEditSet();

    useEffect(() => {
        fetchSet(setID);
    }, []);

    useEffect(() => {
        if(set) {
            setImg_url(set.img_url);
            setName(set.name);
            setNum_parts(set.num_parts);
        }
    }, [set]);

    // validation function to ensure a correct piece count in a valid range
    const validatePieceNum = () => {
        if (num_parts < 1) {
            setNumPartsError("Please enter a valid amount of pieces");
        } else {
            setNumPartsError("");
        }
    };

    // update request to firebase to edit an existing set
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editSet(setID, { img_url, name, num_parts: parseInt(num_parts) });
            navigateSetDetails();
        } catch (err) {
            console.error(err.message);
        }
    };


    // loading screen while it fills set data
    if (loading) return <div className="loading-full-screen"><div className="loading-img" /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="add-wrapper">
            <h1 className="add-title">Edit Your MOC (My Own Creation)</h1>
            <h3 className="add-subtitle">Modify your LEGO® creation details below.</h3>
            <div className="add-content-wrapper">
                <div className="add-img-wrapper">
                    <img src={image} alt="Editing a MOC" className="add-img" />
                </div>
                <form className="add-form" onSubmit={handleSubmit}>
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Name</label>
                    </div>
                    <input className="add-field-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Piece Count</label>
                    </div>
                    <input
                        className="add-field-input"
                        type="number"
                        value={num_parts}
                        onChange={(e) => setNum_parts(e.target.value)}
                        onBlur={validatePieceNum}
                    />
                    {numPartsError && <p className="add-field-error">{numPartsError}</p>}
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Display Image</label>
                    </div>
                    <input
                        className="add-field-input"
                        type="text"
                        value={img_url}
                        placeholder="Optional - copy an ImageBB link here"
                        onChange={(e) => setImg_url(e.target.value)}
                    />
                    <div className="add-btn-wrapper">
                        <button
                            className="add-submit-btn"
                            type="submit"
                            disabled={name.length === 0 || num_parts.length === 0 || numPartsError.length > 0}
                        >
                            Save Changes
                        </button>
                        <button className="add-cancel-btn" type="button" onClick={navigateSetDetails}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
