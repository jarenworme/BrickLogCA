import { useState } from "react";
import { query, collection, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to get all community posts ordered by most recent for community voice tab, with user data for each
export const useGetCommunityPosts = () => {
    const [isLoadingComPosts, setisLoadingComPosts] = useState(false);
    const [comPosts, setComPosts] = useState([]);

    const CommunityPostsCollectionRef = collection(db, "community-posts");

    const getCommunityPosts = async () => {
        setisLoadingComPosts(true);

        try {
            // query to get all community posts
            const CommunityPostsQuery = query(
                CommunityPostsCollectionRef,
                orderBy("createdAt", "desc")
            );

            const PostsSnapshot = await getDocs(CommunityPostsQuery);
            const posts = PostsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // loop through posts to get user data for each and append it to the object
            const postsWithUsers = await Promise.all(
                posts.map(async (post) => {
                    const userDocRef = doc(db, "users", post.userID);
                    const userDoc = await getDoc(userDocRef); // Fetch user doc asynchronously
                    if (userDoc.data().photoURL) {
                        return { ...post, username: userDoc.data().displayName, userImg: userDoc.data().photoURL };
                    } else {
                        return { ...post, username: userDoc.data().displayName, userImg: "" };
                    }
                })
            );

            setComPosts(postsWithUsers);

        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setisLoadingComPosts(false);
        }
    }
    
    return {
        getCommunityPosts,
        isLoadingComPosts,
        comPosts
    }
}
