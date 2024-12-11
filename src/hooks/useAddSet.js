import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddSet = () => {
    const setCollectionRef = collection(db, "sets");
    const { userID } = useGetUserInfo();

    const addSet = async ({ img_url, name, num_parts, set_num, theme_id, year }) => {
        await addDoc(setCollectionRef, {
            userID,
            img_url,
            name,
            num_parts,
            set_num,
            theme_id,
            year,
            createdAt: serverTimestamp(),
        });
    };

    return {addSet}

}
