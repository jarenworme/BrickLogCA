import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useFetchUserSets } from "../../hooks/useFetchUserSets";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import "../styles/usersetspieces.css"

import { useAddSet } from "../../hooks/useAddSet";


import { usePaginatedUserSets } from "../../hooks/usePaginatedUserSets";

const UserSetsPage = () => {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateBrowseSets = () => navigate('/browseSets', { replace: false });
    const { sets, fetchNextPage, fetchPrevPage, isLoading, hasNextPage, hasPrevPage } = usePaginatedUserSets();

    const logsets = () => {
        console.log(sets);
    }
    const { addSet } = useAddSet();
    
    const add = async (e) => {
        e.preventDefault();
        // addSet({ setName: "test p2", theme: "test-city", setNumber: 1000, pieceCount: 10 });

    }

    return (
        <div className="user-sets-page">
            <button onClick={navigateBrowseSets}>add</button>
            <h1>User Sets</h1>
            <button onClick={add}>log sets</button>
            {isLoading && <p>Loading...</p>}
            <div>
                {sets.map((lset) => (
                    <div key={lset.id}>
                        <div className="us-img-wrapper">
                            <img src={lset.img_url} alt="set display" className="us-img" />
                        </div>
                        <h2 >{lset.name}</h2>
                        <h2 >{lset.theme_id}</h2>
                        <h2 >{lset.year}</h2>
                        <h2 >{lset.set_num}</h2>
                    </div>
                ))}
            </div>
            <div>
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
