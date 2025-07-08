// SideBarSubMenu.tsx
import { defaultFormatRouteLabel } from "@utils/routeHelper";
import { useUploadSubMap } from "@hooks/useUploadSubMap";
import { useSubMapStore } from "@hooks/useSubMapStore";
import * as S from "./styles";
import type { SideBarSubMenuProps } from "./types";
import { Button } from "../Button";
import { Modal } from "@components/Modal";

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const { subMaps } = useSubMapStore();
  const {
    showModal,
    setShowModal,
    imageFile,
    setImageFile,
    handleUpload,
    shouldOpenModal,
  } = useUploadSubMap(basePath);

  // Abrir o modal automaticamente se não houver submaps
  if (shouldOpenModal && !showModal) {
    setShowModal(true);
  }

  return (
    <>
      <S.Container>
        {subMaps?.map((subMap, index) => {
          const path = `${basePath}/${subMap?.title}`;
          const label = subMap?.title;
          const subRouteLabel = expanded
            ? formatRouteLabel({ label, labelFormat: labelFormat })
            : ` - ${index + 1}`;

          return (
            <S.StyledLink
              key={subMap?.id}
              to={path}
              $expanded={expanded}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {itemIcon}
              <span>{subRouteLabel}</span>
            </S.StyledLink>
          );
        })}

        <Button
          variant="tertiary"
          showIcon
          iconType="plus"
          onClick={() => setShowModal(true)}
        >
          {expanded && "Criar sub mapa"}
        </Button>
      </S.Container>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Novo Sub Mapa"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <S.ModalActions>
          <button onClick={handleUpload} disabled={!imageFile}>
            Criar
          </button>
        </S.ModalActions>
      </Modal>
    </>
  );
};

export { SideBarSubMenu };
