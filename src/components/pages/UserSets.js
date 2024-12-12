import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useFetchUserSets } from "../../hooks/useFetchUserSets";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useDeleteSet } from "../../hooks/useDeleteSet";
import "../styles/usersetspieces.css"

import { useAddSet } from "../../hooks/useAddSet";


import { usePaginatedUserSets } from "../../hooks/usePaginatedUserSets";

const UserSetsPage = () => {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateBrowseSets = () => navigate('/browseSets', { replace: false });
    const navigateSetDetails = (ID) => navigate(`/setDetails/${ID}`, { replace: false });

    const { deleteSet, loading, error } = useDeleteSet();

    const { sets, fetchNextPage, fetchPrevPage, reset, isLoading, hasNextPage, hasPrevPage} = usePaginatedUserSets();

    const handleDelete = async (setId) => {
        if (window.confirm("Are you sure you want to delete this set?")) {
            await deleteSet(setId);
            reset();
        }
    };
    

    return (
        <div className="user-sets-page">
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <button onClick={navigateBrowseSets}>add</button>
            <h1>User Sets</h1>
            {isLoading && <p>Loading...</p>}
            <div>
                {sets.map((lset) => (
                    <div key={lset.id}>
                        <div className="us-img-wrapper">
                            <img src={lset.img_url} alt="set display" className="us-img" />
                        </div>
                        <button onClick={() => navigateSetDetails(lset.id)}>{lset.name}</button>
                        <h2 >{lset.theme_id}</h2>
                        <h2 >{lset.year}</h2>
                        <h2 >{lset.set_num}</h2>
                        <button 
                            onClick={() => handleDelete(lset.id)} 
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => console.log(hasPrevPage, isLoading)}>test</button>
                <button onClick={fetchPrevPage} disabled={!hasPrevPage || isLoading}>
                    Previous
                </button>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserSetsPage;
