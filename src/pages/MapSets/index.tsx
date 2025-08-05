import { useEffect } from "react";
import { useScreenshotGeneralMapStorage } from "@hooks/useScreenshotGeneralMapStorage";
import { ScreenshotBubbles } from "@components/ScreenshotBubbles";
import { Button } from "@components/Button";
import { MainDescription } from "@components/MainDescription";
import { LoadingScreen } from "@components/LoadingScreen";
import { useGetGeneralMap } from "@services/hooks/generalMap/useGetGeneralMap";
import { ErrorScreen } from "@components/ErrorScreen";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import * as S from "./styles";

const MapSets: React.FC = () => {
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

  const isLoading = !generalMap?.image && isGeneralMapLoading;
  const isError = isGenerealMapError && !isGeneralMapLoading;

  useEffect(() => {
    getGeneralMap();
  }, []);

  // useEffect(() => {
  //   alert(JSON.stringify(snapshots))
  // }, [snapshots])

  const renderHeader = () => {
    return (
      <div>
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
            iconType="delete"
            onClick={removeAllScreenshots}
          >
            Excluir screenshots
          </Button>
        </StyleButtonsWrapper>
      </div>
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
          />
        )}
      </S.MapWrapper>
    </S.Container>
  );
};

export { MapSets };
