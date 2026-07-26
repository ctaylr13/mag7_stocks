from datetime import date

import pandas as pd
import pytest
from fastapi.testclient import TestClient

from app.config import Ticker
from app.main import app
from app.routers import returns as returns_router

client = TestClient(app)


def _prices() -> pd.Series:
    return pd.Series([100.0, 110.0], index=[date(2024, 1, 2), date(2024, 1, 3)])


@pytest.fixture
def mock_get_prices(monkeypatch):
    def _patch(overrides: dict[Ticker, pd.Series | Exception] | None = None):
        overrides = overrides or {}

        async def fake_get_prices(tickers):
            return {ticker: overrides.get(ticker, _prices()) for ticker in tickers}

        monkeypatch.setattr(returns_router, "get_prices", fake_get_prices)

    return _patch


def test_returns_success(mock_get_prices):
    mock_get_prices()

    response = client.get("/returns", params={"start": "2024-01-02", "end": "2024-01-03"})

    assert response.status_code == 200
    body = response.json()
    assert len(body) == len(Ticker)
    assert all("ticker" in entry for entry in body)


def test_returns_rejects_start_after_end(mock_get_prices):
    mock_get_prices()

    response = client.get("/returns", params={"start": "2024-02-01", "end": "2024-01-01"})

    assert response.status_code == 400


def test_returns_reports_partial_failure(mock_get_prices):
    mock_get_prices({Ticker.TSLA: ValueError("no data")})

    response = client.get("/returns", params={"start": "2024-01-02", "end": "2024-01-03"})

    assert response.status_code == 200
    body = response.json()
    tsla_entry = next(entry for entry in body if entry["ticker"] == "TSLA")
    assert tsla_entry["error"] == "no data"
    assert tsla_entry["points"] == []
