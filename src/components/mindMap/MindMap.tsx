import ReactFlow, { Node, useNodesState, useEdgesState, addEdge, Connection, Edge, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../nodes/CustomNode';
import { useEffect, useState } from 'react';
import AddNode from '../nodes/AddNode';

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'custom',
        data: { label: 'Custom Node 1' },
        position: { x: 400, y: 0 },
    },
];

const initialEdges: Edge[] = [];

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);


    function onConnect(params: Edge | Connection) {
        setEdges((eds) => addEdge(params, eds));
    }

    function handleAddNode(newNodeName: string) {
        try {
            //     if (!selectedNodeId) return;

            //     // Find the parent node's position
            //     const parentNode = nodes.find((node) => node.id === selectedNodeId);
            //     const newNodeId = (nodes.length + 1).toString();

            //     if (!parentNode) {
            //         throw new Error("Parent node not found");
            //     }

            //     const newNode = {
            //         id: newNodeId,
            //         type: 'custom',
            //         data: { label: newNodeName },
            //         position: {
            //             x: parentNode.position.x,
            //             y: parentNode.position.y + 100,
            //         },
            //     };

            //     const newEdge = {
            //         id: `e${selectedNodeId}-${newNodeId}`,
            //         source: selectedNodeId,
            //         target: newNodeId,
            //     };

            //     setNodes((nds) => [...nds, newNode]);
            //     setEdges((eds) => [...eds, newEdge]);
        }
        catch (error) {
            console.error("Error during adding node: ", error);
        }
    }

    useEffect(() => {
        return () => setSelectedNodeId(null);
    }, []);

    return (
        <div className="h-screen bg-gradient-to-r from-secondary to-muted-secondary">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
            </ReactFlow>

            {/* Pass handleAddNode to AddNode component */}
            <AddNode onAddNode={handleAddNode} />
        </div>
    );
}




export default MindMap;
