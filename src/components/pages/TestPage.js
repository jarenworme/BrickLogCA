import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import '../styles/home.css'
import { useGetUserSets } from "../../hooks/useGetUserSets";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddSet } from "../../hooks/useAddSet";
import { useEditSet } from "../../hooks/useEditSet";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export default function TestPage () {

    const navigate = useNavigate();
    const routeBack = () => navigate('/', { replace: false });

const { sets } = useGetUserSets();
const { addSet } = useAddSet();
const { name, profilePhoto } = useGetUserInfo();
const { editSet } = useEditSet();


const add = async (e) => {
    e.preventDefault();
    addSet({ setName: "first test", theme: "test-city", setNumber: 1000, pieceCount: 10 });

}

const handleEdit = () => {
    editSet("U3uY0ENyk3lE0A0ONUJz", {
        setName: "Updated set",
        pieceCount: 120,
    });
};

const signout = async () => {
    try {
        await signOut(auth);
        localStorage.clear();
        navigate('/', { replace: false });
    } catch (err) {
        console.error(err)
    }
}

const tempfunc = () => {
    console.log(sets);
}

return (
    <div className="lpblock1">
        <h1>temp page</h1>
        <h2>sets:</h2>
        <div>
            {sets.map((LEGOset) => (
                <div key={LEGOset.id}>
                    <h4> {LEGOset.setName}</h4>
                </div>
            ))}
        </div>
        <button onClick={tempfunc}>show set data</button>
        <button onClick={routeBack}>back</button>
        <button onClick={add}>add</button>
        <h2>name: {name}</h2>
        <h2>pic: </h2>
        {profilePhoto && <div><img alt="profile pic" src={profilePhoto} /></div>}
        <button onClick={handleEdit}>edit</button>
        <button onClick={signout}>Sign Out</button>
    </div>
);}
