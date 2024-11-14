export default interface CustomNodeDataType {
  mapId:string,
  label: string;
  customStyle?: string;
  parentId?: string;
  setSelectedNodeId: (id: string) => void;
  addNode: () => void;
  removeNode: () => void;
  editNode: () => void;
}


// export interface InitialNodeDataType {
//   label: string | "";
//   customStyle?: string;
//   setSelectedNodeId: (id: string) => void;
//   addNode: (label: string) => void;
// }
