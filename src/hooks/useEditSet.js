import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to update a set doc with new used entered data
export const useEditSet = () => {

    const editSet = async (setID, updatedData) => {
        if (!setID) {
            console.error("Error: No set ID provided for update.");
            return;
        }

        const setDocRef = doc(db, "sets", setID);

        try {
            await updateDoc(setDocRef, {
                ...updatedData,
            });
        } catch (error) {
            console.error("Error updating set:", error);
        }
    };

    return { editSet };
};
