export type Point = {
  x: number;
  y: number;
  color: string;
};

export type SubMapProps = {
  id: string;
  title: string;
  image: string; // base64 da imagem original
  markers: Point[];
  uploaded: boolean;
}