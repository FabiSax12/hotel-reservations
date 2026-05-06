export interface AmenityEditorCardProps {
  name: string;
  setName: (val: string) => void;
  desc: string;
  setDesc: (val: string) => void;
  selectedIcon: string;
  setSelectedIcon: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  placeholderName: string;
  placeholderDesc: string;
  autoFocus?: boolean;
}
