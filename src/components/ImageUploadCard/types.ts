export type ImageUploadCardProps = {
  id: string;
  image?: string;
  title?: string;
  label?: string;
  onDelete?: () => void;
  onAdd?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}