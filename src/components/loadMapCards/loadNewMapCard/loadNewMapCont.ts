import { onUpdateMap } from "@/controllers/mapController";
import { removeMapFromDB } from "@/db/mapDB";
import { Map } from "@/types/mapTypes/mapType";
import { Dispatch, SetStateAction } from "react";

export async function removeMap(
  mapId: string,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);
  await removeMapFromDB(mapId);
  setRefreshTrigger(!refreshTrigger);
}

export async function editMapName(
  creatorId:string,
  mapId: string,
  mapName: Partial<Map>,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean
) {
  await onUpdateMap(creatorId, mapId, mapName);
  setRefreshTrigger(!refreshTrigger);
}
