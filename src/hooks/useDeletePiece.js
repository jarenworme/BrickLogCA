import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useState } from "react";


export const useDeletePiece = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deletePiece = async (setID, pieceID, quantity) => {
        setLoadingDelete(true);
        setErrorDelete(null);
        try {
            if (!pieceID) {
                throw new Error("Invalid piece ID");
            }

            const pieceDocRef = doc(db, "pieces", pieceID);
            await deleteDoc(pieceDocRef);
            
            const setDocRef = doc(db, "sets", setID);

            await updateDoc(setDocRef, {
                missing_parts: increment(-quantity),
            });

            console.log(`Piece with ID ${pieceID} has been successfully deleted.`);
        } catch (err) {
            console.error("Error deleting set:", err);
            setErrorDelete(err.message);
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deletePiece, loadingDelete, errorDelete };
};
