// import { useEffect, useState } from "react";
// import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../config/firebase-config";
// import { useGetUserInfo } from "./useGetUserInfo";

// export const useFetchUserSets = () => {
//   const [sets, setSets] = useState([]);

//   const setCollectionRef = collection(db, "sets");
//   const { userID } = useGetUserInfo();

//   const getUserSets = async () => {
//     let unsubscribe;
//     try {
//       const querySets = query(
//         setCollectionRef,
//         where("userID", "==", userID),
//         orderBy("createdAt")
//       );

//       unsubscribe = onSnapshot(querySets, (snapshot) => {
//         let docs = [];

//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           const id = doc.id;

//           docs.push({ ...data, id });
//         });

//         setSets(docs);

//       });
//     } catch (err) {
//       console.error(err);
//     }

//     return () => unsubscribe();
//   };

//   useEffect(() => {
//     getUserSets();
//   }, []);

//   return { sets };
// };

import { useEffect, useState } from "react";
import { query, collection, where, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useFetchUserSets = (setsPerPage, lastVisible) => {
  const [sets, setSets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  const { userID } = useGetUserInfo(); // Retrieve logged-in user's ID

  const fetchUserSets = async () => {
    if (!userID) return; // Ensure the user is logged in before making the query
    setIsLoading(true);

    try {
      const setCollectionRef = collection(db, "sets");

      // Create a Firestore query to fetch only the logged-in user's sets
      const userSetsQuery = lastVisible
        ? query(
            setCollectionRef,
            where("userID", "==", userID),
            orderBy("createdAt"),
            startAfter(lastVisible),
            limit(setsPerPage)
          )
        : query(
            setCollectionRef,
            where("userID", "==", userID),
            orderBy("createdAt"),
            limit(setsPerPage)
          );

      const snapshot = await getDocs(userSetsQuery);

      // Map over documents to extract data
      const fetchedSets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Append new sets to the current state
      setSets((prev) => [...prev, ...fetchedSets]);

      // Update the last visible document for pagination
      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        setLastDoc(null); // No more documents to fetch
      }
    } catch (err) {
      console.error("Error fetching user sets:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisible, userID]); // Re-run when lastVisible or userID changes

  return { sets, isLoading, error, lastDoc };
};
