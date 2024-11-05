import { db } from "@/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Edge } from "reactflow";

export async function loadMapFromDB(userId: string) {
  try {
    const mapCollectionRef = collection(db, "maps");
    const userMapQueries = query(mapCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userMapQueries);
    if (!querySnapshot.empty) {
      console.log(querySnapshot.docs[0].data())
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    console.error("Failed to load map", error);
  }
}

export async function saveMapToDB(mapId: string, userId: string, nodes: Node[], edges: Edge[]) {
  try {
    const mapRef = doc(db, "maps", mapId);
    await setDoc(mapRef, {
      mapId,
      userId,
      nodes: nodes.map((node) => ({ ...node })),
      edges: edges.map((edge) => ({ ...edge })),
    });
    console.log("Map saved successfully!");
  } catch (error) {
    console.error("Error saving map: ", error);
  }
}

