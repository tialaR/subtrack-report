import React from 'react';
import styled from 'styled-components';
import { useGetGeneralMapCaptures } from '@services/hooks/generalMapCapture';
import { useGetRecordsDayPreview } from '@services/hooks/recordsDay/useGetRecordsDayPreview';
import { useGetTabulationDay } from '@services/hooks/tabulationDay/useGetTabulationDay';
import { useGetSubMaps } from '@services/hooks/subMaps/useGetSubMaps';
// import { LogoHeader } from '@/components/LogoHeader';

const Page = styled.div`
  page-break-after: always;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 2rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TextBlock = styled.p`
  max-width: 80%;
  text-align: center;
  margin: 1rem 0;
`;

const PageNumber = styled.div`
  margin-top: auto;
  font-size: 0.9rem;
  color: #777;
`;

export const Overview: React.FC = () => {
  const { data: generalMapCapture } = useGetGeneralMapCaptures();
  const { data: recordsDayCapture } = useGetRecordsDayPreview();
  const { tabulationDay } = useGetTabulationDay();
  const { subMaps } = useGetSubMaps();

  const pages = [
    {
      title: 'Visão Geral - Mapa Geral',
      description: 'Essa seção descreve a imagem geral do mapa, capturada automaticamente após a última inspeção. Fornece uma visão macro dos pontos mapeados, facilitando a identificação de áreas críticas de observação. Ideal para contextualizar o local analisado com abrangência visual estratégica.',
      image: generalMapCapture[generalMapCapture.length - 1]?.image,
      footer: 'Esta imagem é parte do relatório completo de inspeção, servindo como base para análise posterior. Dados extraídos da última atualização registrada. Página 1 de N.',
    },
    {
      title: 'Visão Geral - Registros do Dia',
      description: 'Apresentamos os registros capturados no dia corrente da inspeção. As imagens representam visualmente as condições observadas e documentadas, promovendo rastreabilidade visual e facilitando revisões técnicas posteriores.',
      image: recordsDayCapture[recordsDayCapture.length - 1]?.image,
      footer: 'Abaixo está a imagem mais atual do conjunto de registros do dia. Todos os dados visuais foram salvos e validados por operadores autorizados. Página 2 de N.',
    },
    {
      title: 'Visão Geral - Tabulação do Dia',
      description: 'A imagem exibida mostra a previsão tabular gerada para o dia vigente. Inclui temperatura, precipitação e outros dados meteorológicos relevantes à atividade realizada. Relevante para contextualizar fatores ambientais na inspeção.',
      image: tabulationDay?.image,
      footer: 'Registro gerado automaticamente com base na localização e data atuais. Serve como apoio à interpretação ambiental. Página 3 de N.',
    },
    ...(subMaps?.map((map, index) => ({
      title: `Visão Geral - SubMapa ${index + 1}`,
      description: 'Este submapa representa uma seção específica do mapa geral. A imagem contém marcações visuais feitas manualmente durante a análise. Ideal para detalhar áreas específicas com interesse técnico.',
      image: map.image,
      footer: `A imagem acima pertence ao submapa "${map.title}". Todas as marcações foram registradas e vinculadas ao conjunto de inspeção correspondente. Página ${index + 4} de N.`,
    })) || [])
  ];

  return (
    <div>
      {pages.map((page, idx) => (
        <Page key={idx}>
          {/* <LogoHeader /> */}
          <h2>{page.title}</h2>
          <TextBlock>{page.description}</TextBlock>
          {page.image && <Image src={page.image} alt={page.title} />}
          <TextBlock>{page.footer}</TextBlock>
          <PageNumber>Página {idx + 1}</PageNumber>
        </Page>
      ))}
    </div>
  );
};
