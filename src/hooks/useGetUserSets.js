import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetUserSets = () => {
  const [sets, setSets] = useState([]);

  const setCollectionRef = collection(db, "sets");
  const { userID } = useGetUserInfo();

  const getUserSets = async () => {
    let unsubscribe;
    try {
      const querySets = query(
        setCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(querySets, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });

        setSets(docs);

      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getUserSets();
  }, []);

  return { sets };
};
