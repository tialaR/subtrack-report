import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetGeneralMapCaptures } from "@services/hooks/generalMapCapture";
import { useGetRecordsDayPreview } from "@services/hooks/recordsDay/useGetRecordsDayPreview";
import { useGetTabulationDay } from "@services/hooks/tabulationDay/useGetTabulationDay";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
import { Logo } from "@components/Logo";
import { typographyPreset } from "@styles/typographyPreset";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing[300]};
  background-color: ${({ theme }) => theme.colors.grey[100]};
`;

const Page = styled.div`
  width: 49.625rem;
  height: 70.188rem;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 auto ${({ theme }) => theme.spacing[300]};
  padding: ${({ theme }) => theme.spacing[550]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: ${({ theme }) => theme.spacing[250]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[500]};
  margin-bottom: ${({ theme }) => theme.spacing[300]};
`;

const Title = styled.h2`
  ${typographyPreset[2]};
  color: ${({ theme }) => theme.colors.grey[900]};
  text-align: justify;
  margin: ${({ theme }) => theme.spacing[300]} 0
    ${({ theme }) => theme.spacing[250]};
`;

const Description = styled.p`
  ${typographyPreset[4]};
  color: ${({ theme }) => theme.colors.grey[800]};
  text-align: justify;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.colors.grey[800]};
  border-radius: ${({ theme }) => theme.spacing[150]};
`;

const Footer = styled.footer`
  ${typographyPreset[4]};
  color: ${({ theme }) => theme.colors.grey[800]};
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[500]};
  padding-top: ${({ theme }) => theme.spacing[250]};
  text-align: justify;
`;

const PageNumber = styled.div`
  margin-top: ${({ theme }) => theme.spacing[50]};
  text-align: right;
  ${typographyPreset[5]};
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const ReportStorageViewer: React.FC = () => {
  const { data: generalMapCapture, getGeneralMapCaptures } =
    useGetGeneralMapCaptures();

  const { data: recordsDayCapture, getRecordsDayPreview } =
    useGetRecordsDayPreview();

  const { tabulationDay, getTabulationDay } = useGetTabulationDay();

  const { subMaps, getSubMaps } = useGetSubMaps();

  useEffect(() => {
    getGeneralMapCaptures();
    getRecordsDayPreview();
    getTabulationDay();
    getSubMaps();
  }, []);

  // alert(JSON.stringify(recordsDayCapture[0]?.image))

  if (!generalMapCapture && !recordsDayCapture && !tabulationDay && !subMaps) {
    return <div>Carregando imagens...</div>;
  }

  const pages = [
    {
      title: "MAPA GERAL",
      description:
        "Essa seção descreve a imagem geral do mapa, capturada automaticamente após a última inspeção. Fornece uma visão macro dos pontos mapeados, facilitando a identificação de áreas críticas de observação. Ideal para contextualizar o local analisado com abrangência visual estratégica.",
      image: generalMapCapture[generalMapCapture.length - 1]?.image,
      footer:
        "Esta imagem é parte do relatório completo de inspeção, servindo como base para análise posterior. Dados extraídos da última atualização registrada.",
    },
    {
      title: "REGISTROS DO DIA",
      description:
        "Apresentamos os registros capturados no dia corrente da inspeção. As imagens representam visualmente as condições observadas e documentadas, promovendo rastreabilidade visual e facilitando revisões técnicas posteriores.",
      image: recordsDayCapture[recordsDayCapture.length - 1]?.image,
      footer:
        "Abaixo está a imagem mais atual do conjunto de registros do dia. Todos os dados visuais foram salvos e validados por operadores autorizados.",
    },
    {
      title: "TABULAÇÃO DO DIA",
      description:
        "A imagem exibida mostra a previsão tabular gerada para o dia vigente. Inclui temperatura, precipitação e outros dados meteorológicos relevantes à atividade realizada. Relevante para contextualizar fatores ambientais na inspeção.",
      image: tabulationDay?.image,
      footer:
        "Registro gerado automaticamente com base na localização e data atuais. Serve como apoio à interpretação ambiental.",
    },
    ...(subMaps?.map((map, index) => ({
      title: `INSPEÇÃO GRANULAR - SUBMAPA-${index + 1}`,
      description:
        "Este submapa representa uma seção específica do mapa geral. A imagem contém marcações visuais feitas manualmente durante a análise. Ideal para detalhar áreas específicas com interesse técnico.",
      image: map.image,
      footer: `A imagem acima pertence ao submapa "${map.title}". Todas as marcações foram registradas e vinculadas ao conjunto de inspeção correspondente.`,
    })) || []),
  ];

  return (
    <Container>
      {pages.map((page, idx) => (
        <Page key={idx}>
          <Header>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <Title>{page.title}</Title>
          </Header>

          <Description>{page.description}</Description>
          {page.image && (
            <ImageWrapper>
              <StyledImage src={page.image} alt={page.title} />
            </ImageWrapper>
          )}
          <Footer>
            {page.footer}
            <PageNumber>
              {tabulationDay.timezone} - {tabulationDay.current_date_short}
            </PageNumber>
            <PageNumber>Página {idx + 1}</PageNumber>
          </Footer>
        </Page>
      ))}
    </Container>
  );
};
