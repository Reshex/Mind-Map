import { Edge } from "reactflow";
import SanitizedNode from "../nodeTypes/customNodeDataType";

export interface Map {
  mapId: string;
  userId: string | null;
  nodes: SanitizedNode[];  
  edges: Edge[];
}