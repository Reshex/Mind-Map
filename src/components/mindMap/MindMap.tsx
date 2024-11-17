//Imports
import { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Connection, Edge, Node } from 'reactflow';

//Controllers
import { onAddNode, onRemoveNode, onEditNode, onGetNodes } from '@/controllers/nodesController';
import { onConnectNodes, onGetConnection as onGetConnections } from '@/controllers/edgesController';

//Custom Components
import CustomNode from '../nodes/CustomNode';

//Styles
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import withValidMapId from '@/utils/mapValidation';
import createInitialNode from '@/utils/createInitialNode';
import CustomNodeDataType from '@/types/nodeTypes/customNodeDataType';


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
                edges,
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
            try {
                const fetchedNodes = await onGetNodes({
                    mapId: validMapId,
                    edges,
                });

                if (fetchedNodes && fetchedNodes.length > 0) {
                    setNodes(fetchedNodes as Node<CustomNodeDataType>[]);
                } else {
                    console.warn(`No nodes found for mapId: ${validMapId}. Creating an initial node.`);
                    const initialNode = await createInitialNode("Initial Node", validMapId);
                    setNodes([initialNode]);
                }

                const fetchedEdges = await onGetConnections({ mapId: validMapId });
                if (fetchedEdges) {
                    setEdges(fetchedEdges as Edge[]);
                }

            } catch (error) {
                console.error("Error loading data:", error);
            }
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
