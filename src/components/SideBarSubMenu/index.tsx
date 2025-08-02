import { defaultFormatRouteLabel } from "@utils/routeHelper";
import * as S from "./styles";
import type { SideBarSubMenuProps } from "./types";
import { Button } from "@components/Button";
import { useModal } from "@hooks/useModal";
import { useEffect, useRef } from "react";
import { ModalSubMapForm } from "@components/ModalSubMapForm";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
   const { createModal, Modal, openModal, closeModal } = useModal();
  const { subMaps, getSubMaps, loading: isLoadingGetSubMaps } = useGetSubMaps();
  const navigate = useNavigate();
  const location = useLocation();
  const modalInitialized = useRef(false);
  const redirectEvaluated = useRef(false);

  useEffect(() => {
    getSubMaps();
  }, []);

  useEffect(() => {
    if (!modalInitialized.current) {
      createModal({
        size: "auto",
        children: <ModalSubMapForm onClose={closeModal} />,
      });
      modalInitialized.current = true;
    }
  }, [createModal, closeModal]);

  useEffect(() => {
    const isRootPath = location.pathname === basePath;
    if (
      !isRootPath ||
      redirectEvaluated.current ||
      !modalInitialized.current ||
      isLoadingGetSubMaps ||
      !subMaps
    )
      return;

    redirectEvaluated.current = true;

    if (subMaps.length > 0) {
      navigate(`${basePath}/${subMaps[0].id}`);
    } else {
      openModal();
    }
  }, [subMaps, basePath, navigate, openModal, location.pathname, isLoadingGetSubMaps]);

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
