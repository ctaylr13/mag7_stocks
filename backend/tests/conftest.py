import pytest

from app.services import cache


@pytest.fixture(autouse=True)
def clear_price_cache():
    cache._cache.clear()
    yield
    cache._cache.clear()
