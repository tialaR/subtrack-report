import type { StoredImage } from "@/hooks/useLocalImagesStorage";

export type ImageGridUploaderProps = {
  images: StoredImage[];
  onUpload: (file: File, index: number) => void;
  onDeleteById: (id: string) => void;
  maxImages?: number;
};