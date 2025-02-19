import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// this hook adds a user subscription tier and username based off the sign in email on first login or if the data is not there
const useAddUserSubscriptionTier = () => {
    useEffect(() => {
        const auth = getAuth();

        const handleUserLogin = async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userRef);
                const defaultDisplayName = user.email.split("@")[0];

                if (!userSnapshot.exists()) {
                    // Add new user with default subscriptionTier and display name
                    await setDoc(userRef, {
                        email: user.email,
                        displayName: defaultDisplayName,
                        subscriptionTier: 1, // Default tier
                        createdAt: new Date().toISOString(),
                    });
                } else {
                    const userData = userSnapshot.data();
                    
                    if (!userData.subscriptionTier) {
                        // Update existing user with default subscriptionTier if missing 
                        await setDoc(userRef, { ...userData, subscriptionTier: 1 });
                    }
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            handleUserLogin(user);
        });

        return () => unsubscribe();
    }, []);
};

export default useAddUserSubscriptionTier;
