import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase-config";
import { useGetUserMetadata} from "../../hooks/useGetUserMetedata";
import "../styles/account.css";


export default function EditProfile() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateAccount = () => navigate('/account', { replace: false });

    // firebase data
    const auth = getAuth();
    const user = auth.currentUser;

    //hook data
    const { tier, display } = useGetUserMetadata();

    // state variables
    const [displayName, setDisplayName] = useState(display || "");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // set display name when the display is loaded from hook
    useEffect(() => {    
        setDisplayName(display);
    }, [display]);

    // function to handle the user inputted photo file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

    // function to save changes to a user profile
    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            let photoURL = user.photoURL;

            // Upload new profile picture to Firebase Storage
            if (profilePic) {
                const storageRef = ref(storage, `profile_pictures/${user.uid}`);
                await uploadBytes(storageRef, profilePic);
                photoURL = await getDownloadURL(storageRef);
            }

            // Update display name & photo in Firebase Authentication
            await updateProfile(user, {
                displayName,
                photoURL,
            });

            // Update user data in Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { displayName, photoURL });

            navigateAccount();
        } catch (error) {
            setMessage("Error updating profile: " + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="edit-profile-wrapper">
            <h1 className="account-title">Edit Profile</h1>
            <h2 className="account-text-larger">Change Profile Pic</h2>
            { tier === 1 
                ?
                <h3 className="account-text-large">Tier 2 subscription required to change profile pic</h3>
                :
                <div className="account-profile-img-content-wrapper">
                    { preview !== "" && 
                        <div className="account-profile-img-wrapper">
                            <img src={preview} alt="Profile Preview" className="account-profile-img" />
                        </div>
                    }
                    <input className="account-file-input" type="file" onChange={handleFileChange} accept="image/*" />
                </div>
            }
            <h2 className="account-text-larger">Change Display Name</h2>
            <input
                className="account-text-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter new display name"
            />
            <button className="account-btn-secondary" onClick={handleUpdateProfile} disabled={loading}>
                { loading ? "Updating..." : "Save Changes" }
            </button>
            { message === "" && message }
            <button className="account-btn" onClick={navigateAccount}>Back</button>
        </div>
    );
}
