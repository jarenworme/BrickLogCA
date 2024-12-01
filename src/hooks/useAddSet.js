import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddSet = () => {
    const setCollectionRef = collection(db, "sets");
    const { userID } = useGetUserInfo();

    const addSet = async ({ setName, theme, setNumber, pieceCount }) => {
        await addDoc(setCollectionRef, {
            userID,
            setName,
            theme,
            setNumber,
            pieceCount,
            createdAt: serverTimestamp(),
        });
    };

    return {addSet}

}
