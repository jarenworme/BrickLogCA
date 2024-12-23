import { useState } from "react";
import { query, collection, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useFetchSetPieces = () => {
    // state variables
    const [pieces, setPieces] = useState([]);
    const [loadingPieces, setLoadingPieces] = useState(false);
   
    const setsCollectionRef = collection(db, "pieces");

    const { userID } = useGetUserInfo()

    const fetchPieces = async (setID) => {
        setLoadingPieces(true);
        try {
            const baseQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                where("setID", "==", setID),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(baseQuery);

            const newPieces = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setPieces(newPieces);

        } catch (err) {
            console.error("Error fetching pieces:", err);
        } finally {
            setLoadingPieces(false);
        }
    };


    return {
    pieces,
    loadingPieces,
    fetchPieces,
    }
}
