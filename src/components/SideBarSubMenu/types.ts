import type { defaultFormatRouteLabel } from "@utils/routeHelper";

export type LabelFormat = 'upperCase' | "lowerCase" | "deafult";

export type SubMenuRoute = {
  path: string;
  element: React.ReactNode;
};

export type SideBarSubMenuProps = {
  basePath: string;
  routes: SubMenuRoute[];
  itemIcon: React.ReactNode;
  labelFormat?: LabelFormat;
  expanded?: boolean;
  formatRouteLabel?: typeof defaultFormatRouteLabel;
};