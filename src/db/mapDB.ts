import { db } from "@/firebase";
import { Map } from "@/types/mapTypes/mapType";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";

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
    const mapRef = doc(db, "maps", mapId);

    await updateDoc(mapRef, values);
  } catch (error) {
    console.error("Failed to update map", error);
  }
}

export async function removeMapFromDB(creatorId: string, mapId: string) {
  try {
    if (!mapId) return;

    const batch = writeBatch(db);

    const mapDocRef = doc(db, "maps", mapId);
    batch.delete(mapDocRef);

    const userRef = doc(db, "users", creatorId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnapshot.data();
    const userMaps = Array.isArray(userData.maps) ? userData.maps : [];

    const updatedUserMaps = userMaps.filter((map: Map) => map.mapId !== mapId);
    batch.update(userRef, { maps: updatedUserMaps });

    const nodesQuery = query(collection(db, "nodes"), where("mapId", "==", mapId));
    const nodesSnapshot = await getDocs(nodesQuery);
    nodesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const edgesQuery = query(collection(db, "edges"), where("mapId", "==", mapId));
    const edgesSnapshot = await getDocs(edgesQuery);
    edgesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`Successfully removed map ${mapId} and all associated data.`);
  } catch (error) {
    console.error("Failed to delete map and associated data", error);
  }
}
