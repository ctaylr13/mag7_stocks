import { styled } from "@linaria/react";
import { formatPercent } from "../utils/format";
import { colors, font, spacing } from "../tokens";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${font.size.label};
  color: ${colors.textMuted};
  padding-top: ${spacing.xs};
`;

interface StatProps {
  label: string;
  value: number | null;
}

const Stat = ({ label, value }: StatProps) => (
  <span>
    {label} {value === null ? "—" : formatPercent(value)}
  </span>
);

interface SummaryStatsProps {
  min: number | null;
  max: number | null;
  mean: number | null;
}

export const SummaryStats = ({ min, max, mean }: SummaryStatsProps) => (
  <Row>
    <Stat label="Min" value={min} />
    <Stat label="Max" value={max} />
    <Stat label="Mean" value={mean} />
  </Row>
);
