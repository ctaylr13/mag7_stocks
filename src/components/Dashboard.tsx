import { Header } from "./Header";
import { DateRangePicker } from "./DateRangePicker";
import { ErrorBanner } from "./ErrorBanner";
import { ReturnsGrid } from "./ReturnsGrid";
import type { TickerReturns } from "../types";
import type { Theme } from "../hooks/useTheme";

interface DashboardProps {
  start: string;
  end: string;
  onChangeRange: (start: string, end: string) => void;
  data: TickerReturns[] | undefined;
  loading: boolean;
  error: string | null;
  theme: Theme;
  onToggleTheme: () => void;
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
}: DashboardProps) => (
  <>
    <Header start={start} end={end} theme={theme} onToggleTheme={onToggleTheme} />
    <DateRangePicker start={start} end={end} onChange={onChangeRange} />
    {error && <ErrorBanner message={error} />}
    <ReturnsGrid data={data} loading={loading} />
  </>
);
