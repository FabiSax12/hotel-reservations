import type { PasswordCriteria } from "../../utils/checkPasswordCriteria";

export interface PasswordInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  criteria?: PasswordCriteria;
  hideLabel?: string;
  showLabel?: string;
}
