import styled, { css } from 'styled-components';
import { typographyPreset } from '@styles/typographyPreset';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: ${({ theme }) => theme.spacing[400]};
  padding-bottom: ${({ theme }) => theme.spacing[400]};
  margin-top: ${({ theme }) => theme.spacing[250]};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[400]};
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 13.75rem; //220px
  height: 13.75rem; //220px
  flex-shrink: 0;
`;

const donutRing = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

interface RingProps {
  $background: string;
}

export const OuterRing = styled.div<RingProps>`
  ${donutRing};
  z-index: 1; /* fica atrás */
  background: ${({ $background }) => $background};
  filter: brightness(1.15);                
  mask-image: 
    radial-gradient(circle, transparent 4.375rem, white 4.375rem); //70px
`;

export const InnerRing = styled.div<RingProps>`
  ${donutRing};
  z-index: 2; /* fica por cima */
  background: ${({ $background }) => $background};
  mask-image: 
    radial-gradient(circle, transparent 5.313rem, white 5.313rem); //85px
`;

export const Hole = styled.div`
  ${donutRing};
  background: ${({ theme }) => theme.colors.white};
  width: 10.125rem; //162px
  height: 10.125rem; //162px
  top: ${({ theme }) => theme.spacing[500]};
  left: ${({ theme }) => theme.spacing[500]};
  margin: 0 auto;
`;

export const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .amount {
    ${typographyPreset[1]};
    color: ${({ theme }) => theme.colors.grey[900]};
  }

  .label {
    ${typographyPreset[5]};
    color: ${({ theme }) => theme.colors.grey[500]};
    margin-top: ${({ theme }) => theme.spacing[50]};
  }
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[200]};
`;
