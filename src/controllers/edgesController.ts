import { addEdge, Connection, Edge } from "reactflow";
import { addEdgeToDB, getEdgesFromDB } from "../db/edgeDB";
import { updateMapToDB } from "@/db/mapDB";

interface OnGetEdgesParams {
  mapId: string;
}

interface OnConnectParams {
  mapId: string;
  edges: Edge[];
  edge: Edge | Connection;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export async function onGetConnection({  mapId }: OnGetEdgesParams) {
  try {
    const edgesFromDB = await getEdgesFromDB(mapId);
    if (!edgesFromDB) return;
    return edgesFromDB;
  } catch (error) {
    console.error("Failed to fetch edges", error);
  }
}

export async function onConnectNodes({ edges, edge, setEdges, mapId }: OnConnectParams) {
  try {
    const newEdge = { ...edge, data: { mapId }, id: `e${edge.source}-${edge.target}` };
    setEdges((eds) => addEdge(edge, eds));
    await addEdgeToDB(newEdge as Edge);
    await updateMapToDB(mapId, { edges });
  } catch (error) {
    console.error("Failed to connect nodes", error);
  }
}
