import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useFetchSet } from "../../hooks/useFetchSet";
import { useEditSet } from "../../hooks/useEditSet";
import "../styles/add.css";
import "../styles/loading.css"

import image from "../../assets/images/assembling-moc.JPEG";


export default function EditSet() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateSetDetails = () => navigate(`/setDetails/${setID}`, { replace: false });

    // props from routing parameters
    const { setID } = useParams();

    // hook data
    const { set, loading, error, fetchSet } = useFetchSet();
    const { userID } = useGetUserInfo();

    // state variables
    const [displayPic, setDisplayPic] = useState(null);
    const [preview, setPreview] = useState("");
    const [name, setName] = useState("");
    const [num_parts, setNum_parts] = useState("");
    const [numPartsError, setNumPartsError] = useState("");

    // use the edit set hook
    const { editSet } = useEditSet();

    // fetch set data based on setID
    useEffect(() => {
        fetchSet(setID);
    }, []);

    // populate fields with existing set data
    useEffect(() => {
        if(set) {
            setPreview(set.img_url);
            setName(set.name);
            setNum_parts(set.num_parts);
        }
    }, [set]);

    // function to handle the user inputted photo file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDisplayPic(file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

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
            const MOCID = `${userID}_${set.set_num}`;
            let img_url = set.img_url;
            
            // Upload new set picture to Firebase Storage
            if (displayPic) {
                const storageRef = ref(storage, `set_pictures/${MOCID}`);
                await uploadBytes(storageRef, displayPic);
                img_url = await getDownloadURL(storageRef);
            }

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
                    { numPartsError && <p className="add-field-error">{numPartsError}</p> }
                    <div className="add-field-title-wrapper">
                        <label className="add-field-title">Display Image</label>
                    </div>
                    <div className="add-display-img-content-wrapper">
                        { preview !== "" && 
                            <div className="add-display-img-wrapper">
                                <img src={preview} alt="Profile Preview" className="add-display-img" />
                            </div>
                        }
                        <input className="add-file-input" type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
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
