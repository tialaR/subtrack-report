export type MarkersOption = {
  label: string;
  value: string;
};

export type MarkerToolboxProps = {
  markersOptions: MarkersOption[];
  onSelectMarker: (markerOption: MarkersOption) => void;
};