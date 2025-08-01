import { defaultFormatRouteLabel } from "@utils/routeHelper";
import * as S from "./styles";
import type { SideBarSubMenuProps } from "./types";
import { Button } from "@components/Button";
import { useModal } from "@hooks/useModal";
import { useEffect } from "react";
import { ModalSubMapForm } from "@components/ModalSubMapForm";

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const { createModal, Modal, openModal, closeModal } = useModal();

  useEffect(() => {
    createModal({
      size: "auto",
      children: <ModalSubMapForm onClose={closeModal} />,
    });
  }, [createModal, closeModal]);

  return (
    <>
      <S.Container>
        <Button variant="tertiary" showIcon iconType="plus" onClick={openModal}>
          {expanded && "Criar sub mapa"}
        </Button>
      </S.Container>
      {Modal}
    </>
  );
};

export { SideBarSubMenu };
