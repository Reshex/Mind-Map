import { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
    { id: '2', data: { label: 'Node A' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Node B' }, position: { x: 400, y: 100 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' }];

function MindMap() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <div className='h-screen bg-gradient-to-r from-secondary to-muted-secondary'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default MindMap;
