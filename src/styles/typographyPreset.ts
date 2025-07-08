import { css } from 'styled-components'

export const typographyPreset = {
  1: css`
    font-size: ${({ theme }) => theme.typography.presets.text1.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text1.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text1.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  2: css`
    font-size: ${({ theme }) => theme.typography.presets.text2.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text2.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text2.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  3: css`
    font-size: ${({ theme }) => theme.typography.presets.text3.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text3.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text3.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  3.1: css`
    font-size: ${({ theme }) => theme.typography.presets.text3Bold.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text3Bold.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text3Bold.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  4: css`
    font-size: ${({ theme }) => theme.typography.presets.text4.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text4.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text4.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  4.1: css`
    font-size: ${({ theme }) => theme.typography.presets.text4Bold.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text4Bold.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text4Bold.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  5: css`
    font-size: ${({ theme }) => theme.typography.presets.text5.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text5.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text5.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
  5.1: css`
    font-size: ${({ theme }) => theme.typography.presets.text5Bold.fontSize};
    line-height: ${({ theme }) => theme.typography.presets.text5Bold.lineHeight};
    font-weight: ${({ theme }) => theme.typography.presets.text5Bold.fontWeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  `,
}
