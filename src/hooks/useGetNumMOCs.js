import { useState } from "react";
import { query, collection, orderBy, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useGetNumMOCs = () => {
    const [numMOCs, setNumMOCs] = useState(-1);
    const [loading, setLoading] = useState(false);

    const setsCollectionRef = collection(db, "sets");

    const { userID } = useGetUserInfo();

    const fetchMOCs = async () => {
        setLoading(true);

        try {
            const mocQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                where("theme_id", "==", "MOC")
            );

            const mocSnapshot = await getDocs(mocQuery);
            const mocSets = mocSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setNumMOCs(mocSets.length);
            
        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setLoading(false);
        }
    }
    

    return {
        numMOCs,
        loading,
        fetchMOCs
    }
}
