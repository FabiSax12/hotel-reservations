import type { WeeklyDataPoint } from "../../../domain/metricsTypes";

export interface ChartBarsProps {
  data:        WeeklyDataPoint[];
  yMax:        number;
  plotHeight:  number;
  slotWidth:   number;
  barWidth:    number;
  barXOffset:  number;
  labelY:      number;
  onBarEnter:  (e: React.MouseEvent<SVGGElement>, point: WeeklyDataPoint) => void;
  onMouseMove: React.MouseEventHandler<SVGGElement>;
}
