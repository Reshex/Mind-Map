import { db } from "@/firebase";
import UserType from "@/types/UserType";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const auth = getAuth();

export default async function registerUserToDB(values: UserType) {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("This email is already registered. Please use a different email.");
    }

    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

    // After creating the user, you can get their ID token (optional)
    const token = await userCredential.user.getIdToken();

    const docRef = await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      createdAt: new Date(),
    });

    console.log("Saved user with ID:", docRef.id);

    return { uid: userCredential.user.uid, token };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}
