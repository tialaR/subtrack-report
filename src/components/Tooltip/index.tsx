import { useRef, useState } from 'react';
import type { TooltipProps } from './types';
import * as S from './styles';

const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 300 }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  return (
    <S.Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <S.Content visible={visible}>{content}</S.Content>
    </S.Wrapper>
  );
};

export { Tooltip };
