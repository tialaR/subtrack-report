import type { RotationAnchorProps } from './types';
import * as S from './styles';

const RotationAnchor: React.FC<RotationAnchorProps> = ({ position, icon = <></>, onPointerDown }) => {
  return (
    <S.RotationAnchorWrapper $position={position} onPointerDown={onPointerDown}>
      {icon}
    </S.RotationAnchorWrapper>
  );
};

export { RotationAnchor };