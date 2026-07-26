from enum import StrEnum


class Ticker(StrEnum):
    MSFT = "MSFT"
    AAPL = "AAPL"
    GOOGL = "GOOGL"
    AMZN = "AMZN"
    NVDA = "NVDA"
    META = "META"
    TSLA = "TSLA"


TICKERS: list[Ticker] = list(Ticker)

TICKER_TITLES: dict[Ticker, str] = {
    Ticker.MSFT: "Microsoft",
    Ticker.AAPL: "Apple",
    Ticker.GOOGL: "Alphabet",
    Ticker.AMZN: "Amazon",
    Ticker.NVDA: "NVIDIA",
    Ticker.META: "Meta",
    Ticker.TSLA: "Tesla",
}

# ~yfinance's own quote delay — no benefit to refreshing faster than the source updates
CACHE_TTL_SECONDS: int = 15 * 60
