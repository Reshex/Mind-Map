//Imports
import { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Connection, Edge } from 'reactflow';

//Controllers
import { onAddNode, onRemoveNode, onEditNode } from '@/controllers/nodesController';
import { onConnectNodes, onGetConnection as onGetConnections } from '@/controllers/edgesController';

//Custom Components
import CustomNode from '../nodes/CustomNode';
import InitialNode from '../nodes/CustomInitialNode';

//Utils
import withValidMapId from '@/utils/mapValidation';

//Hooks
import { useParams } from 'react-router-dom';
import { useCreatorId } from '@/hooks/useCreatorId';

//Styles
import 'reactflow/dist/style.css';
import loadData from '@/utils/loadMindMapData';


const nodeTypes = {
    initial: InitialNode,
    custom: CustomNode,
};

function MindMap() {
    const { mapId } = useParams<{ mapId: string }>();
    const creatorId = useCreatorId();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    function addNode(label: string) {
        withValidMapId(mapId, (validMapId) => {
            if (!creatorId) return console.error("User id not found")
            onAddNode({
                creatorId,
                mapId: validMapId,
                label,
                selectedNodeId,
                nodes,
                edges,
                setNodes,
                setEdges,
            });
        });
    }

    function removeNode() {
        withValidMapId(mapId, (validMapId) => {
            if (!creatorId) return console.error("User id not found")
            onRemoveNode({
                creatorId,
                mapId: validMapId,
                nodes,
                edges,
                setNodes,
                setEdges,
                selectedNodeId,
            });
        });
    }

    function editNode(label: string) {
        withValidMapId(mapId, (validMapId) => {
            if (!creatorId) return console.error("User id not found")
            onEditNode({
                creatorId,
                mapId: validMapId,
                label,
                setNodes,
                nodes,
                selectedNodeId,
            });
        });
    }

    function connectNodes(edge: Edge | Connection) {
        withValidMapId(mapId, (validMapId) => {
            if (!creatorId) return console.error("User id not found")
            const updatedEdge = { ...edge, data: { mapId: validMapId } };
            onConnectNodes({
                creatorId,
                mapId: validMapId,
                edges,
                edge: updatedEdge as Edge,
                setEdges,
            });
        });
    }

    useEffect(() => {
        withValidMapId(mapId, async (validMapId) => {
            loadData(validMapId, edges, setNodes, setEdges, onGetConnections);
        })
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
