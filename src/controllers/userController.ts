import { auth } from "@/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, User } from "firebase/auth";
import { updatePassword } from "firebase/auth";

export async function reauthenticateUser(user: User, currentPassword: string) {
  try {
    if (!user.email) throw new Error("User email is not available.");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    console.error("Reauthentication failed:", error);
    throw new Error("Reauthentication failed. Please check your current password.");
  }
}

export async function changeUserPassword(user: User, newPassword: string) {
  try {
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Failed to update password:", error);
    throw new Error("Failed to update password. Check if your new password has at least 8 characters and one digit.");
  }
}

export async function sendPasswordReset(userEmail: string) {
  try {
    await sendPasswordResetEmail(auth, userEmail);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email.");
  }
}
