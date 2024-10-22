import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import UserType from "@/types/userTypes/UserType";

export default async function registerUserToDB(values: UserType, userUid: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return { error: "Email already exists" };
    }

    const docRef = await addDoc(usersCollectionRef, {
      uid: userUid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      createdAt: new Date(),
    });

    console.log("User successfully registered with Firestore ID:", docRef.id);
    return { uid: userUid };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}
