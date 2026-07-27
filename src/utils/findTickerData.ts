import type { TickerReturns } from "../types";

export const findTickerData = (data: TickerReturns[], code: string): TickerReturns | undefined =>
  data.find((entry) => entry.ticker === code);
