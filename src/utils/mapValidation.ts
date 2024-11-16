export default function withValidMapId(mapId: string | undefined, callback: (mapId: string) => void | Promise<void>) {
  if (!mapId) {
    console.error("Map ID is missing from the URL.");
    return;
  }
  callback(mapId);
}
