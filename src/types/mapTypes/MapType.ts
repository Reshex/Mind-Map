import { Edge } from "reactflow";
import SanitizedNode from "../nodeTypes/CustomNodeDataType";

export interface Map {
  mapId: string;
  userId: string | null;
  nodes: SanitizedNode[];  
  edges: Edge[];
}