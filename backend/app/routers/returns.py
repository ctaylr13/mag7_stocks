from datetime import date

from fastapi import APIRouter, HTTPException

from app.config import TICKERS
from app.schemas import ReturnPoint, ReturnsResponse, TickerReturns
from app.services.cache import get_prices
from app.services.returns import compute_returns, slice_range, summary_stats

router = APIRouter()


@router.get("/returns", response_model=ReturnsResponse)
async def get_returns(start: date, end: date) -> ReturnsResponse:
    if start > end:
        raise HTTPException(status_code=400, detail="start must be before or equal to end")

    prices_by_ticker = await get_prices(TICKERS)

    response: ReturnsResponse = []
    for ticker, prices in prices_by_ticker.items():
        if isinstance(prices, Exception):
            response.append(TickerReturns(ticker=ticker, error=str(prices)))
            continue

        returns = slice_range(compute_returns(prices), start, end)
        points = [ReturnPoint(date=d, return_pct=value) for d, value in returns.items()]
        response.append(TickerReturns(ticker=ticker, points=points, **summary_stats(returns)))

    return response
