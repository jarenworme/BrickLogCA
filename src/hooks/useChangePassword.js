import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


// this hook changes a user's password in Firebase if they provide their correct current password
export const useChangePassword = () => {
    const auth = getAuth();

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No authenticated user found");

            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // If successful, update password 
            await updatePassword(user, newPassword);
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error.message);
            alert(error.message);
        }
    };

    return { changePassword };
};
