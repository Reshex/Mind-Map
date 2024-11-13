import { Node } from "reactflow";

function createInitialNode(nodeName: string, mapId:string) {
  const initialNode: Node = {
    id: "1",
    type: "custom",
    data: {
      mapId,
      label: nodeName,
      setSelectedNodeId: () => {},
      addNode: () => {},
    },
    position: { x: 0, y: 0 },
  };
  
  return initialNode;
}

export default createInitialNode;
