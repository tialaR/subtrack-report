import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultFormatRouteLabel } from "@utils/routeHelper";
import type { SideBarSubMenuProps } from "./types";
import * as S from "./styles";

const SideBarSubMenu = ({
  basePath,
  routes,
  itemIcon,
  labelFormat = "deafult",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const subRoutes = useMemo(() => routes, [routes]);

  useEffect(() => {
    const isOnBasePath =
      location.pathname === basePath || location.pathname === `${basePath}/`;

    if (routes?.length > 0 && isOnBasePath) {
      navigate(`${basePath}/${routes[0]?.path}`, { replace: true });
    }
  }, [location.pathname, basePath, routes, navigate]);

  return (
    <S.Container>
      {subRoutes?.map((subRoute, index) => {
        const path = `${basePath}/${subRoute?.path}`;
        const subRouteLabel = expanded
          ? formatRouteLabel({ label: subRoute?.path, labelFormat })
          : ` - ${index + 1}`;

        return (
          <S.StyledLink
            key={subRoute?.path}
            to={path}
            $expanded={expanded}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {itemIcon}
            <span>{subRouteLabel}</span>
          </S.StyledLink>
        );
      })}
    </S.Container>
  );
};

export { SideBarSubMenu };
