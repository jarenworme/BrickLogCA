import { useState } from "react";
import { query, collection, orderBy, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useGetUserInfo } from "./useGetUserInfo";


// this hook handles deleting a set from the user sets collection by its setId, as well as all associated pieces and image in storage
// if the set is a moc
export const useDeleteSet = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState(null);

    const setsCollectionRef = collection(db, "pieces");
    const { userID } = useGetUserInfo();
    const storage = getStorage();

    const deleteSet = async (setId, isMOC, imgID) => {
        setLoadingDelete(true);
        setError(null);

        try {
            if (!setId) {
                throw new Error("Invalid set ID");
            }

            // first delete all pieces with this setId
            const setPiecesQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                where("setID", "==", setId),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(setPiecesQuery);
            const pieces = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            pieces.forEach(element => {
                let pieceDocRef = doc(db, "pieces", element.id);
                deleteDoc(pieceDocRef);
            });

            // then delete the associated image in storage if it is a moc and a pic is set
            if (isMOC && imgID !== "") {
                const imageRef = ref(storage, `set_pictures/${imgID}`);
                await deleteObject(imageRef);
            }

            // lastly delete the set
            const setDocRef = doc(db, "sets", setId);
            await deleteDoc(setDocRef);

        } catch (err) {
            console.error("Error deleting set:", err);
            setError(err.message);
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteSet, loadingDelete, error };
};
