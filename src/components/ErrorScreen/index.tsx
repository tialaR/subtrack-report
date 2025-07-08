import { Button } from "@components/Button";
import { FiAlertTriangle} from "react-icons/fi";
import type { ErrorScreenProps } from "./types";
import * as S from "./styles";

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = "Algo deu errado",
  description = "Não foi possível carregar as informações no momento.",
  onRetry,
}) => {
  return (
    <S.ErrorWrapper>
      <FiAlertTriangle />
      <S.ErrorTitle>{title}</S.ErrorTitle>
      <S.ErrorDescription>{description}</S.ErrorDescription>
      {onRetry && (
        <Button variant="tertiary" showIcon iconType="rotate" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </S.ErrorWrapper>
  );
};
