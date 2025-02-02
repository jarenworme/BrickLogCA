import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useChangePieceQuantity = () => {
    
    const changePieceQuantity = async ( setID, pieceID, direction ) => {
        try {

            const pieceDocRef = doc(db, "pieces", pieceID);
            const setDocRef = doc(db, "sets", setID);

            const incrementValue = direction === "up" ? 1 : -1;

            await updateDoc(pieceDocRef, {
                quantity: increment(incrementValue),
            });

            await updateDoc(setDocRef, {
                missing_parts: increment(incrementValue),
            });

            //console.log(`Successful`);
        } catch (err) {
            console.error("Error adding piece or updating set:", err);
        }
    };

    
    return {changePieceQuantity}
}
