import { useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


// this hook calculates the amount of sets with the theme MOC that a user has
// used for calculating the MOC number on adding a new one
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

            let tempMOCnum = 1;

            if (mocSets.length > 0) {
                tempMOCnum = mocSets.pop().set_num;
            }

            setNumMOCs(tempMOCnum);
            
        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setLoading(false);
        }
    }

    return { numMOCs, loading, fetchMOCs }
}
