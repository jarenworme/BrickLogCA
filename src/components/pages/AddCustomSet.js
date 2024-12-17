import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useFetchGlobalSets } from "../../hooks/useFetchGlobalSets";
import { useGetUserSubscriptionTier } from "../../hooks/useGetUserSubscriptionTier";
import { useGetUserSetCount } from "../../hooks/useGetUserSetCount";
import { useAddSet } from "../../hooks/useAddSet";
import '../styles/sets.css';


export default function AddCustomSet () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // variable to hold the user-entered set name
    const [img_url, setImg_url] = useState("");

    // variable to hold the user-entered set name
    const [name, setName] = useState("");

    // variable to hold the user-entered set theme
    const [theme_id, setTheme_id] = useState("");

    // variable to hold the user-entered set number
    const [set_num, setSet_num] = useState("");
    // variable to hold conditionally rendered error message for invalid set number
    const [setNumError, setSetNumError] = useState("");

    // variable to hold the user-entered number of pieces for the set
    const [num_parts, setNum_parts] = useState("");
    // variable to hold conditionally rendered error message for invalid set number
    const [numPartsError, setNumPartsError] = useState("");

    const [year, setYear] = useState("");

    const [isMOC, setIsMOC] = useState(true);



    const [modalOpen, setModalOpen] = useState(false);



    const { tier, loadingUser, error } = useGetUserSubscriptionTier();
    const { setCount } = useGetUserSetCount();
    const { addSet } = useAddSet();

    useEffect(() => {
        const extractedYear = new Date().getFullYear();
        setYear(extractedYear);
    }, []);
     
    

    // validation function to ensure a correct set number in a valid range
    const validateSetNum = () => {
        // checks for a valid LEGO set number
        if(set_num < -1 || set_num > 99999){
            setSetNumError('Please enter a valid LEGO set number');
        } else {
            setSetNumError('');
        }
    }

    // validation function to ensure a correct piece count in a valid range
    const validatePieceNum = () => {
        // gives an error for 0 or less pieces
        if(num_parts < 1){
            setNumPartsError('Please enter a valid amount of pieces');
        } else {
            setNumPartsError('');
        }
    }

    // post request to api to add a new set for the logged in user
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

        try {
            await addSet({ img_url, name, num_parts, set_num, theme_id, year });
            // change to user sets once that page is implemented
            navigate('/userSets', { replace: false });
        } catch (err) {
            console.error(err.message);
        }
    };

    // navigates back to the set list page when a user clicks the cancel button
    const handleCancel = () => navigate('/SetList', { replace: false });

    // loading screen while it calculates subscription tier
    if (loadingUser) return <div className="loading-full-screen"><div className="loading-img" /></div>;
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
                        You are at your limit of 15 sets. Upgrade your plan or delete one of your current sets to add more.
                    </h2>
                    <button className="browse-modal-button" onClick={() => setModalOpen(false)}>close</button>
                </div>
            </Modal>
            <div className="add-title-wrapper">
                <h1 className="add-title">Add a New Set</h1>
                <h3 className="add-subtitle">subtitle</h3>
            </div>
            <p>{year}</p>
            <div className="add-middle-container">
                <form className="add-form" onSubmit={handleSubmit}>
                    <div className="add-field">
                        <label className="add-field-title">Name</label>
                        <input className="add-field-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="add-checkbox-wrapper">
                        <label className="add-field-title">
                            Is this set a MOC (My Own Creation)?
                            <input className="add-checkbox" type="checkbox" checked={isMOC} onChange={(e) => setIsMOC(e.target.checked)} />
                        </label>
                    </div>
                    {!isMOC && (
                    <div className="add-field">
                        <label className="add-field-title">Theme</label>
                        <input className="add-field-input" type="text" value={theme_id} onChange={(e) => setTheme_id(e.target.value)} />
                    </div>
                    )}
                    {!isMOC && (
                    <div className="add-field">
                        <label className="add-field-title">Set Number</label>
                        <input className="add-field-input" type="number" value={set_num} onChange={(e) => setSet_num(e.target.value)} onBlur={validateSetNum} />
                        { setNumError && (<p className="add-field-error">{setNumError}</p>) }
                    </div>
                    )}
                    <div className="add-field">
                        <label className="add-field-title">Piece Count</label>
                        <input className="add-field-input" type="number" value={num_parts} onChange={(e) => setNum_parts(e.target.value)} onBlur={validatePieceNum} />
                        {isMOC && (<p className="add-text">lorem ipsum dolor</p>)}
                        { numPartsError && (<p className="add-field-error">{numPartsError}</p>) }
                    </div>
                    <div className="add-field">
                        <label className="add-field-title">Display Image</label>
                        <input className="add-field-input" type="text" value={img_url} onChange={(e) => setImg_url(e.target.value)} />
                        <p className="add-text">lorem ipsum dolor</p>
                    </div>
                    <div className="add-buttons">
                        <button className="add-cancel-button" type="button" onClick={handleCancel}>Cancel</button>
                        <button className="add-submit-button" type="submit" disabled={name.length == 0 || set_num.length == 0 || numPartsError.length > 0 || setNumError.length > 0}>Add New Set!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
