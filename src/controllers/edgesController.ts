import { addEdge, Connection, Edge } from "reactflow";
import { addEdgeToDB, getEdgesFromDB } from "../db/edgeDB";

interface OnGetEdgesParams {
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

interface OnConnectParams {
  edge: Edge | Connection;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export async function onGetConnection({ setEdges }: OnGetEdgesParams) {
  try {
    const edgesFromDB = await getEdgesFromDB();
    if (!edgesFromDB) return;
    setEdges(edgesFromDB);
  } catch (error) {
    console.error("Failed to fetch edges", error);
  }
}

export function onConnectNodes({ edge, setEdges }: OnConnectParams) {
  try {
    const newEdge = { ...edge, id: `e${edge.source}-${edge.target}` };
    setEdges((eds) => addEdge(edge, eds));
    addEdgeToDB(newEdge as Edge);
  } catch (error) {
    console.error("Failed to connect nodes", error);
  }
}
