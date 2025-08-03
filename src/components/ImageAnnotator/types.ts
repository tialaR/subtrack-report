export type ImageAnnotatorData = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  snapshotImg: string;
  timestamp: number;
  isNewPosition: boolean;
};

export type Point = {
  x: number;
  y: number;
  color: string;
};

export type MarkerOption = {
  label: string;
  value: string;
};

export type MarkerImageData = {
  id: string;
  title: string;
  image: string;      // base64 da imagem original
  markers: Point[];   // array de pontos marcados na imagem
  uploaded: boolean;  // flag para indicar se a imagem foi enviada ou não
};

export type ImageAnnotatorProps = {
  id: string;
  title: string;
  image: string;
  markers?: Point[];
  updateMarkers: (newMarkers: Point[]) => void;
  onSnapshotReady: (imageAnnotatorData: ImageAnnotatorData) => void;
  onUpdateImage: ({ image }: { image: string }) => void;
};
