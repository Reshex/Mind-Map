import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import AddNode from './AddNode';
import CustomNodeDataType from '@/types/nodeTypes/customNodeDataType';
import CollapsibleMenu from '../dropdown/CollapsibleMenu';
import EditItemDialog from '../editItemDialog/EditItemDialog';

interface CustomNodeProps {
    data: CustomNodeDataType;
    id: string;
}

function CustomNode({ data, id }: CustomNodeProps) {
    const { setSelectedNodeId, addNode, editNode, removeNode, label, customStyle } = data;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRemoveNode = () => {
        setIsDeleting(true);
        setTimeout(() => removeNode(), 300);
    };

    return (
        <div
            onClick={() => setSelectedNodeId(id)}
            className={`relative px-2 py-1 rounded-xl transition-all hover:scale-105 hover:shadow-md hover:ring-2 ring-foreground bg-gradient-custom ${customStyle} ${isDeleting ? 'animate-fade-out' : 'animate-fade-in'
                }`}
        >
            <Handle type="target" position={Position.Top} />

            <div className="flex justify-between items-start">
                <div></div>
                <CollapsibleMenu
                    label="Node"
                    editAction={(newLabel) => editNode(newLabel)}
                    deleteAction={handleRemoveNode}
                    EditComponent={({ setIsEditDialogOpen, editAction }) => (
                        <EditItemDialog
                            label="Node"
                            editAction={editAction}
                            setIsEditDialogOpen={setIsEditDialogOpen}
                        />
                    )}
                />
            </div>

            <div
                className="text-md font-semibold text-foreground max-w-[15rem] max-h-[15rem] overflow-hidden break-words text-ellipsis line-clamp-3"
                title={label}
            >
                {label}
            </div>

            <div className="flex justify-center mt-2">
                <AddNode addNode={addNode} />
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default CustomNode;
