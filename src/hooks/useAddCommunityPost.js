import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


// this hook adds a post to the community posts collection with user data and the entered text
export const useAddCommunityPost = () => {
    const CommunityPostsCollectionRef = collection(db, "community-posts");
    const { userID } = useGetUserInfo();

    const addCommunityPost = async (content) => {
        await addDoc(CommunityPostsCollectionRef, {
            content,
            createdAt: serverTimestamp(),
            userID
        });
    };
    
    return { addCommunityPost }
}
