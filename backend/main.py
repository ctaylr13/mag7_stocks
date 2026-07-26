from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import get_db

app = FastAPI(title="react-fastapi-duckdb")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/items")
def list_items():
    conn = get_db()
    rows = conn.execute("SELECT id, name, value FROM items ORDER BY id").fetchall()
    return [{"id": r[0], "name": r[1], "value": r[2]} for r in rows]


@app.get("/api/items/{item_id}")
def get_item(item_id: int):
    conn = get_db()
    row = conn.execute(
        "SELECT id, name, value FROM items WHERE id = ?", [item_id]
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": row[0], "name": row[1], "value": row[2]}
