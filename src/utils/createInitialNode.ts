import { addNodeToDB } from "@/db/nodeDB";
import { Node } from "reactflow";

async function createInitialNode(nodeName: string, mapId: string): Promise<Node> {
  const initialNode: Node = {
    id: "temp_initial",
    type: "initial",
    data: {
      mapId,
      parentName: null,
      label: nodeName,
      setSelectedNodeId: () => {},
      addNode: () => {},
      editNode: () => {},
    },
    position: { x: 0, y: 0 },
  };

  try {
    const nodeId = await addNodeToDB(mapId, {
      label: nodeName,
      selectedNodeId: null,
      xPosition: 0,
      yPosition: 0,
      type: "initial",
    });

    if (nodeId) {
      return { ...initialNode, id: nodeId };
    } else {
      console.error("Failed to save initial node to the database.");
      return initialNode;
    }
  } catch (error) {
    console.error("Error saving initial node:", error);
    return initialNode;
  }
}

export default createInitialNode;
