export default interface CustomNodeDataType {
  label: string;
  customStyle?: string;
  parentId?: string | null;
  setSelectedNodeId: (id: string) => void;
  addNode: (label: string) => void;
  removeNode: () => void;
  editNode: () => void;
}
