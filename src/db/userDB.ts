import { auth, db } from "@/firebase";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import User from "@/types/userTypes/userType";
import { Map } from "@/types/mapTypes/mapType";
import {
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";

export async function getUsersFromDB() {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const users = querySnapshot.docs.map((doc) => doc.data() as User);
    return users;
  } catch (error) {
    console.error("Failed to load map", error);
  }
}

export async function getUserFromDB(userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    return userSnapshot.data();
  } catch (error) {
    console.error("Failed to fetch user data");
  }
}

export async function registerUserToDB(values: User, userId: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return console.error("Email already exists");
    }

    await setDoc(doc(usersCollectionRef, userId), {
      userId,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      maps: [],
      createdAt: new Date(),
    });

    return { userId };
  } catch (error) {
    console.error("Failed to register user to database");
  }
}

export async function updateUserToDB(userId: string, values: Partial<User>) {
  try {
    const userRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const updateData = { ...values };
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error("Failed to update user", error);
  }
}

export async function removeUserFromDB(userId: string, email?: string, password?: string) {
  try {
    const user = auth.currentUser;
    if (!user) return console.error("No user is signed in.");

    const providerId = user.providerData[0]?.providerId;

    if (providerId === "google.com") {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
    } else if (providerId === "password" && email && password) {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
    } else {
      return console.error("Unsupported authentication provider or missing credentials.");
    }

    await deleteUser(user);

    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);

    return true;
  } catch (error) {
    return console.error("Failed to remove user:", error);
  }
}

export async function saveMapToUserDB(userId: string, newMapValues: Map) {
  try {
    const userRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      return console.error("User not found");
    }

    const userData = userSnapshot.data();
    const maps = userData.maps || [];

    const newMaps = [...maps, newMapValues];

    await updateDoc(userRef, { maps: newMaps });
  } catch (error) {
    return console.error("Failed to save map to user database");
  }
}

export async function updateMapToUserDB(userId: string, mapId: string, newMapValues: Partial<Map>) {
  try {
    const userRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnapshot.data();
    const maps = userData.maps;

    const updatedMaps = maps.map((map: Map) => (map.mapId === mapId ? { ...map, ...newMapValues } : map));
    await updateDoc(userRef, { maps: updatedMaps });
  } catch (error) {
    return console.error("Failed to update map in user document:", error);
  }
}