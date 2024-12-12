import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useFetchGlobalSets } from "../../hooks/useFetchGlobalSets";
import { useGetUserSubscriptionTier } from "../../hooks/useGetUserSubscriptionTier";
import { useGetUserSetCount } from "../../hooks/useGetUserSetCount";
import { useAddSet } from "../../hooks/useAddSet";
import '../styles/browse.css';
import '../styles/loading.css';

export default function BrowseSets() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateAddCustomSet = () => navigate('/addCustomSet', { replace: false });

    // state variables
    const [searchContent, setSearchContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);
    const inputRef = useRef();

    // custom hook items
    const { 
        sets,
        loading,
        searchByNumber,
        moreSetsAvailable,
        fetchSets, 
        searchSets, 
        resetSets, 
        loadMoreSets,
        toggleSearchByNum, 
        toggleSearchByName
    } = useFetchGlobalSets();

    const { tier, loadingUser, error } = useGetUserSubscriptionTier();
    const { setCount } = useGetUserSetCount();
    const { addSet } = useAddSet();

    // fetch initial set batch on mount
    useEffect(() => {
        if (!fetchCalled.current && sets.length === 0) {
            fetchSets();
            fetchCalled.current = true;
        }
    }, [fetchSets, sets.length]);

    // function to add a set to a user's collection when clicked on
    const addToUserSets = async ( img_url, name, num_parts, set_num, theme_id, year ) => {
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
    }

    // logic to call search correctly in the hook
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchContent.trim() === "") {
            resetSets(); // Reset to default state if search is cleared
        } else {
            searchSets(searchContent, null, true);
        }
    };

    // function to clear all necessary search data via the clear button
    const clearSearch = () => {
        setSearchContent("");
        inputRef.current.value = "";
        resetSets();
    }

    // loading screen while it calculates subscription tier
    if (loadingUser) return <div className="loading-full-screen"><div className="loading-img" /></div>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="browse-wrapper">
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
            <div className="browse-title-wrapper">
                <div className="browse-add-custom-btn-wrapper" />
                <h1 className="browse-title">Add a LEGO Set</h1>
                <div className="browse-add-custom-btn-wrapper">
                    <button className="browse-add-custom-btn" onClick={navigateAddCustomSet}>Or Add Custom</button>
                </div>
            </div>
            <div className="browse-search-wrapper">
                <div className="browse-toggle-wrapper">
                    <p className="browse-toggle-text">Search by:</p>
                    <button className={`browse-toggle-search-btn ${searchByNumber ? '' : 'browse-toggle-active'}`} onClick={toggleSearchByName}>Set Name</button>
                    <p className="browse-toggle-text">/</p>
                    <button className={`browse-toggle-search-btn ${searchByNumber ? 'browse-toggle-active' : ''}`} onClick={toggleSearchByNum}>Set Number</button>
                </div>
                <form className="browse-form" onSubmit={handleSearch}>
                    <input
                        className="browse-input"
                        type="text"
                        ref={inputRef}
                        placeholder="Search by name or set number..."
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faCircleXmark} className="browse-icon" type="button" size="xl" onClick={clearSearch}/>
                    <button className="browse-search-btn" type="submit">search</button>
                </form>               
            </div>
            <div className="browse-sets-wrapper">
                {sets.map(set => (
                    <div key={set.id} className="browse-set">
                        <div className="browse-img-wrapper">
                            <img src={set.img_url} alt="set display" className="browse-img" />
                            <hr className="browse-divider" />
                        </div>
                        <div className="browse-set-title-wrapper">
                            <h2 className="browse-set-title">{set.name}</h2>
                        </div>
                        <div className="browse-set-content-wrapper">
                            <div className="browse-set-text-wrapper">
                                <p className="browse-set-text">#{set.set_num}</p>
                                <p className="browse-set-text">{set.year}</p>
                            </div>
                            <button className="browse-set-btn" onClick={() => addToUserSets(set.img_url, set.name, set.num_parts, set.set_num, set.theme_id, set.year)}>Add to Collection</button>
                        </div>
                    </div>
                ))}
            </div>
            {sets.length === 0 && <div className="browse-no-sets"><h2>{loading ? "" : "no sets found"}</h2></div>}
            {loading ? (
                <p>Loading...</p>
            ) : moreSetsAvailable ? (
                <button className="browse-load-more-btn" onClick={loadMoreSets}>Load More</button>
            ) : (
                <br />
            )}
        </div>
    );
}
