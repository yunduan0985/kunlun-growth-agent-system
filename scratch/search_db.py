import sqlite3

db_path = "/Users/dasean/.gemini/antigravity/conversations/339f5518-9980-4e89-a848-d3d6b7f639c9.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [r[0] for r in cursor.fetchall()]
print("Tables:", tables)

for table in tables:
    try:
        cursor.execute(f"PRAGMA table_info({table});")
        cols = [c[1] for c in cursor.fetchall()]
        for col in cols:
            cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE {col} LIKE '%WeChat Database Key%';")
            count = cursor.fetchone()[0]
            if count > 0:
                print(f"🌟 Match in table {table} -> col {col} (count={count})")
                # Print first few matches
                cursor.execute(f"SELECT {col} FROM {table} WHERE {col} LIKE '%WeChat Database Key%' LIMIT 2;")
                for row in cursor.fetchall():
                    print("--- ROW ---")
                    print(str(row[0])[:500])
    except Exception as e:
        print("Err:", e)
conn.close()
