import { theme } from "@styles/theme";

export type TMarkerOption = {
  label: string;
  value: string; 
};

export const markersOptions: TMarkerOption[] = [
  { label: 'Marcador Verde', value: theme.colors.tertiary.green },
  { label: 'Marcador Amarelo', value: theme.colors.tertiary.yellow },
  { label: 'Marcador Ciano', value: theme.colors.tertiary.cyan },
  { label: 'Marcador Azul Marinho', value: theme.colors.tertiary.navy },
  { label: 'Marcador Vermelho', value: theme.colors.tertiary.red },
  { label: 'Marcador Roxo', value: theme.colors.tertiary.purple }
];