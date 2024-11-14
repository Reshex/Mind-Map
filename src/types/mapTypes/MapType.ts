import { Edge, Node } from "reactflow";
import { User } from "firebase/auth";
import CustomNodeDataType from "../nodeTypes/customNodeDataType";

export interface Map {
  mapId: string;
  mapName: string;
  creatorId: string | null;
  users?: User[];
  nodes: Node<CustomNodeDataType>[];
  edges: Edge[];
}
