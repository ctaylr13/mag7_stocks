import { useState } from "react";
import tickers from "../generated/tickers.json";

interface UseTickerVisibilityResult {
  visibleCodes: Set<string>;
  toggleTicker: (code: string) => void;
}

export const useTickerVisibility = (): UseTickerVisibilityResult => {
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(
    () => new Set(tickers.map((ticker) => ticker.code)),
  );

  const toggleTicker = (code: string) => {
    setVisibleCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  return { visibleCodes, toggleTicker };
};
