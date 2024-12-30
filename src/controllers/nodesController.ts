import { Edge, Node } from "reactflow";
import { editNodeToDB, getNodesFromDB, removeNodeFromDB, addNodeToDB } from "../db/nodeDB";
import { addEdgeToDB, removeEdgeFromDB } from "../db/edgeDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { onUpdateMap } from "./mapController";
import getDescendantNodeIds from "@/utils/getDescendantNodeIds";

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

    const xPosition = selectedNode.position.x;
    const yPosition = selectedNode.position.y;

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

    const nodeIdsToRemove = [selectedNodeId, ...getDescendantNodeIds(selectedNodeId, nodes)];

    const updatedNodes = nodes.filter((node) => !nodeIdsToRemove.includes(node.id));
    setNodes(updatedNodes);

    const updatedEdges = edges.filter(
      (edge) => !nodeIdsToRemove.includes(edge.source) && !nodeIdsToRemove.includes(edge.target)
    );
    setEdges(updatedEdges);

    const deleteNodesFromDB = Promise.all(nodeIdsToRemove.map((nodeId) => removeNodeFromDB(nodeId)));

    const deleteEdgesFromDB = Promise.all(
      edges
        .filter((edge) => nodeIdsToRemove.includes(edge.source) || nodeIdsToRemove.includes(edge.target))
        .map((edge) => removeEdgeFromDB(edge.id))
    );

    await Promise.all([deleteNodesFromDB, deleteEdgesFromDB]);

    await onUpdateMap(creatorId, mapId, {
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  } catch (error) {
    console.error("Failed to remove node and its descendants", error);
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
  const defaultWidth = 220;
  const defaultHeight = 200;
  const spacingX = 50;
  const spacingY = 50;

  function calculateSubtreeWidth(nodeId: string | null): number {
    const children = nodes.filter((node) => node.data.parentId === nodeId);

    if (children.length === 0) {
      return defaultWidth;
    }

    return children.reduce((totalWidth, child) => {
      return totalWidth + calculateSubtreeWidth(child.id) + spacingX;
    }, -spacingX);
  }

  function traverseAndReposition(parentId: string | null, depth: number, xCenter: number) {
    const children = nodes.filter((node) => node.data.parentId === parentId);

    const totalWidth = calculateSubtreeWidth(parentId);

    let currentX = xCenter - totalWidth / 2;

    children.forEach((child) => {
      const childWidth = calculateSubtreeWidth(child.id);

      child.position.x = currentX + childWidth / 2;
      child.position.y = depth * (defaultHeight + spacingY);

      currentX += childWidth + spacingX;

      traverseAndReposition(child.id, depth + 1, child.position.x);
    });
  }

  const rootNodes = nodes.filter((node) => !node.data.parentId);
  const totalRootWidth = rootNodes.reduce((total, root) => {
    return total + calculateSubtreeWidth(root.id) + spacingX;
  }, -spacingX);

  let currentRootX = -totalRootWidth / 2;

  rootNodes.forEach((root) => {
    const rootWidth = calculateSubtreeWidth(root.id);

    root.position.x = currentRootX + rootWidth / 2;
    root.position.y = 0;

    currentRootX += rootWidth + spacingX;

    traverseAndReposition(root.id, 1, root.position.x);
  });

  return [...nodes];
}
