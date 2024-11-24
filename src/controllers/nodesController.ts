import { Edge, Node } from "reactflow";
import { editNodeToDB, getNodesFromDB, removeNodeFromDB, addNodeToDB } from "../db/nodeDB";
import { addEdgeToDB, removeEdgeFromDB } from "../db/edgeDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { onUpdateMap } from "./mapController";

interface OnGetNodeParams {
  mapId: string;
  edges: Edge[];
}
interface AddNodeParams {
  creatorId: string;
  mapId: string;
  label: string;
  selectedNodeId: string | null;
  nodes: Node<CustomNodeDataType>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

interface OnRemoveNodeParams {
  creatorId: string;
  mapId: string;
  nodes: Node<CustomNodeDataType>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  selectedNodeId: string | null;
}

interface OnEditNodeParams {
  creatorId: string;
  mapId: string;
  label: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  nodes: Node<CustomNodeDataType>[];
  selectedNodeId: string | null;
}

export async function onGetNodes({ mapId }: OnGetNodeParams) {
  try {
    const nodesFromDB = await getNodesFromDB(mapId);
    if (!nodesFromDB) throw new Error("Failed to fetch nodes");
    return nodesFromDB;
  } catch (error) {
    console.error("Failed to fetch nodes", error);
  }
}

export async function onAddNode({
  creatorId,
  mapId,
  label,
  selectedNodeId,
  nodes,
  edges,
  setNodes,
  setEdges,
}: AddNodeParams) {
  try {
    if (!selectedNodeId) return;

    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    if (!selectedNode) return;

    const siblingNodes = nodes.filter((node) => node.data.parentId === selectedNodeId);
    const spacingX = 150;
    const xPosition = selectedNode.position.x + siblingNodes.length * spacingX;
    const yPosition = selectedNode.position.y + 150;

    const newNodeId = await addNodeToDB(mapId, {
      label,
      selectedNodeId,
      xPosition,
      yPosition,
    });
    if (!newNodeId) return;

    const newNode: Node<CustomNodeDataType> = {
      id: newNodeId,
      type: "custom",
      position: { x: xPosition, y: yPosition },
      data: {
        mapId,
        label,
        parentId: selectedNodeId,
        setSelectedNodeId: () => {},
        addNode: () => {},
        removeNode: () => {},
        editNode: () => {},
      },
    };

    const newEdge: Edge = {
      id: `e${selectedNodeId}-${newNodeId}`,
      source: selectedNodeId,
      target: newNodeId,
      data: { mapId },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);

    await addEdgeToDB(newEdge);

    await onUpdateMap(creatorId, mapId, {
      nodes: [...nodes, newNode],
      edges: [...edges, newEdge],
    });
  } catch (error) {
    console.error("Failed to add node", error);
  }
}

export async function onRemoveNode({
  creatorId,
  mapId,
  nodes,
  edges,
  setNodes,
  setEdges,
  selectedNodeId,
}: OnRemoveNodeParams) {
  try {
    if (!selectedNodeId) return;

    const updatedNodes = nodes.filter((node) => node.id !== selectedNodeId);
    setNodes(updatedNodes);

    const edgesToRemove = edges.filter((edge) => edge.source === selectedNodeId || edge.target === selectedNodeId);
    edgesToRemove.forEach((edge) => {
      removeEdgeFromDB(edge.id);
    });
    const updatedEdges = edges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId);
    setEdges(updatedEdges);

    await removeNodeFromDB(selectedNodeId);

    await onUpdateMap(creatorId, mapId, {
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  } catch (error) {
    console.error("Failed to remove node", error);
  }
}

export async function onEditNode({ creatorId, mapId, label, setNodes, nodes, selectedNodeId }: OnEditNodeParams) {
  try {
    if (!selectedNodeId) return;

    // Update the node label in the database
    await editNodeToDB(selectedNodeId, label);

    // Calculate the updated nodes
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node
    );

    // Update the state
    setNodes(updatedNodes);

    // Update the map in the database with the updated nodes
    await onUpdateMap(creatorId, mapId, {
      nodes: updatedNodes,
    });
  } catch (error) {
    console.error("Failed to edit node", error);
  }
}
