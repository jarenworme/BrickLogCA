import { doc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddPiece = () => {
    const setCollectionRef = collection(db, "pieces");
    const { userID } = useGetUserInfo();

    const addPiece = async ({ setID, set_num, set_name, name, color, quantity, missing_parts }) => {
        try {
            // Validate input numbers
            // console.log(set_num, quantity, missing_parts);
            const parsedQuantity = Number(quantity);
            const parsedMissingParts = Number(missing_parts);

            if (isNaN(parsedQuantity) || isNaN(parsedMissingParts)) {
                throw new Error("Invalid numeric inputs provided");
            }

            // Add new piece document
            await addDoc(setCollectionRef, {
                userID,
                setID,
                set_num,
                set_name,
                name,
                color,
                quantity: parsedQuantity,
                createdAt: serverTimestamp(),
            });

            // Update missing_parts in the associated set
            const newMissing = parsedMissingParts + parsedQuantity;
            const setDocRef = doc(db, "sets", setID);

            await updateDoc(setDocRef, {
                missing_parts: newMissing,
            });

            console.log(`Successfully updated missing_parts for set ${setID}`);
        } catch (err) {
            console.error("Error adding piece or updating set:", err);
        }
    };

    
    return {addPiece}
}
