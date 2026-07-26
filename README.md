# MAG7 Interactive Return Viewer

A full-stack app for visualizing daily returns of the MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) over a user-selected date range, using live data from `yfinance`.

## Setup and running (Docker)

```bash
docker compose up
```

Backend at `http://localhost:8000` (docs at `/docs`), frontend at `http://localhost:5173`. Both mount source as volumes, so code changes reload live without rebuilding.

## Setup and running (manual, without Docker)

Backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend: not built yet — instructions will be added here once it exists.

## Running backend tests

```bash
cd backend
source .venv/bin/activate
pytest -v
```

## Regenerating frontend types

Whenever the backend's response schema or ticker list changes:

```bash
npm run gen
```

This dumps the backend's OpenAPI schema and ticker metadata, and generates `src/types/api.d.ts` and `src/generated/tickers.json` from them. Requires the backend's venv to be set up (see above) — it isn't run automatically by Docker or on every build, since it only needs to happen when the schema itself changes.

