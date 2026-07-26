import { useState } from "react";

const toISODate = (date: Date): string => date.toISOString().slice(0, 10);

const getDefaultRange = (): [string, string] => {
  const today = new Date();
  const ninetyDaysAgo = new Date(today);
  ninetyDaysAgo.setDate(today.getDate() - 90);
  return [toISODate(ninetyDaysAgo), toISODate(today)];
};

interface UseDateRangeResult {
  start: string;
  end: string;
  setRange: (start: string, end: string) => void;
}

export const useDateRange = (): UseDateRangeResult => {
  const [defaultStart, defaultEnd] = getDefaultRange();
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  const setRange = (nextStart: string, nextEnd: string) => {
    setStart(nextStart);
    setEnd(nextEnd);
  };

  return { start, end, setRange };
};
