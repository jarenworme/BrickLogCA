import { useState } from "react";
import { query, collection, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to get all MOCs ordered by most recent for community mocs tab, with user data for each
export const useGetMOCs = () => {
    const [isLoadingComMOCs, setisLoadingComMOCs] = useState(false);
    const [comMOCs, setComMOCs] = useState([]);

    const setsCollectionRef = collection(db, "sets");

    const fetchMOCs = async () => {
        setisLoadingComMOCs(true);

        try {
            // query to get all MOCs across all users
            const MOCsQuery = query(
                setsCollectionRef,
                where("theme_id", "==", "MOC"),
                orderBy("createdAt", "desc")
            );

            const MOCsSnapshot = await getDocs(MOCsQuery);
            const MOCs = MOCsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // loop through MOCs to get user data for each and append it to the object
            const MOCsWithUsers = await Promise.all(
                MOCs.map(async (MOC) => {
                    const userDocRef = doc(db, "users", MOC.userID);
                    const userDoc = await getDoc(userDocRef); // Fetch user doc asynchronously
                    if (userDoc.data().photoURL) {
                        return { ...MOC, username: userDoc.data().displayName, userImg: userDoc.data().photoURL };
                    } else {
                        return { ...MOC, username: userDoc.data().displayName, userImg: "" };
                    }
                })
            );

            setComMOCs(MOCsWithUsers);

        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setisLoadingComMOCs(false);
        }
    }
    
    return {
        fetchMOCs,
        isLoadingComMOCs,
        comMOCs
    }
}
