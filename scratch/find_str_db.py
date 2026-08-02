import sqlite3

db_path = "/Users/dasean/.gemini/antigravity/conversations/339f5518-9980-4e89-a848-d3d6b7f639c9.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [r[0] for r in cursor.fetchall()]

search_term = 'OPENCLAW_API_URL'

for table in tables:
    try:
        cursor.execute(f"PRAGMA table_info({table});")
        cols = [c[1] for c in cursor.fetchall()]
        for col in cols:
            cursor.execute(f"SELECT * FROM {table};")
            rows = cursor.fetchall()
            for r_idx, row in enumerate(rows):
                for c_idx, val in enumerate(row):
                    if val is not None and search_term in str(val):
                        print(f"🌟 Found '{search_term}' in table {table} -> col {cols[c_idx]} -> row {r_idx}")
                        # Dump first 200 chars
                        print(str(val)[:200])
    except Exception as e:
        print(f"Err {table}: {e}")
conn.close()
