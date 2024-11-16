import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Edge } from "reactflow";

export async function getEdgesFromDB(mapId: string): Promise<Edge[]> {
  try {
    const edgesCollection = collection(db, "edges");
    const edgesQuery = query(edgesCollection, where("mapId", "==", mapId));
    const edgesSnapshot = await getDocs(edgesQuery);

    const edgeList = edgesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Edge[];
    return edgeList;
  } catch (error) {
    console.error("Failed to fetch edges", error);
    return [];
  }
}

export async function addEdgeToDB(edge: Edge) {
  try {
    const edgeCollectionRef = collection(db, "edges");
    const edgeId = `e${edge.source}-${edge.target}`;
    await setDoc(doc(edgeCollectionRef, edgeId), {
      ...edge,
    });
  } catch (error) {
    console.error("Failed to save edge to database", error);
  }
}

export async function removeEdgeFromDB(edgeId: string) {
  try {
    const edgeDocRef = doc(db, "edges", edgeId);

    await deleteDoc(edgeDocRef);
  } catch (error) {
    console.error("Failed to delete edge from database", error);
  }
}
