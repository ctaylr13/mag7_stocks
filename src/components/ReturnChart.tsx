import type { ReactNode } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush, ResponsiveContainer } from "recharts";
import type { TooltipValueType } from "recharts";
import type { ReturnPoint } from "../types";
import { formatPercent, formatShortDate } from "../utils/format";
import { colors, font, sizes } from "../tokens";

const TICK_STYLE = { fontSize: font.size.chartTick };

const formatTooltipLabel = (label: ReactNode): string => formatShortDate(String(label ?? ""));

const formatTooltipValue = (value: TooltipValueType | undefined): [string, string] => [
  formatPercent(Number(value)),
  "Return",
];

interface ReturnChartProps {
  points: ReturnPoint[];
  onRangeChange?: (startIndex: number, endIndex: number) => void;
}

interface BrushRange {
  startIndex: number;
  endIndex: number;
}

export const ReturnChart = ({ points, onRangeChange }: ReturnChartProps) => {
  const handleBrushChange = (range: BrushRange): void => {
    onRangeChange?.(range.startIndex, range.endIndex);
  };

  return (
    <ResponsiveContainer width="100%" height={sizes.chartHeight}>
      <LineChart data={points}>
        <XAxis dataKey="date" tickFormatter={formatShortDate} tick={TICK_STYLE} minTickGap={20} />
        <YAxis tickFormatter={formatPercent} tick={TICK_STYLE} width={sizes.chartAxisWidth} />
        <Tooltip labelFormatter={formatTooltipLabel} formatter={formatTooltipValue} />
        <Line type="monotone" dataKey="return" stroke={colors.accent} dot={false} strokeWidth={1.5} />
        <Brush
          dataKey="date"
          height={sizes.chartBrushHeight}
          tickFormatter={formatShortDate}
          stroke={colors.accent}
          onChange={handleBrushChange}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
