// import { format } from 'date-fns';

import type { ReactNode } from 'react';
import { useOpenMeteo } from '@hooks/useOpenMeteo';
import { getWeatherIcon } from '@utils/formatWeather';
import * as S from './styles';

const TabulationDay: React.FC = () => {
  const { weather, loading } = useOpenMeteo();

  if (loading) return <p>Carregando dados da previsão...</p>;
  if (weather.length === 0) return <p>Nenhum dado disponível.</p>;

  const renderRow = (label: string, values: (string | number | ReactNode)[]) => (
    <S.Grid>
      <S.LabelCell>{label}</S.LabelCell>
      {values.map((val, i) => (
        <S.Cell key={i}>{val}</S.Cell>
      ))}
    </S.Grid>
  );

  const hours = weather.map(w => w.hour);
  const temperatures = weather.map(w => `${w.temperature.toFixed(1)}°C`);
  const pressures = weather.map(w => `${w.pressure.toFixed(0)} hPa`);
  const rain = weather.map(w => `${w.precipitation}%`);
  const icons = weather.map(w => getWeatherIcon(w.weatherCode));

  return (
    <S.TableWrapper>
      {renderRow('Hora', hours)}
      {renderRow('🌡️ Temp.', temperatures)}
      {renderRow('💧 Pressão', pressures)}
      {renderRow('🌧️ Chuva', rain)}
      {renderRow('☁️ Clima', icons)}
    </S.TableWrapper>
  );
}

export { TabulationDay }