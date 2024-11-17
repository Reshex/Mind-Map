import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export async function getNodesFromDB(mapId: string) {
  try {
    const nodesCollection = collection(db, "nodes");
    const nodesQuery = query(nodesCollection, where("mapId", "==", mapId));
    const nodesSnapshot = await getDocs(nodesQuery);

    const nodesList = nodesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return nodesList;
  } catch (error) {
    console.error("Failed to fetch nodes", error);
  }
}

export async function addNodeToDB(
  mapId: string,
  {
    label,
    selectedNodeId,
    xPosition,
    yPosition,
  }: {
    label: string;
    selectedNodeId: string | null;
    xPosition: number;
    yPosition: number;
  }
) {
  try {
    const nodeId = `Node-${crypto.randomUUID()}`;

    const nodeDocRef = doc(db, "nodes", nodeId);
    await setDoc(nodeDocRef, {
      id: nodeId,
      mapId,
      type: "custom",
      position: { x: xPosition, y: yPosition },
      data: {
        label,
        parentId: selectedNodeId || null,
      },
    });

    return nodeId;
  } catch (error) {
    console.error("Failed saving node to database", error);
    return null;
  }
}

export async function removeNodeFromDB(nodeId: string) {
  try {
    const nodeDocRef = doc(db, "nodes", nodeId);
    await deleteDoc(nodeDocRef);
  } catch (error) {
    console.error("Failed removing node", error);
  }
}

export async function editNodeToDB(nodeId: string, newLabel: string) {
  try {
    await updateDoc(doc(db, "nodes", nodeId), {
      data: {
        label: newLabel,
      },
    });
  } catch (error) {
    console.error("Failed to edit node:", error);
  }
}
