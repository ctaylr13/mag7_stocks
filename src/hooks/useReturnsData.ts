import { useEffect, useState } from "react";
import useSWR from "swr";
import { API_BASE_URL } from "../apiBase";
import { checkBackendHealth } from "./useHealthCheck";
import type { TickerReturns } from "../types";

const fetchReturns = async (url: string): Promise<TickerReturns[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`request failed with status ${response.status}`);
  }
  return response.json();
};

interface UseReturnsDataResult {
  data: TickerReturns[] | undefined;
  loading: boolean;
  error: string | null;
}

export const useReturnsData = (start: string, end: string): UseReturnsDataResult => {
  const { data, error: fetchError, isLoading } = useSWR(
    `${API_BASE_URL}/returns?start=${start}&end=${end}`,
    fetchReturns,
  );

  const [error, setError] = useState<string | null>(null);

  // fetchError cleared (new range succeeded) — reset during render, not in an effect
  const [prevFetchError, setPrevFetchError] = useState(fetchError);
  if (fetchError !== prevFetchError) {
    setPrevFetchError(fetchError);
    if (!fetchError) {
      setError(null);
    }
  }

  useEffect(() => {
    if (!fetchError) return;

    let cancelled = false;

    checkBackendHealth().then((isReachable) => {
      if (cancelled) return;
      setError(
        isReachable
          ? "Couldn't load return data for this range. Try again."
          : "Backend isn't reachable — is it running?",
      );
    });

    return () => {
      cancelled = true;
    };
  }, [fetchError]);

  return { data, loading: isLoading, error };
};
