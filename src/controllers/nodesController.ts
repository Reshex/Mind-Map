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
    const spacingY = 150;

    const childIndex = siblingNodes.length;
    const totalChildren = siblingNodes.length + 1;
    const xOffset = (childIndex - (totalChildren - 1) / 2) * 150;
    const xPosition = selectedNode.position.x + xOffset;
    const yPosition = selectedNode.position.y + spacingY;

    const newNodeId = await addNodeToDB(mapId, {
      label,
      selectedNodeId,
      xPosition,
      yPosition,
      type: "custom",
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

    const updatedNodes = [...nodes, newNode];
    const updatedEdges = [...edges, newEdge];

    const sortedNodes = sortNodesByHierarchy(updatedNodes);

    setNodes(sortedNodes);
    setEdges(updatedEdges);

    await addEdgeToDB(newEdge);
    await onUpdateMap(creatorId, mapId, {
      nodes: sortedNodes,
      edges: updatedEdges,
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

    await editNodeToDB(selectedNodeId, label);

    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node
    );

    setNodes(updatedNodes);

    await onUpdateMap(creatorId, mapId, {
      nodes: updatedNodes,
    });
  } catch (error) {
    console.error("Failed to edit node", error);
  }
}

export function sortNodesByHierarchy(nodes: Node<CustomNodeDataType>[]): Node<CustomNodeDataType>[] {
  const spacingX = 150;
  const spacingY = 150;

  function calculateSubtreeWidth(nodeId: string | null): number {
    const children = nodes.filter((node) => node.data.parentId === nodeId);

    if (children.length === 0) return spacingX;

    return children.reduce((totalWidth, child) => {
      return totalWidth + calculateSubtreeWidth(child.id);
    }, 0);
  }

  function traverseAndReposition(parentId: string | null, depth: number, xCenter: number) {
    const children = nodes.filter((node) => node.data.parentId === parentId);

    // Calculate total width for the current node's children
    const totalWidth = calculateSubtreeWidth(parentId);

    let currentX = xCenter - totalWidth / 2; // Start positioning from the leftmost point
    children.forEach((child) => {
      const childWidth = calculateSubtreeWidth(child.id);

      // Position the child in the center of its own subtree
      child.position.x = currentX + childWidth / 2;
      child.position.y = depth * spacingY;

      // Move to the next sibling's position
      currentX += childWidth;

      traverseAndReposition(child.id, depth + 1, child.position.x); // Recurse for children
    });
  }

  // Start traversal from root nodes (nodes without a parent)
  const rootNodes = nodes.filter((node) => !node.data.parentId);
  const totalRootWidth = rootNodes.reduce((total, root) => total + calculateSubtreeWidth(root.id), 0);
  let currentRootX = -totalRootWidth / 2;

  rootNodes.forEach((root) => {
    const rootWidth = calculateSubtreeWidth(root.id);

    root.position.x = currentRootX + rootWidth / 2; // Center root node
    root.position.y = 0; // Root nodes are at the top (depth = 0)

    currentRootX += rootWidth;

    traverseAndReposition(root.id, 1, root.position.x); // Recurse for children
  });

  return [...nodes]; // Return updated nodes
}
