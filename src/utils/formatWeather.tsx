import { FiSun, FiCloudRain, FiCloud, FiCloudSnow, FiZap } from 'react-icons/fi';

export const getWeatherIcon = (code: number) => {
  if ([0, 1].includes(code)) return <FiSun />;
  if ([2].includes(code)) return <FiCloud />;
  if ([3, 45, 48].includes(code)) return <FiCloud />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <FiCloudRain />;
  if ([71, 73, 75, 85, 86].includes(code)) return <FiCloudSnow />;
  if ([95, 96, 99].includes(code)) return <FiZap />;
  return '❓';
};
