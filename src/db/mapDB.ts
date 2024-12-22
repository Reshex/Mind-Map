import { db } from "@/firebase";
import { Map } from "@/types/mapTypes/mapType";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";

export async function loadMapFromDB(creatorId: string, mapId?: string) {
  try {
    const mapCollectionRef = collection(db, "maps");

    // Load specific map
    if (mapId) {
      const mapDoc = await getDoc(doc(mapCollectionRef, mapId));
      if (!mapDoc.exists()) {
        console.error("Map not found with mapId:", mapId);
        return null;
      }

      const mapData = mapDoc.data() as Map;

      if (!mapData.users?.includes(creatorId)) {
        console.error("Access denied. User is not allowed to view this map.");
        return null;
      }

      return mapData;
    }

    const userMapQuery = query(mapCollectionRef, where("users", "array-contains", creatorId));
    const querySnapshot = await getDocs(userMapQuery);

    const maps = querySnapshot.docs.map((doc) => doc.data() as Map);

    return maps;
  } catch (error) {
    console.error("Failed to load maps:", error);
    return null;
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
  } catch (error) {
    console.error("Failed to delete map and associated data", error);
  }
}

export async function getMapUsersFromDB(mapId: string): Promise<string[] | null> {
  try {
    const mapRef = doc(db, "maps", mapId);

    const mapSnapshot = await getDoc(mapRef);

    if (!mapSnapshot.exists()) {
      console.error(`Map with ID ${mapId} does not exist`);
      return null;
    }

    const mapData = mapSnapshot.data();
    const users = mapData?.users;

    if (Array.isArray(users)) {
      return users;
    } else {
      console.warn(`Users field is missing or not an array for map ID ${mapId}`);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch map users from the database:", error);
    return null;
  }
}
