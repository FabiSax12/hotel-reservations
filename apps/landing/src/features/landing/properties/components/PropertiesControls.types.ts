export interface PropertiesControlsProps {
  current: number;
  total: number;
  isHovered: boolean;
  prefersReducedMotion: boolean;
  autoInterval: number;
  dragHint: string;
  onGoTo: (i: number) => void;
  onNavigate: (dir: number) => void;
}
