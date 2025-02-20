import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useGetUserMetadata} from "../../hooks/useGetUserMetedata";
import { useGetUserSetCount } from "../../hooks/useGetUserSetCount";
import { useAddSet } from "../../hooks/useAddSet";
import { useGetNumMOCs } from "../../hooks/useGetNumMOCs";
import '../styles/add.css';

import image from "../../assets/images/assembling-moc.JPEG";


export default function AddCustomSet () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [img_url, setImg_url] = useState("");
    const [name, setName] = useState("");
    const [num_parts, setNum_parts] = useState("");
    const [numPartsError, setNumPartsError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    // get number of MOCs to be used for calculating the "set num" of the new MOC
    const { numMOCs, loading, fetchMOCs } = useGetNumMOCs();

    // get info from hooks to determine if a user can add a new set given their sub tier
    const { tier, loadingUser, error } = useGetUserMetadata();
    const { setCount } = useGetUserSetCount();
    const { addSet } = useAddSet();

    // ensures to fetch MOCs once only
    useEffect(() => {
        if(numMOCs === -1){
            fetchMOCs();
        }
    }, [fetchMOCs]);

    // validation function to ensure a correct piece count in a valid range
    const validatePieceNum = () => {
        // gives an error for 0 or less pieces
        if(num_parts < 1){
            setNumPartsError('Please enter a valid amount of pieces');
        } else {
            setNumPartsError('');
        }
    }

    // post request to firebase to add a new set for the logged in user
    const handleSubmit = async (e) => {
        // prevent default form submission
        e.preventDefault();

        if (tier === 1 && setCount >= 15) {
            setModalOpen(true);
            return;
        }
        if (tier === 2 && setCount >= 30) {
            setModalOpen(true);
            return;
        }

        const set_num = numMOCs + 1;
        const theme_id = "MOC";
        const year = new Date().getFullYear();

        try {
            await addSet({ img_url, name, num_parts: parseInt(num_parts), set_num, theme_id, year });
            navigate('/userSets', { replace: false });
        } catch (err) {
            console.error(err.message);
        }
    };

    // navigate back to the set list page when a user clicks the cancel button
    const handleCancel = () => navigate('/browseSets', { replace: false });

    // loading screen while it calculates subscription tier
    if (loadingUser || loading) return <div className="loading-full-screen"><div className="loading-img" /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="add-wrapper">
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#1e9be3',
                    borderRadius: '12px',
                },
                }}
            >
                <div className="browse-modal-wrapper">
                    <h2 className="browse-modal-text">
                        You are at your set limit for your tier. Upgrade your plan or delete one of your current sets to add more.
                    </h2>
                    <button className="browse-modal-button" onClick={() => setModalOpen(false)}>close</button>
                </div>
            </Modal>
            <h1 className="add-title">Add a New MOC (My Own Creation)</h1>
            <h3 className="add-subtitle">Log your unique LEGO® creations to view them in your collection.</h3>
            <div className="add-content-wrapper">
                <div className="add-img-wrapper">
                    <img src={image} alt="Assembling a MOC" className="add-img"/>
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
                        placeholder="Give a good estimate!"
                        onChange={(e) => setNum_parts(e.target.value)} 
                        onBlur={validatePieceNum} 
                    />
                    { numPartsError && (<p className="add-field-error">{numPartsError}</p>) }
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
                            Add New Set!
                        </button>
                        <button 
                            className="add-cancel-btn" 
                            type="button" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
