export type RecordDay = {
  id: string;
  title: string;
  image: string;
};

export type ImageGridUploaderProps = {
  recordsDay: RecordDay[];
  onAddImage: (file?: File) => void;
  onReplaceImage: ({ id, file }: { id: string; file?: File }) => void;
  onDeleteImage: ({ id, recordsDayWillBeEmpty }: { id: string; recordsDayWillBeEmpty: boolean }) => void;
  maxImages: number;
  isCardLoading?: (id: string) => boolean; // controla loading por ID
  isAddingImage?: boolean; // controla loading do botão de adicionar imagem
};


export type ImageUploadCardProps = {
  id: string;
  image?: string;
  title?: string;
  hasImage: boolean;
  onDelete: () => void;
  onReplace: () => void;
  isLoading?: boolean;
}

export type AddImageCardProps = {
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}