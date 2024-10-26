import { NodeProps } from "reactflow";

export default interface CustomNodeProps extends NodeProps {
  data: {
    label: string;
    customStyle?: string;
  };
}
