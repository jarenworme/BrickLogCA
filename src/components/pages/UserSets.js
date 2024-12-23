import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpWideShort, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useGetFilterUserSets } from "../../hooks/useGetFilterUserSets";
import { useDeleteSet } from "../../hooks/useDeleteSet";
import "../styles/sets.css"

import pieceIcon from "../../assets/icons/1x1-grey.svg";


export default function UserSetsPage () { 
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateBrowseSets = () => navigate('/browseSets', { replace: false });
    const navigateSetDetails = (ID) => navigate(`/setDetails/${ID}`, { replace: false });

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);

    // state variables
    const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedSort, setSelectedSort] = useState("createdAt");
    const [isYear, setIsYear] = useState(true);

    // custom hook items
    const { deleteSet, loadingDelete, error } = useDeleteSet();

    const {
        sets,
        fetchFilterLoading,
        moreSetsAvailable,
        fetchSets,
        updateSetsOnDelete,
        loadMoreSets,
        loadArrays,    
        filterYears,
        filterThemes,
        filterCategory,
        filterTerm,
        sortDirection,
        setSortDirection        
    } = useGetFilterUserSets();

    // fetch initial set batch on mount and load filter arrays
    useEffect(() => {
        if (!fetchCalled.current && sets.length === 0) {
            loadArrays();
            fetchSets();
            fetchCalled.current = true;
        }
    }, [loadArrays, fetchSets, sets.length]);

    // delete the selected set from user sets and reload sets with the same criteria
    const handleDelete = async (setId) => {
        //if (window.confirm("Are you sure you want to delete this set?")) {
            await deleteSet(setId);
            updateSetsOnDelete();
        //}
    };

    // fetches a new set list based on filter type with form submission
    const handleFilter = (e) => {
        e.preventDefault();
        if (isYear){
            fetchSets(true, null, selectedFilterCategory, parseInt(selectedYear));
        } else {
            fetchSets(true, null, selectedFilterCategory, selectedTheme);
        }
    };

    // fetches a new set list based on sort type with form submission
    const handleSort = (e) => {
        e.preventDefault();
        console.log(true, null, filterCategory, filterTerm, selectedSort, sortDirection);
        fetchSets(true, null, filterCategory, filterTerm, selectedSort);
    };

    // change filter category based on first select input data
    const handleFilterCategory = (e) => {
        setSelectedFilterCategory(e.target.value); // Update state with selected year
        setIsYear(e.target.value==="year");
    };

    // functions to update variables with select inputs on change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setIsYear(true);
    };

    const handleThemeChange = (e) => {
        setSelectedTheme(e.target.value);
        setIsYear(false);
    };

    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
    };

    // function to reset the filter select inputs
    const clearFilter = () => {
        setSelectedTheme("");
        setSelectedYear("");
        setSelectedFilterCategory("");
        fetchSets(true, null, "none", "");
    }


    return (
        <div className="sets-wrapper">
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <div className="sets-title-wrapper">
                <div className="sets-redirect-btn-wrapper" />
                <h1 className="sets-title">Your Collection</h1>
                <div className="sets-redirect-btn-wrapper">
                    <button className="sets-redirect-btn sets-primary-btn" onClick={navigateBrowseSets}>Add New</button>
                </div>
            </div>
            <div className="us-header-wrapper">
                <div className="us-form-wrapper">
                    <h3 className="us-form-title">Sort Your Sets</h3>
                    <hr className="us-form-hr" />
                    <form className="us-form" onSubmit={handleSort}>
                        <select id="sort-select" className="us-select" value={selectedSort} onChange={handleSortChange}>
                            <option value="createdAt">
                            Date Added
                            </option>
                            <option value="num_parts">
                            Piece Count
                            </option>
                            <option value="set_num">
                            Set Number
                            </option>
                            <option value="name">
                            Name
                            </option>
                            <option value="year">
                            Year
                            </option>
                        </select>
                        {sortDirection === "asc" ?
                        <FontAwesomeIcon icon={faArrowUpWideShort} className="us-sort-icon" type="button" size="xl" 
                        onClick={() => setSortDirection("desc")}/>
                        : <FontAwesomeIcon icon={faArrowDownWideShort} className="us-sort-icon" type="button" size="xl" 
                        onClick={() => setSortDirection("asc")}/>
                        }
                        <button type="submit" className="us-form-btn" >apply</button>
                    </form>
                </div>
                <div className="us-form-wrapper">
                    <h3 className="us-form-title">Filter Your Sets</h3>
                    <hr className="us-form-hr" />
                    <form className="us-form" onSubmit={handleFilter}>
                        <select id="filter-select" className="us-select" value={selectedFilterCategory} 
                        onChange={handleFilterCategory}>
                            <option value="" disabled>
                            -- Select Filter --
                            </option>
                            <option value="year">
                            year
                            </option>
                            <option value="theme_id">
                            theme
                            </option>
                        </select>
                        {selectedFilterCategory === "year" ? 
                        (<select id="year-select" className="us-select" value={selectedYear} onChange={handleYearChange}>
                        <option value="" disabled>
                        -- Select year --
                        </option>
                        {filterYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                        </select>) 
                        :  selectedFilterCategory === "theme_id" ? 
                            (<select id="theme-select" className="us-select" value={selectedTheme} onChange={handleThemeChange}>
                            <option value="" disabled>
                            -- Select Theme --
                            </option>
                            {filterThemes.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                            </select>) 
                        : (<select id="theme-select" className="us-select" value={selectedTheme} onChange={handleThemeChange}>
                            <option value="" disabled>
                            -----
                            </option>
                            </select>)
                        }
                        <button type="submit" className="us-form-btn" 
                        disabled={(isYear && selectedYear === "") || (!isYear && selectedTheme === "")}>apply</button>
                        <button type="button" className="us-form-btn us-secondary-btn" onClick={clearFilter}>clear</button>
                    </form>
                </div>
            </div>
            <div className="sets-sets-wrapper">
                {sets.map(set => (
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
                        <div className="sets-set-content-wrapper">
                            <hr className="sets-divider" />
                            <div className="sets-set-text-wrapper">
                                {set.theme_id === "MOC" 
                                ? <p className="us-set-text">#MOC{set.set_num}</p>
                                : <p className="us-set-text">#{set.set_num}</p> }
                                <div className="us-set-text-icon-group">
                                <div className="us-piece-icon-wrapper">
                                    <img src={pieceIcon} alt="LEGO Piece" className="us-piece-icon"/>
                                </div>
                                <p className="us-set-text">{set.num_parts}</p>
                                </div>
                                <div className="us-set-text-icon-group">
                                <FontAwesomeIcon icon={faCalendarDays} className="us-cal-icon" size="sm"/>
                                <p className="us-set-text">{set.year}</p>
                                </div>
                            </div>
                        </div>
                        <div className="sets-set-title-wrapper">
                            <h2 className="sets-set-title">{set.name}</h2>
                        </div>
                        <div className="us-set-bottom-wrapper">
                            <div className="us-delete-btn-wrapper" />
                            <button className="us-set-btn" onClick={() => navigateSetDetails(set.id)}>See Details</button>
                            <div className="us-delete-btn-wrapper">
                                <FontAwesomeIcon 
                                    icon={faTrashCan} 
                                    className="us-delete-icon" 
                                    size="xl" 
                                    onClick={() => handleDelete(set.id)} 
                                    disabled={loadingDelete}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {sets.length === 0 && <div className="sets-no-sets">
                <h2>{fetchFilterLoading ? "" : "You currently dont have any sets in your collection."}</h2>
            </div>}
            {fetchFilterLoading ? (
                <p>Loading...</p>
            ) : moreSetsAvailable ? (
                <button className="sets-load-more-btn" onClick={loadMoreSets}>Load More</button>
            ) : (
                <br />
            )}
        </div>
    );
}
