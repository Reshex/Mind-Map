import { Handle, Position } from 'reactflow';
import AddNode from './AddNode';
import InitialNodeDataType from '@/types/nodeTypes/customNodeDataType';
import CollapsibleMenu from '../dropdown/CollapsibleMenu';
import EditItemDialog from '../editItemDialog/EditItemDialog';

interface InitialNodeProps {
    data: InitialNodeDataType;
    id: string;
}

function InitialNode({ data, id }: InitialNodeProps) {
    const { setSelectedNodeId, addNode, editNode, label, customStyle } = data;

    return (
        <div
            onClick={() => setSelectedNodeId(id)}
            className={`relative px-6 py-2  transition-all hover:scale-105 hover:shadow-md hover:ring-2 ring-foreground bg-gradient-initial ${customStyle}`}
        >
            <Handle type="target" position={Position.Top} />

            <div className="flex justify-between items-start">
                <div></div>
                <CollapsibleMenu
                    label="Node"
                    editAction={(newLabel) => editNode(newLabel)}
                    EditComponent={({ setIsEditDialogOpen, editAction }) => (
                        <EditItemDialog
                            label="Node"
                            editAction={editAction}
                            setIsEditDialogOpen={setIsEditDialogOpen}
                        />
                    )}
                    showDeleteOption={false}
                />
            </div>

            <div className="text-md font-semibold text-foreground">{label}</div>

            <div className="flex justify-center mt-2">
                <AddNode addNode={addNode} />
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default InitialNode;
