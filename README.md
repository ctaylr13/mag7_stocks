# MAG7 Interactive Return Viewer

A full-stack app for exploring daily returns of the MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) over a user-selected date range, using live data from `yfinance`. Pick a range, see each ticker's return series plotted, zoom into a sub-range, and compare performance across all seven at a glance.

## Architecture

React (Vite) talks to a FastAPI backend over HTTP; the backend caches each ticker's price history in memory (per-ticker TTL) and only re-fetches from `yfinance`/Yahoo Finance when that cache expires. Both services run in Docker Compose for local use.

## Setup and running (Docker)

```bash
docker compose up
```

Backend at `http://localhost:8000` (interactive docs at `/docs`), frontend at `http://localhost:5173`. Both mount source as volumes, so code changes reload live without rebuilding.

## Setup and running (manual, without Docker)

Backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend (from the repo root, in a separate terminal — needs the backend running too, either via Docker or the steps above):

```bash
yarn install
yarn dev
```

Frontend at `http://localhost:5173`, backend at `http://localhost:8000`.

## Using the site

- **Date range** — pick a start/end date (top left); defaults to the last 90 days. The grid refetches automatically.
- **Ticker cards** — each shows a line chart of daily returns plus min/max/mean stats. Hover the chart for exact values (tooltip); drag the small bar under the chart to zoom into a sub-range — the stats update to match whatever's currently visible.
- **Show Tickers** (top right of the controls row) — click a ticker to hide/show its card without changing the date range.
- **Grid / Table** (top right) — switch between the card grid and a single comparison table of all visible tickers' stats.
- **Dark / Light** (top right) — toggles theme; your choice is remembered on reload.

## Running backend tests

```bash
cd backend
source .venv/bin/activate
pytest -v
```

Also runs automatically in CI (`.github/workflows/backend-tests.yml`) on every push — lint (`ruff check`/`ruff format --check`) plus the full test suite.

## Regenerating frontend types

Whenever the backend's response schema or ticker list changes:

```bash
npm run gen
```

This dumps the backend's OpenAPI schema and ticker metadata, and generates `src/types/api.d.ts` and `src/generated/tickers.json` from them. Requires the backend's venv to be set up (see above) — it isn't run automatically by Docker or CI, since it only needs to happen when the schema itself changes.
