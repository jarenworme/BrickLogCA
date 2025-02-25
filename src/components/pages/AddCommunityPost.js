import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCommunityPost } from "../../hooks/useAddCommunityPost";
import "../styles/add.css";


export default function AddCommunityPost () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const routeCommunity = () => navigate("/community", { replace: false });

    // state variables
    const [postText, setPostText] = useState("");
    const [lengthError, setLengthError] = useState("");

    // hook data
    const { addCommunityPost } = useAddCommunityPost();

    // function to handle adding the post on form submission
    const handleAddPiece = async (event) => {
        event.preventDefault();
        if (postText.length >= 2000) {
            setLengthError("Please keep your post under 2000 characters");
        } else {
            setLengthError("");
        }

        try {
            await addCommunityPost(postText);
            routeCommunity();
        } catch (err) {
            console.error("Error adding post:", err);
        }
    }

    return (
        <div className="add-post-wrapper">
            <h1 className="add-title">Add a post</h1>
            <form className="add-post-form" onSubmit={handleAddPiece}>
                <textarea 
                    className="add-post-textarea"
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText}
                    rows="10"
                    placeholder="What's on your mind?"
                />


                { lengthError && (<p className="add-field-error">{lengthError}</p>) }
                <div className="add-btn-wrapper">
                    <button 
                        className="add-post-submit-btn" 
                        type="submit" 
                        disabled={postText.length < 4}
                    >
                        Add Post
                    </button>
                    <button 
                        className="add-post-cancel-btn" 
                        type="button" 
                        onClick={routeCommunity}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
