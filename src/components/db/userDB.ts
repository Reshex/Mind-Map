import { db } from "@/firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import User from "@/types/userTypes/userType";

export default async function registerUserToDB(values: User, userUid: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return { error: "Email already exists" };
    }

    const docRef = await setDoc(doc(usersCollectionRef, userUid), {
      uid: userUid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      map: [],
      createdAt: new Date(),
    });

    console.log("User successfully registered with Firestore ID:", docRef);
    return { uid: userUid };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}
