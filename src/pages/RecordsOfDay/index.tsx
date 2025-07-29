import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MainDescription } from "@components/MainDescription";
import { ImageGridUploader } from "@components/ImageGridUploader";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import { Button } from "@components/Button";
import { usePostRecordDay } from "@services/hooks/recordsDay/usePostRecordDay";
import { useDeleteRecordDayById } from "@services/hooks/recordsDay/useDeleteRecordDayById";
import { useGetRecordsDay } from "@services/hooks/recordsDay/useGetRecordsDay";
import { useDeleteAllRecordsDay } from "@services/hooks/recordsDay/useDeleteAllRecordsDay";
import { usePatchRecordDay } from "@services/hooks/recordsDay/usePatchRecordDay";
import { fileToBase64 } from "@utils/fileToBase64Helper";
import type { RecordDay } from "@services/hooks/recordsDay/types";
import * as S from "./styles";

const MAX_IMAGES = 8;

const RecordsOfDay: React.FC = () => {
  const { recordsDay, getRecordsDay } = useGetRecordsDay();
  const { postRecordDay } = usePostRecordDay();
  const { patchRecordDay } = usePatchRecordDay();
  const { deleteRecordDayById } = useDeleteRecordDayById();
  const { deleteAllRecordsDay } = useDeleteAllRecordsDay();

  const hasMounted = useRef(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!hasMounted.current) {
      getRecordsDay();
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      getRecordsDay();
    }
  }, [refreshTrigger]);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  const handleAddImage = async (file?: File) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const newRecord: RecordDay = {
      id: uuidv4(),
      title: `img-${Date.now()}`,
      image: base64,
    };
    await postRecordDay(newRecord);
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
    const base64 = await fileToBase64(file);
    await patchRecordDay({ id, payload: { image: base64 } });
    refresh();
  };

  const handleDeleteRecordDayById = async (id: string) => {
    await deleteRecordDayById(id);
    refresh();
  };

  const handleDeleteAllRecords = async () => {
    await deleteAllRecordsDay();
    refresh();
  };

  return (
    <S.Container>
      <div>
        <MainDescription>
          {"É necessário inserir no mínimo uma imagem e no máximo oito imagens para continuar."?.toUpperCase()}
        </MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Capturar imagens"
            variant="primary"
            iconType="camera"
            showIcon
            onClick={() => {}}
          >
            Capturar imagem
          </Button>
          <Button
            title="Visualizar captura"
            variant="secondary"
            iconType="show"
            showIcon
            // disabled
            onClick={() => {}}
          >
            Visualizar captura
          </Button>
          <Button
            title="Excluir todas imagens"
            variant="secondary"
            showIcon
            iconType="delete"
            onClick={handleDeleteAllRecords}
          >
            Excluir todas imagens
          </Button>
        </StyleButtonsWrapper>
      </div>

      <ImageGridUploader
        recordsDay={recordsDay}
        onAddImage={handleAddImage}
        onReplaceImage={handleReplaceImage}
        onDeleteImage={handleDeleteRecordDayById}
        maxImages={MAX_IMAGES}
      />
    </S.Container>
  );
};

export { RecordsOfDay };
