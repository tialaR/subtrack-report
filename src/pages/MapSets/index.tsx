import { useEffect, useState, useRef } from 'react';
import locationPlan from '@assets/images/locationPlan.png';
import { SnapshotBubble } from '@components/SnapshotBubble';
import { setMaps } from '@utils/setsMap';
import * as S from './styles';

type SnapshotData = {
  id: string;
  imageSrc: string;
};

const MapSets: React.FC = () => {
  const [snapshots, setSnapshots] = useState<SnapshotData[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: SnapshotData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.startsWith('@subtrack-report:snapshot-conjunto-')) {
        const match = key.match(/conjunto-(\d+)/);
        const id = match?.[1];
        const imageSrc = localStorage.getItem(key);
        if (id && imageSrc) {
          data.push({ id, imageSrc });
        }
      }
    }

    setSnapshots(data);
  }, []);

  return (
    <S.Container>
      <S.Description>
        PLANTA DE LOCALIZAÇÃO – DETALHAMENTO DOS LOCAIS INSPECIONADOS NO DIAPOR CONJUNTO - TEMADRE
      </S.Description>

      <S.MapWrapper ref={imageWrapperRef}>
        <S.MapImage src={locationPlan} alt="Mapa de conjuntos" />

        {[...snapshots].reverse().map(({ id, imageSrc }, index) => {
          const match = setMaps?.find((set) => String(set?.id) === id);
          if (!match) return null;

          return (
            <SnapshotBubble
              key={id}
              imageSrc={imageSrc}
              title={match.label}
              wrapperRef={imageWrapperRef}
              onRemove={() => {
                localStorage.removeItem(`@subtrack-report:snapshot-conjunto-${id}`);
                setSnapshots((prev) => prev.filter((s) => s.id !== id));
              }}
              initialOffsetIndex={index + 1} // posição na pilha horizontal
            />
          );
        })}
      </S.MapWrapper>
    </S.Container>
  );
};

export { MapSets };
