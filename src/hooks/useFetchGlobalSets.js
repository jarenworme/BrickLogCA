import { useState } from "react";
import { query, collection, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

const LOAD_SIZE = 5; // Number of items per page.


export const useFetchGlobalSets = () => {
    const [sets, setSets] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchByNumber, setSearchByNumber] = useState(false);
    const [moreSetsAvailable, setMoreSetsAvailable] = useState(true);

    const setsCollectionRef = collection(db, "global-sets");

    // Fetch initial or paginated sets
    const fetchSets = async (currSet = [], currentLastDoc = null) => {
        setLoading(true);
        try {
            // Adjust the query for pagination
            const baseQuery = currentLastDoc
                ? query(
                    setsCollectionRef,
                    orderBy("year", "desc"),
                    startAfter(currentLastDoc),
                    limit(LOAD_SIZE)
                )
                : query(
                    setsCollectionRef,
                    orderBy("year", "desc"),
                    limit(LOAD_SIZE)
                );

            const snapshot = await getDocs(baseQuery);

            const newSets = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Update the sets list, appending new sets
            setSets(prevSets => [...prevSets, ...newSets]);

            // Update the lastDoc for pagination
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);

            // If fewer sets than LOAD_SIZE, there are no more sets to fetch
            if (snapshot.docs.length < LOAD_SIZE) {
                console.log(snapshot.docs.length);
                setLastDoc(null);
                setMoreSetsAvailable(false);
            }
        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setLoading(false);
        }
    };


    // Search by name or set_num
    const searchSets = async (searchTerm, currentLastDoc = null) => {
        setLoading(true);
        setSearchTerm(searchTerm); // Keep track of the search term
        // clear data 
        if (!isSearchMode){
            setSets([]);
            setIsSearchMode(true);
        }
        
        
        try {
            let searchQuery = query(
                setsCollectionRef,
                limit(LOAD_SIZE)
            );

            if (currentLastDoc == null) {
                searchQuery = searchByNumber
                ? query(
                    setsCollectionRef,
                    where("set_num", "==", parseInt(searchTerm)),
                    limit(LOAD_SIZE)
                )
                : query(
                    setsCollectionRef,
                    where("name", ">=", searchTerm),
                    where("name", "<=", searchTerm + "\uf8ff"),
                    limit(LOAD_SIZE)
                );
            } else {
                console.log(lastDoc);
                searchQuery = searchByNumber
                ? query(
                    setsCollectionRef,
                    where("set_num", "==", parseInt(searchTerm)),
                    startAfter(currentLastDoc),
                    limit(LOAD_SIZE)
                )
                : query(
                    setsCollectionRef,
                    where("name", ">=", searchTerm),
                    where("name", "<=", searchTerm + "\uf8ff"),
                    startAfter(currentLastDoc),
                    limit(LOAD_SIZE)
                );
            }

            const snapshot = await getDocs(searchQuery);
            const searchResults = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Update the sets list, appending new sets
            setSets(prevSets => [...prevSets, ...searchResults]);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);     
            if (snapshot.docs.length < LOAD_SIZE) {
                setLastDoc(null);
                setMoreSetsAvailable(false);
                console.log(snapshot.docs.length );
            }   
        } catch (err) {
            console.error("Error searching sets:", err);
        } finally {
            setLoading(false);
        }
    };

    // Reset data
    const resetSets = () => {
        setSets([]); // Clear current sets
        setLastDoc(null); // Reset the lastDoc
        setMoreSetsAvailable(true);
        setIsSearchMode(false);
        fetchSets(); // Call fetchSets with default parameters
    };

    const toggleSearchByNum = () => {
        if (!searchByNumber && isSearchMode) {
            resetSets();
        }
        setSearchByNumber(true);
    }

    const toggleSearchByName = () => {
        if (searchByNumber && isSearchMode) {
            resetSets();
        }
        setSearchByNumber(false);
    }

    const loadMoreSets = () => {
        if (isSearchMode) {
            if (lastDoc !== null) {
                searchSets(searchTerm, lastDoc);
            }
        } else {
            if (lastDoc !== null) {
                fetchSets([], lastDoc); // Pass current sets and lastDoc to load the next page
            }
        }
    };

    return {
    sets,
    lastDoc,
    fetchSets,
    searchSets,
    resetSets,
    loadMoreSets,
    loading,
    searchByNumber,
    toggleSearchByNum,
    toggleSearchByName,
    moreSetsAvailable,
    searchTerm,
    setIsSearchMode
    };
};
