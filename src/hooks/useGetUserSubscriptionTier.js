import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../config/firebase-config";


export const useGetUserSubscriptionTier = () => {
    const [tier, setTier] = useState(null); // Store the subscription tier
    const [display, setDisplay] = useState(""); // Store the displayName
    const [profilePicURL, setProfilePicURL] = useState("true"); // Store Profile Pic URL
    const [loadingUser, setLoadingUser] = useState(true); // Indicate loading state
    const [error, setError] = useState(null); // Handle potential errors

    useEffect(() => {
        const fetchSubscriptionTier = async (user) => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setTier(userData.subscriptionTier || 4); // Default to 4 if undefined
                    setDisplay(userData.displayName || "not found");
                    setProfilePicURL(userData.photoURL || "not found");
                } else {
                    console.error("User document does not exist!");
                    setTier(1); // Default tier for new users
                }
            } catch (err) {
                console.error("Error fetching subscription tier:", err);
                setError(err.message);
            } finally {
                setLoadingUser(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchSubscriptionTier(user);
            } else {
                console.error("No user is logged in!");
                setTier(null);
                setLoadingUser(false);
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    return { tier, loadingUser, error, display, profilePicURL };
};
