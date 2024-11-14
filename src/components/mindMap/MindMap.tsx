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


const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const { mapId } = useParams<{ mapId: string }>();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    function addNode(label: string) {
        if (mapId === undefined) {
            console.error("Map ID is missing from the URL.");
            return null;
        }

        onAddNode({
            mapId,
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

    async function loadData() {
        if (mapId === undefined) {
            console.error("Map ID is missing from the URL.");
            return null;
        }

        const fetchedNodes = await onGetNodes({
            mapId,
            setNodes,
            setEdges,
            edges
        });

        if (!fetchedNodes || fetchedNodes.length === 0) {
            const initialNode = createInitialNode("Initial Node", mapId);
            setNodes([initialNode]);
        }

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
            />
        </div>
    );
}

export default MindMap;
