import { RotationAnchor } from '@components/RotationAnchor';
import type { RotationAnchorsProps } from './types';


const RotationAnchors: React.FC<RotationAnchorsProps> = ({ onPointerDown, icon = <></> }) => {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
  
  return (
    <>
      {positions?.map((position) => (
        <RotationAnchor
          key={position}
          icon={icon}
          position={position}
          onPointerDown={onPointerDown}
        />
      ))}
    </>
  );
};

export { RotationAnchors };
