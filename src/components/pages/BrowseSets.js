import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useFetchGlobalSets } from "../../hooks/useFetchGlobalSets";
import { useGetUserMetadata} from "../../hooks/useGetUserMetedata";
import { useGetUserSetCount } from "../../hooks/useGetUserSetCount";
import { useAddSet } from "../../hooks/useAddSet";
import '../styles/sets.css';
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
        toggleSearchByNum
    } = useFetchGlobalSets();

    const { tier, loadingUser, error } = useGetUserMetadata();
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
        <>
            <div className="sets-wrapper">
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
                            Sorry, you are at the maximum number of sets for your subscription tier.
                        </h2>
                        <button className="browse-modal-button" onClick={() => setModalOpen(false)}>close</button>
                    </div>
                </Modal>
                <div className="sets-title-wrapper">
                    <div className="sets-redirect-btn-wrapper" />
                    <h1 className="sets-title">Add a LEGO® Set</h1>
                    <div className="sets-redirect-btn-wrapper">
                        <button className="sets-redirect-btn" onClick={navigateAddCustomSet} disabled={tier === 1}>
                            Or Add Your Own Creation
                            </button>
                    </div>
                </div>
                <div className="browse-header-wrapper">
                    <div className="browse-toggle-wrapper">
                        <p className="browse-toggle-text">Search by:</p>
                        <select id="filter-select" className="browse-select" value={searchByNumber} onChange={toggleSearchByNum}>
                            <option value="true">set number</option>
                            <option value="false">set name</option>
                        </select>
                    </div>
                    <form className="browse-form" onSubmit={handleSearch}>
                        <input
                            className="browse-input"
                            type="text"
                            ref={inputRef}
                            placeholder={`Search by [set ${searchByNumber ? "number" : "name"}]`}
                            onChange={(e) => setSearchContent(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="browse-icon" type="button" size="xl" onClick={clearSearch} />
                        <button className="browse-search-btn" type="submit">search</button>
                    </form>               
                </div>
                <div className="sets-sets-wrapper">
                    { sets.map(set => (
                        <div key={set.id} className="sets-set">
                            <div className="sets-img-wrapper">
                                <img 
                                    src={set.img_url} 
                                    alt="set display" 
                                    className="sets-img" 
                                    onError={(e) => {
                                    e.target.style.display = "none"; // Hide the failed image
                                    const parent = e.target.parentNode; // Access the parent node
                                    const fallback = document.createElement("div"); // Create a fallback element
                                    fallback.className = "sets-no-image-message";
                                    fallback.innerText = "No image available";
                                    parent.appendChild(fallback); // Append fallback to the wrapper
                                    }}
                                />
                            </div>
                            <div className="sets-set-title-wrapper">
                                <hr className="sets-divider" />
                                <h2 className="sets-set-title">{set.name}</h2>
                            </div>
                            <div className="sets-set-content-wrapper">
                                <div className="sets-set-text-wrapper">
                                    <p className="sets-set-text">#{set.set_num}</p>
                                    <p className="sets-set-text">{set.year}</p>
                                </div>
                                <button 
                                    className="sets-set-btn" 
                                    onClick={
                                        () => addToUserSets(set.img_url, set.name, set.num_parts, set.set_num, set.theme_id, set.year)
                                    }
                                >
                                    Add to Collection
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
                { (sets.length === 0 && !loading) && 
                    <div className="browse-no-sets">
                        <h2>{loading ? "" : "no sets found for that set "}{searchByNumber ? "number" : "name"}</h2>
                        <p>{searchByNumber ? "did you mean to search by name?" : "keep in mind searches are case-sensitive"}</p>
                    </div> 
                }
                { loading ? (
                    <p>Loading...</p>
                ) : moreSetsAvailable ? (
                    <button className="sets-load-more-btn" onClick={loadMoreSets}>Load More</button>
                ) : (
                    <br />
                ) }
            </div>
            <div className="browse-footer">
                <p className="browse-footer-text">
                    We update our database for new sets every couple weeks. If you are not seeing one, we'll have it up soon!
                </p>
            </div>
        </>
    );
}
