import sqlite3

db_path = "/Users/dasean/.gemini/antigravity/conversations/339f5518-9980-4e89-a848-d3d6b7f639c9.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all steps columns
cursor.execute("PRAGMA table_info(steps);")
cols = [c[1] for c in cursor.fetchall()]

# Search all text columns
for col in cols:
    if col == 'idx':
        continue
    try:
        cursor.execute(f"SELECT idx, {col} FROM steps;")
        rows = cursor.fetchall()
        for idx, val in rows:
            if val is not None:
                val_str = str(val)
                # Check for express routing or keyword
                if 'express()' in val_str or 'app.use(' in val_str or 'wechat_decryptor' in val_str:
                    print(f"🌟 Match in step {idx}, col {col} (len={len(val_str)})")
                    # Dump it to a file
                    out_path = f"scratch/recovered_step_{idx}.txt"
                    with open(out_path, "w", encoding="utf-8") as out:
                        out.write(val_str)
                    print(f"   Saved to {out_path}")
    except Exception as e:
        print(f"Error col {col}: {e}")
conn.close()
