import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useEditSet = () => {
    const editSet = async (setID, updatedData) => {
        try {
            const setDocRef = doc(db, "sets", setID);
            await updateDoc(setDocRef, {
                ...updatedData,
            });
        } catch (err) {
            console.error("Error updating set:", err);
        }
    };

    return { editSet };
};
