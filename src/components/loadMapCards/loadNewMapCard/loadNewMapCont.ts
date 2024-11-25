import { onUpdateMap } from "@/controllers/mapController";
import { removeMapFromDB } from "@/db/mapDB";
import { Map } from "@/types/mapTypes/mapType";
import { Dispatch, SetStateAction } from "react";

export async function removeMap(
  creatorId: string,
  mapId: string,
  mapName: string,
  addToast: (toast: any) => void,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);
  await removeMapFromDB(creatorId, mapId);
  setRefreshTrigger(!refreshTrigger);
  addToast({
    title: "Map Deleted",
    description: `You have deleted the map: ${mapName}`,
    icon: null,
  });
}

export async function editMapName(
  creatorId: string,
  mapId: string,
  mapName: Partial<Map>,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean
) {
  await onUpdateMap(creatorId, mapId, mapName);
  setRefreshTrigger(!refreshTrigger);
}
