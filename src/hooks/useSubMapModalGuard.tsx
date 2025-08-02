import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "@hooks/useModal";
import { ModalSubMapForm } from "@components/ModalSubMapForm";
import { useEffect, useRef } from "react";
import { useSubMapsContext } from "./useSubMapsContext";

export const useSubMapModalGuard = (basePath: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subMaps, isSubMapsLoading } = useSubMapsContext();
  const { createModal, openModal, closeModal } = useModal();

  const modalCreated = useRef(false);
  const hasNavigatedBack = useRef(false);
  const redirectEvaluated = useRef(false);
  const lastRoute = useRef<string>(document.referrer);
  const appOrigin = window.location.origin;

  // Exibe modal de forma obrigatória quando não há subMaps e estamos na basePath
  useEffect(() => {
    const isRootPath = location.pathname === basePath;

    if (
      isRootPath &&
      subMaps.length === 0 &&
      !isSubMapsLoading &&
      !modalCreated.current
    ) {
      createModal({
        size: "auto",
        disableOnClose: true,
        children: (
          <ModalSubMapForm
            onClose={() => {
              if (!hasNavigatedBack.current) {
                hasNavigatedBack.current = true;
                if (!lastRoute.current.includes(appOrigin)) {
                  navigate("/", { replace: true });
                } else {
                  navigate(-1);
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

    // Caso um subMap tenha sido criado, fecha modal e redireciona
    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isSubMapsLoading &&
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
    isSubMapsLoading,
    createModal,
    openModal,
    closeModal,
    navigate,
    appOrigin
  ]);

  // Quando subMaps já existem, pode abrir modal com fechamento permitido
  useEffect(() => {
    const isRootPath = location.pathname === basePath;

    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isSubMapsLoading &&
      !modalCreated.current
    ) {
      createModal({
        size: "auto",
        children: <ModalSubMapForm onClose={closeModal} />,
      });

      modalCreated.current = true;
    }

    if (
      isRootPath &&
      subMaps.length > 0 &&
      !isSubMapsLoading &&
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
    isSubMapsLoading,
    createModal,
    closeModal,
    navigate
  ]);

  return { openModal };
};
