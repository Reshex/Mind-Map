import { Handle, Position } from 'reactflow';
import CustomNodeDataType from '@/types/nodeTypes/CustomNodeDataType';
import AddNode from './AddNode';
import CollapsableMenu from '../dropdown/CollapsibleMenu';

interface CustomNodeProps {
    data: CustomNodeDataType;
    id: string;
}

function CustomNode({ data, id }: CustomNodeProps) {
    const { setSelectedNodeId, addNode, editNode, removeNode, label, customStyle } = data;

    return (
        <div
            onClick={() => setSelectedNodeId(id)}
            className={`relative bg-primary p-1 pl-3 pr-3 shadow-md border border-secondary rounded hover:ring-1 ring-foreground font-open-sans ${customStyle}`}
        >
            <Handle type="target" position={Position.Top} className="bg-primary" />
            <div className="flex justify-between items-start">
                <div></div>
                <CollapsableMenu removeNode={removeNode} editNode={editNode} />
            </div>
            <div className="text-md font-semibold text-foreground">{label}</div>
            <div className="flex justify-center mt-2">
                <AddNode addNode={addNode} />
            </div>
            <Handle type="source" position={Position.Bottom} className="bg-secondary" />
        </div>
    );
}

export default CustomNode;
