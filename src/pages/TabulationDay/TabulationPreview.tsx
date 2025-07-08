import * as S from './styles';

type TabulationPreviewProps = {
  title: string;
  date: string;
  timezone: string;
  image: string;
}

const TabulationPreview: React.FC<TabulationPreviewProps> = ({
  title,
  date,
  timezone,
  image,
}) => {
  return (
    <S.PreviewWrapper>
      <S.PreviewTitle>{title?.toUpperCase()}</S.PreviewTitle>
      <S.PreviewMeta>
        <strong>DATA:</strong> {date?.toUpperCase()} &nbsp; | &nbsp;
        <strong>TIMEZONE:</strong> {timezone?.toUpperCase()}
      </S.PreviewMeta>
      <S.PreviewImage src={image} alt={title} />
    </S.PreviewWrapper>
  );
};

export { TabulationPreview };
