// import { createSubMapComponent } from "./createSubMapComponent";
// import type { SubMapProps } from "@components/SubMap/types";

// export const createDynamicSubMapRoutes = (subMaps: SubMapProps[]) => {
//   return subMaps?.map((map, index) => {
//     const SubMapComponent = createSubMapComponent(map?.title, map?.image, map?.markers, map?.uploaded);
    
//     return {
//       path: `sub-mapa-${index + 1}`,
//       element: <SubMapComponent />,
//       handle: {
//         pageTitle: `Inspeção de Atuação Granular - Sub Mapa ${index + 1}`,
//       },
//     };
//   });
// };
