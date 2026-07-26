from datetime import date

import pandas as pd
import pytest

from app.config import Ticker
from app.services import fetcher


class _FakeTicker:
    def __init__(self, history_df: pd.DataFrame):
        self._history_df = history_df

    def history(self, period):
        return self._history_df


def _make_history(dates: list[str], closes: list[float]) -> pd.DataFrame:
    return pd.DataFrame({"Close": closes}, index=pd.to_datetime(dates))


@pytest.fixture
def patch_yf_ticker(monkeypatch):
    def _patch(history_for_symbol):
        def fake_ticker(symbol):
            return _FakeTicker(history_for_symbol(symbol))

        monkeypatch.setattr(fetcher.yf, "Ticker", fake_ticker)

    return _patch


def test_fetch_one_returns_close_prices_indexed_by_date(patch_yf_ticker):
    history = _make_history(["2024-01-02", "2024-01-03"], [100.0, 101.0])
    patch_yf_ticker(lambda symbol: history)

    series = fetcher._fetch_one(Ticker.MSFT)

    assert list(series.values) == [100.0, 101.0]
    assert series.index[0] == date(2024, 1, 2)


def test_fetch_one_raises_on_empty_history(patch_yf_ticker):
    patch_yf_ticker(lambda symbol: pd.DataFrame())

    with pytest.raises(ValueError):
        fetcher._fetch_one(Ticker.MSFT)


async def test_fetch_prices_isolates_per_ticker_failures(patch_yf_ticker):
    history = _make_history(["2024-01-02"], [100.0])
    patch_yf_ticker(lambda symbol: pd.DataFrame() if symbol == Ticker.TSLA.value else history)

    results = await fetcher.fetch_prices([Ticker.MSFT, Ticker.TSLA])

    assert isinstance(results[Ticker.MSFT], pd.Series)
    assert isinstance(results[Ticker.TSLA], Exception)
