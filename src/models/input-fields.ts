export interface FileInputProps {
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  loading?: boolean;
}