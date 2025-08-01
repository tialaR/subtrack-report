import type { InputTextProps } from "./types";
import * as S from "./styles";

export const InputText: React.FC<InputTextProps> = ({
  label,
  icon,
  prefixItem,
  helperText = '',
  required = false,
  onIconClick,
  value,         // garante controle de digitação
  onChange,      // garante controle de digitação
  ...rest
}) => {
  return (
    <S.Field>
      <S.Label htmlFor={rest?.id || rest?.name}>
        {label}
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>

      <S.InputWrapper>
        {prefixItem && <S.Prefix>{prefixItem}</S.Prefix>}

        {/* input controlado */}
        <S.StyledInput value={value} onChange={onChange} {...rest} />

        {icon &&
          (onIconClick ? (
            <S.IconButton type="button" onClick={onIconClick}>
              {icon}
            </S.IconButton>
          ) : (
            <S.Icon>{icon}</S.Icon>
          ))}
      </S.InputWrapper>

      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.Field>
  );
};
