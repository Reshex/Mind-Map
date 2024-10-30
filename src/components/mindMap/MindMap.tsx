import { useState } from 'react';
import ReactFlow, { Node, useNodesState, useEdgesState, Connection, Edge, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../nodes/CustomNode';
import CustomNodeDataType from '@/types/nodeTypes/CustomNodeDataType';
import initialNode from '../nodes/initialNode';
import { onConnectNodes, onAddNode, onRemoveNode, onEditNode } from '../controllers/nodesController';

const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

const initialEdges: Edge[] = [];

const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    function addNode(label: string) {
        onAddNode({
            label,
            selectedNodeId,
            nodes,
            setNodes,
            setEdges,
        });
    };

    function removeNode() {
        onRemoveNode({
            setNodes,
            setEdges,
            selectedNodeId
        })
    }

    function editNode(label: string) {
        onEditNode({
            label,
            setNodes,
            selectedNodeId,
        })
    }

    function connectNodes(params: Edge | Connection) {
        onConnectNodes({
            params,
            setEdges,
        })
    }

    return (
        <div className="h-screen bg-gradient-to-r from-secondary to-muted-secondary">
            <ReactFlow
                nodes={nodes.map((node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        setSelectedNodeId: setSelectedNodeId,
                        addNode: addNode,
                        removeNode: removeNode,
                        editNode: editNode,
                    },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={connectNodes}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default MindMap;
