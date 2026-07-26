from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from app.config import Ticker


class ReturnPoint(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    date: date
    return_pct: float = Field(alias="return")


class TickerReturns(BaseModel):
    points: list[ReturnPoint] = []
    min: float | None = None
    max: float | None = None
    mean: float | None = None
    error: str | None = None


ReturnsResponse = dict[Ticker, TickerReturns]
