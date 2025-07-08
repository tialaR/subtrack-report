import { useState } from 'react';
import { weatherLegendItems } from '@utils/tabulationHelper';
import * as S from './styles';

const AccordionWeatherLegend: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <S.Wrapper>
      <S.ToggleButton onClick={() => setOpen(prev => !prev)}>
        Descrição das Condições Climáticas
        <S.Chevron open={open} />
      </S.ToggleButton>

      {open && (
        <S.Grid>
          {weatherLegendItems?.map(({ code, emoji, label }) => (
            <S.Item key={code}>
              <S.Emoji>{emoji}</S.Emoji>
              <S.Info>
                <S.Label>{label}</S.Label>
              </S.Info>
            </S.Item>
          ))}
        </S.Grid>
      )}
    </S.Wrapper>
  );
};

export { AccordionWeatherLegend };
