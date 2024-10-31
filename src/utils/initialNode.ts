import CustomNodeDataType from "@/types/nodeTypes/CustomNodeDataType";
import { Node } from "reactflow";

const initialNode: Node<CustomNodeDataType> = {
  id: "1",
  type: "custom",
  data: {
    label: "First Node",
    setSelectedNodeId: () => {},
    addNode: () => {},
    removeNode: () => {},
    editNode: () => {},
  },
  position: { x: 400, y: 0 },
};

export default initialNode;
