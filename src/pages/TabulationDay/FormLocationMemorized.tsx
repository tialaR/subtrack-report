import { memo, useState } from "react";
import { FiCompass, FiGlobe } from "react-icons/fi";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";
import { Select } from "@components/Select";
import { timezoneCoordinates } from "@utils/tabulationHelper";

export type FormLocationProps = {
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string;
};

type FormLocationMemorizedProps = {
  onSubmit: (values: FormLocationProps) => void;
  onUseCurrentLocation: () => void;
  value: string;
};

export const FormLocationMemorized = memo(
  ({
    onSubmit,
    onUseCurrentLocation,
    value,
  }: FormLocationMemorizedProps) => {
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
          value={timezone || value}
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
          Alterar timezone
        </Button>
        <Button variant="primary" onClick={onUseCurrentLocation}>
          Usar timezone local
        </Button>
      </>
    );
  }
);