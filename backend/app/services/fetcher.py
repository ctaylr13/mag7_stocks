import asyncio
from datetime import date, timedelta

import pandas as pd
import yfinance as yf

from app.config import Ticker


def _fetch_one(ticker: Ticker, start: date, end: date) -> pd.Series:
    # yfinance's `end` is exclusive; bump by a day so the chosen end date is included
    inclusive_end = end + timedelta(days=1)
    history = yf.Ticker(ticker.value).history(start=start, end=inclusive_end)
    if history.empty:
        raise ValueError(f"no price data returned for {ticker.value}")

    closes = history["Close"]
    closes.index = closes.index.date  # Timestamp -> date, matches ReturnPoint's schema
    return closes


async def fetch_prices(
    tickers: list[Ticker], start: date, end: date
) -> dict[Ticker, pd.Series | Exception]:
    tasks = [asyncio.to_thread(_fetch_one, ticker, start, end) for ticker in tickers]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return dict(zip(tickers, results))
