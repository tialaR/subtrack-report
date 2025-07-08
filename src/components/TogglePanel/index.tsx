import { useState } from 'react';
import { ButtonIcon } from '@components/ButtonIcon';
import type { TogglePanelProps } from './types';
import * as S from './styles';

const TogglePanel: React.FC<TogglePanelProps> = ({ children }) => {
  const [isPanelHide, setIsPanelHide] = useState(false);

  return (
    <S.ToggleToolbarWrapper>
        <S.ToggleButtonArea>
          <ButtonIcon
            size="large"
            isToggle
            title={isPanelHide ? "Mostrar painel" : "Ocultar painel"}
            variant={isPanelHide ? "filled" : "outlined"}
            iconType={isPanelHide ? "chevronsRight" : "chevronsLeft"}
            onClick={() => setIsPanelHide((prev) => !prev)}
          />
        </S.ToggleButtonArea>

        <S.ToggleToolbar $hidden={isPanelHide}>
          {children}
        </S.ToggleToolbar>
      </S.ToggleToolbarWrapper>
  )
}

export { TogglePanel };