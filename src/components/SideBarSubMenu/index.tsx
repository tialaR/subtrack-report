import { defaultFormatRouteLabel } from "@utils/routeHelper";
import * as S from "./styles";
import type { SideBarSubMenuProps } from "./types";
import { Button } from "@components/Button";
import { useModal } from "@hooks/useModal";
import { useEffect, useRef } from "react";
import { ModalSubMapForm } from "@components/ModalSubMapForm";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
import { useLocation, useNavigate } from "react-router-dom";

const useSubMapModalGuard = (basePath: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subMaps, getSubMaps, loading: isLoadingGetSubMaps } = useGetSubMaps();
  const { createModal, openModal, closeModal, Modal } = useModal();

  const modalCreated = useRef(false); // evita múltiplas criações
  const hasNavigatedBack = useRef(false);
  const previousPath = useRef<string | null>(null);
  const redirectEvaluated = useRef(false);
  const lastRoute = useRef<string>(document.referrer);
  const appOrigin = window.location.origin; // origem da aplicação

  useEffect(() => {
    getSubMaps(); // dispara busca uma única vez
  }, []);

  useEffect(() => {
    const isRootPath = location.pathname === basePath;

    if (
      isRootPath &&
      subMaps.length === 0 &&
      !isLoadingGetSubMaps &&
      !modalCreated.current
    ) {
      previousPath.current = document.referrer;

      createModal({
        size: "auto",
        disableOnClose: true, // impede fechamento manual
        children: (
          <ModalSubMapForm
            onClose={() => {
              if (!hasNavigatedBack.current) {
                hasNavigatedBack.current = true;
                if (!lastRoute.current.includes(appOrigin)) {
                  navigate("/", { replace: true }); // fallback seguro se referrer inválido
                } else {
                  navigate(-1); // tenta voltar para a última rota válida dentro do app
                }
              }
              closeModal();
            }}
          />
        ),
      });

      openModal();
      modalCreated.current = true;
    }

    // Caso subMap tenha sido criado com sucesso, redireciona automaticamente
    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isLoadingGetSubMaps &&
      modalCreated.current &&
      !redirectEvaluated.current
    ) {
      redirectEvaluated.current = true;
      closeModal();
      navigate(`${basePath}/${subMaps[0].id}`);
    }
  }, [
    location.pathname,
    basePath,
    subMaps,
    location,
    isLoadingGetSubMaps,
    createModal,
    openModal,
    closeModal,
    navigate
  ]);

  useEffect(() => {
    const isRootPath = location.pathname === basePath;

    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isLoadingGetSubMaps &&
      !modalCreated.current
    ) {
      previousPath.current = document.referrer;

      createModal({
        size: "auto",
        children: (
          <ModalSubMapForm onClose={closeModal} />
        ),
      });

      modalCreated.current = true;
    }

    // Caso subMap tenha sido criado com sucesso, redireciona automaticamente
    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isLoadingGetSubMaps &&
      modalCreated.current &&
      !redirectEvaluated.current
    ) {
      redirectEvaluated.current = true;
      navigate(`${basePath}/${subMaps[0].id}`);
    }
  }, [
    location.pathname,
    basePath,
    subMaps,
    isLoadingGetSubMaps,
    createModal,
    openModal,
    closeModal,
    navigate
  ]);

  return { Modal, openModal };
};

const SideBarSubMenu = ({
  basePath,
  itemIcon,
  labelFormat = "default",
  expanded = false,
  formatRouteLabel = defaultFormatRouteLabel,
}: SideBarSubMenuProps) => {
  const { subMaps, getSubMaps, loading: isLoadingGetSubMaps } = useGetSubMaps();
  const navigate = useNavigate();
  const location = useLocation();
  const modalInitialized = useRef(false);
  const redirectEvaluated = useRef(false);

  // Hook que protege a rota base e força criação de subMap
  const { Modal, openModal } = useSubMapModalGuard(basePath);

  useEffect(() => {
    getSubMaps();
  }, []);

  // useEffect(() => {
  //   if (!modalInitialized.current) {
  //     createModal({
  //       size: "auto",
  //       children: <ModalSubMapForm onClose={closeModal} />,
  //     });
  //     modalInitialized.current = true;
  //   }
  // }, [createModal, closeModal]);

  // useEffect(() => {
  //   const isRootPath = location.pathname === basePath;
  //   if (
  //     !isRootPath ||
  //     redirectEvaluated.current ||
  //     !modalInitialized.current ||
  //     isLoadingGetSubMaps ||
  //     !subMaps
  //   )
  //     return;

  //   redirectEvaluated.current = true;

  //   if (subMaps.length > 0) {
  //     navigate(`${basePath}/${subMaps[0].id}`);
  //   } else {
  //     openModal();
  //   }
  // }, [subMaps, basePath, navigate, openModal, location.pathname, isLoadingGetSubMaps]);

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
