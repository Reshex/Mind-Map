export default interface CustomNodeData {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}
