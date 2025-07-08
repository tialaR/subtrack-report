import { FiRefreshCcw, FiTrash } from 'react-icons/fi';
import { useSnapshotStorage } from '@hooks/useSnapshotStorage';
import { SnapshotBubbles } from '@components/SnapshotBubbles';
import { Button } from '@components/Button';
import { MainDescription } from '@components/MainDescription';
import { StyleButtonsWrapper } from '@styles/StyleComponets';
import locationPlan from '@assets/images/locationPlan.png';
import * as S from './styles';

const MapSets: React.FC = () => {
  const {
    snapshots,
    updateSnapshot,
    removeSnapshot,
    removeAllSnapshots,
    resetSnapshots,
    wrapperRef
  } = useSnapshotStorage();

  return (
    <S.Container>
      <div>
        <MainDescription>
          MAPA DE LOCALIZAÇÃO GERAL – DETALHAMENTO DOS LOCAIS INSPECIONADOS 
        </MainDescription>

        <StyleButtonsWrapper>
          <Button
            title="Redefinir posições"
            variant="secondary-with-icon"
            icon={<FiRefreshCcw />}
            onClick={resetSnapshots}
          >
            Redefinir posições
          </Button>

          <Button
            title="Excluir todos screenshots"
            variant="with-icon"
            icon={<FiTrash />}
            onClick={removeAllSnapshots}
          >
            Excluir todos screenshots
          </Button>
        </StyleButtonsWrapper>
      </div>

      <S.MapWrapper ref={wrapperRef}>
        <S.MapImage src={locationPlan} alt="Mapa Geral" />
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
