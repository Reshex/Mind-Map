import { NodeProps } from "reactflow";

export default interface CustomNodeDataType extends NodeProps {
  label: string;
  customStyle?: string;
  parentId?: string | null;
  setSelectedNodeId: (id: string) => void;
  addNode: (label: string) => void; 
}
