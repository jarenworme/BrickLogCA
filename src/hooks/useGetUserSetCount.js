import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


// this hook calculates the amount of sets a user has for determining tier set limits 
export const useGetUserSetCount = () => {
    const [setCount, setSetCount] = useState(0);
    const { userID } = useGetUserInfo();

    useEffect(() => {
        const fetchUserSetCount = async () => {
            try {
                const setsCollectionRef = collection(db, "sets");
                const userQuery = query(setsCollectionRef, where("userID", "==", userID));
                const snapshot = await getDocs(userQuery);
                setSetCount(snapshot.size); // Firebase returns the number of matching documents
            } catch (err) {
                console.error("Error fetching user set count:", err);
                setSetCount(0); // Default to 0 if there's an error
            }
        };

        if (userID) {
            fetchUserSetCount();
        }
    }, [userID]);

    return { setCount };
};
