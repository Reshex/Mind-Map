import ReactFlow, { Node, useNodesState, useEdgesState, addEdge, Connection, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../nodes/CustomNode';

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'custom',
        data: { label: 'Custom Node 1' },
        position: { x: 350, y: 0 },
    },
    {
        id: '2',
        type: 'custom',
        data: { label: 'Custom Node 2' },
        position: { x: 450, y: 100 },
    },
    {
        id: '3',
        type: 'custom',
        data: { label: 'Custom Node 3' },
        position: { x: 250, y: 100 },
    },
];

const initialEdges: Edge[] = [];

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds));

    return (
        <div className='h-screen bg-gradient-to-r from-secondary to-muted-secondary'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            />
        </div>
    );
};




export default MindMap;
