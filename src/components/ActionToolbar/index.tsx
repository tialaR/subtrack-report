import { memo, useState } from "react";
import { FiCompass, FiGlobe } from "react-icons/fi";
import { Button } from "@components/Button";
import { Select } from "@components/Select";
import { InputText } from "@components/InputText";
import { timezoneCoordinates } from "@utils/tabulationHelper";
import type { PartialLocationValues } from "@pages/TabulationDay/types";
import type { ActionToolbarProps } from "./types";
import * as S from "./styles";

export type FormLocationValues = {
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string;
};

type MemoizedFormLocationContentProps = {
  onSubmit: (values: FormLocationValues) => void;
  onUseCurrentLocation: () => void;
  value: string;
};

export const MemoizedFormLocationContent = memo(
  ({
    onSubmit,
    onUseCurrentLocation,
    value,
  }: MemoizedFormLocationContentProps) => {
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [timezone, setTimezone] = useState<string>("");

    const handleSubmit = () => {
      onSubmit({
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        timezone,
      });
    };

    return (
      <>
        <Select
          label="Selecionar Timezone"
          required
          value={value || timezone}
          icon={<FiGlobe />}
          onChange={setTimezone}
          helperText="Fuso horário"
          options={timezoneCoordinates?.map((item) => ({
            label: item?.timezone,
            value: item?.timezone,
          }))}
        />
        <InputText
          label="Latitude"
          name="latitude"
          placeholder="Ex: -12.97"
          helperText="Em graus decimais"
          value={latitude ?? ""}
          onChange={(e) => setLatitude(e.target.value)}
          prefixItem={<FiCompass />}
        />
        <InputText
          label="Longitude"
          name="longitude"
          placeholder="Ex: -38.50"
          helperText="Em graus decimais"
          value={longitude ?? ""}
          onChange={(e) => setLongitude(e.target.value)}
          prefixItem={<FiCompass />}
        />
        <Button variant="primary" onClick={handleSubmit}>
          Alterar localização
        </Button>
        <Button variant="primary" onClick={onUseCurrentLocation}>
          Usar localização local
        </Button>
      </>
    );
  }
);

export const ActionToolbar: React.FC<
  ActionToolbarProps & {
    onSubmit: (values: PartialLocationValues) => void;
    onUseCurrentLocation: () => void;
    value: string;
  }
> = ({
  orientation = "horizontal",
  actionButtonType = "button-icon",
  value,
  initiallyOpen = false,
  onSubmit,
  onUseCurrentLocation,
}) => {
  const [isHidden, setIsHidden] = useState(!initiallyOpen);
  const [isVisible, setIsVisible] = useState(initiallyOpen);

  const isVertical = orientation === "vertical";

  const getToggleIconType = () => {
    if (isVertical) {
      return isHidden ? "chevronsDown" : "chevronsUp";
    } else {
      return isHidden ? "chevronsRight" : "chevronsLeft";
    }
  };

  const handleToggle = () => {
    if (!isHidden) {
      setIsHidden(true);
      setTimeout(() => setIsVisible(false), 400);
    } else {
      setIsVisible(true);
      requestAnimationFrame(() => setIsHidden(false));
    }
  };

  return (
    <S.ActionToolbarContainer $vertical={isVertical}>
      <S.ToggleButtonArea>
        {(() => {
          switch (actionButtonType) {
            case "tertiary-with-icon":
              return (
                <Button
                  variant="tertiary"
                  iconType={getToggleIconType()}
                  showIcon
                  onClick={handleToggle}
                >
                  {isHidden ? "Mostrar" : "Ocultar"}
                </Button>
              );
            case "button-with-icon":
              return (
                <Button
                  variant="primary"
                  iconType={getToggleIconType()}
                  showIcon
                  onClick={handleToggle}
                >
                  {isHidden ? "Mostrar" : "Ocultar"}
                </Button>
              );
            case "button-icon":
            default:
              return (
                <Button
                  variant="primary"
                  iconType={getToggleIconType()}
                  title={isHidden ? "Mostrar barra" : "Ocultar barra"}
                  onClick={handleToggle}
                />
              );
          }
        })()}
      </S.ToggleButtonArea>

      {isVisible && (
        <S.ActionToolbarWrapper $hidden={isHidden} $vertical={isVertical}>
          <S.ActionToolbar $hidden={isHidden} $vertical={isVertical}>
            <MemoizedFormLocationContent
              value={value}
              onSubmit={onSubmit}
              onUseCurrentLocation={onUseCurrentLocation}
            />
          </S.ActionToolbar>
        </S.ActionToolbarWrapper>
      )}
    </S.ActionToolbarContainer>
  );
};
