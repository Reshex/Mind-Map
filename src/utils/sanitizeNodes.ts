import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Node } from "reactflow";

export default function sanitizeNodes(nodes: Node<CustomNodeDataType>[]) {
    return nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        label: node.data.label || "",
        parentId: node.data.parentId || "",
      },
    })) as Node<CustomNodeDataType>[];
  }