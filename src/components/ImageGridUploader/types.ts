export type RecordDay = {
  id: string;
  title: string;
  image: string;
};

export type ImageGridUploaderProps = {
  recordsDay: RecordDay[];
  onAddImage: (file?: File) => void;
  onReplaceImage: ({ id, file }: { id: string; file?: File }) => void;
  onChangeById?: ({ id, payload }: { id: string; payload: RecordDay }) => void;
  onDeleteImage: (id: string) => void;
  maxImages: number;
}

export type ImageUploadCardProps = {
  id: string;
  image?: string;
  title?: string;
  hasImage: boolean;
  onDelete: () => void;
  onReplace: () => void;
}

export type AddImageCardProps = {
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
}