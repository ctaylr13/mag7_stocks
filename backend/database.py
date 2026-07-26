import duckdb

# In-memory DB for the template; swap the path string for a file path to persist data.
_conn: duckdb.DuckDBPyConnection | None = None


def get_db() -> duckdb.DuckDBPyConnection:
    global _conn
    if _conn is None:
        _conn = duckdb.connect(":memory:")
        _seed(conn=_conn)
    return _conn


def _seed(conn: duckdb.DuckDBPyConnection) -> None:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id      INTEGER PRIMARY KEY,
            name    TEXT NOT NULL,
            value   DOUBLE
        )
    """)
    conn.execute("""
        INSERT INTO items VALUES
            (1, 'alpha', 1.5),
            (2, 'beta',  2.7),
            (3, 'gamma', 0.9)
    """)
