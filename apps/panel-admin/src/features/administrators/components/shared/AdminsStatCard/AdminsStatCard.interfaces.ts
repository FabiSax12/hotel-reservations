export type AdminsStatCardVariant = "default" | "success" | "danger";

export interface AdminsStatCardProps {
  label:    string;
  value:    number;
  caption:  string;
  variant?: AdminsStatCardVariant;
}
