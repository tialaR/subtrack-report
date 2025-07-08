import { colors } from "@styles/colors";

export type ColorsMapKey = keyof typeof colorsMap;

export const colorsMap = {
    green:   colors.secondary.green,
    cyan:    colors.secondary.cyan,
    purple:  colors.secondary.purple,
    navy:    colors.secondary.navy,
    yellow:  colors.secondary.yellow,
    orange:  colors.other.orange,
  };