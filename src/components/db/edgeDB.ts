import { db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Edge } from "reactflow";

export async function getEdgesFromDB(): Promise<Edge[]> {
  try {
    const edgesCollection = collection(db, "edges");
    const edgesSnapshot = await getDocs(edgesCollection);
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
    await addDoc(edgeCollectionRef, {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type || null,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to save edge to database", error);
  }
}

export async function removeEdgeFromDB() {}
