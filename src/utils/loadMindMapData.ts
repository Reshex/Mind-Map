import { onGetNodes } from "@/controllers/nodesController";
import { Edge, Node } from "reactflow";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import createInitialNode from "./createInitialNode";

export default async function loadData(
  mapId: string,
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  onGetConnections: Function
) {
  try {
    const fetchedNodes = await onGetNodes({
      mapId,
      edges,
    });

    if (fetchedNodes && fetchedNodes.length > 0) {
      setNodes(fetchedNodes as Node<CustomNodeDataType>[]);
    } else {
      console.warn(`No nodes found for mapId: ${mapId}. Creating an initial node.`);
      const initialNode = await createInitialNode("Initial Node", mapId);
      setNodes([initialNode]);
    }

    const fetchedEdges = await onGetConnections({ mapId });
    if (fetchedEdges) {
      setEdges(fetchedEdges as Edge[]);
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
