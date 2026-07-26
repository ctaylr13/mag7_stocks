import { styled } from "@linaria/react";
import tickers from "../generated/tickers.json";
import type { TickerReturns } from "../types";
import { TickerCard } from "./TickerCard";
import { LoadingState } from "./LoadingState";
import { sizes, spacing } from "../tokens";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${sizes.cardMinWidth}, 1fr));
  gap: ${spacing.md};
`;

const findTickerData = (data: TickerReturns[], code: string): TickerReturns | undefined =>
  data.find((entry) => entry.ticker === code);

interface ReturnsGridProps {
  data: TickerReturns[] | undefined;
  loading: boolean;
  visibleCodes: Set<string>;
}

export const ReturnsGrid = ({ data, loading, visibleCodes }: ReturnsGridProps) => {
  const showSkeleton = loading || !data;
  const visibleTickers = tickers.filter(({ code }) => visibleCodes.has(code));

  return (
    <Grid>
      {visibleTickers.map(({ code, title }) =>
        showSkeleton ? (
          <LoadingState key={code} />
        ) : (
          <TickerCard key={code} code={code} title={title} data={findTickerData(data, code)} />
        ),
      )}
    </Grid>
  );
};
