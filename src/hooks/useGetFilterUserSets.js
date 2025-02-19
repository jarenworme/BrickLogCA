import { useState } from "react";
import { query, collection, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

// Number of items per page.
const LOAD_SIZE = 64; 


// this hook contains all the functions used on the user sets page
// it handles set fetching with LOAD_SIZE sets per page, and handles sorting and filtering through Firebase queries
export const useGetFilterUserSets = () => {
    // state variables
    const [sets, setSets] = useState([]);
    const [filterYears, setFilterYears] = useState([]);
    const [filterThemes, setFilterthemes] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [fetchFilterLoading, setFetchFilterLoading] = useState(false);
    const [sortTerm, setSortTerm] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filterCategory, setFilterCategory] = useState("none")
    const [filterTerm, setFilterTerm] = useState("");
    const [moreSetsAvailable, setMoreSetsAvailable] = useState(true);

    const setsCollectionRef = collection(db, "sets");

    const { userID } = useGetUserInfo();

    // load data into year and theme arrays from all user sets
    const loadArrays = async () => {
        setFetchFilterLoading(true);

        try {
            // init query for all data
            let baseQuery = query(
                setsCollectionRef,
                where("userID", "==", userID)
            )

            const snapshot = await getDocs(baseQuery);
            const newSets = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // load theme and year arrays on the first query 
            const uniqueThemeIds = [...new Set(newSets.map(obj => obj.theme_id))].sort();
            setFilterthemes(uniqueThemeIds);
            const uniqueYears = [...new Set(newSets.map(obj => obj.year))].sort((a, b) => b - a);
            setFilterYears(uniqueYears);

        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setFetchFilterLoading(false);
        }
    }

    // Fetch sets based on sort and filter criteria
    const fetchSets = async ( 
    isNewSearch = false, 
    currentLastDoc = null,  
    currentFilterCategory = filterCategory, 
    currentFilterTerm = filterTerm, 
    currentSortTerm = sortTerm ) => {

        if(isNewSearch){
            setSets([]);
            setMoreSetsAvailable(true);
        }
        
        setFetchFilterLoading(true);

        setFilterCategory(currentFilterCategory);
        setFilterTerm(currentFilterTerm);
        setSortTerm(currentSortTerm);

        try {

            // init dummy query 
            let baseQuery = query(
                setsCollectionRef
            )

            // construct the queries depending on filter
            if (currentFilterCategory === "none") {
                baseQuery = currentLastDoc
                ? query(
                    setsCollectionRef,
                    where("userID", "==", userID),
                    orderBy(currentSortTerm, sortDirection),
                    startAfter(currentLastDoc),
                    limit(LOAD_SIZE)
                )
                : query(
                    setsCollectionRef,
                    where("userID", "==", userID),
                    orderBy(currentSortTerm, sortDirection),
                    limit(LOAD_SIZE)
                );
            } else {
                baseQuery = currentLastDoc
                ? query(
                    setsCollectionRef,
                    where("userID", "==", userID),
                    where(currentFilterCategory, "==", currentFilterTerm),
                    orderBy(currentSortTerm, sortDirection),
                    startAfter(currentLastDoc),
                    limit(LOAD_SIZE)
                )
                : query(
                    setsCollectionRef,
                    where("userID", "==", userID),
                    where(currentFilterCategory, "==", currentFilterTerm),
                    orderBy(currentSortTerm, sortDirection),
                    limit(LOAD_SIZE)
                );
            }
            
            const snapshot = await getDocs(baseQuery);

            const newSets = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Update the sets list, appending new sets
            setSets(prevSets => [...prevSets, ...newSets]);

            // Update the lastDoc for pagination
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);

            // If fewer sets than LOAD_SIZE, there are no more sets to fetch
            if (snapshot.docs.length < LOAD_SIZE) {
                setLastDoc(null);
                setMoreSetsAvailable(false);
            }
        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setFetchFilterLoading(false);
        }
    };

    // reload sets with the current filters after a set was deleted
    const updateSetsOnDelete = () => {
        setSets([]); // Clear current sets
        setLastDoc(null); // Reset the lastDoc
        setMoreSetsAvailable(true);
        fetchSets(); // Call fetchSets with default parameters
    };

    // query more sets when the load more button is clicked via fetch or search depending on the current state
    const loadMoreSets = () => {
        if (lastDoc !== null) {
            fetchSets(false, lastDoc);
        }
    };


    return {
    sets,
    fetchFilterLoading,
    moreSetsAvailable,
    fetchSets,
    updateSetsOnDelete,
    loadMoreSets,  
    loadArrays,  
    filterYears,
    filterThemes,
    filterCategory,
    filterTerm,
    sortTerm,
    sortDirection,
    setSortDirection
    };
};
