import { useEffect, useMemo, useState } from "react";
import { styled } from "@linaria/react";
import type { TickerReturns } from "../types";
import { Card } from "./Card";
import { ReturnChart } from "./ReturnChart";
import { SummaryStats } from "./SummaryStats";
import { computeVisibleStats } from "../utils/stats";
import { colors, font } from "../tokens";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: ${font.size.cardTitle};
  font-weight: 600;
`;

const Code = styled.span`
  font-family: ${font.mono};
  color: ${colors.textMuted};
  font-size: ${font.size.label};
`;

const ErrorText = styled.div`
  color: ${colors.negative};
  font-size: ${font.size.subtitle};
`;

interface TickerCardProps {
  code: string;
  title: string;
  data?: TickerReturns;
}

export const TickerCard = ({ code, title, data }: TickerCardProps) => {
  const points = data?.points ?? [];
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, Math.max(points.length - 1, 0)]);

  // a new date range means a whole new points array — drop any zoom from the last one
  useEffect(() => {
    setVisibleRange([0, Math.max(points.length - 1, 0)]);
  }, [data]);

  const visibleStats = useMemo(
    () => computeVisibleStats(points.slice(visibleRange[0], visibleRange[1] + 1)),
    [points, visibleRange],
  );

  return (
    <Card>
      <Title>
        {title}
        <Code>{code}</Code>
      </Title>
      {data?.error ? (
        <ErrorText>
          Couldn't load {code}: {data.error}
        </ErrorText>
      ) : (
        <>
          <ReturnChart points={points} onRangeChange={(start, end) => setVisibleRange([start, end])} />
          <SummaryStats
            min={visibleStats?.min ?? null}
            max={visibleStats?.max ?? null}
            mean={visibleStats?.mean ?? null}
          />
        </>
      )}
    </Card>
  );
};
