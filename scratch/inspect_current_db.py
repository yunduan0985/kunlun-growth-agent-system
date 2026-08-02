import sqlite3

db_path = "/Users/dasean/.gemini/antigravity/conversations/7a3eb2cb-a8a5-41a0-8539-02f35b41f1bd.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM steps;")
count = cursor.fetchone()[0]
print(f"Current DB steps table has {count} rows.")

cursor.execute("SELECT idx, step_type, status FROM steps ORDER BY idx LIMIT 10;")
for row in cursor.fetchall():
    print(row)
conn.close()
