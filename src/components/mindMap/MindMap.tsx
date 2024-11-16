//Imports
import { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Connection, Edge } from 'reactflow';

//Controllers
import { onAddNode, onRemoveNode, onEditNode, onGetNodes } from '@/controllers/nodesController';
import { onConnectNodes, onGetConnection } from '@/controllers/edgesController';

//Custom Components
import CustomNode from '../nodes/CustomNode';

//Styles
import 'reactflow/dist/style.css';
import createInitialNode from '@/utils/initialNode';
import { useParams } from 'react-router-dom';
import withValidMapId from '@/utils/mapValidation';


const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const { mapId } = useParams<{ mapId: string }>();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    function addNode(label: string) {
        withValidMapId(mapId, (validMapId) => {
            onAddNode({
                mapId: validMapId,
                label,
                selectedNodeId,
                nodes,
                setNodes,
                setEdges,
            });
        });
    }

    function removeNode() {
        onRemoveNode({
            setNodes,
            setEdges,
            selectedNodeId,
        });
    }

    function editNode(label: string) {
        onEditNode({
            label,
            setNodes,
            selectedNodeId,
        });
    }

    function connectNodes(edge: Edge | Connection) {
        withValidMapId(mapId, (validMapId) => {
            const updatedEdge = { ...edge, data: { mapId: validMapId } };
            onConnectNodes({
                mapId: validMapId,
                edges,
                edge: updatedEdge as Edge,
                setEdges,
            });
        });
    }

    async function loadData() {
        withValidMapId(mapId, async (validMapId) => {
            const fetchedNodes = await onGetNodes({
                mapId: validMapId,
                setNodes,
                setEdges,
                edges,
            });

            if (!fetchedNodes || fetchedNodes.length === 0) {
                const initialNode = createInitialNode("Initial Node", validMapId);
                setNodes([initialNode]);
            }
            withValidMapId(mapId, async (validMapId) => {
                await onGetConnection({
                    setEdges,
                    mapId: validMapId,
                });
            });
        });
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
            />
        </div>
    );
}

export default MindMap;
