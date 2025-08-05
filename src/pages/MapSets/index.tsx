import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useScreenshotGeneralMapStorage } from "@hooks/useScreenshotGeneralMapStorage";
import { ScreenshotBubbles } from "@components/ScreenshotBubbles";
import { Button } from "@components/Button";
import { MainDescription } from "@components/MainDescription";
import { LoadingScreen } from "@components/LoadingScreen";
import { useGetGeneralMap } from "@services/hooks/generalMap/useGetGeneralMap";
import { ErrorScreen } from "@components/ErrorScreen";
import {
  StyleButtonsWrapper,
  StyleHeaderPageWrapper,
} from "@styles/StyleComponets";
import { usePostGeneralMapCapture } from "@services/hooks/generalMapCapture";
import * as S from "./styles";
import { persistImageWithCanvas } from "@utils/persistImageHelper";
import { useToastInfo } from "@hooks/useToastInfo";
import { delay } from "@utils/delayHelper";

const MapSets: React.FC = () => {
  const { showToast } = useToastInfo();
  const [hideButtonsActions, setHideButtonsActions] = useState(false);

  const {
    screenshots,
    updateScreenshot,
    removeScreenshotById,
    removeAllScreenshots,
    resetScreenshotsPosition,
    wrapperRef,
  } = useScreenshotGeneralMapStorage();

  const {
    data: generalMap,
    loading: isGeneralMapLoading,
    error: isGenerealMapError,
    fetchData: getGeneralMap,
  } = useGetGeneralMap();

  const { postGeneralMapCapture } = usePostGeneralMapCapture();

  const isLoading = !generalMap?.image && isGeneralMapLoading;
  const isError = isGenerealMapError && !isGeneralMapLoading;

  useEffect(() => {
    getGeneralMap();
  }, []);

  const handlePersist = async () => {
    setHideButtonsActions(true);
    await delay(100)

    const payload = {
      id: uuidv4(),
      generated_at: new Date().toLocaleString("pt-BR"),
    };

    await persistImageWithCanvas({
      ref: wrapperRef,
      payload,
      persistFn: (data) => postGeneralMapCapture(data),
      onSuccess: () => {
        showToast({
          type: "success",
          message: "Registros do dia capturados com sucesso!",
        });
      },
      onError: () => {
        showToast({
          type: "error",
          message: "Erro ao capturar registros do dia!",
          description: "Tente novamente.",
        });
      },
    });

    setHideButtonsActions(false);
  };

  const renderHeader = () => {
    return (
      <StyleHeaderPageWrapper>
        <MainDescription>
          {generalMap?.content ?? "CARREGANDO DESCRIÇÃO..."}
        </MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Redefinir posições"
            variant="primary"
            showIcon
            iconType="refresh"
            onClick={resetScreenshotsPosition}
          >
            Redefinir posições
          </Button>
          <Button
            title="Excluir todos screenshots"
            variant="secondary"
            showIcon
            iconType="upload"
            onClick={handlePersist}
          >
            Salvar alterações
          </Button>
          <Button
            title="Excluir todos screenshots"
            variant="secondary"
            showIcon
            iconType="delete"
            onClick={removeAllScreenshots}
          >
            Excluir screenshots
          </Button>
        </StyleButtonsWrapper>
      </StyleHeaderPageWrapper>
    );
  };

  if (isLoading) {
    return (
      <>
        {renderHeader()}
        <LoadingScreen />
      </>
    );
  }

  if (isError) {
    return <ErrorScreen onRetry={getGeneralMap} />;
  }

  return (
    <S.Container>
      {renderHeader()}

      <S.MapWrapper ref={wrapperRef}>
        <S.MapImage src={generalMap?.image} alt={generalMap?.title} />
        {screenshots?.length > 0 && (
          <ScreenshotBubbles
            wrapperRef={wrapperRef}
            screenshots={screenshots}
            onUpdateScreenshot={updateScreenshot}
            onDeleteScreenshot={removeScreenshotById}
            hideButtonsActions={hideButtonsActions}
          />
        )}
      </S.MapWrapper>
    </S.Container>
  );
};

export { MapSets };
