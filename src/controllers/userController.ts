import { EmailAuthProvider, reauthenticateWithCredential, User } from "firebase/auth";
import { updatePassword } from "firebase/auth";

export async function reauthenticateUser(user: User, currentPassword: string) {
  try {
    if (!user.email) throw new Error("User email is not available.");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    console.log("User reauthenticated successfully.");
  } catch (error) {
    console.error("Reauthentication failed:", error);
    throw new Error("Reauthentication failed. Please check your current password.");
  }
}

export async function changeUserPassword(user: User, newPassword: string) {
  try {
    await updatePassword(user, newPassword);
    console.log("Password updated successfully.");
  } catch (error) {
    console.error("Failed to update password:", error);
    throw new Error("Failed to update password. Check if your new password has at least 8 characters and one digit.");
  }
}
