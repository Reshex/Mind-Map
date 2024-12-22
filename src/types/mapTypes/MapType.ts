import { Edge, Node } from "reactflow";
import CustomNodeDataType from "../nodeTypes/customNodeDataType";

export interface Map {
  mapId: string;
  mapName: string;
  creatorId: string | null;
  users?: string[];
  nodes: Node<CustomNodeDataType>[];
  edges: Edge[];
}
