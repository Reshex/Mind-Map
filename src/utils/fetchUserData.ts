import { getUserFromDB } from "@/db/userDB";
import { Dispatch, SetStateAction } from "react";

export async function fetchUserData(
  userId: string,
  setError: Dispatch<SetStateAction<string | null>>,
  setName: Dispatch<SetStateAction<string>>,
  setLastName: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    const userData = await getUserFromDB(userId);
    
    if (!userData) {
      setError("User data not found");
      return;
    }

    setName(userData.name);
    setLastName(userData.lastName);
    setEmail(userData.email);
  } catch (err) {
    console.error("Failed to fetch user data:", err);
    setError("Failed to fetch user data");
  } finally {
    setIsLoading(false);
  }
}
