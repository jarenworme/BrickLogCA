import { useState } from "react";
import { query, collection, orderBy, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


// hook to calculate statistics for all statistics fields for the logged-in user
export const useGetStatistics = () => {
    const [userCreationDate, setUserCreationDate] = useState("");
    const [oldestSet, setOldestSet] = useState([]);
    const [firstSet, setFirstSet] = useState([]);
    const [firstSetDate, setFirstSetDate] = useState("");
    const [topPiecesSet, setTopPiecesSet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalSets, setTotalSets] = useState(0);
    const [totalPieces, setTotalPieces] = useState(0);
    const [popTheme, setPopTheme] = useState("");
    const [popThemeAmount, setPopThemeAmount] = useState(0);
    const [popYear, setPopYear] = useState(0);
    const [popYearAmount, setPopYearAmount] = useState(0);
    const [numMOCs, setNumMOCs] = useState(-1);
    const [numMissingPieces, setNumMissingPieces] = useState(-1);

    const setsCollectionRef = collection(db, "sets");
    const piecesCollectionRef = collection(db, "pieces");

    const { userID } = useGetUserInfo();

    const fetchStats = async () => {
        setLoading(true);

        try {

            // get user data and extract creation date 
            const userDocRef = doc(db, "users", userID);
            const userDoc = await getDoc(userDocRef);

            const tempUserDate = new Date(userDoc.data().createdAt);
            const userDate = tempUserDate.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });

            setUserCreationDate(userDate);

            // query to sort by oldest year, extract first element, and find most popular theme
            const oldestQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                orderBy("year", "asc")
            );

            const oldestSnapshot = await getDocs(oldestQuery);
            const oldestSets = oldestSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setOldestSet(oldestSets[0]);

            const themeCounts = {};

            oldestSets.forEach((set) => {
                const { theme_id } = set;
                if (themeCounts[theme_id]) {
                    themeCounts[theme_id]++;
                } else {
                    themeCounts[theme_id] = 1;
                }
            });
        
            // Find the theme_id with the maximum count
            let mostCommonThemeId = null;
            let maxCount = 0;
        
            for (const [themeId, count] of Object.entries(themeCounts)) {
                if (count > maxCount) {
                    mostCommonThemeId = themeId;
                    maxCount = count;
                }
            }

            setPopTheme(mostCommonThemeId);
            setPopThemeAmount(maxCount);

            // query to sort by first added in createdAt, extract first element, and find most popular year
            const firstQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt", "asc")
            );

            const firstSnapshot = await getDocs(firstQuery);
            const firstSets = firstSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setFirstSet(firstSets[0]);

            const tempDate = new Date(firstSets[0].createdAt.seconds * 1000);
            const fullDate = tempDate.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });

            setFirstSetDate(fullDate);

            const yearCounts = {};

            firstSets.forEach((set) => {
                const { year } = set;
                if (yearCounts[year]) {
                    yearCounts[year]++;
                } else {
                    yearCounts[year] = 1;
                }
            });
        
            // Find the theme_id with the maximum count
            let mostCommonYear = null;
            let maxCountYear = 0;
        
            for (const [year, count] of Object.entries(yearCounts)) {
                if (count > maxCountYear) {
                    mostCommonYear = year;
                    maxCountYear = count;
                }
            }

            setPopYear(mostCommonYear);
            setPopYearAmount(maxCountYear);

            // query to sort by num_parts, extract first element, and find the length of total sets and total piece count
            const pieceQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                orderBy("num_parts", "desc")
            );

            const pieceSnapshot = await getDocs(pieceQuery);
            const pieceSets = pieceSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setTopPiecesSet(pieceSets[0]);
            setTotalSets(pieceSets.length);

            let countPieces = 0;

            pieceSets.forEach((set) => {
                const { num_parts } = set;
                countPieces = countPieces + num_parts;
            });

            setTotalPieces(countPieces);

            // query to find number of mocs
            const mocQuery = query(
                setsCollectionRef,
                where("userID", "==", userID),
                where("theme_id", "==", "MOC")
            );

            const mocSnapshot = await getDocs(mocQuery);
            const mocSets = mocSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setNumMOCs(mocSets.length);

            // query to find number of missing pieces for the logged-in user
            const missingPiecesQuery = query(
                piecesCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt", "desc")
            );

            const missingPiecesSnapshot = await getDocs(missingPiecesQuery);
            const newPieces = missingPiecesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setNumMissingPieces(newPieces.length);

        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setLoading(false);
        }
    }
    
    return {
        userCreationDate,
        oldestSet,
        firstSet,
        firstSetDate,
        topPiecesSet,
        loading,
        fetchStats,
        totalSets,
        totalPieces,
        popTheme,
        popThemeAmount,
        popYear,
        popYearAmount,
        numMOCs,
        numMissingPieces
    }
}
