import { defaultFormatRouteLabel } from "@utils/routeHelper";
import { Button } from "@components/Button";
import { useSubMapsContext } from "@hooks/useSubMapsContext";
import { useSubMapModalGuard } from "@hooks/useSubMapModalGuard";
import type { SideBarSubMenuProps } from "./types";
import * as S from "./styles";

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const { subMaps } = useSubMapsContext();

  const { openModal } = useSubMapModalGuard(basePath);

  return (
    <>
      <S.Container $expanded={expanded}>
        <S.SubMenuList>
          {subMaps?.map((subMap, index) => (
            <S.StyledLink
              key={subMap?.id}
              to={`${basePath}/${subMap?.id}`}
              $expanded={expanded}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {itemIcon && <>{itemIcon}</>}
              <span>
                {expanded
                  ? formatRouteLabel({ label: subMap?.title, labelFormat })
                  : ` - ${index + 1}`}
              </span>
            </S.StyledLink>
          ))}
        </S.SubMenuList>
        <Button variant="tertiary" showIcon iconType="add" onClick={openModal}>
          {expanded && "Criar novo sub mapa"}
        </Button>
      </S.Container>
    </>
  );
};

export { SideBarSubMenu };
