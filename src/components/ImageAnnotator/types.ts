export type ImageAnnotatorData = {
      id: string;
      x: number;
      y: number;
      rotation: number;
      snapshotImg: string;
      timestamp: number;
      isNewPosition: boolean;
  }

export type Point = {
  x: number;
  y: number;
  color: string;
};

export type MarkerOption = {
  label: string;
  value: string;
};

export type ImageAnnotatorProps = {
  onSnapshotReady: (imageAnnotatorData: ImageAnnotatorData) => void
  imageSrc: string;
  markersOptions: MarkerOption[];
};

