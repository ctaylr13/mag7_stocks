from datetime import date, timedelta

import pandas as pd
import pytest
from freezegun import freeze_time

from app.config import CACHE_TTL_SECONDS, Ticker
from app.services import cache


def _series(value: float) -> pd.Series:
    return pd.Series([value], index=[date(2024, 1, 2)])


@pytest.fixture
def patch_fetch_prices(monkeypatch):
    calls = {"count": 0, "tickers": []}

    def _patch(result_for):
        async def fake_fetch_prices(tickers):
            calls["count"] += 1
            calls["tickers"].extend(tickers)
            return {ticker: result_for(ticker) for ticker in tickers}

        monkeypatch.setattr(cache, "fetch_prices", fake_fetch_prices)
        return calls

    return _patch


async def test_get_prices_only_fetches_stale_tickers(patch_fetch_prices):
    calls = patch_fetch_prices(lambda ticker: _series(1.0))

    # second call for the same ticker should be served from cache, not refetched
    await cache.get_prices([Ticker.MSFT])
    await cache.get_prices([Ticker.MSFT])

    assert calls["count"] == 1


async def test_get_prices_refetches_after_ttl_expires(patch_fetch_prices):
    calls = patch_fetch_prices(lambda ticker: _series(1.0))

    with freeze_time("2024-01-01 00:00:00") as frozen:
        await cache.get_prices([Ticker.MSFT])
        frozen.tick(delta=timedelta(seconds=CACHE_TTL_SECONDS + 1))
        await cache.get_prices([Ticker.MSFT])

    assert calls["count"] == 2


async def test_get_prices_caches_tickers_independently(patch_fetch_prices):
    calls = patch_fetch_prices(lambda ticker: _series(1.0))

    await cache.get_prices([Ticker.MSFT])
    await cache.get_prices([Ticker.MSFT, Ticker.AAPL])

    assert calls["tickers"] == [Ticker.MSFT, Ticker.AAPL]


async def test_get_prices_does_not_cache_failures(patch_fetch_prices):
    calls = patch_fetch_prices(lambda ticker: ValueError("boom"))

    result1 = await cache.get_prices([Ticker.MSFT])
    result2 = await cache.get_prices([Ticker.MSFT])

    assert isinstance(result1[Ticker.MSFT], Exception)
    assert isinstance(result2[Ticker.MSFT], Exception)
    assert calls["count"] == 2
