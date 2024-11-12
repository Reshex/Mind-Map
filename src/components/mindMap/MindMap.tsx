//Imports
import { useEffect, useState } from 'react';
import ReactFlow, { Node, useNodesState, useEdgesState, Connection, Edge } from 'reactflow';

//Controllers
import { onAddNode, onRemoveNode, onEditNode, onGetNodes } from '@/controllers/nodesController';
import { onConnectNodes, onGetConnection } from '@/controllers/edgesController';
import { onSaveMap } from '@/controllers/mapController';

//Types
import CustomNodeDataType from '@/types/nodeTypes/customNodeDataType';

//Custom Components
import initialNode from '../../utils/initialNode';
import { Button } from '../ui/button';
import CustomNode from '../nodes/CustomNode';

//Styles
import 'reactflow/dist/style.css';

//Hooks
import { useCreatorId } from '@/hooks/useCreatorId';
import { useParams } from 'react-router-dom';
import { loadMapFromDB } from '@/db/mapDB';
import useMapContext from '@/hooks/useMapContext';
import { getUsersFromDB } from '@/db/userDB';

const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

const initialEdges: Edge[] = [];

const nodeTypes = {
    custom: CustomNode,
};

function MindMap() {
    const { mapId } = useParams<{ mapId: string }>();
    const { mapName } = useMapContext()
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);


    const creatorId = useCreatorId();

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

    function saveMap() {
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

    useEffect(() => {
        async function fetchMapData() {
            if (!mapId) return;

            // const mapData = await loadMapFromDB(mapId);
            // if (mapData) {
            //     setNodes(mapData.nodes || []);
            //     setEdges(mapData.edges || []);
            //     setMapName(mapData.mapName || "Untitled Map");
            // }
        }

        fetchMapData();
    }, [mapId]);

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
