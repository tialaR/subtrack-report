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

  const { Modal, openModal } = useSubMapModalGuard(basePath);

  return (
    <>
      <S.Container>
        <S.SubMenuList>
          {subMaps?.map((subMap) => (
            <S.StyledLink
              key={subMap?.id}
              to={`${basePath}/${subMap?.id}`}
              $expanded={expanded}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {itemIcon && <>{itemIcon}</>}
              <span>
                {expanded && formatRouteLabel({ label: subMap?.title, labelFormat })}
              </span>
            </S.StyledLink>
          ))}
        </S.SubMenuList>
        <Button variant="tertiary" showIcon iconType="plus" onClick={openModal}>
          {expanded && "Criar sub mapa"}
        </Button>
      </S.Container>
      {Modal}
    </>
  );
};

export { SideBarSubMenu };
