import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export async function getNodesFromDB() {
  try {
    const nodesCollection = collection(db, "nodes");
    const nodesSnapshot = await getDocs(nodesCollection);
    const nodesList = nodesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return nodesList;
  } catch (error) {
    console.error("Failed to fetch nodes", error);
  }
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
      position: { x: xPosition, y: yPosition },
      data: {
        label,
        parentId: selectedNodeId,
      },
    });

    await updateDoc(doc(db, "nodes", docRef.id), {
      id: docRef.id,
    });

    return docRef.id;
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
