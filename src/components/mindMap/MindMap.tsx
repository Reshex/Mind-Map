import { useState } from 'react';
import ReactFlow, { Node, useNodesState, useEdgesState, addEdge, Connection, Edge, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../nodes/CustomNode';
import CustomNodeDataType from '@/types/nodeTypes/CustomNodeDataType';

const initialNodes: Node<CustomNodeDataType>[] = [
    {
        id: '1',
        type: 'custom',
        data: {
            label: 'Custom Node 1',
        },
        position: { x: 400, y: 0 },
    },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    function addNode(label: string) {
        console.log("Add Node Called, selectedNodeId:", selectedNodeId);
        if (!selectedNodeId) return;

        const selectedNode = nodes.find((node) => node.id === selectedNodeId);
        if (!selectedNode) return;

        const siblingNodes = nodes.filter(node => node.data.parentId === selectedNodeId);
        const spacingX = 150;
        const xPosition = selectedNode.position.x + siblingNodes.length * spacingX;
        const yPosition = selectedNode.position.y + 150;

        const newNode: Node = {
            id: `${nodes.length + 1}`,
            type: 'custom',
            data: { label, parentId: selectedNodeId, setSelectedNodeId, addNode },
            position: { x: xPosition, y: yPosition },
        };

        const newEdge: Edge = {
            id: `e${selectedNodeId}-${newNode.id}`,
            source: selectedNodeId,
            target: newNode.id,
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
    };

    function onConnect(params: Edge | Connection) {
        setEdges((eds) => addEdge(params, eds));
    }

    return (
        <div className="h-screen bg-gradient-to-r from-secondary to-muted-secondary">
            <ReactFlow
                nodes={nodes.map(node => ({
                    ...node,
                    data: {
                        ...node.data,
                        setSelectedNodeId: setSelectedNodeId,
                        addNode: addNode,
                    },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default MindMap;
