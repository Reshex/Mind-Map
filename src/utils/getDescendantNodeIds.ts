import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Node } from "reactflow";

function getDescendantNodeIds(nodeId: string, nodes: Node<CustomNodeDataType>[]): string[] {
  const children = nodes.filter((node) => node.data.parentId === nodeId);
  let descendantIds: string[] = children.map((child) => child.id);

  children.forEach((child) => {
    descendantIds = [...descendantIds, ...getDescendantNodeIds(child.id, nodes)];
  });

  return descendantIds;
}

export default getDescendantNodeIds;
