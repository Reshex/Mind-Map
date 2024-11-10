export default interface CustomNodeDataType {
  label: string;
  customStyle?: string;
  parentId?: string;
  setSelectedNodeId: () => void;
  addNode: () => void;
  removeNode: () => void;
  editNode: () => void;
}

interface SanitizedNodeDataType {
  label: string;
  parentId?: string;
}

export default interface SanitizedNode {
  id: string;
  type: string | undefined;
  data: SanitizedNodeDataType;
}

// export interface InitialNodeDataType {
//   label: string | "";
//   customStyle?: string;
//   setSelectedNodeId: (id: string) => void;
//   addNode: (label: string) => void;
// }
