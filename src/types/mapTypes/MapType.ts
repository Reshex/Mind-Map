import { Edge } from "reactflow";
import SanitizedNode from "../nodeTypes/customNodeDataType";
import { User } from "firebase/auth";

export interface Map {
  mapId: string;
  mapName: string;
  creatorId: string | null;
  users?: User[];
  nodes: SanitizedNode[];
  edges: Edge[];
}
