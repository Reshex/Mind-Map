import { db } from "@/firebase";
import { Map } from "@/types/mapTypes/mapType";
import deepSanitize from "@/utils/deepSanitize";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export async function loadMapFromDB(creatorId: string, mapId?: string) {
  try {
    const mapCollectionRef = collection(db, "maps");

    if (mapId) {
      const mapDoc = await getDoc(doc(mapCollectionRef, mapId));
      if (mapDoc.exists()) {
        return mapDoc.data() as Map;
      }
      console.error("Map not found with mapId:", mapId);
      return null;
    }

    const userMapQuery = query(mapCollectionRef, where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(userMapQuery);

    const maps = querySnapshot.docs.map((doc) => doc.data() as Map);
    return maps;
  } catch (error) {
    console.error("Failed to load map", error);
  }
}

export async function saveMapToDB(map: Map) {
  try {
    const mapRef = doc(db, "maps", map.mapId);

    await setDoc(mapRef, {
      mapId: map.mapId,
      mapName: map.mapName,
      creatorId: map.creatorId,
      users: map.users || [map.creatorId],
      nodes: map.nodes,
      edges: map.edges,
    });
  } catch (error) {
    console.error("Error saving map: ", error);
  }
}

export async function updateMapToDB(mapId: string, values: Partial<Map>) {
  try {
    const sanitizedValues = deepSanitize(values);

    const mapRef = doc(db, "maps", mapId);
    await updateDoc(mapRef, sanitizedValues);
  } catch (error) {
    console.error("Failed to update map", error);
  }
}
