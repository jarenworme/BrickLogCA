import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useState } from "react";


// this hook handles deleting a post from the community-posts tab 
export const useDeleteCommunityPost = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deletePost = async (postID) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            if (!postID) {
                throw new Error("Invalid post ID");
            }

            const postDocRef = doc(db, "community-posts", postID);
            await deleteDoc(postDocRef);
            
            console.log(`Post with ID ${postID} has been successfully deleted.`);
        } catch (err) {
            console.error("Error deleting post:", err);
            setErrorDelete(err.message);
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deletePost, loadingDelete, errorDelete };
};
