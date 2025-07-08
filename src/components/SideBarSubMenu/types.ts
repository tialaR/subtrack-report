import type { defaultFormatRouteLabel } from "@utils/routeHelper";

export type LabelFormat = 'upperCase' | "lowerCase" | "default";

export type SubMenuRoute = {
  path: string;
  label?: string;
  element?: React.ReactNode; // se for necessário para outro uso
};

export type SideBarSubMenuProps = {
  basePath: string;
  itemIcon: React.ReactNode;
  labelFormat?: LabelFormat;
  expanded?: boolean;
  formatRouteLabel?: typeof defaultFormatRouteLabel;
};