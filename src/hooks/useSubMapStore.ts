// import { create } from "zustand";
// import type { MarkerImageData } from "@hooks/usePersistentMarkers";

// type SubMapStore = {
//   subMaps: MarkerImageData[];
//   setSubMaps: (maps: MarkerImageData[]) => void;
//   addSubMap: (map: MarkerImageData) => void;
// };

// export const useSubMapStore = create<SubMapStore>((set) => ({
//   subMaps: [],
//   setSubMaps: (maps) => set({ subMaps: maps }),
//   addSubMap: (map) => set((state) => ({ subMaps: [...state.subMaps, map] })),
// }));