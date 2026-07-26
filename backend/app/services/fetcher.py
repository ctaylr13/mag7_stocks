import asyncio

import pandas as pd
import yfinance as yf

from app.config import Ticker


def _fetch_one(ticker: Ticker) -> pd.Series:
    history = yf.Ticker(ticker.value).history(period="max")
    if history.empty:
        raise ValueError(f"no price data returned for {ticker.value}")

    closes = history["Close"]
    closes.index = closes.index.date  # Timestamp -> date, matches ReturnPoint's schema
    return closes


async def fetch_prices(tickers: list[Ticker]) -> dict[Ticker, pd.Series | Exception]:
    tasks = [asyncio.to_thread(_fetch_one, ticker) for ticker in tickers]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return dict(zip(tickers, results, strict=True))
