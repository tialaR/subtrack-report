export type Option = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  label: string;
  value: string;
  required?: boolean;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  helperText?: string;
};