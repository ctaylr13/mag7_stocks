import { styled } from "@linaria/react";
import { Header } from "./Header";
import { DateRangePicker } from "./DateRangePicker";
import { ErrorBanner } from "./ErrorBanner";
import { TickerToggleBar } from "./TickerToggleBar";
import { ReturnsGrid } from "./ReturnsGrid";
import { SummaryTable } from "./SummaryTable";
import type { TickerReturns } from "../types";
import type { Theme } from "../hooks/useTheme";
import type { View } from "./ViewToggle";
import { spacing } from "../tokens";

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing.lg};
  padding-bottom: ${spacing.lg};
`;

interface DashboardProps {
  start: string;
  end: string;
  onChangeRange: (start: string, end: string) => void;
  data: TickerReturns[] | undefined;
  loading: boolean;
  error: string | null;
  theme: Theme;
  onToggleTheme: () => void;
  visibleCodes: Set<string>;
  onToggleTicker: (code: string) => void;
  view: View;
  onChangeView: (view: View) => void;
}

export const Dashboard = ({
  start,
  end,
  onChangeRange,
  data,
  loading,
  error,
  theme,
  onToggleTheme,
  visibleCodes,
  onToggleTicker,
  view,
  onChangeView,
}: DashboardProps) => (
  <>
    <Header
      start={start}
      end={end}
      theme={theme}
      onToggleTheme={onToggleTheme}
      view={view}
      onChangeView={onChangeView}
    />
    <ControlsRow>
      <DateRangePicker start={start} end={end} onChange={onChangeRange} />
      <TickerToggleBar visibleCodes={visibleCodes} onToggle={onToggleTicker} />
    </ControlsRow>
    {error && <ErrorBanner message={error} />}
    {view === "grid" ? (
      <ReturnsGrid data={data} loading={loading} visibleCodes={visibleCodes} />
    ) : (
      <SummaryTable data={data} visibleCodes={visibleCodes} />
    )}
  </>
);
