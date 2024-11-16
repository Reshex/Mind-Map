import { Edge, Node } from "reactflow";
import { editNodeToDB, getNodesFromDB, removeNodeFromDB, addNodeToDB } from "../db/nodeDB";
import { addEdgeToDB, removeEdgeFromDB } from "../db/edgeDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { updateMapToDB } from "@/db/mapDB";

interface OnGetNodeParams {
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  mapId: string;
  edges: Edge[];
}
interface AddNodeParams {
  mapId: string;
  label: string;
  selectedNodeId: string | null;
  nodes: Node<CustomNodeDataType>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

interface OnRemoveNodeParams {
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  selectedNodeId: string | null;
}

interface OnEditNodeParams {
  label: string;
  selectedNodeId: string | null;
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
}

export async function onGetNodes({ mapId, setNodes }: OnGetNodeParams) {
  try {
    const nodesFromDB = await getNodesFromDB(mapId);
    if (!nodesFromDB) throw new Error("Failed to fetch nodes");
    nodesFromDB.map((node) => {
      setNodes((nds) => [...nds, node as Node<CustomNodeDataType>]);
    });
    return nodesFromDB;
  } catch (error) {
    console.error("Failed to fetch nodes", error);
  }
}

export async function onAddNode({ mapId, label, selectedNodeId, nodes, edges, setNodes, setEdges }: AddNodeParams) {
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

    setNodes((nds) => [...nds, newNode]);

    const newEdge: Edge = {
      id: `e${selectedNodeId}-${newNodeId}`,
      source: selectedNodeId,
      target: newNodeId,
      data: { mapId },
    };

    setEdges((eds) => [...eds, newEdge]);

    await addEdgeToDB(newEdge);

    await updateMapToDB(mapId, {
      nodes: [...nodes, newNode],
      edges: [...edges, newEdge],
    });
  } catch (error) {
    console.error("Failed to add node", error);
  }
}

export function onRemoveNode({ setNodes, setEdges, selectedNodeId }: OnRemoveNodeParams) {
  try {
    if (!selectedNodeId) return;

    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));

    setEdges((eds) => {
      const edgesToRemove = eds.filter((edge) => edge.source === selectedNodeId || edge.target === selectedNodeId);

      edgesToRemove.forEach((edge) => {
        removeEdgeFromDB(edge.id);
      });
      return eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId);
    });
    removeNodeFromDB(selectedNodeId);
  } catch (error) {
    console.error("Failed to remove node", error);
  }
}

export function onEditNode({ label, setNodes, selectedNodeId }: OnEditNodeParams) {
  try {
    if (!selectedNodeId) return;
    editNodeToDB(selectedNodeId, label);
    setNodes((nds) =>
      nds.map((node) => (node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node))
    );
  } catch (error) {
    console.error("Failed to edit node");
  }
}
