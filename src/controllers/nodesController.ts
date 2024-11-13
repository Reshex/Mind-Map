import { Edge, Node } from "reactflow";
import { editNodeToDB, getNodesFromDB, removeNodeFromDB, addNodeToDB } from "../db/nodeDB";
import { addEdgeToDB, removeEdgeFromDB } from "../db/edgeDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";

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
    console.log(mapId)
    const nodesFromDB = await getNodesFromDB();
    if (!nodesFromDB) throw new Error("Failed to fetch nodes");
    nodesFromDB.map((node) => {
      setNodes((nds) => [...nds, node as Node<CustomNodeDataType>]);
    });
    return nodesFromDB;
  } catch (error) {
    console.error("Failed to fetch nodes", error);
  }
}

export async function onAddNode({ mapId, label, selectedNodeId, nodes, setNodes, setEdges }: AddNodeParams) {
  try {
    if (!selectedNodeId) return;

    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    if (!selectedNode) return;

    const siblingNodes = nodes.filter((node) => node.data.parentId === selectedNodeId);
    const spacingX = 150;
    const xPosition = selectedNode.position.x + siblingNodes.length * spacingX;
    const yPosition = selectedNode.position.y + 150;

    const tempNodeId = `temp_${Date.now()}`;
    const tempNode: Node<CustomNodeDataType> = {
      id: tempNodeId,
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
        id: tempNodeId,
        type: "custom",
        data: {
          label,
        },
      },
    };

    const tempEdge: Edge = {
      id: `e${selectedNodeId}-${tempNodeId}`,
      source: selectedNodeId,
      target: tempNodeId,
    };
    setNodes((nds) => [...nds, tempNode]);
    setEdges((eds) => [...eds, tempEdge]);

    const newNodeId = await addNodeToDB(mapId, { label, selectedNodeId, xPosition, yPosition });

    if (!newNodeId) return;

    setNodes((nds) => nds.map((node) => (node.id === tempNodeId ? { ...node, id: newNodeId } : node)));

    const newEdge: Edge = {
      id: `e${selectedNodeId}-${newNodeId}`,
      source: selectedNodeId,
      target: newNodeId,
    };
    setEdges((eds) => [...eds, newEdge]);

    await addEdgeToDB(newEdge);
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
