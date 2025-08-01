import { defaultFormatRouteLabel } from "@utils/routeHelper";
import * as S from "./styles";
import type { SideBarSubMenuProps } from "./types";
import { Button } from "@components/Button";
import { useModal } from "@hooks/useModal";
import { useEffect } from "react";
import { ModalSubMapForm } from "@components/ModalSubMapForm";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const { createModal, Modal, openModal, closeModal } = useModal();
  const { subMaps, getSubMaps } = useGetSubMaps();

  useEffect(() => {
    getSubMaps();
  }, []);

  useEffect(() => {
    createModal({
      size: "auto",
      children: <ModalSubMapForm onClose={closeModal} />,
    });
  }, [createModal, closeModal]);

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
                {expanded && formatRouteLabel({ label: subMap?.title })}
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
