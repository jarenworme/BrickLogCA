import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useFetchSet = () => {
    const [set, setSet] = useState(null); // Holds the fetched set data
    const [loading, setLoading] = useState(false); // Indicates loading state
    const [error, setError] = useState(null); // Handles potential errors
    const [isMissingPieces, setIsMissingPieces] = useState(false);

    const fetchSet = async (setID) => {
        if (!setID) return; // Do nothing if setId is not provided
        setLoading(true);
        setError(null);

        try {
            const setDocRef = doc(db, "sets", setID);
            const setDoc = await getDoc(setDocRef);

            if (setDoc.exists()) {
                setSet({ id: setDoc.id, ...setDoc.data() });
                if (setDoc.data().missing_parts > 0) {
                    setIsMissingPieces(true);
                } else {
                    setIsMissingPieces(false);
                }
            } else {
                throw new Error(`Set with ID ${setID} does not exist.`);
            }
        } catch (err) {
            console.error("Error fetching set:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { set, loading, error, isMissingPieces, fetchSet };
};
