// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
// import { usePostSubMap } from "@services/hooks/subMaps/usePostSubMap";
// import { usePatchSubMapById } from "@services/hooks/subMaps/usePatchSubMap";
// import { useDeleteSubMapById } from "@services/hooks/subMaps/useDeleteSubMap";
// import { useToastInfo } from "@hooks/useToastInfo";
// import { createDynamicSubMapRoutes } from "@factories/subMapFactorie/createDynamicSubMapRoutes";
// import type { MarkerImageData } from "@hooks/usePersistentMarkers";

// export type SubMapRoute = {
//   path: string;
//   element: React.ReactNode;
//   handle: { pageTitle: string };
// };

export const useSubMapRoutes = () => {
  // const { subMaps, getSubMaps } = useGetSubMaps();
  // const { postSubMap } = usePostSubMap();
  // const { patchSubMapById } = usePatchSubMapById();
  // const { deleteSubMapById } = useDeleteSubMapById();
  // const { showToast } = useToastInfo();

  // const [routes, setRoutes] = useState<SubMapRoute[]>([]);

  // useEffect(() => {
  //   const initializeSubMaps = async () => {
  //     try {
  //       const result = await getSubMaps();

  //       if (Array.isArray(result) && result.length === 0) {
  //         // Criação de um sub-mapa inicial se a lista vier vazia
  //         const initialTitle = "sub-mapa-1";
  //         const initialData: MarkerImageData = {
  //           id: uuidv4(),
  //           title: initialTitle,
  //           image: "", // será atualizado no modal
  //           markers: [],
  //           uploaded: false,
  //         };

  //         await postSubMap(initialData);
  //         await getSubMaps();
  //       }
  //     } catch {
  //       showToast({
  //         type: "error",
  //         message: "Erro ao inicializar sub mapas",
  //       });
  //     }
  //   };

  //   initializeSubMaps();
  // }, [getSubMaps, postSubMap, showToast]);

  // useEffect(() => {
  //   if (Array.isArray(subMaps) && subMaps.length > 0) {
  //     const generatedRoutes = createDynamicSubMapRoutes(subMaps);
  //     setRoutes(generatedRoutes);
  //   }
  // }, [subMaps]);

  // // Exposição opcional de métodos CRUD adicionais
  // const addNewSubMap = async (imageBase64: string): Promise<void> => {
  //   const nextIndex = Array.isArray(subMaps) ? subMaps.length + 1 : 1;
  //   const newTitle = `sub-mapa-${nextIndex}`;

  //   const newMap: MarkerImageData = {
  //     id: uuidv4(),
  //     title: newTitle,
  //     image: imageBase64,
  //     uploaded: true,
  //     markers: [],
  //   };

  //   await postSubMap(newMap);
  //   await getSubMaps();
  // };

  // const patchSubMap = patchSubMapById;
  // const deleteSubMap = deleteSubMapById;

  // return {
  //   routes,
  //   subMaps,
  //   addNewSubMap,
  //   patchSubMap,
  //   deleteSubMap,
  // };
};
