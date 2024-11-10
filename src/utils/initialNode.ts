import { Node } from "reactflow";

const initialNode: Node = {
  id: "1",
  type: "custom",
  data: {
    label: "First Node",
    setSelectedNodeId: () => {},
    addNode: () => {},
  },
  position: { x: 400, y: 0 },
};

export default initialNode;
