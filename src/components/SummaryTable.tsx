import { styled } from "@linaria/react";
import tickers from "../generated/tickers.json";
import type { TickerReturns } from "../types";
import { findTickerData } from "../utils/findTickerData";
import { formatPercent } from "../utils/format";
import { colors, font, spacing } from "../tokens";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${font.size.label};
`;

const HeaderCell = styled.th`
  padding: ${spacing.sm};
  border-bottom: 1px solid ${colors.border};
  text-align: left;
  color: ${colors.textMuted};
  font-weight: 600;
`;

const Cell = styled.td`
  padding: ${spacing.sm};
  border-bottom: 1px solid ${colors.border};
`;

const formatStat = (value: number | null | undefined): string =>
  value == null ? "—" : formatPercent(value);

interface SummaryTableProps {
  data: TickerReturns[] | undefined;
  visibleCodes: Set<string>;
}

export const SummaryTable = ({ data, visibleCodes }: SummaryTableProps) => {
  const visibleTickers = tickers.filter(({ code }) => visibleCodes.has(code));

  return (
    <Table>
      <thead>
        <tr>
          <HeaderCell>Ticker</HeaderCell>
          <HeaderCell>Min</HeaderCell>
          <HeaderCell>Max</HeaderCell>
          <HeaderCell>Mean</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {visibleTickers.map(({ code, title }) => {
          const entry = data && findTickerData(data, code);
          return (
            <tr key={code}>
              <Cell>
                {title} ({code})
              </Cell>
              <Cell>{formatStat(entry?.min)}</Cell>
              <Cell>{formatStat(entry?.max)}</Cell>
              <Cell>{formatStat(entry?.mean)}</Cell>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
