import { removeMapFromDB, updateMapToDB } from "@/db/mapDB";
import { Map } from "@/types/mapTypes/mapType";
import { Dispatch, SetStateAction } from "react";

export async function removeMapCard(
  mapId: string,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean
) {
  await removeMapFromDB(mapId);
  setRefreshTrigger(!refreshTrigger);
}

export async function editMapCardName(
  mapId: string,
  label: Partial<Map>,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean
) {
  await updateMapToDB(mapId, label);
  setRefreshTrigger(!refreshTrigger);
}
