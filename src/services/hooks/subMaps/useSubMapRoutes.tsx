import { useEffect, useState } from "react";
import type { RouteObject } from "react-router-dom";
import { UnderwaterInspection } from "@pages/UnderwaterInspection";
import { useGetSubMaps } from "@services/hooks//subMaps/useGetSubMaps";
import type { SubMap } from "./types";

export const useSubMapRoutes = () => {
  const [routes, setRoutes] = useState<RouteObject[]>([]);
  const { subMaps, getSubMaps } = useGetSubMaps();

  useEffect(() => {
    getSubMaps(); // carrega os sub mapas
  }, []);

  useEffect(() => {
    if (subMaps.length > 0) {
      const dynamicRoutes: RouteObject[] = subMaps?.map((subMap: SubMap) => ({
        path: ":id",
        element: <UnderwaterInspection />,
        handle: { pageTitle: subMap?.title },
      }));

      setRoutes(dynamicRoutes);
    }
  }, [subMaps]);

  return { routes };
};
