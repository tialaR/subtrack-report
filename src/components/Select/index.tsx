import { useState, useRef, useEffect } from "react";
import type { CustomSelectProps } from "./types";
import * as S from "./styles";

export const Select = ({
  label,
  value,
  required = false,
  icon,
  onChange,
  options,
  placeholder = "Selecione...",
  helperText,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options?.find(
    (option) => option?.value === value
  )?.label;

  const shouldShowPlaceholder = !!((!value || !selectedLabel) && placeholder);

  const displayText = value || selectedLabel || placeholder;

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <S.Field ref={ref}>
      <S.Label>
        {label} {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>
      <S.InputWrapper
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
        tabIndex={0}
      >
        {icon && <S.Icon>{icon}</S.Icon>}
        <S.SelectedValue $placeholder={shouldShowPlaceholder}>
          {displayText}
        </S.SelectedValue>
        <S.Chevron isOpen={isOpen} />
        {isOpen && (
          <S.OptionList>
            {options?.map((option) => (
              <S.OptionItem
                key={option?.value}
                isSelected={option?.value === value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option?.value);
                }}
              >
                {option?.label}
              </S.OptionItem>
            ))}
          </S.OptionList>
        )}
      </S.InputWrapper>
      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.Field>
  );
};
