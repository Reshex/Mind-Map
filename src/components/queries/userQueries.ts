import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import UserType from "@/types/UserType";

export default async function registerUserToDB(values: UserType) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const user = userCredential.user;

    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      createdAt: new Date(),
    });

    console.log("User successfully registered with Firestore ID:", docRef.id);
    return { uid: user.uid };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}
