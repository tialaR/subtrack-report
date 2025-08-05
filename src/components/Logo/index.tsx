import styled from 'styled-components';
import LogoSvg from '@assets/svg/Logo.svg?react';

interface LogoProps {
  size?: string;          // ex: '200px'
  color?: string;         // ex: '#FFFFFF'
  hoverColor?: string;    // ex: '#FF4C4C'
  className?: string;     // se quiser aplicar classe externa
}

const StyledWrapper = styled.div<{ $size: string }>`
  width: 100%;
  max-width: ${({ $size }) => $size};
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(LogoSvg)<{ $color: string; $hoverColor: string }>`
  width: 100%;
  height: auto;

  path,
  text {
    fill: ${({ $color, theme }) => $color ? $color : theme.colors.grey[900]};
    transition: fill 0.3s ease;
  }

  &:hover path,
  &:hover text {
    fill: ${({ $hoverColor }) => $hoverColor};
  }
`;

export const Logo = ({
  size = '200px',
  color = '',
  hoverColor = '',
  className,
}: LogoProps) => {
  return (
    <StyledWrapper $size={size} className={className}>
      <StyledLogo $color={color} $hoverColor={hoverColor} />
    </StyledWrapper>
  );
};
