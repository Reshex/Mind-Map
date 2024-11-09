export default interface CustomNodeDataType {
  label: string | "";
  customStyle?: string;
  parentId?: string | "";
  setSelectedNodeId: (id: string) => void;
  addNode: (label: string) => void;
  removeNode: () => void;
  editNode: (label: string) => void;
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
