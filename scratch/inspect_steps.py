import sqlite3

db_path = "/Users/dasean/.gemini/antigravity/conversations/339f5518-9980-4e89-a848-d3d6b7f639c9.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get row count in steps table
cursor.execute("SELECT COUNT(*) FROM steps;")
count = cursor.fetchone()[0]
print(f"steps table has {count} rows.")

# Let's print the first row status and types
cursor.execute("SELECT idx, step_type, status FROM steps LIMIT 5;")
for row in cursor.fetchall():
    print(row)
conn.close()
