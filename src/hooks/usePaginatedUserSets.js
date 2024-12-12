import { useState, useEffect } from "react";
import { query, collection, where, orderBy, limit, startAfter, startAt, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo"; // Assume this gets the logged-in user info.

const PAGE_SIZE = 10; // Number of items per page.

export const usePaginatedUserSets = () => {
    const [sets, setSets] = useState([]);
    const [lastDoc, setLastDoc] = useState(null); // Cursor for the next page.
    const [firstDoc, setFirstDoc] = useState(null); // Cursor for the current page.
    const [pageStack, setPageStack] = useState([]); // Stack to keep track of previous pages for "Back" functionality.
    const [isLoading, setIsLoading] = useState(false);
    const { userID } = useGetUserInfo();

    const setCollectionRef = collection(db, "sets");

    const fetchPage = async (direction = "next", currentLastDoc = lastDoc) => {
        setIsLoading(true);
        try {
            let q;

            if (direction === "next") {
                q = currentLastDoc
                    ? query(
                          setCollectionRef,
                          where("userID", "==", userID),
                          orderBy("createdAt"),
                          startAfter(currentLastDoc),
                          limit(PAGE_SIZE)
                      )
                    : query(
                          setCollectionRef,
                          where("userID", "==", userID),
                          orderBy("createdAt"),
                          limit(PAGE_SIZE)
                      );
            } else if (direction === "prev" && pageStack.length > 0) {
                const previousPageCursor = pageStack[pageStack.length - 1];
                q = query(
                    setCollectionRef,
                    where("userID", "==", userID),
                    orderBy("createdAt"),
                    startAt(previousPageCursor),
                    limit(PAGE_SIZE)
                );
            } else {
                setIsLoading(false);
                return;
            }

            const snapshot = await getDocs(q);

            if (snapshot.docs.length > 0) {
                // For "Next" navigation, push the current page's firstDoc to the stack.
                if (direction === "next" && firstDoc) {
                    setPageStack((prev) => [...prev, firstDoc]);
                }

                // Update the `firstDoc` for current page and `lastDoc` for the next page.
                setFirstDoc(snapshot.docs[0]);
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

                // Update the sets.
                setSets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                
                if (snapshot.docs.length < PAGE_SIZE) {
                    setLastDoc(null);
                }
            } else {
                // No more pages available.
                if (direction === "next") setLastDoc(null);
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(); // Fetch the first page on mount.
    }, []);

    return {
        sets,
        fetchNextPage: () => fetchPage("next"),
        fetchPrevPage: () => {
            if (pageStack.length > 0) {
                // Remove the last element from the stack.
                setPageStack((prev) => prev.slice(0, -1));
                fetchPage("prev");
            }
        },
        isLoading,
        reset: () => fetchPage("next", null),
        hasNextPage: lastDoc !== null, // Determine if there's a next page.
        hasPrevPage: pageStack.length > 0, // Determine if there's a previous page.
    };
};
