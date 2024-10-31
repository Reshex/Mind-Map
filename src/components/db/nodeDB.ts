import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export async function getNodesFromDB() {
  const nodesCollection = collection(db, "nodes");
  const nodesSnapshot = await getDocs(nodesCollection);
  const nodesList = nodesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return nodesList;
}

export async function addNodeToDB({
  label,
  selectedNodeId,
  xPosition,
  yPosition,
}: {
  label: string;
  selectedNodeId: string | null;
  xPosition: number;
  yPosition: number;
}) {
  try {
    const nodesCollectionRef = collection(db, "nodes");
    const docRef = await addDoc(nodesCollectionRef, {
      type: "custom",
      data: {
        label,
        parentId: selectedNodeId,
      },
      position: { x: xPosition, y: yPosition },
      createdAt: new Date(),
    });

    await updateDoc(doc(db, "nodes", docRef.id), {
      id: docRef.id,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving node to database", error);
    return null;
  }
}

export async function removeNodeFromDB(nodeId: string) {
  try {
    const nodeDocRef = doc(db, "nodes", nodeId);

    await deleteDoc(nodeDocRef);
    console.log("Node deleted with ID:", nodeId);
  } catch (error) {
    console.error("Error removing node", error);
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
