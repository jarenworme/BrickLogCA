import { useState } from "react";
import { query, collection, orderBy, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to calculate statistics for all statistics fields for the community stats tab
export const useGetOnlineStatistics = () => {
    const [isLoadingComStats, setisLoadingComStats] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTier3Users, setTotalTier3Users] = useState(0);
    const [firstSet, setFirstSet] = useState("");
    const [lastSet, setLastSet] = useState("");
    const [totalSets, setTotalSets] = useState(0);
    const [totalMOCs, setTotalMOCs] = useState(0);
    const [totalMissingPieces, setTotalMissingPieces] = useState(0);
    const [popTheme, setPopTheme] = useState("");
    const [popThemeAmount, setPopThemeAmount] = useState(0);
    const [totalGlobalSets, setTotalGlobalSets] = useState(0);
    const [mostSetsImgUrl, setMostSetsImgUrl] = useState("");
    const [mostSetsUsername, setMostSetsUsername] = useState("");
    const [mostSetsNumber, setMostSetsNumber] = useState(0);
    const [popSetImgUrl, setPopSetImgUrl] = useState("");
    const [popSetName, setPopSetName] = useState("");
    const [popSetNum, setPopSetNum] = useState("");
    const [popSetAmount, setPopSetAmount] = useState(0);

    const userCollectionRef = collection(db, "users");
    const setsCollectionRef = collection(db, "sets");
    const piecesCollectionRef = collection(db, "pieces");
    // const globalSetsCollectionRef = collection(db, "global-sets");

    const fetchOnlineStats = async () => {
        setisLoadingComStats(true);

        try {
            // query to get number of total users
            const usersQuery = query(
                userCollectionRef
            );

            const usersSnapshot = await getDocs(usersQuery);
            const users = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setTotalUsers(users.length);

            // query to get number of tier 3 users
            const userTier3Query = query(
                userCollectionRef,
                where("subscriptionTier", "==", 3),
            );

            const usersT3Snapshot = await getDocs(userTier3Query);
            const usersT3 = usersT3Snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setTotalTier3Users(usersT3.length);

            // query to find the first and most recently logged sets,total sets logged, most popular theme, userID with the most logged
            // sets and most popular set (most logged)
            const firstQuery = query(
                setsCollectionRef,
                orderBy("createdAt", "asc")
            );

            const firstSnapshot = await getDocs(firstQuery);
            const allUserSets = firstSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // 1) first get the total amount of sets logged
            setTotalSets(allUserSets.length);

            // 2) find the most popular theme_id and the amount associated
            const themeCounts = {};

            allUserSets.forEach((set) => {
                const { theme_id } = set;
                if (themeCounts[theme_id]) {
                    themeCounts[theme_id]++;
                } else {
                    themeCounts[theme_id] = 1;
                }
            });
        
            let mostCommonThemeId = null;
            let maxThemeCount = 0;
        
            for (const [themeId, count] of Object.entries(themeCounts)) {
                if (count > maxThemeCount) {
                    mostCommonThemeId = themeId;
                    maxThemeCount = count;
                }
            }

            setPopTheme(mostCommonThemeId);
            setPopThemeAmount(maxThemeCount);

            // 3) find the userID with the most logged sets
            const userCounts = {};

            allUserSets.forEach((set) => {
                const { userID } = set;
                if (userCounts[userID]) {
                    userCounts[userID]++;
                } else {
                    userCounts[userID] = 1;
                }
            });
        
            let mostCommonUserId = null;
            let maxUserCount = 0;
        
            for (const [userId, count] of Object.entries(userCounts)) {
                if (count > maxUserCount) {
                    mostCommonUserId = userId;
                    maxUserCount = count;
                }
            }

            const userDocRef = doc(db, "users", mostCommonUserId);
            const userDoc = await getDoc(userDocRef);

            if(userDoc.data().photoURL) {
                setMostSetsImgUrl(userDoc.data().photoURL);
            }
            setMostSetsUsername(userDoc.data().displayName);
            setMostSetsNumber(maxUserCount);

            // 4) find the set with the most logs efficiently using a frequency map with reduce
            const countMap = new Map();
            let maxSetCount = 0;
            let mostCommonSetNum = null;
            let mostCommonSetName = null;
            let mostCommonSetImgUrl = null;

            for (const set of allUserSets) {
                const { set_num, name, img_url } = set;
                const count = (countMap.get(set_num)?.count || 0) + 1;
                countMap.set(set_num, { count, name, img_url });

                // Update most common set_num and max count
                if (count > maxSetCount) {
                    maxSetCount = count;
                    mostCommonSetNum = set_num;
                    mostCommonSetName = name;
                    mostCommonSetImgUrl = img_url;
                }
            }

            setPopSetImgUrl(mostCommonSetImgUrl);
            setPopSetName(mostCommonSetName);
            setPopSetNum(mostCommonSetNum);
            setPopSetAmount(maxSetCount);

            // 5) finally extract the date from the first and last elements (placed last due to the use of pop)
            const tempDateFirst = new Date(allUserSets[0].createdAt.seconds * 1000);
            const fullDateFirst = tempDateFirst.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });

            const tempDateLast = new Date(allUserSets.pop().createdAt.seconds * 1000);
            const fullDateLast = tempDateLast.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });

            setFirstSet(fullDateFirst);
            setLastSet(fullDateLast);

            // query to find the number of sets with the theme MOC
            const MOCQuery = query(
                setsCollectionRef,
                where("theme_id", "==", "MOC")
            );

            const MOCSnapshot = await getDocs(MOCQuery);
            const MOCSets = MOCSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setTotalMOCs(MOCSets.length);

            // query to get number of total users
            const missingPiecesQuery = query(
                piecesCollectionRef
            );

            const missingPiecesSnapshot = await getDocs(missingPiecesQuery);
            const missingPieces = missingPiecesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            setTotalMissingPieces(missingPieces.length);

            // query to get number of total sets in the archive
            // can be run in admin to get number, but hard coded to save load time since the num won't change between database updates

            // const GlobalQuery = query(
            //     globalSetsCollectionRef
            // );

            // const globalSnapshot = await getDocs(GlobalQuery);
            // const globalSets = globalSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // console.log("total archive sets:", globalSets.length);
            setTotalGlobalSets(12553);
            
        } catch (err) {
            console.error("Error fetching sets:", err);
        } finally {
            setisLoadingComStats(false);
        }
    }
    
    return {
        fetchOnlineStats,
        isLoadingComStats,
        totalUsers,
        totalTier3Users,
        firstSet,
        lastSet,
        totalSets,
        totalMOCs,
        totalMissingPieces,
        popTheme,
        popThemeAmount,
        totalGlobalSets,
        mostSetsImgUrl,
        mostSetsUsername,
        mostSetsNumber,
        popSetImgUrl,
        popSetName,
        popSetNum,
        popSetAmount
    }
}
