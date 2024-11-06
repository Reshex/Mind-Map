// Imports
import { useEffect, useState } from 'react';
import ReactFlow, { Node, useNodesState, useEdgesState, Connection, Edge, Controls } from 'reactflow';
import CustomNode from '../nodes/CustomNode';
import CustomNodeDataType from '@/types/nodeTypes/CustomNodeDataType';
import { onAddNode, onRemoveNode, onEditNode, onGetNodes } from '../controllers/nodesController';
import { onConnectNodes, onGetConnection } from '../controllers/edgesController';
import initialNode from '../../utils/initialNode';

//styles
import 'reactflow/dist/style.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { Button } from '../ui/button';
import { onSaveMap } from '../controllers/mapController';

const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

const initialEdges: Edge[] = [];

const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [userId, setUserId] = useState(null)

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

    function connectNodes(edge: Edge | Connection) {
        onConnectNodes({
            edge,
            setEdges,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return unsubscribe;
    }, []);

    function saveMap() {
        const mapId = `map-${userId}`
        onSaveMap(mapId, userId, nodes, edges)
    }

    async function loadData() {
        await onGetNodes({ setNodes, setEdges, edges });
        await onGetConnection({ setEdges });
    }

    useEffect(() => {
        loadData();
    }, []);

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
            <Button onClick={() => saveMap()}> save mapo</Button>
        </div>
    );
}

export default MindMap;
