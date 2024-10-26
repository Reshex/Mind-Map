//Imports
import { Handle, Position } from 'reactflow';

// Types
import CustomNodeProps from '@/types/nodeTypes/CustomNodeDataType';

// Custom Components
import AddNode from './AddNode';
import CollapsableMenu from '../dropdown/CollapsibleMenu';

function CustomNode({ data }: CustomNodeProps) {

    return (
        <>
            <div
                className={`relative bg-primary p-1 pl-3 pr-3 shadow-md border border-secondary rounded hover:ring-1 ring-foreground font-open-sans ${data.customStyle}`}
            >
                <Handle type="target" position={Position.Top} className="bg-primary" />
                <div className="flex justify-between items-start">
                    <div></div>
                    <CollapsableMenu />
                </div>
                <div className="text-md font-semibold text-foreground">{data.label}</div>
                <div className="flex justify-center mt-2">
                    <AddNode />
                </div>

                <Handle type="source" position={Position.Bottom} className="bg-secondary" />
            </div>
        </>

    );
};

export default CustomNode;