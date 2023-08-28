export interface TableDataType {
  key: React.Key;
  name: string;
  email: string;
  role: string;
  action: string;
}

export interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}
