import { db } from "@/firebase";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import User from "@/types/userTypes/userType";

export async function registerUserToDB(values: User, userUid: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return { error: "Email already exists" };
    }

    await setDoc(doc(usersCollectionRef, userUid), {
      uid: userUid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      map: [],
      createdAt: new Date(),
    });

    return { uid: userUid };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export async function updateUserToDB(userUid: string, values: Partial<User>) {
  try {
    const userRef = doc(db, "users", userUid);

    const updateData = { ...values };

    if (Array.isArray(values.maps)) {
      updateData.maps = arrayUnion(...values.maps);
    }

    await updateDoc(userRef, updateData);
    console.log("User document successfully updated:", updateData);
  } catch (error) {
    console.error("Failed to update user", error);
  }
}
