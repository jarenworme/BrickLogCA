import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useFetchSet = (setId) => {
    const [set, setSet] = useState(null); // Holds the fetched set data
    const [loading, setLoading] = useState(false); // Indicates loading state
    const [error, setError] = useState(null); // Handles potential errors

    useEffect(() => {
        const fetchSet = async () => {
            if (!setId) return; // Do nothing if setId is not provided
            setLoading(true);
            setError(null);

            try {
                const setDocRef = doc(db, "sets", setId);
                const setDoc = await getDoc(setDocRef);

                if (setDoc.exists()) {
                    setSet({ id: setDoc.id, ...setDoc.data() });
                } else {
                    throw new Error(`Set with ID ${setId} does not exist.`);
                }
            } catch (err) {
                console.error("Error fetching set:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSet();
    }, [setId]);

    return { set, loading, error };
};
