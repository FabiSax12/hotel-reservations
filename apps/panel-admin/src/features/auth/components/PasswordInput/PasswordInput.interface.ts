import type { PasswordCriteria } from "../../domain/passwordCriteria";

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
