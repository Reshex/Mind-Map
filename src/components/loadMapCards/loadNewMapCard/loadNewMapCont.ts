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
    description: `Map successfully deleted: ${mapName}`,
    icon: null,
  });
}

export async function editMapName(
  creatorId: string,
  mapId: string,
  addToast: (toast: any) => void,
  mapName: Partial<Map>,
  setRefreshTrigger: Dispatch<SetStateAction<boolean>>,
  refreshTrigger: boolean
) {
  await onUpdateMap(creatorId, mapId, mapName);
  setRefreshTrigger(!refreshTrigger);
  addToast({
    title: "Map Updated",
    description: `Map successfully updated: ${mapName}`,
  });
}
