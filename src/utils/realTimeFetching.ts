import { query, collection, where, onSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "@/firebase";
import { Node, Edge } from "reactflow";
import { sortNodesByHierarchy } from "@/controllers/nodesController";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import withValidMapId from "./mapValidation";
import loadData from "./loadMindMapData";

export default async function useRealtimeListeners(
  mapId: string,
  edges: Edge[],
  setNodes: Dispatch<SetStateAction<Node<CustomNodeDataType>[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  onGetConnections: Function
) {
  withValidMapId(mapId, (validMapId) => {
    (async () => {
      await loadData(validMapId, edges, setNodes, setEdges, onGetConnections);

      const nodesQuery = query(collection(db, "nodes"), where("mapId", "==", validMapId));
      const unsubscribeNodes = onSnapshot(nodesQuery, (snapshot) => {
        const fetchedNodes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const sortedNodes = sortNodesByHierarchy(fetchedNodes as Node<CustomNodeDataType>[]);

        // Update state only if nodes differ
        setNodes((currentNodes) => {
          const currentNodesStr = JSON.stringify(currentNodes);
          const newNodesStr = JSON.stringify(sortedNodes);
          return currentNodesStr === newNodesStr ? currentNodes : sortedNodes;
        });
      });

      // Set up real-time listeners for edges
      const edgesQuery = query(collection(db, "edges"), where("data.mapId", "==", validMapId));
      const unsubscribeEdges = onSnapshot(edgesQuery, (snapshot) => {
        const fetchedEdges = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Update state only if edges differ
        setEdges((currentEdges) => {
          const currentEdgesStr = JSON.stringify(currentEdges);
          const newEdgesStr = JSON.stringify(fetchedEdges);
          return currentEdgesStr === newEdgesStr ? currentEdges : (fetchedEdges as Edge[]);
        });
      });

      // Cleanup listeners on unmount
      const cleanup = () => {
        unsubscribeNodes();
        unsubscribeEdges();
      };

      return cleanup;
    })();
  });
}
