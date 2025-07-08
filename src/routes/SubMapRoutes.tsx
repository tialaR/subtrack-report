import { SubMap1 } from "@pages/UnderwaterInspection/SubMap1";
import { SubMap2 } from "@pages/UnderwaterInspection/SubMap2";
import { SubMap3 } from "@pages/UnderwaterInspection/SubMap3";
import { SubMap4 } from "@pages/UnderwaterInspection/SubMap4";
import { SubMap5 } from "@pages/UnderwaterInspection/SubMap5";
import { SubMap6 } from "@pages/UnderwaterInspection/SubMap6";
import { SubMap7 } from "@pages/UnderwaterInspection/SubMap7";
import { SubMap8 } from "@pages/UnderwaterInspection/SubMap8";
import { SubMap9 } from "@pages/UnderwaterInspection/SubMap9";
import { SubMap10 } from "@pages/UnderwaterInspection/SubMap10";

export type SubMapRoute = {
  path: string;
  element: React.ReactNode;
  handle: { pageTitle: string };
};

export type SubMapRoutes = SubMapRoute[];

const subMapComponents = [
  SubMap1,
  SubMap2,
  SubMap3,
  SubMap4,
  SubMap5,
  SubMap6,
  SubMap7,
  SubMap8,
  SubMap9,
  SubMap10,
];

const subMapRoutes: SubMapRoutes = subMapComponents.map((Component, index) => ({
  path: `sub-mapa-${index + 1}`,
  element: <Component />,
  handle: { pageTitle: `Inspeção de Atuação Granular - Sub Mapa ${index + 1}` },
}));

export { subMapRoutes };
