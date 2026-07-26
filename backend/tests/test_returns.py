from datetime import date

import pandas as pd

from app.services.returns import compute_returns, slice_range, summary_stats


def _prices() -> pd.Series:
    dates = [date(2024, 1, 2), date(2024, 1, 3), date(2024, 1, 4), date(2024, 1, 5)]
    return pd.Series([100.0, 110.0, 99.0, 108.9], index=dates)


def test_slice_range_is_inclusive_of_both_ends():
    sliced = slice_range(_prices(), date(2024, 1, 3), date(2024, 1, 4))
    assert list(sliced.index) == [date(2024, 1, 3), date(2024, 1, 4)]


def test_compute_returns_drops_first_nan_row():
    returns = compute_returns(_prices())
    assert len(returns) == 3
    assert round(returns.iloc[0], 4) == 0.10


def test_compute_then_slice_keeps_first_requested_day():
    # regression test: slicing before computing returns would drop this day
    returns = compute_returns(_prices())
    windowed = slice_range(returns, date(2024, 1, 3), date(2024, 1, 4))
    assert len(windowed) == 2


def test_summary_stats_on_empty_series_returns_none():
    stats = summary_stats(pd.Series(dtype=float))
    assert stats == {"min": None, "max": None, "mean": None}


def test_summary_stats_computes_min_max_mean():
    returns = compute_returns(_prices())
    stats = summary_stats(returns)
    assert stats["min"] == returns.min()
    assert stats["max"] == returns.max()
    assert stats["mean"] == returns.mean()
