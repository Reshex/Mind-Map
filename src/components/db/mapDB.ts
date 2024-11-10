import { db } from "@/firebase";
import { Map } from "@/types/mapTypes/mapType";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export async function loadMapFromDB(creatorId: string) {
  try {
    const mapCollectionRef = collection(db, "maps");
    const userMapQueries = query(mapCollectionRef, where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(userMapQueries);
    if (!querySnapshot.empty) {
      console.log(querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
    }
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
      users: map.users,
      nodes: map.nodes,
      edges: map.edges,
    });
    console.log("Map saved successfully!");
  } catch (error) {
    console.error("Error saving map: ", error);
  }
}

//Also add update map for future uses