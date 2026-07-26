# MAG7 Interactive Return Viewer

A full-stack app for visualizing daily returns of the MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) over a user-selected date range, using live data from `yfinance`.

## Setup (backend)

Docker instructions will be added once that's set up; for now, here's the manual path.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Running the backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Interactive API docs (Swagger UI) at `http://localhost:8000/docs`. The main endpoint is `GET /returns?start=YYYY-MM-DD&end=YYYY-MM-DD`.

## Running backend tests

```bash
cd backend
source .venv/bin/activate
pytest -v
```

## Frontend

Not built yet — instructions will be added here once the frontend exists.

## Docker

Not set up yet — instructions will be added here once that's done.

