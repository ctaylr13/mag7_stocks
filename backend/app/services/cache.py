import pandas as pd
from cachetools import TTLCache

from app.config import CACHE_TTL_SECONDS, TICKERS, Ticker
from app.services.fetcher import fetch_prices

_cache: TTLCache = TTLCache(maxsize=len(TICKERS), ttl=CACHE_TTL_SECONDS)


async def get_prices(tickers: list[Ticker]) -> dict[Ticker, pd.Series | Exception]:
    stale = [ticker for ticker in tickers if ticker not in _cache]

    if stale:
        fetched = await fetch_prices(stale)
        for ticker, result in fetched.items():
            # don't cache failures
            if not isinstance(result, Exception):
                _cache[ticker] = result

    return {
        ticker: _cache.get(ticker, ValueError(f"no price data available for {ticker.value}"))
        for ticker in tickers
    }
