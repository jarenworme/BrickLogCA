import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchGlobalSets } from "../../hooks/useFetchGlobalSets";
import { useAddSet } from "../../hooks/useAddSet";
import '../styles/browse.css';


export default function BrowseSets() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    //
    const fetchCalled = useRef(false);
    const inputRef = useRef();

    const { addSet } = useAddSet();

    //
    const { sets, fetchSets, searchSets, resetSets, loadMoreSets, loading, searchByNumber, toggleSearchByNum, toggleSearchByName, moreSetsAvailable } = useFetchGlobalSets();

    // state variables
    const [searchContent, setSearchContent] = useState("");

    useEffect(() => {
        // Initial fetch on mount
        if (!fetchCalled.current && sets.length === 0) {
            fetchSets();
            fetchCalled.current = true;
        }
        console.log("calls this");
    }, [fetchSets, sets.length]);

    const addToUserSets = async (img_url, name, num_parts, set_num, theme_id, year ) => {
        try {
            // console.log(img_url, name, num_parts, set_num, theme_id, year);
            await addSet({ img_url, name, num_parts, set_num, theme_id, year });
            // change to set details once that page is implemented
            navigate('/userSets', { replace: false });
        } catch (err) {
            console.error(err.message);
        }
    
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchContent.trim() === "") {
            resetSets(); // Reset to default state if search is cleared
        } else {
            searchSets(searchContent);
        }
    };

    const clearSearch = () => {
        setSearchContent("");
        inputRef.current.value = "";
        resetSets();
    }

    return (
        <div className="browse-wrapper">
            <h1>Browse LEGO Sets</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search by name or set number..."
                    onChange={(e) => setSearchContent(e.target.value)}
                />
                <button type="submit">search</button>
                <button type="button" onClick={clearSearch}>clear</button>
            </form>
            <button onClick={toggleSearchByName}>Search by Name</button>
            <button onClick={toggleSearchByNum}>Search by SetNumber</button>
            <p>{searchByNumber ? "num" : "name"}</p>
            <div className="sets-container">
            {sets.map(set => (
                <div key={set.id} className="set-item">
                <h2>{set.name}</h2>
                <p>Set Number: {set.set_num}</p>
                <p>Year: {set.year}</p>
                <button onClick={() => addToUserSets(set.img_url, set.name, set.num_parts, set.set_num, set.theme_id, set.year)}>add</button>
                </div>
            ))}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : moreSetsAvailable ? (
                <button onClick={loadMoreSets}>Load More</button>
            ) : (
                <br />
            )}

        </div>
    );
}
