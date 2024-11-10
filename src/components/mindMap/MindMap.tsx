//Imports
import { useEffect, useState } from 'react';
import ReactFlow, { Node, useNodesState, useEdgesState, Connection, Edge } from 'reactflow';

//DB
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

//Controllers
import { onAddNode, onRemoveNode, onEditNode, onGetNodes } from '../controllers/nodesController';
import { onConnectNodes, onGetConnection } from '../controllers/edgesController';
import { onSaveMap } from '../controllers/mapController';

//Types
import CustomNodeDataType from '@/types/nodeTypes/customNodeDataType';

//Custom Components
import initialNode from '../../utils/initialNode';
import { Button } from '../ui/button';
import CustomNode from '../nodes/CustomNode';


//Styles
import 'reactflow/dist/style.css';

const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

const initialEdges: Edge[] = [];

const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [creatorId, setCreatorId] = useState(null)

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
                setCreatorId(user.uid);
            } else {
                setCreatorId(null);
            }
        });
        return unsubscribe;
    }, []);

    function saveMap() {
        const mapName = "map"
        const mapId = `map-${creatorId}`
        onSaveMap(mapId, mapName, creatorId, nodes, edges)
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
            />
            <Button onClick={() => saveMap()}> save mapo</Button>
        </div>
    );
}

export default MindMap;
