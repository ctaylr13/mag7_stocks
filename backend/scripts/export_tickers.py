import json
from pathlib import Path

from app.config import TICKER_TITLES

OUTPUT_PATH = Path(__file__).resolve().parent.parent.parent / "src" / "generated" / "tickers.json"


def main() -> None:
    data = [{"code": ticker.value, "title": title} for ticker, title in TICKER_TITLES.items()]
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(data, indent=2))
    print(f"wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
