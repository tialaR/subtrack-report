import { useEffect } from "react";
import { useSnapshotStorage } from "@hooks/useSnapshotStorage";
import { SnapshotBubbles } from "@components/SnapshotBubbles";
import { Button } from "@components/Button";
import { MainDescription } from "@components/MainDescription";
import { LoadingScreen } from "@components/LoadingScreen";
import { useGetGeneralMap } from "@services/hooks/generalMap/useGetGeneralMap";
import { ErrorScreen } from "@components/ErrorScreen";
import { StyleButtonsWrapper } from "@styles/StyleComponets";
import * as S from "./styles";

const MapSets: React.FC = () => {
  const {
    snapshots,
    updateSnapshot,
    removeSnapshot,
    removeAllSnapshots,
    resetSnapshots,
    wrapperRef,
  } = useSnapshotStorage();

  const {
    data: generalMap,
    loading: generalMapLoading,
    error: generealMapError,
    fetchData: getGeneralMap,
  } = useGetGeneralMap();

  const isLoading = !generalMap?.image && generalMapLoading;
  const isError = generealMapError && !generalMapLoading;

  useEffect(() => {
    getGeneralMap();
  }, []);

  const renderHeader = () => {
    return (
      <div>
        <MainDescription>{generalMap?.content ?? "CARREGANDO DESCRIÇÃO..."}</MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Redefinir posições"
            variant="primary"
            showIcon
            iconType="refresh"
            onClick={resetSnapshots}
          >
            Redefinir posições
          </Button>

          <Button
            title="Excluir todos screenshots"
            variant="secondary"
            showIcon
            iconType="delete"
            onClick={removeAllSnapshots}
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
        <SnapshotBubbles
          wrapperRef={wrapperRef}
          snapshots={snapshots}
          onUpdate={updateSnapshot}
          onDelete={removeSnapshot}
        />
      </S.MapWrapper>
    </S.Container>
  );
};

export { MapSets };
