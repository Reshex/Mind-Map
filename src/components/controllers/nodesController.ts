import { Node, Edge, Connection, addEdge } from "reactflow";
import CustomNodeDataType from "@/types/nodeTypes/CustomNodeDataType";
import { removeNodeFromDB, saveNodeToDB } from "../db/nodeDB";

interface AddNodeParams {
  label: string;
  selectedNodeId: string | null;
  nodes: Node<CustomNodeDataType>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

interface OnConnectParams {
  params: Edge | Connection;
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

export async function onAddNode({ label, selectedNodeId, nodes, setNodes, setEdges }: AddNodeParams) {
  if (!selectedNodeId) return;

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  if (!selectedNode) return;

  const tempNodeId = `temp_${Date.now()}`;
  const siblingNodes = nodes.filter((node) => node.data.parentId === selectedNodeId);
  const spacingX = 150;
  const xPosition = selectedNode.position.x + siblingNodes.length * spacingX;
  const yPosition = selectedNode.position.y + 150;

  const newNode: Node<CustomNodeDataType> = {
    id: tempNodeId,
    type: "custom",
    data: {
      label,
      parentId: selectedNodeId,
      setSelectedNodeId: () => {},
      addNode: () => {},
      removeNode: () => {},
      editNode: () => {},
    },
    position: { x: xPosition, y: yPosition },
  };

  const newEdge: Edge = {
    id: `e${selectedNodeId}-${tempNodeId}`,
    source: selectedNodeId,
    target: tempNodeId,
  };

  setNodes((nds) => [...nds, newNode]);
  setEdges((eds) => [...eds, newEdge]);

  const newNodeId = await saveNodeToDB({ label, selectedNodeId, xPosition, yPosition });

  if (newNodeId) {
    setNodes((nds) => nds.map((node) => (node.id === tempNodeId ? { ...node, id: newNodeId } : node)));
    setEdges((eds) => eds.map((edge) => (edge.target === tempNodeId ? { ...edge, target: newNodeId } : edge)));
  }
}

export function onRemoveNode({ setNodes, setEdges, selectedNodeId }: OnRemoveNodeParams) {
  if (!selectedNodeId) return;
  setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
  setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));

  removeNodeFromDB(selectedNodeId);
}

export function onEditNode({ label, setNodes, selectedNodeId }: OnEditNodeParams) {
  setNodes((nds) =>
    nds.map((node) => (node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node))
  );
}

export function onConnectNodes({ params, setEdges }: OnConnectParams) {
  setEdges((eds) => addEdge(params, eds));
}
