// src/utils/nodeUtils.ts
import { Node, Edge, Connection, addEdge } from "reactflow";
import CustomNodeDataType from "@/types/nodeTypes/CustomNodeDataType";

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

export function onAddNode({ label, selectedNodeId, nodes, setNodes, setEdges }: AddNodeParams) {
  if (!selectedNodeId) return;

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  if (!selectedNode) return;

  const siblingNodes = nodes.filter((node) => node.data.parentId === selectedNodeId);
  const spacingX = 150;
  const xPosition = selectedNode.position.x + siblingNodes.length * spacingX;
  const yPosition = selectedNode.position.y + 150;

  const newNode: Node<CustomNodeDataType> = {
    id: `${nodes.length + 1}`,
    type: "custom",
    data: {
      label,
      parentId: selectedNodeId,
      setSelectedNodeId: () => {},
      addNode: () => {},
    },
    position: { x: xPosition, y: yPosition },
  };

  const newEdge: Edge = {
    id: `e${selectedNodeId}-${newNode.id}`,
    source: selectedNodeId,
    target: newNode.id,
  };

  setNodes((nds) => [...nds, newNode]);
  setEdges((eds) => [...eds, newEdge]);
}

export function onConnectNodes({ params, setEdges }: OnConnectParams) {
  setEdges((eds) => addEdge(params, eds));
}
