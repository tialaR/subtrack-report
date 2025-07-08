// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useToastInfo } from "@hooks/useToastInfo";
// import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
// import { usePostSubMap } from "@services/hooks/subMaps/usePostSubMap";
// import { usePatchSubMapById } from "@services/hooks/subMaps/usePatchSubMap";

// export type Point = {
//   x: number;
//   y: number;
//   color: string;
// };

// export type MarkerImageData = {
//   id: string;
//   title: string;
//   image: string; // base64 da imagem original
//   markers: Point[];
//   uploaded: boolean;
// };

// export function usePersistentMarkers(
//   id: string,
//   imageSrc: string,
//   title: string,
//   uploaded: boolean = false
// ) {
  // const [data, setData] = useState<MarkerImageData | null>(null);
  // const { showToast } = useToastInfo();
  // const { getSubMaps, subMaps } = useGetSubMaps();
  // const { postSubMap } = usePostSubMap();
  // const { patchSubMapById } = usePatchSubMapById();

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       await getSubMaps();
  //     } catch {
  //       showToast({
  //         type: "error",
  //         message: "Erro ao carregar sub mapas",
  //       });
  //     }
  //   };
  //   initialize();
  // }, [getSubMaps, showToast]);

  // useEffect(() => {
  //   const existing = subMaps.find((s) => s.id === id);
  //   if (existing) {
  //     setData(existing);
  //   } else {
  //     const convertImageToBase64 = async () => {
  //       try {
  //         const blob = await fetch(imageSrc).then((res) => res.blob());
  //         const reader = new FileReader();
  //         reader.onloadend = async () => {
  //           const base64 = reader.result as string;
  //           const initialData: MarkerImageData = {
  //             id: uuidv4(),
  //             title,
  //             image: base64,
  //             markers: [],
  //             uploaded,
  //           };
  //           const saved = await postSubMap(initialData);
  //           if (saved) setData(saved);
  //         };
  //         reader.readAsDataURL(blob);
  //       } catch {
  //         showToast({
  //           type: "error",
  //           message: "Erro ao converter imagem para base64",
  //         });
  //       }
  //     };
  //     convertImageToBase64();
  //   }
  // }, [subMaps, id, title, imageSrc, uploaded, postSubMap, showToast]);

  // const updateMarkers = async (newMarkers: Point[]) => {
  //   if (!data) return;
  //   const updated = { markers: newMarkers };
  //   try {
  //     const res = await patchSubMapById(data.id, updated);
  //     if (res) setData({ ...data, markers: newMarkers });
  //   } catch {
  //     showToast({
  //       type: "error",
  //       message: "Erro ao atualizar marcadores",
  //     });
  //   }
  // };

  // return {
  //   markerData: data,
  //   markers: data?.markers || [],
  //   updateMarkers,
  // };
// }
