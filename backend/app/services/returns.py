from datetime import date

import pandas as pd


def slice_range(prices: pd.Series, start: date, end: date) -> pd.Series:
    return prices.loc[start:end]


def compute_returns(prices: pd.Series) -> pd.Series:
    return prices.pct_change().dropna()


def summary_stats(returns: pd.Series) -> dict[str, float | None]:
    if returns.empty:
        return {"min": None, "max": None, "mean": None}

    return {
        "min": float(returns.min()),
        "max": float(returns.max()),
        "mean": float(returns.mean()),
    }
