import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function addEdgeToDB() {
  const edgeCollectionRef = collection(db, "edges");
  const docRef = await addDoc(edgeCollectionRef, {
    createdAt: new Date(),
  });
}

export async function removeEdgeFromDB() {}
