export type Point = {
  x: number;
  y: number;
  color: string;
};

export type SubMap = {
  id: string;
  title: string;
  image: string; // base64 da imagem original
  markers?: Point[];
  uploaded?: boolean;
}

