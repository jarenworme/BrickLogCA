import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useState } from "react";


export const useDeleteSet = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState(null);

    const deleteSet = async (setId) => {
        setLoadingDelete(true);
        setError(null);
        try {
            if (!setId) {
                throw new Error("Invalid set ID");
            }

            const setDocRef = doc(db, "sets", setId);
            await deleteDoc(setDocRef);
            console.log(`Set with ID ${setId} has been successfully deleted.`);
        } catch (err) {
            console.error("Error deleting set:", err);
            setError(err.message);
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteSet, loadingDelete, error };
};
