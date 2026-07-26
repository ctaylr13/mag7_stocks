import { styled } from "@linaria/react";
import { Dashboard } from "./components/Dashboard";
import { useReturnsData } from "./hooks/useReturnsData";
import { useDateRange } from "./hooks/useDateRange";
import { useTheme } from "./hooks/useTheme";
import { useTickerVisibility } from "./hooks/useTickerVisibility";
import { spacing } from "./tokens";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: ${spacing.xl};
`;

const App = () => {
  const { start, end, setRange } = useDateRange();
  const { data, loading, error } = useReturnsData(start, end);
  const { theme, toggleTheme } = useTheme();
  const { visibleCodes, toggleTicker } = useTickerVisibility();

  return (
    <Page>
      <Dashboard
        start={start}
        end={end}
        onChangeRange={setRange}
        data={data}
        loading={loading}
        error={error}
        theme={theme}
        onToggleTheme={toggleTheme}
        visibleCodes={visibleCodes}
        onToggleTicker={toggleTicker}
      />
    </Page>
  );
};

export default App;
