import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MainDescription } from "@components/MainDescription";
import { ImageGridUploader } from "@components/ImageGridUploader";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import { Button } from "@components/Button";
import { useModal } from "@hooks/useModal";
import { RecordDayPreview } from "./RecordDayPreview";
import { useGetRecordsDayPreview } from "@services/hooks/recordsDay/useGetRecordsDayPreview";
import { LoadingScreen } from "@components/LoadingScreen";
import { ErrorScreen } from "@components/ErrorScreen";
import { usePostRecordDay } from "@services/hooks/recordsDay/usePostRecordDay";
import { useDeleteRecordDayById } from "@services/hooks/recordsDay/useDeleteRecordDayById";
import { useGetRecordsDay } from "@services/hooks/recordsDay/useGetRecordsDay";
import { useDeleteAllRecordsDay } from "@services/hooks/recordsDay/useDeleteAllRecordsDay";
import { usePatchRecordDay } from "@services/hooks/recordsDay/usePatchRecordDay";
import { useDeleteRecordsDayPreview } from "@services/hooks/recordsDay/useDeleteRecordsDayPreview";
import { useRecordDayCapture } from "@services/hooks/recordsDay/useRecordDayCapture";
import { fileToBase64 } from "@utils/fileToBase64Helper";
import type { RecordDay } from "@services/hooks/recordsDay/types";
import { delay } from "@utils/delayHelper";
import * as S from "./styles";

const MAX_IMAGES = 8;

const RecordsOfDay: React.FC = () => {
  const {
    data: recordsDay,
    loading: isRecordsDayLoading,
    error: isRecordsDayError,
    getRecordsDay,
  } = useGetRecordsDay();
  const { postRecordDay } = usePostRecordDay();
  const { patchRecordDay } = usePatchRecordDay();
  const { deleteRecordDayById } = useDeleteRecordDayById();
  const { deleteAllRecordsDay } = useDeleteAllRecordsDay();
  const {
    getRecordsDayPreview,
    data: recordsDayPreview,
    loading: isRecordsDayPreviewLoading,
  } = useGetRecordsDayPreview();
  const { deleteRecordsDayPreview } = useDeleteRecordsDayPreview();
  const { containerRef, handlePersist } = useRecordDayCapture();

  const { Modal, openModal, createModal } = useModal();

  const hasMounted = useRef(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [renderHiddenPreview, setRenderHiddenPreview] = useState(false);
  const [loadingCardIds, setLoadingCardIds] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const isFirstRender = isRecordsDayLoading && refreshTrigger === 0;

  const hasRecordsDayImages =
    recordsDay && recordsDay.length > 0 && !isRecordsDayLoading;
  const showMaxLimit = recordsDay?.length === MAX_IMAGES;

  const isPreviewEmpty = useMemo(
    () => !isRecordsDayPreviewLoading && recordsDayPreview.length === 0,
    [isRecordsDayPreviewLoading, recordsDayPreview]
  );
  const isRecordsEmpty = useMemo(
    () => !isRecordsDayLoading && recordsDay.length === 0,
    [isRecordsDayLoading, recordsDay]
  );

  useEffect(() => {
    if (!hasMounted.current) {
      getRecordsDay();
      getRecordsDayPreview();
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      getRecordsDay();
      getRecordsDayPreview();
    }
  }, [refreshTrigger]);

  useEffect(() => {
    if (hasRecordsDayImages) {
      createModal({
        size: "large",
        children: (
          <RecordDayPreview ref={containerRef} recordsDay={recordsDay} />
        ),
      });
    }
  }, [hasRecordsDayImages]);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  const handleAddImage = async (file?: File) => {
    if (!file) return;
    setIsAdding(true);
    const base64 = await fileToBase64(file);
    const newRecord: RecordDay = {
      id: uuidv4(),
      title: `img-${Date.now()}`,
      image: base64,
    };
    await postRecordDay(newRecord);
    setIsAdding(false);
    refresh();
  };

  const handleReplaceImage = async ({
    id,
    file,
  }: {
    id: string;
    file?: File;
  }) => {
    if (!file) return;
    setLoadingCardIds((prev) => [...prev, id]);
    const base64 = await fileToBase64(file);
    await patchRecordDay({ id, payload: { image: base64 } });
    setLoadingCardIds((prev) => prev.filter((item) => item !== id));
    refresh();
  };

  const handleDeleteRecordDayById = async ({
    id,
    recordsDayWillBeEmpty,
  }: {
    id: string;
    recordsDayWillBeEmpty: boolean;
  }) => {
    setLoadingCardIds((prev) => [...prev, id]);
    await deleteRecordDayById(id);
    if (recordsDayWillBeEmpty) {
      await deleteRecordsDayPreview();
    }
    setLoadingCardIds((prev) => prev.filter((item) => item !== id));
    refresh();
  };

  const handleDeleteAllRecords = async () => {
    await deleteAllRecordsDay();
    await deleteRecordsDayPreview();
    refresh();
  };

  const handleGenerateAndCapture = async () => {
    setRenderHiddenPreview(true);
    await delay(100); // Adiciona um pequeno delay no clique
    await handlePersist();
    getRecordsDayPreview();
  };

  const renderHeader = () => {
    return (
      <header>
        <MainDescription>
          {"É necessário inserir no mínimo uma imagem e no máximo oito imagens para continuar."?.toUpperCase()}
        </MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Capturar imagens"
            variant="primary"
            iconType="camera"
            showIcon
            disabled={isRecordsEmpty}
            showLoadingOverlay
            onClick={handleGenerateAndCapture}
          >
            Capturar imagem
          </Button>
          <Button
            title="Visualizar captura"
            variant="secondary"
            iconType="show"
            showIcon
            showLoadingOverlay
            disabled={isPreviewEmpty}
            onClick={openModal}
          >
            Visualizar captura
          </Button>
          <Button
            title="Excluir todas imagens"
            variant="secondary"
            showIcon
            iconType="delete"
            showLoadingOverlay
            disabled={isRecordsEmpty}
            onClick={handleDeleteAllRecords}
          >
            Excluir todas imagens
          </Button>
        </StyleButtonsWrapper>
      </header>
    );
  };

  if (isFirstRender) {
    return (
      <>
        {renderHeader()}
        <LoadingScreen
          title="Carregando registros..."
          description="Obtendo imagens registradas hoje."
        />
      </>
    );
  }

  if (isRecordsDayError) {
    return (
      <>
        {renderHeader()}
        <ErrorScreen
          title="Erro ao obter registros"
          description="Não conseguimos acessar os registros do dia de hoje. Verifique se existem imagens registradas."
          onRetry={getRecordsDay}
        />
      </>
    );
  }

  return (
    <>
      <S.Container>
        {renderHeader()}
        <ImageGridUploader
          recordsDay={recordsDay}
          onAddImage={handleAddImage}
          onReplaceImage={handleReplaceImage}
          onDeleteImage={handleDeleteRecordDayById}
          maxImages={MAX_IMAGES}
          isCardLoading={(id) => loadingCardIds.includes(id)}
          isAddingImage={isAdding}
        />
        {showMaxLimit && (
          <S.Message>
            VOCÊ ATINGIU 0 LIMITE MÁXIMO DE IMAGENS PARA GERAR OS REGISTROS DO DIA!
          </S.Message>
        )}
      </S.Container>
      {Modal}

      {renderHiddenPreview && (
        <div style={{ position: "absolute", top: -9999, left: -9999 }}>
          <RecordDayPreview
            ref={containerRef}
            recordsDay={recordsDay}
            isHidden
          />
        </div>
      )}
    </>
  );
};

export { RecordsOfDay };
